import {
  ASYNC_FETCH_CRYPTO_DATA,
  FETCH_CRYPTO_DATA_PENDING,
  FETCH_CRYPTO_FAILED,
  FETCH_CRYPTO_SUCCESS,
  GET_CHART,
  GET_COIN_DATA,
  SET_CHART,
  SET_COIN,
} from './actions';

const defaultState = {
  cryptoData: [],
  walletSummary: 0,
  isMainScreen: true,
  isLoading: true,
  isError: false,
  chosenCoin: 'DOGE',
  chosenCoinData: [],
  history: 'hour',
  times: 0,
  values: 0,
};

export default function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_CRYPTO_DATA_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CRYPTO_SUCCESS:
      return {
        ...state,
        cryptoData: action.payload.data,
        summary: action.payload.summary.toFixed(2),
        profit: action.payload.profit.toFixed(2),
        isLoading: false,
        isError: false,
      };
    case FETCH_CRYPTO_FAILED:
      return { ...state, isLoading: false, isError: true };

    case GET_COIN_DATA:
      return {
        ...state,
        chosenCoin: action.payload,
        chosenCoinData: [...state.cryptoData].filter((coin) => coin[0] === action.payload),
        isLoading: false,
      };
    case GET_CHART:
      return {
        ...state,
        times: action.payload.times,
        values: action.payload.values,
        history: action.payload.history,
        isLoading: false,
      };
    case SET_CHART:
      return {
        ...state,
        times: action.payload.times,
        values: action.payload.values,
        isLoading: false,
      };
    case SET_COIN:
      return {
        ...state,
        chosenCoin: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}

export const fetchAsyncCryptoData = () => ({ type: ASYNC_FETCH_CRYPTO_DATA });
export const setCryptoData = (payload) => ({ type: FETCH_CRYPTO_SUCCESS, payload });
export const getCoinData = (payload) => ({ type: GET_COIN_DATA, payload });
export const setCoin = (payload) => ({ type: SET_COIN, payload });
export const getChart = (payload) => ({ type: GET_CHART, payload });
export const setChart = (payload) => ({ type: SET_CHART, payload });
export const setError = () => ({ type: FETCH_CRYPTO_FAILED });
