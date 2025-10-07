interface CoinPrice {
  usd: number;
  usd_24h_change?: number;
}

interface CoinGeckoResponse {
  [coinId: string]: CoinPrice;
}

const COINGECKO_COIN_IDS: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  XRP: 'ripple',
  ADA: 'cardano',
  BSC: 'binancecoin',
  LTC: 'litecoin',
  THETA: 'theta-token',
  XLM: 'stellar',
  TRX: 'tron',
  DOGE: 'dogecoin',
  XMR: 'monero',
  SOL: 'solana',
};

class PriceService {
  private apiKey: string;
  private baseUrl = 'https://api.coingecko.com/api/v3';

  constructor() {
    this.apiKey = window.__COINGECKO_API_KEY__ || '';
  }

  async getMultiplePrices(coinSymbols: string[]): Promise<Record<string, number>> {
    try {
      const coinIds = coinSymbols
        .map((symbol) => COINGECKO_COIN_IDS[symbol])
        .filter(Boolean)
        .join(',');

      if (!coinIds) {
        throw new Error('No valid coin symbols provided');
      }

      const url = `${this.baseUrl}/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`;
      
      const headers: HeadersInit = {};
      if (this.apiKey) {
        headers['x-cg-demo-api-key'] = this.apiKey;
      }

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const data: CoinGeckoResponse = await response.json();

      const prices: Record<string, number> = {};
      coinSymbols.forEach((symbol) => {
        const coinId = COINGECKO_COIN_IDS[symbol];
        if (coinId && data[coinId]) {
          prices[symbol] = data[coinId].usd;
        }
      });

      return prices;
    } catch (error) {
      console.error('Failed to fetch prices from CoinGecko:', error);
      throw error;
    }
  }

  getCoinGeckoId(symbol: string): string | undefined {
    return COINGECKO_COIN_IDS[symbol];
  }
}

export const priceService = new PriceService();
