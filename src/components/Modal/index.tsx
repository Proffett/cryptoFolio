import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useQueryClient } from '@tanstack/react-query';
import {
  basicCoins,
  coinCatalog,
  DEFAULT_BALANCES,
  DEFAULT_FAVORITE_COINS,
} from '@/mock/initialData.ts';
import { useBalances, useFavorites } from '@/hooks/useUIState';
import { portfolioService } from '@/services/portfolioService';
import './index.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function createBalanceDraft(sourceBalances: Record<string, number>): Record<string, string> {
  return basicCoins.reduce((draft, coin) => {
    const currentValue = sourceBalances[coin];
    draft[coin] = currentValue ? String(currentValue) : '';
    return draft;
  }, {} as Record<string, string>);
}

function createPersistedBalances(sourceBalances: Record<string, string>): Record<string, number> {
  return basicCoins.reduce((draft, coin) => {
    const parsedValue = Number.parseFloat(sourceBalances[coin] || '0');
    draft[coin] = Number.isFinite(parsedValue) ? parsedValue : 0;
    return draft;
  }, { ...DEFAULT_BALANCES });
}

function formatAmount(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: value >= 100 ? 2 : 4,
  });
}

const textFieldSx = {
  '& .MuiInputBase-root': {
    borderRadius: '16px',
    color: '#f5f7ff',
    background: 'rgba(10, 16, 33, 0.5)',
  },
  '& .MuiInputBase-input': {
    color: '#f5f7ff',
    WebkitTextFillColor: '#f5f7ff',
    opacity: 1,
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(214, 221, 255, 0.58)',
    opacity: 1,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(147, 163, 208, 0.22)',
  },
  '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(147, 163, 208, 0.4)',
  },
  '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(121, 205, 255, 0.75)',
    boxShadow: '0 0 0 3px rgba(121, 205, 255, 0.12)',
  },
  '& .MuiInputBase-root.Mui-disabled': {
    color: 'rgba(241, 245, 255, 0.74)',
    background: 'rgba(10, 16, 33, 0.42)',
  },
  '& .MuiInputBase-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(127, 215, 255, 0.18)',
  },
  '& .MuiInputBase-input.Mui-disabled': {
    color: 'rgba(241, 245, 255, 0.74)',
    WebkitTextFillColor: 'rgba(241, 245, 255, 0.74)',
    opacity: 1,
  },
  '& .MuiInputBase-input.Mui-disabled::placeholder': {
    color: 'rgba(214, 221, 255, 0.68)',
    opacity: 1,
  },
  '& .MuiInputAdornment-root, & .MuiInputAdornment-root p, & .MuiInputLabel-root, & .MuiFormHelperText-root': {
    color: 'rgba(214, 221, 255, 0.78)',
  },
  '& .MuiInputAdornment-root': {
    fontWeight: 700,
    color: '#f8fbff',
  },
  '& .MuiInputAdornment-root.Mui-disabled, & .MuiInputAdornment-root.Mui-disabled p': {
    color: 'rgba(241, 245, 255, 0.74)',
    opacity: 1,
  },
  '& .MuiInputLabel-root.Mui-disabled': {
    color: 'rgba(214, 221, 255, 0.76)',
    opacity: 1,
  },
  '& .MuiFormHelperText-root.Mui-disabled': {
    color: 'rgba(214, 221, 255, 0.7)',
    opacity: 1,
  },
};

