# CryptoFolio

## Overview

CryptoFolio is a modern cryptocurrency portfolio tracking application that enables users to monitor their crypto holdings, view real-time price data, and visualize market trends. The application provides an intuitive interface for managing multiple cryptocurrencies, tracking portfolio value, and analyzing price history through interactive charts. Users can customize their watchlist, connect MetaMask wallets, and view detailed information for individual coins.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Choice: React 18.3 with TypeScript**
- **Rationale**: React 18 provides concurrent rendering features for improved performance, while TypeScript ensures type safety across the codebase
- **Alternative Considered**: Vue.js - rejected in favor of React's larger ecosystem and better library support for crypto applications
- **Pros**: Strong typing catches errors early, excellent developer experience, mature ecosystem
- **Cons**: Additional build complexity, learning curve for TypeScript

**Build Tool: Vite 6.x**
- **Rationale**: Lightning-fast hot module replacement (HMR) and optimized production builds significantly improve development experience
- **Alternative Considered**: Create React App - rejected due to slower build times and configuration limitations
- **Pros**: Instant server start, fast HMR, optimized bundling
- **Cons**: Relatively newer tool with smaller community compared to Webpack

**Routing: React Router v6.30**
- **Rationale**: Enables client-side navigation between main portfolio view and individual coin detail pages
- **Implementation**: Two main routes - `/` for portfolio overview and `/:coin` for detailed coin view
- **Pros**: Declarative routing, code splitting support, type-safe with TypeScript
- **Cons**: Learning curve for nested routing patterns

**UI Component Library: Material-UI v6.1**
- **Rationale**: Provides pre-built, accessible components following Material Design principles, reducing development time
- **Alternative Considered**: Custom CSS components - rejected to accelerate development
- **Pros**: Consistent design system, accessibility built-in, extensive component library
- **Cons**: Larger bundle size, opinionated styling

### State Management

**React Query (TanStack Query) 5.x**
- **Rationale**: React Query eliminates Redux boilerplate while providing powerful server state management with automatic caching, refetching, and invalidation
- **Previous Implementation**: Redux Toolkit + Redux Saga - replaced to reduce complexity and eliminate 500+ lines of boilerplate
- **Pros**: Automatic background refetching, built-in caching, simpler API, type-safe, excellent DevTools
- **Cons**: Requires understanding of server vs client state separation

**Architecture**: Clean separation between server state and UI state
- **Server State** (React Query): Real-time cryptocurrency prices, wallet balances, historical chart data from CoinGecko API
- **UI State** (useState + localStorage): User favorites, modal visibility, selected coin, virtual balances

**Custom Hooks**:
- `useCryptoPrices`: Fetches live prices for selected cryptocurrencies (refetches every 30s)
- `useWalletBalances`: Fetches real balances from connected MetaMask wallet
- `useCryptoPortfolio`: Combines prices with balances (virtual or real mode)
- `useChartData`: Fetches historical price data with configurable granularity
- `useFavorites`: Manages favorite coins with localStorage persistence
- `useModal`: Controls modal visibility state
- `useBalances`: Manages virtual portfolio balances

**Local Storage Integration**:
- Persists user favorites and virtual balances across sessions
- Custom hooks automatically sync with localStorage on mount/update

### Data Visualization

**Chart.js 4.4 with react-chartjs-2**
- **Rationale**: Powerful, flexible charting library with React wrapper for price history visualization
- **Alternative Considered**: Recharts - rejected due to better performance with Chart.js for time-series data
- **Pros**: Highly customizable, performant, extensive chart types
- **Cons**: Imperative API requires wrapper for React integration

**Implementation**: Line charts display price trends over configurable time periods (minute, hour, day)

### Styling Architecture

**CSS Strategy: SCSS with BEM Methodology**
- **Rationale**: BEM (Block Element Modifier) provides maintainable, scalable CSS naming conventions; SCSS adds variables and nesting
- **Implementation**: `bem-cn` library generates BEM classnames programmatically
- **Pros**: No naming conflicts, clear component hierarchy, reusable styles
- **Cons**: Verbose classnames, requires discipline to maintain

**PostCSS Pipeline**:
- Autoprefixer for cross-browser compatibility
- postcss-nested for nested syntax support
- Integration with Vite build process

**normalize.css**: Ensures consistent baseline styles across browsers

### Code Quality Tools

**ESLint 9 with Flat Config**
- Modern linting configuration with TypeScript support
- React-specific rules via eslint-plugin-react-hooks
- Enforces code consistency and catches common errors

**Prettier 3.4**
- Automated code formatting with consistent style rules
- Configured for single quotes, 100-character line width, trailing commas

**Stylelint**
- CSS/SCSS linting with ordering rules
- Enforces consistent property ordering and formatting

## External Dependencies

### Cryptocurrency Data

**CoinGecko API Integration**
- **Current State**: Application uses real-time data from CoinGecko API (free tier)
- **Architecture**: Service layer (`priceService.ts`) with React Query hooks for data management
- **API Key**: Stored in COINGECKO_API_KEY environment secret for rate limit increases
- **Rate Limits**: 30 calls/minute (free tier), 10K calls/month
- **Supported Coins**: BTC, ETH, XRP, ADA, BSC, LTC, THETA, XLM, TRX, DOGE, XMR, SOL

**Price Data Features**:
- Real-time prices with automatic 30-second refresh intervals
- Historical chart data with three granularity levels:
  - **Minute view**: `days=1` → 5-minute intervals (~288 data points)
  - **Hour view**: `days=7` → hourly intervals (~168 data points)  
  - **Day view**: `days=30` → daily intervals (~30 data points)
- Automatic fallback to synthetic data if API fails
- React Query caching reduces unnecessary API calls

### Blockchain Integration

**Ethers.js 6.15**
- **Purpose**: MetaMask wallet connection and Ethereum blockchain interaction
- **Implementation**: Custom `useWallet` hook manages wallet state and connection lifecycle
- **Features**: Account connection, network detection, error handling
- **Requirements**: Users must have MetaMask browser extension installed
- **Pros**: Type-safe, modern API, comprehensive Ethereum support
- **Cons**: Requires user to have MetaMask, limited to Ethereum-compatible chains

### Local Storage

**Browser localStorage API**
- **Purpose**: Persists user preferences and virtual portfolio balances
- **Data Stored**:
  - `favorites`: Array of user-selected coin symbols
  - `balance`: Object mapping coin symbols to virtual holding amounts
- **Architecture**: Custom hooks read/write localStorage with useState for reactivity
- **Limitation**: Data lost if user clears browser storage

### Portfolio Modes

**Virtual Portfolio Mode** (default)
- Users manually enter cryptocurrency holdings
- Balances stored in localStorage
- Portfolio value calculated from manual balances × live prices

**Real Portfolio Mode**
- Connects to MetaMask wallet via Ethers.js
- Fetches actual on-chain balances for supported tokens
- Displays real portfolio value from blockchain data
- Toggle available in header with visual indicator

### Asset Resources

**crypto-icons 1.0.65**
- **Purpose**: Provides cryptocurrency logo SVG icons
- **Usage**: Display coin icons throughout the application
- **Benefits**: Consistent, high-quality crypto branding

### Performance Monitoring

**web-vitals 4.2**
- **Purpose**: Tracks Core Web Vitals metrics (LCP, FID, CLS)
- **Implementation**: Can be integrated for performance monitoring
- **Use Case**: Production performance analysis

### Development Environment

**Replit Configuration**
- Server configured for host `0.0.0.0` on port 5000
- Allowed hosts configured for Replit development environment
- Preview server on port 3000