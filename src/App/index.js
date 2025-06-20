import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import React from 'react';
import LoaderSvg from '../components/UI/svg/LoaderSvg';

import { cnApp } from './cn-app';
import '../styles/App.scss';
import './index.scss';
import MainView from '../components/MainView';
import CoinView from '../components/CoinView';

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div className={cnApp()}>
      {isLoading ? (
        <LoaderSvg />
      ) : (
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/:coin" element={<CoinView />} />
        </Routes>
      )}
    </div>
  );
}

export { App };
