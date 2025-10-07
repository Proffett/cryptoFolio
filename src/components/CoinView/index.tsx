import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useCryptoPortfolio, useChartData } from '../../hooks/useCryptoData';
import { useFavorites } from '../../hooks/useUIState';
import { useWallet } from '../../hooks/useWallet';
import { SymbolToFullName } from '../../mock/initialData';
import Header from '../Header';
import Chart from '../Chart';
import { cnCoinView } from './cn-CoinView';
import './index.scss';
import { CoinData } from '../../types';

function CoinView() {
  const navigate = useNavigate();
  const { coin } = useParams<{ coin: string }>();
  const [historyClassActive, setHistoryClassActive] = useState<string>('hour');
  const [coinClassActive, setCoinClassActive] = useState<string>(coin || 'BTC');
  const coinFullName = SymbolToFullName[coin || 'BTC'];

  const { favorites } = useFavorites();
  const { account } = useWallet();
  const { data: coinsData, isLoading: isPortfolioLoading } = useCryptoPortfolio(favorites, account);

  let limit = 60;
  if (historyClassActive === 'minute') limit = 60;
  else if (historyClassActive === 'hour') limit = 24;
  else if (historyClassActive === 'day') limit = 7;

  const { data: chartData, isLoading: isChartLoading } = useChartData(coin || 'BTC', historyClassActive, limit);

  const isLoading = isPortfolioLoading || isChartLoading;

  let currentCoinBalance = 0;
  let currentCoinProfit = 0;

  const currentCoinData = coinsData.find((coinItem: CoinData) => 
    coinItem[0].toLowerCase() === coin?.toLowerCase()
  );

  if (currentCoinData) {
    currentCoinBalance = currentCoinData.balance;
    currentCoinProfit = currentCoinData.calcProfit;
  }

  const handleCoinItem = (event: React.MouseEvent<HTMLDivElement>, chosenCoin: string): void => {
    setCoinClassActive(chosenCoin);
    event.currentTarget.focus();
    navigate(`/${chosenCoin}`);
  };

  const handleHistory = (time: string): void => {
    setHistoryClassActive(time);
  };

  return (
    <main className={cnCoinView()}>
      <Header />

      {!isPortfolioLoading && (
        <div className={cnCoinView('coin-carousel-container')}>
          {coinsData.map((coinItem: CoinData, index: number) => {
            const key = index + Math.random();
            const coinItemName = coinItem[0];
            const coinItemFullName = SymbolToFullName[coinItemName];
            const coinItemBalance = coinItem.balance;
            const coinItemProfit = coinItem.calcProfit;

            return (
              <div
                role="main"
                key={key}
                className={
                  coinClassActive === coinItemName.toUpperCase()
                    ? cnCoinView('coin-item-list-active')
                    : cnCoinView('coin-item-list')
                }
                onClick={(event) => handleCoinItem(event, coinItemName)}
              >
                <div className={cnCoinView('flex-item')}>
                  <div className={`icon icon-${coinItemName.toLowerCase()}`} />
                  <div className={cnCoinView('flex-left-column')}>
                    <span>{coinItemName}</span>
                    <span className="second-color text_secondary">{coinItemFullName}</span>
                  </div>
                </div>

                <div className={cnCoinView('flex-right-column')}>
                  <span>{coinItemBalance}</span>
                  <span className="green text_secondary">{coinItemProfit}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className={cnCoinView('coin-item-minimal')}>
        <div className={cnCoinView('flex-item')}>
          <div className={`icon icon-${coin?.toLowerCase()}`} />
          <div className={cnCoinView('flex-left-column')}>
            <span>{coin}</span>
            <span className="second-color text_secondary">{coinFullName}</span>
          </div>
        </div>

        <div className={cnCoinView('flex-right-column')}>
          <span>{currentCoinBalance}</span>
          <span className="green text_secondary">{currentCoinProfit}</span>
        </div>
      </div>

      <div className={cnCoinView('history-items')}>
        <ul role="presentation">
          <li
            tabIndex={-3}
            key="minute"
            className={historyClassActive === 'minute' ? 'li-active' : undefined}
            onClick={() => handleHistory('minute')}
          >
            Minutes
          </li>
          <li
            tabIndex={-2}
            key="hour"
            className={historyClassActive === 'hour' ? 'li-active' : undefined}
            onClick={() => handleHistory('hour')}
          >
            Hour
          </li>
          <li
            tabIndex={-1}
            key="day"
            className={historyClassActive === 'day' ? 'li-active' : undefined}
            onClick={() => handleHistory('day')}
            onKeyDown={() => handleHistory('day')}
          >
            Daily
          </li>
        </ul>
      </div>
      {!isLoading && chartData && (
        <Chart times={chartData.times} values={chartData.values} history={historyClassActive} />
      )}
    </main>
  );
}

export default CoinView;
