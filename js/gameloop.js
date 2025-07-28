// js/gameLoop.js
// Mengelola loop utama game, simulasi waktu, dan pembaruan aset harian.

import { allAssets, gameData, calculatePortfolioValue } from './state.js';
import { updateUI } from './ui.js';

function updateAssetValues() {
    allAssets.forEach(asset => {
        const changePercent = (Math.random() * 2 - 1) * asset.volatility;
        asset.currentPrice = Math.max(100, Math.round(asset.currentPrice * (1 + changePercent)));
        asset.history.push(asset.currentPrice);
        if (asset.history.length > 2000) asset.history.shift();
    });

    gameData.portfolioValueHistory.push(calculatePortfolioValue());
    if (gameData.portfolioValueHistory.length > 100) {
        gameData.portfolioValueHistory.shift();
    }

    gameData.day++;
}

export function simulateGameTime() {
    // Dipanggil setiap detik untuk check
    setInterval(() => {
        const now = Date.now();
        const elapsed = now - gameData.lastUpdate;
        
        // 1 menit nyata = 1 hari game
        if (elapsed >= 60000) { 
            const daysPassed = Math.floor(elapsed / 60000);
            for (let i = 0; i < daysPassed; i++) {
                updateAssetValues();
            }
            gameData.lastUpdate += daysPassed * 60000;
            updateUI();
        }
    }, 1000);
}