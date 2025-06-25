import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Button,
  Checkbox, 
  FormControlLabel, 
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box
} from '@mui/material';

import { basicCoins } from '@/mock/initialData.ts';
import { fetchAsyncCryptoData, setCoins, setModal } from '@/store/reducer.ts';
import { AppState } from '@/types';

export function Modal() {
  const dispatch = useDispatch();
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>([]);
  const isOpen = useSelector((state: AppState) => state.modal);
  const selectCoins = useSelector((state: AppState) => state.coins);

  const [basicBalance, setBasicBalance] = useState<{ [key: string]: number }>({
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

  useEffect(() => {
    if (localStorage.favorites) {
      setFavoriteCoins([...JSON.parse(localStorage.favorites)]);
      setBasicBalance({ ...JSON.parse(localStorage.balance || '{}') });
    } else {
      setFavoriteCoins([...selectCoins]);
    }
  }, [selectCoins]);

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>, coin: string): void => {
    if (event.target.checked) {
      setFavoriteCoins((state) => [...state, ...basicCoins.filter((item) => item === coin)]);
    } else {
      setFavoriteCoins((state) => [...state.filter((item) => item !== coin)]);
    }
    console.log(favoriteCoins);
  };

  const handleCoinInput = (coin: string, event: React.ChangeEvent<HTMLInputElement>): void => {
    setBasicBalance((prevState) => ({ ...prevState, [coin]: +event.target.value }));
  };

  return (
    <Dialog
      open={isOpen || false}
      onClose={() => dispatch(setModal())}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#1d1e25',
          color: '#fff',
        },
      }}
    >
      <DialogTitle sx={{ color: '#fff' }}>Choose Coins</DialogTitle>
      <DialogContent>
        <FormGroup>
          {basicCoins.map((coin) => (
            <Box key={coin} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ color: '#fff' }}
                    checked={favoriteCoins.includes(coin)}
                    onChange={(event) => handleCheckBox(event, coin)}
                  />
                }
                label={coin}
                sx={{ color: '#fff', minWidth: '120px' }}
              />
              <TextField
                type="number"
                value={basicBalance[coin]}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCoinInput(coin, event)}
                size="small"
                sx={{
                  ml: 2,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: '#fff',
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff',
                    },
                  },
                }}
              />
            </Box>
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            // First save to localStorage
            localStorage.setItem('favorites', JSON.stringify(favoriteCoins));
            localStorage.setItem('balance', JSON.stringify(basicBalance));
            
            // Update coins in state
            dispatch(setCoins(favoriteCoins));
            
            // Fetch fresh data with new coins and balances
            dispatch(fetchAsyncCryptoData(favoriteCoins));
            
            // Close modal
            dispatch(setModal());
          }}
          sx={{ color: '#fff', borderColor: '#fff' }}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch(setModal())}
          sx={{ color: '#fff', borderColor: '#fff' }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
