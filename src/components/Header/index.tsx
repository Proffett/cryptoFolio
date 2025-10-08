import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cnHeader } from './cn-Header';
import LoupSvg from '../UI/svg/LoupSvg';
import LeftArrowSvg from '../UI/svg/LeftArrowSvg';
import './index.scss';
import { Modal } from '../Modal';
import { useModal } from '../../hooks/useUIState';
import { HeaderProps } from '../../types';
import { useWallet } from '../../hooks/useWallet';
import { portfolioService } from '../../services/portfolioService';

function Header({ mainScreen }: HeaderProps): JSX.Element {
  const { isOpen: isModal, toggle: toggleModal } = useModal();
  const { account, connectWallet, disconnect, isConnected, isConnecting, error } = useWallet();
  const [showError, setShowError] = useState(false);
  const [isRealMode, setIsRealMode] = useState(portfolioService.isRealMode());

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const togglePortfolioMode = () => {
    const newMode = isRealMode ? 'virtual' : 'real';
    portfolioService.setMode(newMode);
    setIsRealMode(!isRealMode);
    window.location.reload();
  };

  return (
    <>
      <Modal isOpen={isModal} onClose={toggleModal} />
      
      {showError && error && (
        <div className={cnHeader('error-toast')}>
          {error}
        </div>
      )}

      <div className={cnHeader()}>
        {mainScreen ? (
          <>
            <div onClick={toggleModal}>
              <LoupSvg />
            </div>

            <div className={cnHeader('center-controls')}>
              <span className={cnHeader('live-badge')}>🟢 Live Prices</span>
              
              <button 
                className={cnHeader('mode-toggle')} 
                onClick={togglePortfolioMode}
                title={`Switch to ${isRealMode ? 'Virtual' : 'Real'} Portfolio`}
              >
                {isRealMode ? (
                  <>
                    🔗 Real {isConnected && <span className={cnHeader('mode-status')}>✓</span>}
                  </>
                ) : (
                  '📊 Virtual'
                )}
              </button>
            </div>

            {isConnected ? (
              <div className={cnHeader('wallet-connected')} onClick={disconnect} title="Click to disconnect">
                {formatAddress(account!)}
              </div>
            ) : (
              <button 
                className={cnHeader('wallet-button')} 
                onClick={connectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </>
        ) : (
          <Link to="/">
            <LeftArrowSvg />
          </Link>
        )}
      </div>
    </>
  );
}

export default Header;
