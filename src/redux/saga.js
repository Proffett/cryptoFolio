import { call, put, takeEvery } from 'redux-saga/effects';
import { setChart, setCryptoData } from './reducer';
import { ASYNC_FETCH_CRYPTO_DATA, GET_CHART } from './actions';
import { Balance } from '../mock/initialData';

// fetch data
const fetchData = () =>
  fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC,DOGE,XRP&tsyms=USD', {
    method: 'GET',
  });

const fetchChart = ({ history, coin, limit }) =>
  fetch(
    `https://min-api.cryptocompare.com/data/v2/histo${history}?fsym=${coin}&tsym=USD&limit=${limit}`,
    { method: 'GET' },
  );

// transform data
function* fetchCryptoData() {
  try {
    const fetchCoinsData = yield call(fetchData);

    const json = yield call(() => fetchCoinsData.json());
    const data = [...Object.entries(json)];

    // calculate values, profit, summary and send to store
    data.forEach((item, index) => {
      // eslint-disable-next-line no-param-reassign
      item.balance = Balance[index];
      // eslint-disable-next-line no-param-reassign
      item.calcValue = Balance[index] * item[1].USD;
      // eslint-disable-next-line no-param-reassign
      item.calcProfit = +(20 * Math.random()).toFixed(2);
    });

    const profit = data.reduce((acc, { calcProfit }) => acc + calcProfit, 0);
    const summary = data.reduce((acc, { calcValue }) => acc + calcValue, 0);
    yield put(setCryptoData({ data, profit, summary }));
  } catch (error) {
    yield put({ type: 'FETCH_CRYPTO_FAILED', message: error.message });
    console.error('fetchData Saga', error.message);
  }
}

function* fetchChartData(action) {
  let times;
  let values;

  const { history } = action.payload;

  function transformTime(historyPeriod, time) {
    const DATE = new Date(time * 1000);
    const year = DATE.getFullYear();
    const month = DATE.getMonth() + 1;
    const date = DATE.getDate();
    const hour = DATE.getHours();
    const min = DATE.getMinutes();
    let formattedTime = '';

    if (historyPeriod === 'minute') {
      formattedTime = `${hour}:${min}`;
      return formattedTime;
    }
    if (historyPeriod === 'hour') {
      formattedTime = `${hour}:00`;
      return formattedTime;
    }
    formattedTime = `${date}.${month}.${year}`;
    return formattedTime;
  }

  try {
    const fetchChartDataset = yield call(fetchChart, action.payload);
    const { Data } = yield call(() => fetchChartDataset.json());

    times = Data.Data.map(({ time }) => transformTime(history, time));

    values = Data.Data.map(({ close }) => close);

    yield put(setChart({ times, values }));
  } catch (error) {
    yield put({ type: 'FETCH_CRYPTO_FAILED', message: error });
    console.error('fetchChart Saga:', error.message);
  }
}
export function* CryptoWatcher() {
  yield takeEvery(GET_CHART, fetchChartData);
  yield takeEvery(ASYNC_FETCH_CRYPTO_DATA, fetchCryptoData);
}
