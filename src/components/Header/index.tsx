import React from 'react';
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

function Header({ mainScreen }: HeaderProps): JSX.Element {
  const dispatch = useDispatch();
  const isModal = useSelector((state: AppState) => state.modal);

  return (
    <>
      {isModal && <Modal />}

      <div className={cnHeader()}>
        {mainScreen ? (
          <>
            <div onClick={() => dispatch(setModal())}>
              <LoupSvg />
            </div>
            <BellSvg />
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
