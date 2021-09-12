import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import React from 'react';
import LoaderSvg from '../components/UI/svg/LoaderSvg';

import { cnApp } from './cn-app';
import '../styles/App.scss';
import './index.scss';
import MainView from '../components/MainView';
import CoinView from '../components/CoinView';

export const App = () => {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div className={cnApp()}>
      {isLoading ? (
        <LoaderSvg />
      ) : (
        <Switch>
          <Route path="/" exact>
            <MainView />
          </Route>

          <Route path="/:coin">
            <CoinView />
          </Route>
        </Switch>
      )}
    </div>
  );
};
