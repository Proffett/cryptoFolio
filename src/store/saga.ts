import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ASYNC_FETCH_CRYPTO_DATA,
  FETCH_CRYPTO_SUCCESS,
  FETCH_CRYPTO_FAILED,
  GET_CHART,
  SET_CHART,
} from './actions';
import { CryptoApiResponse, CoinData } from '../types';

// Mock API call - replace with actual API
function* fetchCryptoData(action: {
  type: string;
  payload: string[];
}): Generator<any, void, CryptoApiResponse> {
  try {
    console.log('fetchCryptoData saga called with payload:', action.payload);

    // Simulate API call
    const response: CryptoApiResponse = yield call(
      () =>
        new Promise<CryptoApiResponse>((resolve) => {
          setTimeout(() => {
            resolve({
              data: [
                {
                  0: 'BTC',
                  1: { USD: 45000 },
                  balance: 1.5,
                  calcValue: 67500,
                  calcProfit: 22500,
                } as CoinData,
                {
                  0: 'ETH',
                  1: { USD: 3000 },
                  balance: 10,
                  calcValue: 30000,
                  calcProfit: 5000,
                } as CoinData,
                {
                  0: 'XRP',
                  1: { USD: 0.5 },
                  balance: 1000,
                  calcValue: 500,
                  calcProfit: 100,
                } as CoinData,
                {
                  0: 'ADA',
                  1: { USD: 1.2 },
                  balance: 500,
                  calcValue: 600,
                  calcProfit: 50,
                } as CoinData,
              ],
              summary: 103100,
              profit: 23050,
            });
          }, 1000);
        }),
    );

    yield put({ type: FETCH_CRYPTO_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: FETCH_CRYPTO_FAILED, payload: error });
  }
}

// Mock chart data generator
function* fetchChartData(action: {
  type: string;
  payload: { coin: string; history: string; limit: number };
}): Generator<any, void, any> {
  try {
    console.log('fetchChartData saga called with payload:', action.payload);

    // Generate mock chart data based on history type
    const { history, limit } = action.payload;
    const times: number[] = [];
    const values: number[] = [];

    let dataPoints: number;
    let basePrice: number;
    let volatility: number;

    // Set different parameters for each time period
    if (history === 'minute') {
      dataPoints = 60; // 60 minutes
      basePrice = 45000;
      volatility = 500; // Small price movements
    } else if (history === 'hour') {
      dataPoints = 24; // 24 hours
      basePrice = 45000;
      volatility = 2000; // Medium price movements
    } else if (history === 'day') {
      dataPoints = 7; // 7 days
      basePrice = 45000;
      volatility = 8000; // Large price movements
    } else {
      dataPoints = limit;
      basePrice = 45000;
      volatility = 1000;
    }

    // Generate time labels and values with distinct patterns
    for (let i = 0; i < dataPoints; i++) {
      times.push(i);

      // Create different price patterns for each period
      let price: number;
      if (history === 'minute') {
        // Minutes: Small fluctuations with trend
        price = basePrice + Math.sin(i * 0.3) * volatility + i * 10 + Math.random() * 200 - 100;
      } else if (history === 'hour') {
        // Hours: Medium fluctuations with some trend
        price = basePrice + Math.sin(i * 0.5) * volatility + i * 50 + Math.random() * 800 - 400;
      } else if (history === 'day') {
        // Days: Large fluctuations with clear trend
        price = basePrice + Math.sin(i * 0.8) * volatility + i * 200 + Math.random() * 2000 - 1000;
      } else {
        price = basePrice + Math.random() * volatility - volatility / 2;
      }

      values.push(Math.max(price, 1000)); // Ensure price doesn't go below 1000
    }

    yield put({ type: SET_CHART, payload: { times, values } });
  } catch (error) {
    console.error('Error generating chart data:', error);
  }
}

export default function* rootSaga(): Generator<any, void, any> {
  yield takeLatest(ASYNC_FETCH_CRYPTO_DATA, fetchCryptoData);
  yield takeLatest(GET_CHART, fetchChartData);
}
