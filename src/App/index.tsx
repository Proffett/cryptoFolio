import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import LoaderSvg from '../components/UI/svg/LoaderSvg';
import { cnApp } from './cn-app';
import '../styles/App.scss';
import './index.scss';
import MainView from '../components/MainView';
import CoinView from '../components/CoinView';
import { AppState } from '../types';

function App(): JSX.Element {
  const isLoading = useSelector((state: AppState) => state.isLoading);

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
