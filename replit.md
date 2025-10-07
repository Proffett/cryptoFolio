# CryptoFolio - Cryptocurrency Portfolio Tracker

## Overview
A modern cryptocurrency portfolio tracking application built with React 18, TypeScript, Redux Toolkit, and Material-UI 6, powered by Vite for lightning-fast development. Successfully configured for the Replit environment.

## Project Setup Date
- Initial GitHub import: October 7, 2025
- Replit environment configuration completed: October 7, 2025

## Tech Stack
- **Frontend Framework**: React 18.3.1 with TypeScript 5.7.2
- **Build Tool**: Vite 6.x (fast HMR and build)
- **State Management**: Redux Toolkit 2.3+ with Redux Saga for side effects
- **UI Library**: Material-UI 6.x with Emotion styling
- **Charts**: Chart.js 4.4+ with react-chartjs-2
- **Routing**: React Router v6.30+
- **Styling**: SCSS with PostCSS and autoprefixer
- **Linting**: ESLint 9 with TypeScript support

## Project Architecture

### Directory Structure
```
/
├── public/          # Static assets (favicon, manifest, robots.txt)
├── src/
│   ├── App/         # Main App component
│   ├── components/  # React components
│   │   ├── Chart/      # Chart visualization
│   │   ├── CoinView/   # Individual coin details
│   │   ├── Header/     # App header
│   │   ├── MainView/   # Main portfolio view
│   │   ├── Modal/      # Modal dialogs
│   │   └── UI/         # Reusable UI components
│   ├── mock/        # Mock data for initial state
│   ├── store/       # Redux store, actions, reducers, sagas
│   ├── styles/      # Global styles
│   ├── types/       # TypeScript type definitions
│   └── index.tsx    # App entry point
├── index.html       # Vite entry HTML
├── vite.config.ts   # Vite configuration
├── tsconfig.json    # TypeScript configuration
└── package.json     # Dependencies and scripts
```

### Key Features
- Real-time cryptocurrency price tracking
- Portfolio balance management
- Interactive price charts
- Responsive Material-UI design
- Persistent state with Redux
- Local storage for data persistence

## Replit Configuration

### Development Server
- **Port**: 5000 (configured in vite.config.ts)
- **Host**: 0.0.0.0 (allows Replit proxy access)
- **Command**: `npm run dev`
- **Workflow**: "Frontend" workflow configured

### Vite Configuration
The project uses Vite with the following Replit-specific settings:
- Server bound to 0.0.0.0:5000 for Replit proxy compatibility
- Path aliases configured (@/ → ./src/)
- React plugin with fast refresh enabled
- Preview server also configured for port 5000

### Available Scripts
- `npm run dev` - Start development server (runs automatically via workflow)
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run preview` - Preview production build
- `npm run test` - Run tests with Vitest
- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Auto-fix linting issues

## Recent Changes

### October 7, 2025 - Replit Environment Setup
- ✅ Created vite.config.ts with Replit-compatible settings (host: 0.0.0.0, port: 5000)
- ✅ Created missing tsconfig.node.json for Vite config type support
- ✅ Moved index.html to root (Vite requirement)
- ✅ Updated index.html with proper script tag and asset paths
- ✅ Installed all npm dependencies (617 packages)
- ✅ Configured "Frontend" workflow to run npm run dev
- ✅ Updated .gitignore to include /dist folder
- ✅ Verified app is running successfully on port 5000
- ✅ Tested app interface - displays cryptocurrency portfolio correctly

### Previous Project History (from README)
- Migrated from Create React App to Vite (2025)
- Eliminated 9 critical/high security vulnerabilities
- Updated to latest dependencies (React 18.3.1, TypeScript 5.7.2, MUI 6)
- Replaced react-spring-modal with MUI Dialog
- Full TypeScript migration completed
- Adopted Redux Toolkit for modern Redux patterns

## Dependencies Status
- Total packages: 618 installed
- Security: 3 vulnerabilities (1 low, 2 moderate) - mostly in dev dependencies
- All production dependencies are secure and up-to-date

## Database
This is a frontend-only application. State is managed with Redux and persisted to browser localStorage. No backend database is required.

## Environment Variables
No API keys or environment variables are currently required. The app uses mock data for cryptocurrency information.

## Known Issues & Notes
- 4 moderate security vulnerabilities in dev dependencies (esbuild/vitest - non-blocking)
- Some peer dependency warnings from react-spring and vitest (non-blocking)
- Bundle size warning for chunks >500KB (can be optimized with code splitting if needed)

## Future Enhancements (Potential)
- Integration with real cryptocurrency API (CoinGecko, CoinMarketCap, etc.)
- User authentication for cloud-synced portfolios
- Real-time WebSocket price updates
- Export portfolio data to CSV/JSON
- Dark/light theme toggle
- Multiple portfolio support

## User Preferences
(No specific user preferences recorded yet)
