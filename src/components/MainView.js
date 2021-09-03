import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncCryptoData } from "../redux/reducer";
import { useHistory } from "react-router-dom";
import { SymbolToFullName } from "../mock/initialData";
import LoupSvg from "./svg/LoupSvg";
import BellSvg from "./svg/BellSvg";
import LoaderSvg from "./svg/LoaderSvg";


const MainView = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const walletSummary = useSelector((state) => state.summary)
    const walletProfit = useSelector((state) => state.profit)
    const data = useSelector((state) => state.cryptoData)
    const isLoading = useSelector((state) => state.isLoading)
    const isError = useSelector((state) => state.isError)


    useEffect(() => {
        dispatch(fetchAsyncCryptoData())
    }, [dispatch]);


    const handleCoinItem = (coin) => {
        return history.push(`/${coin}`)
    }


    return(
            <>
                <div className="app-header" >
                    <LoupSvg/>
                    <BellSvg/>
                </div>

                <p className='second-color'>Your total balance</p>

                {isLoading ? <LoaderSvg/> :
                    <div>
                        <h1><sup style={{fontSize: 15}}>$</sup>{walletSummary}</h1>
                        <p className='second-color'>24h Changes</p>
                        <p className='green-portfolio'>${walletProfit}<span>&#8593;</span></p>

                        <section className='coins-wrapper'>
                            {isError ? <p style={{color: "red"}}>Ошибка в получении данных</p> :
                                data.map((coin, index) => {

                                        const coinName = coin[0]
                                        const coinCurrentTick = coin[1]['USD']
                                        const coinBalance = coin.balance
                                        const estimateValue = coin.calcValue
                                        const generatedProfit = coin.calcProfit

                                        return (
                                                <div key={index} className='coin-item' onClick={() => handleCoinItem(coinName)} >
                                                    <div className='coin-item-row'>
                                                        <div style={{display: "flex", alignItems: "center"}}>
                                                            <div style={{fontSize: 32}} className={`icon icon-${coinName.toLowerCase()}`}/>
                                                            <div style={{display: "flex", flexDirection: 'column', textAlign: 'left', marginLeft: 5}}>
                                                                <span>{coinName}</span>
                                                                <span style={{fontSize: 12}} className='second-color'>{SymbolToFullName[`${coinName}`]}</span>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <p style={{textAlign: "right"}}>{coinBalance} <br/>${estimateValue}</p>
                                                        </div>
                                                    </div>

                                                    <div className='coin-item-row'>
                                                        <div style={{display: "flex", flexDirection: 'column', textAlign: 'left'}}>
                                                            <span>${coinCurrentTick}</span>
                                                            <span className="second-color">price</span>
                                                        </div>

                                                        <div style={{display: "flex", flexDirection: 'column', textAlign: 'right'}}>
                                                            <span className='green'>{generatedProfit}</span>
                                                            <span className="second-color">profit/loss</span>
                                                        </div>
                                                    </div>
                                                </div>

                                        )
                                    }
                                )
                            }

                        </section>
                    </div>
                    }
            </>
    )
}

export default MainView;
