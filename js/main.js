// js/main.js
// Titik masuk utama aplikasi. Menginisialisasi game, mengatur event listener, dan memulai loop game.

import { stocks, cryptos } from './config.js';
import { gameData, allAssets } from './state.js';
import * as dom from './dom.js';
import { generate5YearHistory } from './utils.js';
import * as ui from './ui.js';
import * as actions from './actions.js';
import { simulateGameTime } from './gameloop.js';

function initializeAssets() {
    const assetConfigs = [...stocks, ...cryptos];
    assetConfigs.forEach(config => {
        const history = generate5YearHistory(config.basePrice, config.volatility);
        allAssets.push({
            ...config,
            currentPrice: history[history.length - 1],
            history: history,
            owned: 0,
        });
    });
}

function setupEventListeners() {
    // Tombol Aksi Utama
    dom.workBtn.addEventListener('click', actions.work);
    dom.buyBtn.addEventListener('click', actions.buyAsset);
    dom.sellBtn.addEventListener('click', actions.sellAsset);
    dom.closeModalBtn.addEventListener('click', ui.closeAssetModal);
    
    // Navigasi Tab
    dom.tabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab')) {
            ui.showTab(e.target.dataset.tab);
        }
    });
    
    // Navigasi Sub-Tab Pasar
    dom.subTabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('sub-tab')) {
            ui.showAssetType(e.target.dataset.assetType);
        }
    });
}

function init() {
    console.log("Memulai Game Investasi Pro...");
    initializeAssets();
    gameData.history.push({ type: 'work', amount: 0, timestamp: new Date() });
    setupEventListeners();
    
    // Tampilan awal
    ui.updateUI(); 
    ui.updateDigitalClock();
    
    // Mulai loop
    setInterval(ui.updateDigitalClock, 1000);
    simulateGameTime();
}

// Jalankan saat halaman dimuat
window.onload = init;