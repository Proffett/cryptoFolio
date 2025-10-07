import React from 'react';
import { Route, Routes } from 'react-router';
import { cnApp } from './cn-app';
import '../styles/App.scss';
import './index.scss';
import MainView from '../components/MainView';
import CoinView from '../components/CoinView';

function App(): JSX.Element {
  return (
    <div className={cnApp()}>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/:coin" element={<CoinView />} />
      </Routes>
    </div>
  );
}

export { App };
