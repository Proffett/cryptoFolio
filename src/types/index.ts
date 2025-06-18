// Redux State Types
export interface CryptoData {
  [key: string]: any;
}

export interface CoinData {
  [0]: string;
  [1]: {
    USD: number;
  };
  balance: number;
  calcValue: number;
  calcProfit: number;
}

export interface AppState {
  cryptoData: CoinData[];
  coins: string[];
  walletSummary: number;
  isMainScreen: boolean;
  isLoading: boolean;
  isError: boolean;
  chosenCoin: string;
  chosenCoinData: CoinData[];
  history: string;
  times: number[];
  values: number[];
  modal?: boolean;
  summary?: string;
  profit?: string;
}

// Action Types
export interface Action {
  type: string;
  payload?: any;
  [key: string]: any; // Index signature for Redux compatibility
}

// Component Props Types
export interface HeaderProps {
  mainScreen?: boolean;
}

export interface ChartProps {
  times: number[];
  values: number[];
  history: string;
}

export interface ModalProps {}

export interface LoaderSvgProps {
  width?: number;
  height?: number;
}

// API Response Types
export interface CryptoApiResponse {
  data: CoinData[];
  summary: number;
  profit: number;
}

// Chart Data Types
export interface ChartData {
  labels: number[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    fill: boolean;
  }[];
}

export interface ChartOptions {
  scales: {
    y: {
      beginAtZero: boolean;
    };
  };
}

// Event Types
export interface CoinItemEvent {
  target: HTMLDivElement;
}

// Local Storage Types
export interface LocalStorageData {
  favorites: string[];
  balance: {
    [key: string]: number;
  };
}

// Utility Types
export type SymbolToFullNameType = {
  [key: string]: string;
};

export type BasicCoinsType = string[];
