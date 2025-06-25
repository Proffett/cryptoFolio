import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAsyncCryptoData } from '@/store/reducer.ts';
import { SymbolToFullName } from '@/mock/initialData.ts';
import Header from '../Header';
import { cnMainView } from './cn-MainView';
import './index.scss';
import { AppState, CoinData } from '@/types';

function MainView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const walletSummary = useSelector((state: AppState) => state.summary);
  const walletProfit = useSelector((state: AppState) => state.profit);
  const data = useSelector((state: AppState) => state.cryptoData);
  const isError = useSelector((state: AppState) => state.isError);

  useEffect(() => {
    if (localStorage.favorites) {
      dispatch(fetchAsyncCryptoData(JSON.parse(localStorage.getItem('favorites') || '[]')));
    } else {
      dispatch(fetchAsyncCryptoData(['BTC', 'ETH', 'XRP', 'ADA']));
    }
  }, [dispatch]);

  const handleCoinItem = (event: React.MouseEvent<HTMLDivElement>, coin: string): void => {
    event.currentTarget.focus();
    navigate(`/${coin}`);
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
                      onClick={() => dispatch(fetchAsyncCryptoData(['BTC']))}
                  >
                    try again
                  </button>
                </>
            ) : (
                data.map((coin: CoinData, index: number) => {
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
                          onClick={(event) => handleCoinItem(event, coinName)}
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
}

export default MainView;
