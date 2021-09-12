// initial balance
const Balance = [0.8, 4, 41, 101, 4, 2, 2, 1, 4, 8, 4, 2];

const basicCoins = [
  'BTC',
  'ETH',
  'XRP',
  'ADA',
  'BSC',
  'LTC',
  'THETA',
  'XLM',
  'TRX',
  'DOGE',
  'XMR',
  'SOL',
];

const SymbolToFullName = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  XRP: 'Ripple',
  ADA: 'Cardano',
  BNB: 'Binance Coin',
  USDT: 'Tether',
  SOL: 'Solana',
  DOGE: 'Dogecoin',
  DOT: 'Polkadot',
  USDC: 'USD Coin',
  TRX: 'TRON',
  THETA: 'THETA',
  LTC: 'Litecoin',
  XLM: 'Stellar',
  BSC: 'Binance coin',
};

export { SymbolToFullName, Balance, basicCoins };
