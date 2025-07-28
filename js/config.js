// js/config.js
// Konfigurasi statis game: daftar aset, level pekerjaan, dll.

export const workLevels = [
    { max: 100000, earnAmount: 5000, cost: 0 },
    { max: 500000, earnAmount: 10000, cost: 50000 },
    { max: 2000000, earnAmount: 25000, cost: 200000 },
    { max: 10000000, earnAmount: 50000, cost: 1000000 }
];

export const stocks = [
    { id: 'stock-1', name: 'Apel Inc', symbol: 'APL', type: 'stock', basePrice: 175000, volatility: 0.08, icon: 'fa-apple' },
    { id: 'stock-2', name: 'Mikro Lunak', symbol: 'MSF', type: 'stock', basePrice: 340000, volatility: 0.07, icon: 'fa-microsoft' },
    { id: 'stock-3', name: 'Alfabat', symbol: 'GOOG', type: 'stock', basePrice: 140000, volatility: 0.09, icon: 'fa-google' },
    { id: 'stock-4', name: 'Amazonia', symbol: 'AMZN', type: 'stock', basePrice: 185000, volatility: 0.1, icon: 'fa-amazon' },
    { id: 'stock-5', name: 'Meta Platform', symbol: 'META', type: 'stock', basePrice: 480000, volatility: 0.12, icon: 'fa-facebook' },
    { id: 'stock-6', name: 'Tesla Motor', symbol: 'TSLA', type: 'stock', basePrice: 180000, volatility: 0.15, icon: 'fa-car' },
    { id: 'stock-7', name: 'NVIDIA Corp', symbol: 'NVDA', type: 'stock', basePrice: 950000, volatility: 0.14, icon: 'fa-microchip' },
    { id: 'stock-8', name: 'Berkshire Hathaway', symbol: 'BRK', type: 'stock', basePrice: 620000, volatility: 0.06, icon: 'fa-building' },
    { id: 'stock-9', name: 'Johnson & Johnson', symbol: 'JNJ', type: 'stock', basePrice: 150000, volatility: 0.05, icon: 'fa-briefcase-medical' },
    { id: 'stock-10', name: 'JPMorgan Chase', symbol: 'JPM', type: 'stock', basePrice: 195000, volatility: 0.07, icon: 'fa-university' },
    { id: 'stock-11', name: 'Visa Inc', symbol: 'V', type: 'stock', basePrice: 280000, volatility: 0.08, icon: 'fa-credit-card' },
    { id: 'stock-12', name: 'Procter & Gamble', symbol: 'PG', type: 'stock', basePrice: 160000, volatility: 0.04, icon: 'fa-pump-soap' },
    { id: 'stock-13', name: 'Disney World', symbol: 'DIS', type: 'stock', basePrice: 95000, volatility: 0.11, icon: 'fa-hat-cowboy' },
    { id: 'stock-14', name: 'Netflix Media', symbol: 'NFLX', type: 'stock', basePrice: 650000, volatility: 0.13, icon: 'fa-tv' },
    { id: 'stock-15', name: 'PayPal Holdings', symbol: 'PYPL', type: 'stock', basePrice: 62000, volatility: 0.12, icon: 'fa-money-bill-wave' },
    { id: 'stock-16', name: 'Coca-Cola Co', symbol: 'KO', type: 'stock', basePrice: 60000, volatility: 0.05, icon: 'fa-wine-bottle' },
    { id: 'stock-17', name: 'McDonald\'s Corp', symbol: 'MCD', type: 'stock', basePrice: 290000, volatility: 0.06, icon: 'fa-hamburger' },
    { id: 'stock-18', name: 'Starbucks Corp', symbol: 'SBUX', type: 'stock', basePrice: 105000, volatility: 0.09, icon: 'fa-coffee' },
    { id: 'stock-19', name: 'Nike Inc', symbol: 'NKE', type: 'stock', basePrice: 110000, volatility: 0.1, icon: 'fa-shoe-prints' },
    { id: 'stock-20', name: 'Toyota Motor', symbol: 'TM', type: 'stock', basePrice: 230000, volatility: 0.07, icon: 'fa-car-side' }
];

