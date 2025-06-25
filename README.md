# CryptoFolio

A modern cryptocurrency portfolio tracking application built with React 18, TypeScript, Redux Toolkit, and Material-UI 6, powered by Vite for lightning-fast development.

## 🚀 Features

- **Real-time Crypto Tracking**: Monitor cryptocurrency prices and market data
- **Portfolio Management**: Add and track your cryptocurrency holdings
- **Interactive Charts**: Visualize price history with Chart.js
- **Responsive Design**: Modern UI built with Material-UI 6
- **Redux State Management**: Centralized state management with Redux Toolkit and Redux Saga
- **TypeScript**: Full type safety across the codebase
- **Lightning Fast Development**: Powered by Vite for instant hot reload
- **Secure**: All critical security vulnerabilities resolved

## 🛠 Tech Stack

- **React 18.3.1** - Latest React with concurrent features
- **TypeScript 5.7.2** - Modern static type checking
- **Vite 6.x** - Next-generation frontend tooling
- **Material-UI 6.x** - Latest component library with improved performance
- **Redux Toolkit 2.3+ + Redux Saga** - Modern Redux state management and side effects
- **Chart.js 4.4+** - Interactive charts and data visualization
- **React Router v6.30+** - Modern client-side routing
- **PostCSS + Sass** - Advanced CSS preprocessing with modern tooling
- **ESLint 9** - Modern linting with flat config

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cryptoFolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

## 🔧 Available Scripts

- `npm run dev` - Runs the app in development mode with Vite (⚡ super fast)
- `npm run build` - Builds the app for production with TypeScript checks
- `npm run preview` - Preview the production build locally
- `npm run test` - Runs tests with Vitest
- `npm run lint` - Lints the codebase with ESLint
- `npm run lint:fix` - Automatically fixes linting issues

## 🎨 UI Components

The application uses Material-UI 6 components:
- **Modal**: Custom coin selection and balance management (using MUI Dialog)
- **Charts**: Interactive price charts with Chart.js
- **Responsive Layout**: Mobile-friendly design

## 📊 State Management

- **Redux Toolkit**: Modern Redux state management
- **Redux Saga**: Handles async operations and side effects
- **Local Storage**: Persists user preferences and portfolio data

## 🛡️ TypeScript

- All source code is written in TypeScript for type safety and better developer experience.
- Custom types are defined in `src/types/`.
- TypeScript configuration is in `tsconfig.json`.

## 🔄 Recent Updates

### Vite Migration & Security Overhaul (Latest - 2025)
- ✅ **Migrated from Create React App to Vite** - Lightning fast development (113ms startup vs several seconds)
- ✅ **Eliminated 9 critical/high security vulnerabilities** - Only 4 moderate dev-only vulnerabilities remain
- ✅ **Updated to latest dependencies**:
  - React 18.3.1, TypeScript 5.7.2, Material-UI 6.x
  - Modern ESLint 9 with flat config
  - PostCSS 8.4+ with ES modules
- ✅ **Replaced vulnerable packages**:
  - Removed `react-spring-modal` → replaced with secure MUI Dialog
  - Removed outdated webpack ecosystem from react-scripts
- ✅ **Modern tooling**: Vite, Vitest, modern build pipeline
- ✅ **Performance improvements**: Optimized bundle size and fast HMR

### TypeScript & Redux Toolkit Migration (Previous)
- ✅ Migrated the entire codebase to TypeScript
- ✅ Adopted Redux Toolkit for modern Redux patterns
- ✅ Updated all Redux logic and types
- ✅ Refactored for React Router v6 (replaced `Switch`/`useHistory` with `Routes`/`useNavigate`)
- ✅ Removed deprecated/legacy packages and fixed all critical dependency issues
- ✅ Fixed all TypeScript and linter errors

### Previous Key Changes
- Upgraded to Material-UI 5 and React 18
- Updated Chart.js configuration for v4+
- Improved Webpack configuration for modern CSS optimization

## 🚨 Known Issues

- 4 moderate security vulnerabilities in development dependencies (esbuild/vitest - dev-only, not affecting production)
- Bundle size warning for chunks >500KB (can be optimized with code splitting if needed)
- Some legacy peer dependency warnings from existing dependencies (non-blocking)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Evgeny <monatana-work@yandex.ru>

---