export type PortfolioMode = 'virtual' | 'real';

const PORTFOLIO_MODE_KEY = 'portfolioMode';
const VIRTUAL_BALANCES_KEY = 'balance';

class PortfolioService {
  getMode(): PortfolioMode {
    const saved = localStorage.getItem(PORTFOLIO_MODE_KEY);
    return (saved === 'real' ? 'real' : 'virtual') as PortfolioMode;
  }

  setMode(mode: PortfolioMode): void {
    localStorage.setItem(PORTFOLIO_MODE_KEY, mode);
  }

  getVirtualBalances(): Record<string, number> {
    const saved = localStorage.getItem(VIRTUAL_BALANCES_KEY);
    return saved ? JSON.parse(saved) : {};
  }

  setVirtualBalances(balances: Record<string, number>): void {
    localStorage.setItem(VIRTUAL_BALANCES_KEY, JSON.stringify(balances));
  }

  isRealMode(): boolean {
    return this.getMode() === 'real';
  }

  isVirtualMode(): boolean {
    return this.getMode() === 'virtual';
  }
}

export const portfolioService = new PortfolioService();
