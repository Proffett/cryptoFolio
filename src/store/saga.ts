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
import { priceService } from '../services/priceService';
import { blockchainService } from '../services/blockchainService';
import { portfolioService } from '../services/portfolioService';

// Mock price data for fallback
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

function* fetchCryptoData(action: {
  type: string;
  payload: string[];
}): Generator<any, void, any> {
  try {
    yield put({ type: FETCH_CRYPTO_DATA_PENDING });

    const isRealMode = portfolioService.isRealMode();
    const coinSymbols = action.payload;

    let prices: Record<string, number>;
    let balances: Record<string, number>;

    try {
      prices = yield call([priceService, 'getMultiplePrices'], coinSymbols);
    } catch (error) {
      console.warn('Failed to fetch real prices, using mock data:', error);
      prices = Object.fromEntries(
        coinSymbols.map((symbol) => [symbol, mockPrices[symbol] || 1])
      );
    }

    if (isRealMode) {
      const walletConnected = localStorage.getItem('walletManuallyDisconnected') !== 'true';
      
      if (walletConnected && window.ethereum) {
        try {
          const { ethers } = yield import('ethers');
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = yield call([provider, 'send'], 'eth_accounts', []);
          
          if (accounts.length > 0) {
            balances = yield call(
              [blockchainService, 'getMultipleBalances'],
              provider,
              accounts[0],
              coinSymbols
            );
          } else {
            balances = portfolioService.getVirtualBalances();
          }
        } catch (error) {
          console.warn('Failed to fetch blockchain balances:', error);
          balances = portfolioService.getVirtualBalances();
        }
      } else {
        balances = portfolioService.getVirtualBalances();
      }
    } else {
      balances = portfolioService.getVirtualBalances();
    }

    const data: CoinData[] = coinSymbols.map((coinSymbol) => {
      const price = prices[coinSymbol] || mockPrices[coinSymbol] || 1;
      const balance = balances[coinSymbol] || 0;
      const calcValue = price * balance;
      const calcProfit = calcValue * 0.1;

      return {
        0: coinSymbol,
        1: { USD: price },
        balance: balance,
        calcValue: Number(calcValue.toFixed(2)),
        calcProfit: Number(calcProfit.toFixed(2)),
      } as CoinData;
    });

    const summary = data.reduce((total, coin) => total + coin.calcValue, 0);
    const profit = data.reduce((total, coin) => total + coin.calcProfit, 0);

    const response: CryptoApiResponse = {
      data,
      summary,
      profit,
    };

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
