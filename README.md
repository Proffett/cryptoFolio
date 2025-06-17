# CryptoFolio - Cryptocurrency Portfolio Tracker

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)

</div>

## 📖 Overview

CryptoFolio is a modern web application for tracking cryptocurrency portfolios with real-time price updates and profit/loss calculations. The application provides users with an intuitive interface for managing their crypto investments and analyzing their performance.

### ✨ Key Features

- 📊 **Portfolio Tracking** - Add and manage cryptocurrencies in your portfolio
- 💰 **Real-time Prices** - Live cryptocurrency data via CoinGecko API
- 📈 **Profit Analytics** - Automatic profit/loss calculation for each position
- 📱 **Responsive Design** - Full mobile device support
- 🎨 **Modern UI** - Intuitive and beautiful interface
- 💾 **Local Storage** - Portfolio data persistence in browser

## 🛠 Technology Stack

### Frontend
- **React** - Core library for building user interfaces
- **Redux** - Application state management
- **JavaScript (ES6+)** - Primary programming language
- **SCSS** - CSS preprocessor for styling

### Development Tools
- **Webpack** - Module bundler with custom configuration
- **Babel** - Modern JavaScript transpilation
- **ESLint** - Code quality linter
- **Prettier** - Automatic code formatting
- **Stylelint** - CSS/SCSS linter

### API
- **CoinGecko API** - Real-time cryptocurrency data

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Proffett/cryptoFolio.git
   cd cryptoFolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open browser**
   
   Application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
# or
yarn build
```

Built application will be in the `build/` folder.

## 📁 Project Structure

```
cryptoFolio/
├── public/                 # Static files
├── src/
│   ├── App/               # Main application component
│   ├── components/        # Reusable components
│   ├── store/            # Redux store and reducers
│   ├── styles/           # Global SCSS styles
│   ├── mock/             # Mock data for development
│   └── index.js          # Application entry point
├── .eslintrc.js          # ESLint configuration
├── .prettierrc.js        # Prettier configuration
├── .stylelintrc.js       # Stylelint configuration
├── webpack.config.js     # Custom Webpack configuration
├── babel.config.js       # Babel configuration
└── package.json          # Dependencies and scripts
```

## 🎯 Functionality

### Portfolio Management
- Add new cryptocurrencies to portfolio
- Specify coin amount and purchase price
- Edit and remove positions
- Group by asset types

### Analytics & Reports
- Real-time total portfolio value
- Profit/loss per position
- Percentage change in value
- Asset distribution in portfolio

### User Interface
- Responsive design for all devices
- Dark and light themes (planned)
- Intuitive navigation
- Quick cryptocurrency search

## 🔧 Configuration

### Environment Variables

Create `.env` file in project root:

```env
REACT_APP_API_URL=https://api.coingecko.com/api/v3
REACT_APP_API_KEY=your_api_key_here
```

### API Setup

Application uses public CoinGecko API. For production, it's recommended to get an API key for increased rate limits.

## 📱 Screenshots

*Screenshots will be added after creating live demo*

## 🚧 Development Roadmap

### Upcoming Updates
- [ ] Add price change charts
- [ ] Notifications for significant price changes
- [ ] Export data to CSV/Excel
- [ ] Multi-currency support (USD, EUR, RUB)

### Long-term Plans
- [ ] Mobile app (React Native)
- [ ] Exchange integration for automatic import
- [ ] Social features (portfolio comparison)
- [ ] Advanced analytics and predictions

## 🤝 Contributing

Contributions are welcome! Feel free to suggest improvements.

### How to contribute:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 👨‍💻 Author

**Evgeny Sterkhov**
- GitHub: [@Proffett](https://github.com/Proffett)
- Email: montana-work@yandex.ru
- Telegram: @proffett

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for providing the API
- [React](https://reactjs.org/) team for the excellent library
- Developer community for inspiration and support

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

</div>