export const cryptos = [
    { id: 'crypto-1', name: 'BitKoin', symbol: 'BTC', type: 'crypto', basePrice: 950000000, volatility: 0.18, icon: 'fa-bitcoin' },
    { id: 'crypto-2', name: 'Etherum', symbol: 'ETH', type: 'crypto', basePrice: 65000000, volatility: 0.2, icon: 'fa-ethereum' },
    { id: 'crypto-3', name: 'Binans Koin', symbol: 'BNB', type: 'crypto', basePrice: 5500000, volatility: 0.22, icon: 'fa-coins' },
    { id: 'crypto-4', name: 'Ripple', symbol: 'XRP', type: 'crypto', basePrice: 5000, volatility: 0.25, icon: 'fa-wave-square' },
    { id: 'crypto-5', name: 'Cardano', symbol: 'ADA', type: 'crypto', basePrice: 4500, volatility: 0.24, icon: 'fa-shield-alt' },
    { id: 'crypto-6', name: 'Dogekoin', symbol: 'DOGE', type: 'crypto', basePrice: 800, volatility: 0.3, icon: 'fa-dog' },
    { id: 'crypto-7', name: 'Polkadot', symbol: 'DOT', type: 'crypto', basePrice: 70000, volatility: 0.21, icon: 'fa-circle-notch' },
    { id: 'crypto-8', name: 'Litekoin', symbol: 'LTC', type: 'crypto', basePrice: 850000, volatility: 0.19, icon: 'fa-lightbulb' },
    { id: 'crypto-9', name: 'Chainlink', symbol: 'LINK', type: 'crypto', basePrice: 140000, volatility: 0.23, icon: 'fa-link' },
    { id: 'crypto-10', name: 'Stellar', symbol: 'XLM', type: 'crypto', basePrice: 1200, volatility: 0.26, icon: 'fa-star-of-david' },
    { id: 'crypto-11', name: 'Uniswap', symbol: 'UNI', type: 'crypto', basePrice: 75000, volatility: 0.27, icon: 'fa-exchange-alt' },
    { id: 'crypto-12', name: 'Solana', symbol: 'SOL', type: 'crypto', basePrice: 3500000, volatility: 0.28, icon: 'fa-sun' },
    { id: 'crypto-13', name: 'Polkamon', symbol: 'MON', type: 'crypto', basePrice: 25000, volatility: 0.32, icon: 'fa-dragon' },
    { id: 'crypto-14', name: 'Avalans', symbol: 'AVAX', type: 'crypto', basePrice: 400000, volatility: 0.29, icon: 'fa-mountain' },
    { id: 'crypto-15', name: 'Tronix', symbol: 'TRX', type: 'crypto', basePrice: 800, volatility: 0.31, icon: 'fa-bolt' },
    { id: 'crypto-16', name: 'Cosmos', symbol: 'ATOM', type: 'crypto', basePrice: 120000, volatility: 0.25, icon: 'fa-atom' },
    { id: 'crypto-17', name: 'Tezos', symbol: 'XTZ', type: 'crypto', basePrice: 13000, volatility: 0.23, icon: 'fa-cube' },
    { id: 'crypto-18', name: 'Filekoin', symbol: 'FIL', type: 'crypto', basePrice: 90000, volatility: 0.27, icon: 'fa-file-alt' },
    { id: 'crypto-19', name: 'Algorand', symbol: 'ALGO', type: 'crypto', basePrice: 4500, volatility: 0.26, icon: 'fa-project-diagram' },
    { id: 'crypto-20', name: 'VeChain', symbol: 'VET', type: 'crypto', basePrice: 300, volatility: 0.3, icon: 'fa-link' }
];