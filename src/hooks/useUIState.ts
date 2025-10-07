import { useState, useEffect } from 'react';

export function useFavorites(defaultCoins: string[] = ['BTC', 'ETH', 'XRP', 'ADA']) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : defaultCoins;
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (coin: string) => {
    if (!favorites.includes(coin)) {
      setFavorites([...favorites, coin]);
    }
  };

  const removeFavorite = (coin: string) => {
    setFavorites(favorites.filter(c => c !== coin));
  };

  const toggleFavorite = (coin: string) => {
    if (favorites.includes(coin)) {
      removeFavorite(coin);
    } else {
      addFavorite(coin);
    }
  };

  return {
    favorites,
    setFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

export function useSelectedCoin(defaultCoin: string = 'BTC') {
  const [selectedCoin, setSelectedCoin] = useState(defaultCoin);

  return {
    selectedCoin,
    setSelectedCoin,
  };
}

export function useBalances() {
  const [balances, setBalances] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('balance');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balances));
  }, [balances]);

  const updateBalance = (coin: string, amount: number) => {
    setBalances(prev => ({ ...prev, [coin]: amount }));
  };

  return {
    balances,
    updateBalance,
    setBalances,
  };
}
