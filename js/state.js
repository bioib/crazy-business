// js/state.js
// Mengelola status dinamis game yang berubah seiring waktu.

export const gameData = {
    balance: 0,
    day: 1,
    workLevel: 1,
    workEarned: 0,
    portfolioValueHistory: [0],
    history: [],
    lastUpdate: Date.now(),
    selectedAsset: null,
    gameStartDate: new Date()
};

// Akan diisi saat inisialisasi dari config.js
export const allAssets = [];

// Menghitung nilai total semua aset yang dimiliki
export function calculatePortfolioValue() {
    return allAssets.reduce((total, asset) => {
        return total + (asset.owned * asset.currentPrice);
    }, 0);
}