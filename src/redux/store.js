import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducer'
import {CryptoWatcher} from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(CryptoWatcher)


export default store

