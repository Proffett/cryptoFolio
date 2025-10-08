import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useCryptoPortfolio } from '@/hooks/useCryptoData';
import { useFavorites } from '@/hooks/useUIState';
import { useWallet } from '@/hooks/useWallet';
import { SymbolToFullName } from '@/mock/initialData.ts';
import Header from '../Header';
import { cnMainView } from './cn-MainView';
import './index.scss';
import { CoinData } from '@/types';

function MainView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { favorites } = useFavorites();
  const { account } = useWallet();
  const { data, summary, profit, isLoading, isRealMode } = useCryptoPortfolio(favorites, account);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['balances'] });
  }, [account, queryClient]);

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
            {summary.toFixed(2)}
          </h1>
          <p className="text_secondary">24h Changes</p>
          <p className={cnMainView('summary-portfolio_daily-changes')}>
            ${profit.toFixed(2)}
            <span>&#8593;</span>
          </p>
        </div>

        {isRealMode && !account && (
          <div className={cnMainView('wallet-notice')}>
            <p>🔗 Real Portfolio mode is active</p>
            <p className="text_secondary">Connect MetaMask to see your real balances</p>
          </div>
        )}

        <section className={cnMainView('coins-wrapper')} role="menu">
          {isLoading ? (
            <p>Loading...</p>
          ) : data.length === 0 && isRealMode && account ? (
            <div className={cnMainView('empty-notice')}>
              <p>💼 Your wallet is connected</p>
              <p className="text_secondary">No cryptocurrency balances found for your favorites</p>
            </div>
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
