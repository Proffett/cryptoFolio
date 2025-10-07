import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cnHeader } from './cn-Header';
import LoupSvg from '../UI/svg/LoupSvg';
import BellSvg from '../UI/svg/BellSvg';
import LeftArrowSvg from '../UI/svg/LeftArrowSvg';
import './index.scss';
import { Modal } from '../Modal';
import { setModal } from '../../store/reducer';
import { HeaderProps, AppState } from '../../types';
import { useWallet } from '../../hooks/useWallet';

function Header({ mainScreen }: HeaderProps): JSX.Element {
  const dispatch = useDispatch();
  const isModal = useSelector((state: AppState) => state.modal);
  const { account, connectWallet, disconnect, isConnected, isConnecting, error } = useWallet();
  const [showError, setShowError] = useState(false);

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

  return (
    <>
      {isModal && <Modal />}
      
      {showError && error && (
        <div className={cnHeader('error-toast')}>
          {error}
        </div>
      )}

      <div className={cnHeader()}>
        {mainScreen ? (
          <>
            <div onClick={() => dispatch(setModal())}>
              <LoupSvg />
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
