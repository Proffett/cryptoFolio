import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAsyncCryptoData } from '../../redux/reducer';
import { SymbolToFullName } from '../../mock/initialData';
import Header from '../Header';
import { cnMainView } from './cn-MainView';
import './index.scss';

const MainView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const walletSummary = useSelector((state) => state.summary);
  const walletProfit = useSelector((state) => state.profit);
  const data = useSelector((state) => state.cryptoData);
  const isError = useSelector((state) => state.isError);

  useEffect(() => {
    dispatch(fetchAsyncCryptoData());
  }, [dispatch]);

  const handleCoinItem = (target, coin) => {
    target.focus();
    history.push(`/${coin}`);
  };

  return (
    <>
      <Header mainScreen />

      <main className={cnMainView()}>
        <div className={cnMainView('summary-portfolio')}>
          <p className="text_secondary">Your total balance</p>
          <h1>
            <sup className={cnMainView('dollar_size')}>$</sup>
            {walletSummary}
          </h1>
          <p className="text_secondary">24h Changes</p>
          <p className={cnMainView('summary-portfolio_daily-changes')}>
            ${walletProfit}
            <span>&#8593;</span>
          </p>
        </div>

        <section className={cnMainView('coins-wrapper')} role="menu">
          {isError ? (
            <>
              <p>Something went wrong</p>
              <button
                type="button"
                className="button-try-again"
                onClick={() => dispatch(fetchAsyncCryptoData())}
              >
                try again
              </button>
            </>
          ) : (
            data.map((coin, index) => {
              const key = index + Math.random();
              const coinName = coin[0];
              const coinCurrentTick = coin[1].USD;
              const coinBalance = coin.balance;
              const estimateValue = coin.calcValue;
              const generatedProfit = coin.calcProfit;

              return (
                <div
                  key={key}
                  className={cnMainView('coin-item')}
                  role="menuitem"
                  onClick={({ target }) => handleCoinItem(target, coinName)}
                  tabIndex={index}
                >
                  <div className={cnMainView('coin-item-row')}>
                    <div className={cnMainView('coin-item_left-column_up')}>
                      <div className={`icon icon-${coinName.toLowerCase()}`} />
                      <div className={cnMainView('coin-item_left-column_margin-left')}>
                        <span>{coinName}</span>
                        <span className="text_secondary">{SymbolToFullName[`${coinName}`]}</span>
                      </div>
                    </div>

                    <p className={cnMainView('coin-item_right-column-up')}>
                      {coinBalance} <br />${estimateValue}
                    </p>
                  </div>

                  <div className={cnMainView('coin-item-row')}>
                    <div className={cnMainView('coin-item_left-column')}>
                      <span>${coinCurrentTick}</span>
                      <span className="text_secondary">Price</span>
                    </div>

                    <div className={cnMainView('coin-item_right-column')}>
                      <span className={cnMainView('profit')}>{generatedProfit}</span>
                      <span className="text_secondary">Profit/Loss</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>
    </>
  );
};

export default MainView;
