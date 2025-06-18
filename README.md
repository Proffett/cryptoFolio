# CryptoFolio

A modern cryptocurrency portfolio tracking application built with React 18, TypeScript, Redux Toolkit, and Material-UI 5.

## 🚀 Features

- **Real-time Crypto Tracking**: Monitor cryptocurrency prices and market data
- **Portfolio Management**: Add and track your cryptocurrency holdings
- **Interactive Charts**: Visualize price history with Chart.js
- **Responsive Design**: Modern UI built with Material-UI 5
- **Redux State Management**: Centralized state management with Redux Toolkit and Redux Saga
- **TypeScript**: Full type safety across the codebase

## 🛠 Tech Stack

- **React 18** - Latest React with concurrent features
- **TypeScript 4.9+** - Static type checking for safer code
- **Material-UI 5** - Modern component library with emotion-based styling
- **Redux Toolkit + Redux Saga** - Modern Redux state management and side effects
- **Chart.js** - Interactive charts and data visualization
- **React Router v6** - Modern client-side routing
- **Webpack 5** - Modern bundling with CSS optimization
- **Sass** - Advanced CSS preprocessing

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
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🎨 UI Components

The application uses Material-UI 5 components:
- **Modal**: Custom coin selection and balance management
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

### TypeScript & Redux Toolkit Migration (Latest)
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

- Some peer dependency warnings (non-blocking)
- SCSS compilation warnings (resolved with sass package)

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

**Note**: This project was originally bootstrapped with Create React App and has been significantly enhanced with TypeScript, Redux Toolkit, and modern tooling.

