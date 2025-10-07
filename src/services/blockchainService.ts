import { ethers } from 'ethers';

const ERC20_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
];

const TOKEN_ADDRESSES: Record<string, string> = {
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
};

class BlockchainService {
  async getETHBalance(
    provider: ethers.BrowserProvider,
    address: string
  ): Promise<number> {
    try {
      const balance = await provider.getBalance(address);
      return parseFloat(ethers.formatEther(balance));
    } catch (error) {
      console.error('Failed to get ETH balance:', error);
      return 0;
    }
  }

  async getERC20Balance(
    provider: ethers.BrowserProvider,
    tokenSymbol: string,
    walletAddress: string
  ): Promise<number> {
    try {
      const tokenAddress = TOKEN_ADDRESSES[tokenSymbol];
      if (!tokenAddress) {
        return 0;
      }

      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const [balance, decimals] = await Promise.all([
        contract.balanceOf(walletAddress),
        contract.decimals(),
      ]);

      return parseFloat(ethers.formatUnits(balance, decimals));
    } catch (error) {
      console.error(`Failed to get ${tokenSymbol} balance:`, error);
      return 0;
    }
  }

  async getMultipleBalances(
    provider: ethers.BrowserProvider,
    walletAddress: string,
    coinSymbols: string[]
  ): Promise<Record<string, number>> {
    const balances: Record<string, number> = {};

    for (const symbol of coinSymbols) {
      if (symbol === 'ETH') {
        balances[symbol] = await this.getETHBalance(provider, walletAddress);
      } else if (TOKEN_ADDRESSES[symbol]) {
        balances[symbol] = await this.getERC20Balance(provider, symbol, walletAddress);
      } else {
        balances[symbol] = 0;
      }
    }

    return balances;
  }

  isTokenSupported(symbol: string): boolean {
    return symbol === 'ETH' || !!TOKEN_ADDRESSES[symbol];
  }
}

export const blockchainService = new BlockchainService();
