import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { priceService } from '../services/priceService';
import { blockchainService } from '../services/blockchainService';
import { portfolioService } from '../services/portfolioService';
import { CoinData } from '../types';

export function useCryptoPrices(coinSymbols: string[]) {
  return useQuery({
    queryKey: ['prices', coinSymbols],
    queryFn: () => priceService.getMultiplePrices(coinSymbols),
    staleTime: 45000,
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
  });
}

export function useWalletBalances(
  coinSymbols: string[],
  walletAddress: string | null,
  isRealMode: boolean
) {
  return useQuery({
    queryKey: ['balances', walletAddress, coinSymbols, isRealMode],
    queryFn: async () => {
      if (!isRealMode) {
        return portfolioService.getVirtualBalances();
      }

      const walletDisconnected = localStorage.getItem('walletManuallyDisconnected') === 'true';
      
      if (walletDisconnected || !walletAddress || !window.ethereum) {
        return {};
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        return await blockchainService.getMultipleBalances(
          provider,
          walletAddress,
          coinSymbols
        );
      } catch (error) {
        console.warn('Failed to fetch blockchain balances:', error);
        return {};
      }
    },
    enabled: coinSymbols.length > 0,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchInterval: isRealMode ? 30000 : false,
  });
}

export function useCryptoPortfolio(coinSymbols: string[], walletAddress: string | null) {
  const isRealMode = portfolioService.isRealMode();
  
  const { data: prices, isLoading: pricesLoading } = useCryptoPrices(coinSymbols);
  const { data: balances, isLoading: balancesLoading } = useWalletBalances(
    coinSymbols,
    walletAddress,
    isRealMode
  );

  const isLoading = pricesLoading || balancesLoading;

  const portfolioData = coinSymbols
    .map((symbol): CoinData => {
      const price = prices?.[symbol] || 0;
      const balance = balances?.[symbol] || 0;
      const calcValue = price * balance;
      const calcProfit = calcValue * 0.1;

      return {
        0: symbol,
        1: { USD: price },
        balance,
        calcValue: Number(calcValue.toFixed(2)),
        calcProfit: Number(calcProfit.toFixed(2)),
      };
    })
    .filter((coin) => {
      if (isRealMode && walletAddress && balances) {
        return coin.balance > 0;
      }
      return true;
    });

  const summary = portfolioData.reduce((total, coin) => total + coin.calcValue, 0);
  const profit = portfolioData.reduce((total, coin) => total + coin.calcProfit, 0);

  return {
    data: portfolioData,
    summary,
    profit,
    isLoading,
    isRealMode,
  };
}

export function useChartData(coin: string, history: 'minute' | 'hour' | 'day') {
  return useQuery({
    queryKey: ['chart', coin, history],
    queryFn: async () => {
      try {
        return await priceService.getHistoricalPrices(coin, history);
      } catch (error) {
        console.warn('Failed to fetch real chart data, using fallback:', error);
        const times: number[] = [];
        const values: number[] = [];
        const basePrice = Math.random() * 1000 + 100;
        const limit = history === 'minute' ? 60 : history === 'hour' ? 24 : 7;

        for (let i = 0; i < limit; i++) {
          const timestamp = Date.now() - (limit - i) * (history === 'minute' ? 60000 : history === 'hour' ? 3600000 : 86400000);
          times.push(timestamp);
          values.push(basePrice + Math.random() * 100 - 50);
        }

        return { times, values };
      }
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });
}
