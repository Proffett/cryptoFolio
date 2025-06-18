import {
  ASYNC_FETCH_CRYPTO_DATA,
  FETCH_CRYPTO_DATA_PENDING,
  FETCH_CRYPTO_FAILED,
  FETCH_CRYPTO_SUCCESS,
  GET_CHART,
  GET_COIN_DATA,
  SET_CHART,
  SET_COIN,
  SET_COINS,
  SET_MODAL,
} from './actions';
import { AppState, Action, CoinData } from '../types';

const defaultState: AppState = {
  cryptoData: [],
  coins: ['BTC', 'ETH', 'XRP', 'ADA'],
  walletSummary: 0,
  isMainScreen: true,
  isLoading: false,
  isError: false,
  chosenCoin: 'BTC',
  chosenCoinData: [],
  history: 'hour',
  times: [],
  values: [],
};

export default function rootReducer(state: AppState | undefined, action: Action): AppState {
  const currentState = state || defaultState;

  switch (action.type) {
    case ASYNC_FETCH_CRYPTO_DATA:
      return {
        ...currentState,
        coins: action.payload,
        isLoading: false,
      };
    case FETCH_CRYPTO_DATA_PENDING:
      return {
        ...currentState,
        isLoading: true,
      };
    case FETCH_CRYPTO_SUCCESS:
      return {
        ...currentState,
        cryptoData: action.payload.data,
        summary: action.payload.summary.toFixed(2),
        profit: action.payload.profit.toFixed(2),
        isLoading: false,
        isError: false,
      };
    case FETCH_CRYPTO_FAILED:
      return { ...currentState, isLoading: false, isError: true };

    case GET_COIN_DATA:
      return {
        ...currentState,
        chosenCoin: action.payload,
        chosenCoinData: [...currentState.cryptoData].filter(
          (coin: CoinData) => coin[0] === action.payload,
        ),
        isLoading: false,
      };
    case GET_CHART:
      return {
        ...currentState,
        times: action.payload.times,
        values: action.payload.values,
        history: action.payload.history,
        isLoading: false,
      };
    case SET_CHART:
      return {
        ...currentState,
        times: action.payload.times,
        values: action.payload.values,
        isLoading: false,
      };
    case SET_COIN:
      return {
        ...currentState,
        chosenCoin: action.payload,
        isLoading: false,
      };
    case SET_COINS:
      return {
        ...currentState,
        coins: action.payload,
        isLoading: false,
      };
    case SET_MODAL:
      return {
        ...currentState,
        modal: !currentState.modal,
      };
    default:
      return currentState;
  }
}

export const fetchAsyncCryptoData = (payload: string[]): Action => ({
  type: ASYNC_FETCH_CRYPTO_DATA,
  payload,
});
export const setCryptoData = (payload: any): Action => ({ type: FETCH_CRYPTO_SUCCESS, payload });
export const getCoinData = (payload: string): Action => ({ type: GET_COIN_DATA, payload });
export const setCoin = (payload: string): Action => ({ type: SET_COIN, payload });
export const getChart = (payload: { coin: string; history: string; limit: number }): Action => ({
  type: GET_CHART,
  payload,
});
export const setChart = (payload: { times: number[]; values: number[] }): Action => ({
  type: SET_CHART,
  payload,
});
export const setError = (): Action => ({ type: FETCH_CRYPTO_FAILED });
export const setCoins = (payload: string[]): Action => ({ type: SET_COINS, payload });
export const setModal = (): Action => ({ type: SET_MODAL });
