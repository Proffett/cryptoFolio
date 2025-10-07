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

**Redux Toolkit 2.3 + Redux Saga 1.3**
- **Rationale**: Redux Toolkit simplifies Redux boilerplate while Redux Saga handles complex async operations (API calls, data fetching)
- **Alternative Considered**: React Context + useReducer - rejected due to complexity of side effects management
- **Pros**: Predictable state updates, excellent DevTools, separation of concerns for side effects
- **Cons**: Additional complexity, learning curve for saga patterns

**State Structure**:
- `cryptoData`: Array of coin data with prices and balances
- `coins`: User's selected favorite coins
- `chosenCoin`: Currently viewed coin detail
- Chart data (`times`, `values`) for price history visualization
- UI states (`isLoading`, `isError`, `modal`)

**Local Storage Integration**:
- Persists user favorites and coin balances across sessions
- Automatically syncs with Redux state on app initialization

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

**Mock API Implementation**
- **Current State**: Application uses mock price data defined in `src/store/saga.ts`
- **Architecture**: Redux Saga simulates API calls with setTimeout for realistic async behavior
- **Mock Data**: Static prices for 12 cryptocurrencies (BTC, ETH, XRP, ADA, BSC, LTC, THETA, XLM, TRX, DOGE, XMR, SOL)
- **Future Integration Point**: Designed to easily swap mock implementation with real API calls (CoinGecko, CryptoCompare, etc.)

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
- **Purpose**: Persists user preferences and portfolio balances
- **Data Stored**:
  - `favorites`: Array of user-selected coin symbols
  - `balance`: Object mapping coin symbols to holding amounts
- **Architecture**: Redux saga reads from localStorage on initialization; updates written on user actions
- **Limitation**: Data lost if user clears browser storage

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