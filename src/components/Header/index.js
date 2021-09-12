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

// eslint-disable-next-line react/prop-types
const Header = ({ mainScreen }) => {
  const dispatch = useDispatch();
  const isModal = useSelector((state) => state.modal);
  // eslint-disable-next-line no-shadow
  // const props = useSpring({ to: { 'translateX(-100%)' }, from: { 'translateX(0%)' } });

  return (
    <>
      {/* eslint-disable-next-line react/jsx-pascal-case */}

      {isModal && <Modal />}

      <div className={cnHeader()}>
        {mainScreen ? (
          <>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
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
};

export default Header;
