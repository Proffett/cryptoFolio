import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ASYNC_FETCH_CRYPTO_DATA,
  FETCH_CRYPTO_SUCCESS,
  FETCH_CRYPTO_FAILED,
  FETCH_CRYPTO_DATA_PENDING,
  GET_CHART,
  SET_CHART,
} from './actions';
import { CryptoApiResponse, CoinData } from '@/types';

// Mock price data for different coins
const mockPrices: { [key: string]: number } = {
  BTC: 45000,
  ETH: 3000,
  XRP: 0.5,
  ADA: 1.2,
  BSC: 320,
  LTC: 180,
  THETA: 2.5,
  XLM: 0.35,
  TRX: 0.08,
  DOGE: 0.15,
  XMR: 280,
  SOL: 95,
};

// Mock API call - replace with actual API
function* fetchCryptoData(action: {
  type: string;
  payload: string[];
}): Generator<any, void, CryptoApiResponse> {
  try {
    // Set loading state
    yield put({ type: FETCH_CRYPTO_DATA_PENDING });

    // Get balance from localStorage (fresh read each time)
    const savedBalance = localStorage.getItem('balance');
    const balanceData = savedBalance ? JSON.parse(savedBalance) : {};

    // Simulate API call
    const response: CryptoApiResponse = yield call(
      () =>
        new Promise<CryptoApiResponse>((resolve) => {
          setTimeout(() => {
            // Generate data for each requested coin
            const data: CoinData[] = action.payload.map((coinSymbol) => {
              const price = mockPrices[coinSymbol] || 1;
              const balance = balanceData[coinSymbol] || 0;
              const calcValue = price * balance;
              const calcProfit = calcValue * 0.1; // 10% mock profit

              return {
                0: coinSymbol,
                1: { USD: price },
                balance: balance,
                calcValue: Number(calcValue.toFixed(2)),
                calcProfit: Number(calcProfit.toFixed(2)),
              } as CoinData;
            });

            // Calculate totals
            const summary = data.reduce((total, coin) => total + coin.calcValue, 0);
            const profit = data.reduce((total, coin) => total + coin.calcProfit, 0);

            resolve({
              data,
              summary,
              profit,
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
