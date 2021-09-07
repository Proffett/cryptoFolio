import React from 'react';
import { Link } from 'react-router-dom';
import LoupSvg from '../svg/LoupSvg';
import BellSvg from '../svg/BellSvg';
import LeftArrowSvg from '../svg/LeftArrowSvg';

// eslint-disable-next-line react/prop-types
const Header = ({ mainScreen }) => (
  <>
    {mainScreen ? (
      <div className="app-header">
        <LoupSvg />
        <BellSvg />
      </div>
    ) : (
      <div className="app-header">
        <Link to="/">
          <LeftArrowSvg />
        </Link>
      </div>
    )}
  </>
);

export default Header;
