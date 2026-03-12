import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { cnHeader } from './cn-Header';
import LeftArrowSvg from '../UI/svg/LeftArrowSvg';
import './index.scss';
import { useModal } from '../../hooks/useUIState';
import { HeaderProps } from '../../types';
import { useWallet } from '../../hooks/useWallet';
import { portfolioService, type PortfolioMode } from '../../services/portfolioService';

const Modal = React.lazy(() =>
  import('../Modal').then((module) => ({
    default: module.Modal,
  })),
);

function Header({ mainScreen }: HeaderProps): React.ReactElement {
  const { isOpen: isModal, toggle: toggleModal } = useModal();
  const { account, connectWallet, disconnect, isConnected, isConnecting, error } = useWallet();
  const [dismissedError, setDismissedError] = useState<string | null>(null);
  const [isRealMode, setIsRealMode] = useState(portfolioService.isRealMode());
  const visibleError = error && error !== dismissedError ? error : null;

  useEffect(() => {
    if (!visibleError) {
      return;
    }

    const timer = setTimeout(() => setDismissedError(visibleError), 5000);
    return () => clearTimeout(timer);
  }, [visibleError]);


  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handlePortfolioMode = (mode: PortfolioMode) => {
    if ((mode === 'real') === isRealMode) {
      return;
    }

    portfolioService.setMode(mode);
    setIsRealMode(mode === 'real');
    window.location.reload();
  };

  return (
    <>
      {isModal ? (
        <Suspense fallback={null}>
          <Modal isOpen={isModal} onClose={toggleModal} />
        </Suspense>
      ) : null}
      
      {visibleError && (
        <div className={cnHeader('error-toast')}>
          {visibleError}
        </div>
      )}

      <div className={cnHeader()}>
        {mainScreen ? (
          <>
            <div className={cnHeader('top-row')}>
              <button
                type="button"
                className={cnHeader('setup-button')}
                onClick={toggleModal}
                aria-label="Open asset setup"
                aria-haspopup="dialog"
                aria-expanded={isModal}
              >
                <TuneRoundedIcon fontSize="small" />
                <span>Assets</span>
              </button>

              <span className={cnHeader('live-badge')}>
                <span className={cnHeader('live-dot')} aria-hidden="true" />
                <span>Live prices</span>
              </span>
            </div>

            <div className={cnHeader('mode-panel')}>
              <div className={cnHeader('section-heading')}>
                <span className={cnHeader('section-title')}>Portfolio mode</span>
                <span className={cnHeader('section-caption')}>
                  {isRealMode ? 'Wallet balances and live assets' : 'Manual balances for quick planning'}
                </span>
              </div>

              <div className={cnHeader('mode-switch')} role="group" aria-label="Portfolio mode">
                <button
                  type="button"
                  className={cnHeader('mode-option', { active: !isRealMode })}
                  onClick={() => handlePortfolioMode('virtual')}
                  aria-pressed={!isRealMode}
                >
                  <span className={cnHeader('mode-option-title')}>Virtual</span>
                  <span className={cnHeader('mode-option-copy')}>Manual balance</span>
                </button>

                <button
                  type="button"
                  className={cnHeader('mode-option', { active: isRealMode })}
                  onClick={() => handlePortfolioMode('real')}
                  aria-pressed={isRealMode}
                >
                  <span className={cnHeader('mode-option-title')}>Real</span>
                  <span className={cnHeader('mode-option-copy')}>
                    {isConnected ? 'Wallet connected' : 'Needs wallet'}
                  </span>
                </button>
              </div>
            </div>

            <div className={cnHeader('wallet-row')}>
              {isConnected ? (
                <button
                  type="button"
                  className={cnHeader('wallet-connected')}
                  onClick={disconnect}
                  title="Disconnect wallet"
                >
                  <span className={cnHeader('wallet-label')}>Connected wallet</span>
                  <span className={cnHeader('wallet-value')}>{formatAddress(account!)}</span>
                </button>
              ) : (
                <button
                  type="button"
                  className={cnHeader('wallet-button')}
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  <span className={cnHeader('wallet-button-title')}>
                    {isConnecting ? 'Connecting...' : 'Connect wallet'}
                  </span>
                  <span className={cnHeader('wallet-button-copy')}>
                    Required only for real portfolio balances
                  </span>
                </button>
              )}
            </div>
          </>
        ) : (
          <Link to="/" className={cnHeader('back-link')} aria-label="Back to portfolio">
            <LeftArrowSvg />
          </Link>
        )}
      </div>
    </>
  );
}

export default Header;
