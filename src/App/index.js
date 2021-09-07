import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import React, { useEffect } from 'react';
import LoaderSvg from '../components/svg/LoaderSvg';
import { fetchAsyncCryptoData } from '../redux/reducer';
import { cnApp } from './cn-app';
import '../styles/App.scss';
import './index.scss';
import MainView from '../components/MainView';
import CoinView from '../components/CoinView';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(fetchAsyncCryptoData());
  }, [dispatch]);

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
