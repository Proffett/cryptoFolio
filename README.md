# CryptoFolio

CryptoFolio is a cryptocurrency portfolio tracker built with React, TypeScript, Vite, and Material UI. The application shows live market data, lets the user manage a portfolio in virtual or wallet-connected mode, and visualizes price history with charts.

DEMO: http://testweb.na4u.ru

## Features

- Track cryptocurrency prices and portfolio value
- Switch between virtual portfolio mode and real wallet mode
- Manage favorite assets and balances through a modal UI
- View price history charts with Chart.js
- Use responsive UI components built on Material UI
- Cache and synchronize market data with TanStack Query

## Tech Stack

- React 19
- TypeScript 5.9
- Vite 8
- Material UI 7
- TanStack Query 5
- React Router 6
- Chart.js 4
- Sass and PostCSS
- ESLint 10
- pnpm

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- pnpm 10.15.1 or compatible 10.x release

### Installation

```bash
git clone <repository-url>
cd cryptoFolio
pnpm install
```

### Development

```bash
pnpm dev
```

By default the Vite dev server runs on `http://localhost:2000`.

### Production Build

```bash
pnpm build
pnpm preview
```

## Available Scripts

- `pnpm dev` starts the Vite development server
- `pnpm build` runs TypeScript checks and creates a production build
- `pnpm preview` serves the production build locally
- `pnpm lint` runs ESLint
- `pnpm lint:fix` runs ESLint with autofix
- `pnpm test` starts Vitest in interactive mode
- `pnpm exec vitest run` runs tests once in CI style

## Project Notes

- Package management is standardized on `pnpm`
- The lockfile source of truth is `pnpm-lock.yaml`
- Production dependencies are currently free of known vulnerabilities according to `pnpm audit`
- Vitest is configured, but there are no test files in the repository yet
- The production bundle currently triggers a chunk-size warning in Vite and can be optimized later with code splitting

## Recent Updates

### March 12, 2026

- Migrated the project from mixed lockfiles to `pnpm`
- Updated the React stack to React 19 and React DOM 19
- Updated Material UI to v7 and Vite to v8
- Removed unused `react-spring`, which also removed a vulnerable transitive dependency chain
- Adapted component typings and state synchronization logic for the newer React and ESLint rules
- Verified `pnpm audit`, `pnpm lint`, and `pnpm build`

## Project Structure

- `src/components` reusable UI and feature components
- `src/hooks` custom React hooks
- `src/services` portfolio and data access logic
- `src/mock` initial mock data and defaults
- `src/styles` shared styles

## Author

Evgeny <monatana-work@yandex.ru>
