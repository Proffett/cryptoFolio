import { BasicCoinsType, CoinDefinition, SymbolToFullNameType } from '../types';

export const coinCatalog: CoinDefinition[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    tagline: 'Digital gold',
    accent: '#f7931a',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    tagline: 'Smart contract leader',
    accent: '#8a92b2',
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    tagline: 'Payments rail',
    accent: '#00a3ff',
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    tagline: 'Research-first chain',
    accent: '#2a7fff',
  },
  {
    symbol: 'BSC',
    name: 'Binance Coin',
    tagline: 'Exchange ecosystem',
    accent: '#f3ba2f',
  },
  {
    symbol: 'LTC',
    name: 'Litecoin',
    tagline: 'Fast peer-to-peer',
    accent: '#b8b8b8',
  },
  {
    symbol: 'THETA',
    name: 'Theta',
    tagline: 'Media delivery network',
    accent: '#2ab8e6',
  },
  {
    symbol: 'XLM',
    name: 'Stellar',
    tagline: 'Cross-border transfers',
    accent: '#14b3ff',
  },
  {
    symbol: 'TRX',
    name: 'TRON',
    tagline: 'High-throughput chain',
    accent: '#ef0027',
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    tagline: 'Community memecoin',
    accent: '#c2a633',
  },
  {
    symbol: 'XMR',
    name: 'Monero',
    tagline: 'Privacy-focused currency',
    accent: '#ff6b00',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    tagline: 'Fast app execution',
    accent: '#00f0b5',
  },
];

export const SymbolToFullName: SymbolToFullNameType = coinCatalog.reduce((accumulator, coin) => {
  accumulator[coin.symbol] = coin.name;
  return accumulator;
}, {} as SymbolToFullNameType);

export const basicCoins: BasicCoinsType = coinCatalog.map((coin) => coin.symbol);

export const DEFAULT_FAVORITE_COINS: string[] = ['BTC', 'ETH', 'XRP', 'ADA'];

export const DEFAULT_BALANCES: Record<string, number> = coinCatalog.reduce((accumulator, coin) => {
  accumulator[coin.symbol] = 0;
  return accumulator;
}, {} as Record<string, number>);
