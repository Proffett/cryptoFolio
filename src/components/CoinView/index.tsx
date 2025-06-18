import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchAsyncCryptoData, getChart, getCoinData, setCoin } from '../../store/reducer';
import { SymbolToFullName } from '../../mock/initialData';
import Header from '../Header';
import Chart from '../Chart';
import { cnCoinView } from './cn-CoinView';
import './index.scss';
import { AppState, CoinData } from '../../types';

function CoinView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { coin } = useParams<{ coin: string }>();
  const [historyClassActive, setHistoryClassActive] = useState<string>('hour');
  const [coinClassActive, setCoinClassActive] = useState<string>(coin || 'BTC');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const coinFullName = SymbolToFullName[coin || 'BTC'];

  const times = useSelector((state: AppState) => state.times);
  const values = useSelector((state: AppState) => state.values);
  let historyValue = useSelector((state: AppState) => state.history);
  const coinsData = useSelector((state: AppState) => state.cryptoData);
  const chosenCoinData = useSelector((state: AppState) => state.chosenCoinData);

  let currentCoinBalance = 0;
  let currentCoinProfit = 0;

  useEffect(() => {
    setIsLoading(true);

    if (!chosenCoinData || !coinsData) {
      dispatch(fetchAsyncCryptoData([coin || 'BTC']));
      dispatch(setCoin(coin || 'BTC'));
      dispatch(getCoinData(coin || 'BTC'));
    }

    // Set initial limit based on current history
    let limit = 60; // default for hour
    if (historyValue === 'minute') limit = 60;
    else if (historyValue === 'day') limit = 7;

    dispatch(getChart({ coin: coin || 'BTC', history: historyValue, limit }));

    setIsLoading(false);
  }, [dispatch, coin, historyValue, chosenCoinData, coinsData]);

  const handleCoinItem = (event: React.MouseEvent<HTMLDivElement>, chosenCoin: string): void => {
    setCoinClassActive(chosenCoin);
    event.currentTarget.focus();
    navigate(`/${chosenCoin}`);
  };

  const handleHistory = (time: string): void => {
    historyValue = time;
    setHistoryClassActive(time);

    // Set correct limit for each time period
    let limit = 60; // default
    if (time === 'minute') limit = 60;
    else if (time === 'hour') limit = 24;
    else if (time === 'day') limit = 7;

    dispatch(getChart({ coin: coin || 'BTC', history: time, limit }));
  };

  return (
    <main className={cnCoinView()}>
      <Header />

      {/* carousel */}
      {!isLoading && (
        <div className={cnCoinView('coin-carousel-container')}>
          {coinsData.map((coinItem: CoinData, index: number) => {
            const key = index + Math.random();
            const coinItemName = coinItem[0];
            const coinItemFullName = SymbolToFullName[coinItemName];
            const coinItemBalance = coinItem.balance;
            const coinItemProfit = coinItem.calcProfit;

            if (coinItemName.toLowerCase() === coin?.toLowerCase()) {
              currentCoinBalance = coinItemBalance;
              currentCoinProfit = coinItemProfit;
            }
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

      {/* current coin */}
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

      {/* chart */}
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
      {!isLoading && times && values && (
        <Chart times={times} values={values} history={historyValue} />
      )}
    </main>
  );
}

export default CoinView;
