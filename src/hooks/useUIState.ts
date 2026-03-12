import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react';
import { basicCoins, DEFAULT_BALANCES, DEFAULT_FAVORITE_COINS } from '@/mock/initialData.ts';
import { portfolioService } from '@/services/portfolioService';

type BalancesMap = Record<string, number>;

interface UIStateContextValue {
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
  addFavorite: (coin: string) => void;
  removeFavorite: (coin: string) => void;
  toggleFavorite: (coin: string) => void;
  balances: BalancesMap;
  updateBalance: (coin: string, amount: number) => void;
  setBalances: Dispatch<SetStateAction<BalancesMap>>;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  selectedCoin: string;
  setSelectedCoin: Dispatch<SetStateAction<string>>;
}

const FAVORITES_STORAGE_KEY = 'favorites';
const UIStateContext = createContext<UIStateContextValue | null>(null);

function resolveNextState<T>(value: SetStateAction<T>, previous: T): T {
  if (typeof value === 'function') {
    return (value as (previousState: T) => T)(previous);
  }

  return value;
}

function normalizeFavorites(favorites: string[]): string[] {
  return Array.from(new Set(favorites.filter((coin) => basicCoins.includes(coin))));
}

function normalizeBalances(balances: Record<string, number>): BalancesMap {
  return basicCoins.reduce((accumulator, coin) => {
    const balance = Number(balances[coin] ?? 0);
    accumulator[coin] = Number.isFinite(balance) ? balance : 0;
    return accumulator;
  }, { ...DEFAULT_BALANCES });
}

function readFavorites(): string[] {
  const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!savedFavorites) {
    return DEFAULT_FAVORITE_COINS;
  }

  try {
    const parsedFavorites = JSON.parse(savedFavorites);
    return Array.isArray(parsedFavorites)
      ? normalizeFavorites(parsedFavorites)
      : DEFAULT_FAVORITE_COINS;
  } catch (error) {
    console.warn('Failed to parse saved favorites:', error);
    return DEFAULT_FAVORITE_COINS;
  }
}

function readBalances(): BalancesMap {
  return normalizeBalances(portfolioService.getVirtualBalances());
}

export function UIStateProvider({ children }: PropsWithChildren) {
  const [favoritesState, setFavoritesState] = useState<string[]>(readFavorites);
  const [balancesState, setBalancesState] = useState<BalancesMap>(readBalances);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(DEFAULT_FAVORITE_COINS[0]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesState));
  }, [favoritesState]);

  useEffect(() => {
    portfolioService.setVirtualBalances(balancesState);
  }, [balancesState]);

  const setFavorites: Dispatch<SetStateAction<string[]>> = (value) => {
    setFavoritesState((previousFavorites) =>
      normalizeFavorites(resolveNextState(value, previousFavorites)),
    );
  };

  const setBalances: Dispatch<SetStateAction<BalancesMap>> = (value) => {
    setBalancesState((previousBalances) =>
      normalizeBalances(resolveNextState(value, previousBalances)),
    );
  };

  const addFavorite = (coin: string) => {
    setFavorites((previousFavorites) => [...previousFavorites, coin]);
  };

  const removeFavorite = (coin: string) => {
    setFavorites((previousFavorites) => previousFavorites.filter((favorite) => favorite !== coin));
  };

  const toggleFavorite = (coin: string) => {
    setFavorites((previousFavorites) =>
      previousFavorites.includes(coin)
        ? previousFavorites.filter((favorite) => favorite !== coin)
        : [...previousFavorites, coin],
    );
  };

  const updateBalance = (coin: string, amount: number) => {
    setBalances((previousBalances) => ({ ...previousBalances, [coin]: amount }));
  };

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((previousState) => !previousState);

  return createElement(
    UIStateContext.Provider,
    {
      value: {
        favorites: favoritesState,
        setFavorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        balances: balancesState,
        updateBalance,
        setBalances,
        isOpen,
        open,
        close,
        toggle,
        selectedCoin,
        setSelectedCoin,
      },
    },
    children,
  );
}

function useUIStateContext(): UIStateContextValue {
  const context = useContext(UIStateContext);

  if (!context) {
    throw new Error('useUIState must be used within UIStateProvider');
  }

  return context;
}

export function useFavorites() {
  const { favorites, setFavorites, addFavorite, removeFavorite, toggleFavorite } = useUIStateContext();

  return {
    favorites,
    setFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}

export function useBalances() {
  const { balances, updateBalance, setBalances } = useUIStateContext();

  return {
    balances,
    updateBalance,
    setBalances,
  };
}

export function useModal() {
  const { isOpen, open, close, toggle } = useUIStateContext();

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

export function useSelectedCoin() {
  const { selectedCoin, setSelectedCoin } = useUIStateContext();

  return {
    selectedCoin,
    setSelectedCoin,
  };
}
