type EthersModule = typeof import('ethers');

let ethersModulePromise: Promise<EthersModule> | null = null;

export function loadEthers(): Promise<EthersModule> {
  if (!ethersModulePromise) {
    ethersModulePromise = import('ethers');
  }

  return ethersModulePromise;
}
