import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { fetchAsyncCryptoData, getChart, getCoinData, setCoin } from '../../store/reducer';
import { SymbolToFullName } from '../../mock/initialData';
import Header from '../Header';
import Chart from '../Chart';
import { cnCoinView } from './cn-CoinView';
import './index.scss';

const CoinView = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { coin } = useParams();
  const [historyClassActive, setHistoryClassActive] = useState('hour');
  const [coinClassActive, setCoinClassActive] = useState(coin);
  const [isLoading, setIsLoading] = useState(true);
  const coinFullName = SymbolToFullName[coin];

  const times = useSelector((state) => state.times);
  const values = useSelector((state) => state.values);
  let historyValue = useSelector((state) => state.history);
  const coinsData = useSelector((state) => state.cryptoData);
  const chosenCoinData = useSelector((state) => state.chosenCoinData);

  let limit = 60;
  let currentCoinBalance = 0;
  let currentCoinProfit = 0;

  useEffect(() => {
    setIsLoading(true);

    if (!chosenCoinData || !coinsData) {
      dispatch(fetchAsyncCryptoData(coin));
      dispatch(setCoin(coin));
      dispatch(getCoinData(coin));
    }

    dispatch(getChart({ coin, history: historyValue, limit }));

    setIsLoading(false);
  }, [dispatch, coin, limit, historyValue, chosenCoinData, coinsData]);

  const handleCoinItem = (target, chosenCoin) => {
    setCoinClassActive(chosenCoin);
    target.focus();
    return history.push(`/${chosenCoin}`);
  };
  const handleHistory = (time) => {
    historyValue = time;
    setHistoryClassActive(time);
    if (historyValue === 'day') limit = 24;
    else limit = 60;

    return dispatch(getChart({ coin, history: time, limit }));
  };

  return (
    <main className={cnCoinView()}>
      <Header />

      {/* carousel */}
      {!isLoading && (
        <div className={cnCoinView('coin-carousel-container')}>
          {coinsData.map((coinItem, index) => {
            const key = index + Math.random();
            const coinItemName = coinItem[0];
            const coinItemFullName = SymbolToFullName[coinItemName];
            const coinItemBalance = coinItem.balance;
            const coinItemProfit = coinItem.calcProfit;

            if (coinItemName.toLowerCase() === coin.toLowerCase()) {
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
                onClick={({ target }) => handleCoinItem(target, coinItemName)}
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
          <div className={`icon icon-${coin.toLowerCase()}`} />
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
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <li
            tabIndex={-3}
            key="minute"
            className={historyClassActive === 'minute' ? 'li-active' : null}
            onClick={() => handleHistory('minute')}
          >
            Minutes
          </li>
          <li
            tabIndex={-2}
            key="hour"
            className={historyClassActive === 'hour' ? 'li-active' : null}
            onClick={() => handleHistory('hour')}
          >
            Hour
          </li>
          <li
            tabIndex={-1}
            key="day"
            className={historyClassActive === 'day' ? 'li-active' : null}
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
};

export default CoinView;
