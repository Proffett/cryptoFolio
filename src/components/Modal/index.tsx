import React, { useEffect, useState } from 'react';
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
import { useFavorites, useBalances } from '@/hooks/useUIState';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: ModalProps) {
  const { favorites, setFavorites } = useFavorites();
  const { balances, setBalances } = useBalances();
  const [localFavorites, setLocalFavorites] = useState<string[]>(favorites);
  const [localBalances, setLocalBalances] = useState<{ [key: string]: number }>({
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
    ...balances,
  });

  useEffect(() => {
    setLocalFavorites(favorites);
    setLocalBalances({ ...localBalances, ...balances });
  }, [favorites, balances]);

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>, coin: string): void => {
    if (event.target.checked) {
      setLocalFavorites((state) => [...state, coin]);
    } else {
      setLocalFavorites((state) => state.filter((item) => item !== coin));
    }
  };

  const handleCoinInput = (coin: string, event: React.ChangeEvent<HTMLInputElement>): void => {
    setLocalBalances((prevState) => ({ ...prevState, [coin]: +event.target.value }));
  };

  const handleSave = () => {
    setFavorites(localFavorites);
    setBalances(localBalances);
    onClose();
    window.location.reload();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
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
                    checked={localFavorites.includes(coin)}
                    onChange={(event) => handleCheckBox(event, coin)}
                  />
                }
                label={coin}
                sx={{ color: '#fff', minWidth: '120px' }}
              />
              <TextField
                type="number"
                value={localBalances[coin] || 0}
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
          onClick={handleSave}
          sx={{ color: '#fff', borderColor: '#fff' }}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ color: '#fff', borderColor: '#fff' }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
