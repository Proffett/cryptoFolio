import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import {portfolioService} from "@/services/portfolioService.ts";

interface WalletState {
  account: string | null;
  chainId: string | null;
  provider: ethers.BrowserProvider | null;
  isConnecting: boolean;
  error: string | null;
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    account: null,
    chainId: null,
    provider: null,
    isConnecting: false,
    error: null,
  });

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      setWalletState((prev) => ({
        ...prev,
        error: 'Please install MetaMask to use this feature',
      }));
      return;
    }

    try {
      setWalletState((prev) => ({ ...prev, isConnecting: true, error: null }));

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();

      localStorage.removeItem('walletManuallyDisconnected');

      setWalletState({
        account: accounts[0],
        chainId: `0x${network.chainId.toString(16)}`,
        provider,
        isConnecting: false,
        error: null,
      });

      portfolioService.setMode('real');

    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      setWalletState((prev) => ({
        ...prev,
        isConnecting: false,
        error: error.message || 'Failed to connect wallet',
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    localStorage.setItem('walletManuallyDisconnected', 'true');
    
    setWalletState({
      account: null,
      chainId: null,
      provider: null,
      isConnecting: false,
      error: null,
    });
  }, []);

  const switchNetwork = useCallback(async (chainId: string) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        setWalletState((prev) => ({
          ...prev,
          error: 'This network is not available in your MetaMask. Please add it first.',
        }));
      } else {
        console.error('Failed to switch network:', error);
        setWalletState((prev) => ({
          ...prev,
          error: error.message || 'Failed to switch network',
        }));
      }
    }
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    const checkExistingConnection = async () => {
      const wasManuallyDisconnected = localStorage.getItem('walletManuallyDisconnected') === 'true';
      
      if (wasManuallyDisconnected) {
        return;
      }

      try {
        if (!window.ethereum) return;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_accounts', []);
        
        if (accounts.length > 0) {
          const network = await provider.getNetwork();
          setWalletState({
            account: accounts[0],
            chainId: `0x${network.chainId.toString(16)}`,
            provider,
            isConnecting: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Failed to check existing connection:', error);
      }
    };

    checkExistingConnection();

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setWalletState((prev) => ({
          ...prev,
          account: accounts[0],
        }));
      }
    };

    const handleChainChanged = async (_chainId: string) => {
      if (!window.ethereum) return;
      
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        setWalletState((prev) => ({
          ...prev,
          chainId: `0x${network.chainId.toString(16)}`,
          provider,
        }));
      } catch (error) {
        console.error('Failed to update chain:', error);
      }
    };

    const handleDisconnect = () => {
      disconnect();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('disconnect', handleDisconnect);

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [disconnect]);

  return {
    ...walletState,
    connectWallet,
    disconnect,
    switchNetwork,
    isConnected: !!walletState.account,
  };
}