export function Modal({ isOpen, onClose }: ModalProps) {
  const queryClient = useQueryClient();
  const { favorites, setFavorites } = useFavorites();
  const { balances, setBalances } = useBalances();
  const [search, setSearch] = useState('');
  const [localFavorites, setLocalFavorites] = useState<string[]>(favorites);
  const [localBalances, setLocalBalances] = useState<Record<string, string>>(
    createBalanceDraft(balances),
  );
  const isRealMode = portfolioService.isRealMode();

  const handleOpen = () => {
    setSearch('');
    setLocalFavorites(favorites);
    setLocalBalances(createBalanceDraft(balances));
  };

  const handleToggleCoin = (coin: string): void => {
    setLocalFavorites((previousFavorites) =>
      previousFavorites.includes(coin)
        ? previousFavorites.filter((favorite) => favorite !== coin)
        : [...previousFavorites, coin],
    );
  };

  const handleCoinInput = (coin: string, value: string): void => {
    const normalizedValue = value.replace(',', '.');

    if (!/^\d*(\.\d*)?$/.test(normalizedValue)) {
      return;
    }

    setLocalBalances((previousBalances) => ({
      ...previousBalances,
      [coin]: normalizedValue,
    }));
  };

  const handleSave = () => {
    setFavorites(localFavorites);
    setBalances(createPersistedBalances(localBalances));
    queryClient.invalidateQueries({ queryKey: ['balances'] });
    onClose();
  };

  const handleSelectAll = () => {
    setLocalFavorites(basicCoins);
  };

  const handleClearSelection = () => {
    setLocalFavorites([]);
  };

  const handleResetToDefaults = () => {
    setSearch('');
    setLocalFavorites(DEFAULT_FAVORITE_COINS);
    setLocalBalances(createBalanceDraft(DEFAULT_BALANCES));
  };

  const selectedWithBalance = localFavorites.filter(
    (coin) => Number.parseFloat(localBalances[coin] || '0') > 0,
  ).length;
  const totalEnteredAmount = localFavorites.reduce(
    (sum, coin) => sum + (Number.parseFloat(localBalances[coin] || '0') || 0),
    0,
  );
  const tertiaryStatValue = isRealMode ? 'Live' : formatAmount(totalEnteredAmount);
  const tertiaryStatLabel = isRealMode ? 'balances from wallet' : 'total units entered';
  const loweredQuery = search.trim().toLowerCase();
  const filteredCoins = coinCatalog
    .filter((coin) => {
      if (!loweredQuery) {
        return true;
      }

      return [coin.symbol, coin.name, coin.tagline].some((field) =>
        field.toLowerCase().includes(loweredQuery),
      );
    })
    .sort((leftCoin, rightCoin) => leftCoin.name.localeCompare(rightCoin.name));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        transition: {
          onEnter: handleOpen,
        },
      }}
      PaperProps={{
        className: 'Modal__paper',
        sx: {
          color: '#f5f7ff',
          border: '1px solid rgba(124, 143, 186, 0.18)',
          borderRadius: '28px',
          background:
            'radial-gradient(circle at top right, rgba(56, 189, 248, 0.16), transparent 36%), radial-gradient(circle at top left, rgba(59, 130, 246, 0.2), transparent 32%), linear-gradient(180deg, rgba(17, 23, 39, 0.98) 0%, rgba(8, 13, 27, 0.98) 100%)',
          boxShadow: '0 32px 80px rgba(5, 10, 24, 0.7)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <div className="Modal__hero">
          <div>
            <Typography className="Modal__eyebrow">Portfolio setup</Typography>
            <Typography className="Modal__subtitle">
              {isRealMode
                ? 'In real mode balances come from the connected wallet. Choose which assets stay visible.'
                : 'Choose assets, enter virtual balances, and apply changes instantly without reloading the page.'}
            </Typography>
          </div>

          <Chip
            label={isRealMode ? 'Real mode' : 'Virtual mode'}
            className="Modal__mode-chip"
          />
        </div>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, sm: 3 }, pb: 0 }}>
        <div className="Modal__body">
          <div className="Modal__toolbar">
            <TextField
              fullWidth
              placeholder="Search by symbol, coin name, or purpose"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              size="small"
              sx={textFieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <div className="Modal__toolbar-actions">
              <Button variant="text" onClick={handleSelectAll}>
                Select all
              </Button>
              <Button variant="text" onClick={handleClearSelection}>
                Clear
              </Button>
            </div>
          </div>

          <div className="Modal__stats">
            <div className="Modal__stat-card">
              <span className="Modal__stat-value">{localFavorites.length}</span>
              <span className="Modal__stat-label">assets selected</span>
            </div>

            <div className="Modal__stat-card">
              <span className="Modal__stat-value">{selectedWithBalance}</span>
              <span className="Modal__stat-label">with saved amount</span>
            </div>

            <div className="Modal__stat-card">
              <span className="Modal__stat-value">{tertiaryStatValue}</span>
              <span className="Modal__stat-label">{tertiaryStatLabel}</span>
            </div>
          </div>

          {localFavorites.length > 0 && (
            <div className="Modal__selected-strip">
              {localFavorites.map((coin) => {
                const chipLabel = localBalances[coin]
                  ? `${coin} · ${localBalances[coin]}`
                  : coin;

                return (
                  <Chip
                    key={coin}
                    label={chipLabel}
                    onDelete={() => handleToggleCoin(coin)}
                    className="Modal__selected-chip"
                  />
                );
              })}
            </div>
          )}

          <div className="Modal__grid">
            {filteredCoins.length === 0 ? (
              <div className="Modal__empty-state">
                <Typography variant="h6">Nothing matches this search</Typography>
                <Typography className="Modal__empty-copy">
                  Try a ticker like BTC, a name like Solana, or a phrase like privacy.
                </Typography>
              </div>
            ) : (
              filteredCoins.map((coin) => {
                const isSelected = localFavorites.includes(coin.symbol);
                const assetCardClassName = isSelected
                  ? 'Modal__asset-card Modal__asset-card_selected'
                  : 'Modal__asset-card';

                return (
                  <div key={coin.symbol} className={assetCardClassName}>
                    <div className="Modal__asset-header">
                      <div className="Modal__asset-brand">
                        <div
                          className="Modal__asset-icon-shell"
                          style={{ '--coin-accent': coin.accent } as React.CSSProperties}
                        >
                          <div className={`icon icon-${coin.symbol.toLowerCase()} Modal__asset-icon`} />
                        </div>

                        <div className="Modal__asset-copy">
                          <span className="Modal__asset-symbol">{coin.symbol}</span>
                          <span className="Modal__asset-name">{coin.name}</span>
                          <span className="Modal__asset-tagline">{coin.tagline}</span>
                        </div>
                      </div>

                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleToggleCoin(coin.symbol)}
                        sx={{
                          color: 'rgba(214, 221, 255, 0.72)',
                          '&.Mui-checked': {
                            color: '#7fd7ff',
                          },
                        }}
                      />
                    </div>

                    {isRealMode ? (
                      <div className="Modal__asset-status">
                        <span className="Modal__asset-status-pill">Wallet-driven balance</span>
                        <span className="Modal__asset-status-copy">
                          In real mode this card only controls visibility. Balance comes from the
                          connected wallet.
                        </span>
                      </div>
                    ) : (
                      <TextField
                        type="text"
                        label="Amount"
                        value={localBalances[coin.symbol]}
                        onChange={(event) => handleCoinInput(coin.symbol, event.target.value)}
                        placeholder={isSelected ? '0.00' : 'Select asset first'}
                        disabled={!isSelected}
                        size="small"
                        fullWidth
                        sx={textFieldSx}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {coin.symbol}
                            </InputAdornment>
                          ),
                        }}
                        helperText={
                          isSelected
                            ? 'This amount will be used in virtual portfolio mode.'
                            : 'Select the asset to enable amount editing.'
                        }
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ px: { xs: 2, sm: 3 }, py: 3, gap: 1.5, flexWrap: 'wrap' }}>
        <Button
          variant="text"
          startIcon={<RefreshRoundedIcon />}
          onClick={handleResetToDefaults}
          sx={{
            color: 'rgba(214, 221, 255, 0.82)',
            textTransform: 'none',
          }}
        >
          Reset defaults
        </Button>

        <Button
          variant="text"
          onClick={onClose}
          sx={{
            color: 'rgba(241, 245, 255, 0.92)',
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={<DoneRoundedIcon />}
          onClick={handleSave}
          sx={{
            borderRadius: '999px',
            px: 2.75,
            py: 1.1,
            textTransform: 'none',
            background: 'linear-gradient(135deg, #2a7bff 0%, #58d5ff 100%)',
            boxShadow: '0 16px 40px rgba(42, 123, 255, 0.32)',
          }}
        >
          Apply changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
