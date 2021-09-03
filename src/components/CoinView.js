import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChart, getCoinData, setCoin } from "../redux/reducer";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { SymbolToFullName } from "../mock/initialData";
import LeftArrowSvg from "./svg/LeftArrowSvg";
import Chart from "./Chart";


const CoinView = () => {
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    const dispatch = useDispatch();
    const {coin} = useParams();
    const coinFullName = SymbolToFullName[coin]

    const times = useSelector((state) => state.times)
    let values = useSelector((state) => state.values)
    let historyValue = useSelector((state) => state.history)
    const coinsData = useSelector((state) => state.cryptoData)
    const chosenCoinData = useSelector((state) => state.chosenCoinData)

    let limit = 60
    let currentCoinBalance = 0
    let currentCoinProfit = 0

    useEffect( () => {
        setIsLoading(true)

        if(!chosenCoinData) {
            dispatch(setCoin(coin))
            dispatch(getCoinData(coin))
        }

        dispatch(getChart({coin, history: historyValue, limit: limit}))

        setIsLoading(false)
    }, [dispatch, coin, limit, historyValue, chosenCoinData]);


    const handleCoinItem = (coin) => {
        return history.push(`/${coin}`)
    }
    const handleHistory = (time) => {
        historyValue = time
        if(historyValue === 'day') limit = 24
        else limit = 60

        return dispatch(getChart({coin: coin, history: time, limit: limit}))
    }

    return(
        <div className="App">
            <main className='wrapper' style={{overflow: "hidden"}}>
                <div className="app-header" >
                    <Link to="/"><LeftArrowSvg/></Link>
                </div>

                {/*carousel*/}
                {!isLoading && <div className="coin-carousel-container">
                    {coinsData.map((coinItem, index) => {
                        const coinName = coinItem[0]
                        const coinFullName = SymbolToFullName[coinName]
                        const coinBalance = coinItem.balance
                        const coinProfit = coinItem.calcProfit

                        if (coinName.toLowerCase() === coin.toLowerCase()) {
                            currentCoinBalance = coinBalance
                            currentCoinProfit = coinProfit
                        }
                        return (
                            <div key={index} className='coin-item-list' onClick={() => handleCoinItem(coinName)}>
                                <div className='flex-item'>
                                    <div style={{fontSize: 32}} className={`icon icon-${coinName.toLowerCase()}`}/>
                                    <div className='flex-left-column'>
                                        <span>{coinName}</span>
                                        <span className='second-color small-text'>{coinFullName}</span>
                                    </div>
                                </div>

                                <div className='flex-right-column'>
                                    <span>{coinBalance}</span>
                                    <span className='green small-text'>{coinProfit}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>}

                {/*current coin*/}
                <div className='coin-item-minimal'>
                    <div className='flex-item'>
                        <div style={{fontSize: 32}} className={`icon icon-${coin.toLowerCase()}`}/>
                        <div className='flex-left-column'>
                            <span>{coin}</span>
                            <span className='second-color small-text'>{coinFullName}</span>
                        </div>
                    </div>

                    <div className='flex-right-column'>
                        <span style={{textAlign: "right"}}>{currentCoinBalance}</span>
                        <span className='green small-text'>{currentCoinProfit}</span>
                    </div>
                </div>

                {/*chart*/}
                <div className='history-items'>
                    <ul>
                        <li className={historyValue ? 'li-active': null} onClick={() => handleHistory('minute')}>
                            Minutes
                        </li>
                        <li className={historyValue === 'hour' ? 'li-active': null} onClick={() => handleHistory('hour')}>
                            Hours
                        </li>
                        <li className={historyValue === 'day' ? 'li-active': null} onClick={() => handleHistory('day')}>
                            Daily
                        </li>
                    </ul>
                </div>
                {!isLoading && times && values && <Chart times={times} values={values} history={historyValue}/>}
            </main>
        </div>
        )
}

export default CoinView;