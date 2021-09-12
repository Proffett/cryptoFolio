import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import { BaseModal, ModalCloseTarget } from 'react-spring-modal';

import { basicCoins } from '../../mock/initialData';
import { fetchAsyncCryptoData, setCoins, setModal } from '../../store/reducer';

// import { cnModal } from './cn-Modal';
// import './index.scss';

const staticStyles = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: 0,
  left: 0,
  alignItems: 'center',
  fontSize: '25px',
  zIndex: '999',
  height: '100%',
  width: '100%',
  textAlign: 'center',
  background: '#0000009e',
  transition: 'all 5s ease-out',
};

export const Modal = () => {
  const dispatch = useDispatch();
  const [favoriteCoins, setFavoriteCoins] = useState([]);
  const isOpen = useSelector((state) => state.modal);
  const selectCoins = useSelector((state) => state.coins);

  const [basicBalance, setBasicBalance] = useState({
    BTC: 0,
    ETH: 0,
    XRP: 0,
    ADA: 0,
    BSC: 0,
    LTC: 0,
    THETA: 0,
    XLM: 0,
    TRX: 0,
    DOGE: 0,
    XMR: 0,
    SOL: 0,
  });

  // const [activeStyle, setActiveStyle] = useState(false);
  // const style = { webkitTransform: 'translateX(0%)', transform: 'translateX(0%)' };

  let getClientFavoritesCoins = null;
  // let getClientBalance = null;

  if (localStorage.favorites) {
    getClientFavoritesCoins = JSON.parse(localStorage.favorites);
    // getClientBalance = JSON.parse(localStorage.balance);
  }

  useEffect(() => {
    if (localStorage.favorites) {
      setFavoriteCoins([...JSON.parse(localStorage.favorites)]);

      setBasicBalance({ ...JSON.parse(localStorage.balance) });
    }
    // set initial coins
    else setFavoriteCoins([...selectCoins]);
  }, [selectCoins]);

  const handleCheckBox = (event, coin) => {
    if (event.target.checked) {
      setFavoriteCoins((state) => [...state, ...basicCoins.filter((item) => item === coin)]);
    } else setFavoriteCoins((state) => [...state.filter((item) => item !== coin)]);
    console.log(favoriteCoins);
  };

  const handleCoinInput = (coin, event) => {
    setBasicBalance((prevState) => ({ ...prevState, [coin]: +event.target.value }));
  };

  return (
    <BaseModal
      contentTransition={{
        from: { transform: 'translateX(-100%)' },
        enter: { transform: 'translateX(0)' },
        leave: { transform: 'translateX(-100%)' },
      }}
      contentProps={{ style: staticStyles }}
      isOpen={isOpen}
      onDismiss={() => setModal()}
    >
      <h6>Choose coin(s)</h6>
      <FormGroup>
        {getClientFavoritesCoins
          ? basicCoins.map((coin) => (
              <div key={coin}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ color: '#fff' }}
                      checked={favoriteCoins.includes(coin)}
                      onChange={(event) => handleCheckBox(event, coin)}
                    />
                  }
                  label={coin}
                />
                <input
                  value={basicBalance[coin]}
                  onChange={(event) => handleCoinInput(coin, event)}
                />
              </div>
            ))
          : basicCoins.map((coin) => (
              <div key={coin}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ color: '#fff' }}
                      checked={favoriteCoins.includes(coin)}
                      onChange={(event) => handleCheckBox(event, coin)}
                    />
                  }
                  label={coin}
                />
                <input
                  value={basicBalance[coin]}
                  onChange={(event) => handleCoinInput(coin, event)}
                />
              </div>
            ))}
        <ModalCloseTarget>
          <ButtonGroup>
            <Button
              variant="outlined"
              type="primary"
              className="button_modal"
              onClick={() => {
                dispatch(setCoins(favoriteCoins));
                dispatch(fetchAsyncCryptoData(favoriteCoins));
                localStorage.setItem('favorites', JSON.stringify(Object.values(favoriteCoins)));
                localStorage.setItem('balance', JSON.stringify(basicBalance));
                dispatch(setModal());
              }}
            >
              change
            </Button>

            <Button
              variant="outlined"
              type="primary"
              className="button_modal"
              onClick={() => {
                dispatch(setModal());
              }}
            >
              cancel
            </Button>
          </ButtonGroup>
        </ModalCloseTarget>
      </FormGroup>
    </BaseModal>
  );
};
