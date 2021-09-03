import { call, put, takeEvery } from 'redux-saga/effects'
import { setChart, setCryptoData } from "./reducer";
import {ASYNC_FETCH_CRYPTO_DATA, GET_CHART} from "./actions";
import {Balance} from "../mock/initialData";


//get data
const fetchData = () => fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC,DOGE&tsyms=USD',
    {"method": "GET"})

const fetchChart = ({history, coin, limit}) =>
    fetch(`https://min-api.cryptocompare.com/data/v2/histo${history}?fsym=${coin}&tsym=USD&limit=${limit}&aggregate=1`, {"method": "GET"})

const currentDate = new Date()

//transform data
function* fetchCryptoData() {
    try {
        const getCryptoData = yield call(fetchData);

        const json = yield call(() => getCryptoData.json());
        const data = [...Object.entries(json)]

        //calculate values, profit, summary and send to store
        data.forEach((item, index) => {
            item.balance = Balance[index];
            item.calcValue = Balance[index] * item[1]['USD'];
            item.calcProfit = +(20 * Math.random()).toFixed(2)
        })

        const profit = data.reduce((acc, {calcProfit}) => {
            return acc + calcProfit
        }, 0)
        const summary = data.reduce((acc, {calcValue}) => {
            return acc + calcValue
        }, 0)
        yield put(setCryptoData({data, profit, summary}));

    } catch (error) {
        yield put({type: "FETCH_CRYPTO_FAILED", message: error.message});
        console.error('fetchData Saga', error.message)
    }
}

function* fetchChartData(action) {
    let times, values

    let { history } = action.payload

    function transformTime(history, time) {
        if(history === 'minute')
            return new Date(currentDate - time).toLocaleDateString()
        if(history === 'hour')
            return time
        else {
            return time
        }
    }

    try {

        const getChartData = yield call(fetchChart, action.payload);
        const { Data } = yield call(() => getChartData.json());

        times = Data['Data'].map(({time}) => {
            return transformTime(history, time)
        })

        values = Data['Data'].map(({close}) => {
            return close
        })

        yield put(setChart({times, values}));
    }
    catch(error) {
        yield put({type: "FETCH_CRYPTO_FAILED", message: error});
        console.error('fetchChart Saga:', error.message)
    }
}
export function* CryptoWatcher() {
    yield takeEvery(GET_CHART, fetchChartData)
    yield takeEvery(ASYNC_FETCH_CRYPTO_DATA, fetchCryptoData)

}

