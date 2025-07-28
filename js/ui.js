// js/ui.js
// Bertanggung jawab untuk memperbarui semua elemen antarmuka pengguna (UI).

import * as dom from './dom.js';
import { gameData, allAssets, calculatePortfolioValue } from './state.js';
import { workLevels } from './config.js';
import { formatCurrency, formatCurrencyFull } from './utils.js';
import { observeAndDrawChart } from './chart.js';

// Fungsi utama untuk menyegarkan seluruh UI
export function updateUI() {
    const portfolioValue = calculatePortfolioValue();
    dom.balanceEl.textContent = formatCurrencyFull(gameData.balance);
    dom.portfolioValueEl.textContent = formatCurrencyFull(portfolioValue);
    dom.portfolioTotalEl.textContent = formatCurrencyFull(portfolioValue + gameData.balance);
    dom.dayEl.textContent = gameData.day;
    
    updateWorkUI();
    // Panggil observer untuk menggambar grafik utama
    observeAndDrawChart(dom.chartEl, gameData.portfolioValueHistory);
    updateHistory();
    updateMarket();
    updatePortfolio();
    updateCalendar();
}

function updateWorkUI() {
    const currentLevel = workLevels[gameData.workLevel - 1];
    const progressPercent = (gameData.workEarned / currentLevel.max) * 100;
    dom.workProgressEl.style.width = `${progressPercent}%`;
    dom.workLevelEl.textContent = gameData.workLevel;
    dom.workAmountEl.textContent = formatCurrencyFull(currentLevel.earnAmount);
    if (gameData.workLevel < workLevels.length) {
        dom.nextLevelEl.textContent = formatCurrencyFull(workLevels[gameData.workLevel].max);
    } else {
        dom.nextLevelEl.textContent = "MAX";
    }
}

function updateHistory() {
    dom.historyListEl.innerHTML = '';
    const recentHistory = gameData.history.slice(-5).reverse();
    if (recentHistory.length === 0) {
        dom.historyListEl.innerHTML = '<div class="history-item">Belum ada aktivitas</div>';
        return;
    }
    recentHistory.forEach(entry => {
        const item = document.createElement('div');
        item.className = 'history-item';
        let content = '';
        switch(entry.type) {
            case 'buy':
                item.classList.add('buy-history');
                content = `<div>BELI ${entry.assetName}</div><div>${entry.amount} unit</div>`;
                break;
            case 'sell':
                item.classList.add('sell-history');
                content = `<div>JUAL ${entry.assetName}</div><div>${entry.amount} unit</div>`;
                break;
            case 'work':
                item.classList.add('work-history');
                content = `<div>KERJA</div><div>+Rp ${formatCurrencyFull(entry.amount)}</div>`;
                break;
            case 'level':
                item.classList.add('level-history');
                content = `<div>NAIK LEVEL!</div><div>Level ${entry.level}</div>`;
                break;
        }
        item.innerHTML = content;
        dom.historyListEl.appendChild(item);
    });
}

function updateMarket() {
    dom.stockMarketEl.innerHTML = '';
    dom.cryptoMarketEl.innerHTML = '';
    allAssets.forEach(asset => {
        const card = createAssetCard(asset);
        if (asset.type === 'stock') dom.stockMarketEl.appendChild(card);
        else dom.cryptoMarketEl.appendChild(card);
    });
}

function updatePortfolio() {
    dom.portfolioContainerEl.innerHTML = '';
    const ownedAssets = allAssets.filter(asset => asset.owned > 0);
    if (ownedAssets.length === 0) {
        dom.emptyPortfolioEl.style.display = 'block';
        return;
    }
    dom.emptyPortfolioEl.style.display = 'none';
    ownedAssets.forEach(asset => {
        const card = createPortfolioCard(asset);
        dom.portfolioContainerEl.appendChild(card);
    });
}

export function updateDigitalClock() {
    const now = new Date();
    dom.digitalClockEl.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
}

export function updateCalendar() {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const gameDate = new Date(new Date(2024, 0, 1).getTime() + (gameData.day - 1) * 86400000);
    dom.calendarDateEl.textContent = `${gameDate.getDate()} ${months[gameDate.getMonth()]}`;
    dom.calendarDayEl.textContent = days[gameDate.getDay()];
}

function createAssetCard(asset) {
    const change = ((asset.currentPrice - asset.history[asset.history.length - 2]) / asset.history[asset.history.length - 2]) * 100 || 0;
    const card = document.createElement('div');
    card.className = 'asset-card';
    card.innerHTML = `
        <div class="asset-header">
            <div class="asset-icon"><i class="fas ${asset.icon}"></i></div>
            <div class="asset-info">
                <div class="asset-name">${asset.name}</div>
                <div class="asset-symbol">${asset.symbol}</div>
            </div>
            <div>
                <div class="asset-price">Rp ${formatCurrencyFull(asset.currentPrice)}</div>
                <div class="asset-change ${change >= 0 ? 'change-up' : 'change-down'}">${change.toFixed(2)}%</div>
            </div>
        </div>
        <div class="asset-chart"></div>
    `;
    card.addEventListener('click', () => openAssetModal(asset));
    // Panggil observer untuk menggambar grafik mini
    observeAndDrawChart(card.querySelector('.asset-chart'), asset.history, { days: 90, isMultiColor: true });
    return card;
}

function createPortfolioCard(asset) {
    const totalValue = asset.owned * asset.currentPrice;
    const card = document.createElement('div');
    card.className = 'asset-card';
    card.innerHTML = `
        <div class="asset-header">
            <div class="asset-icon"><i class="fas ${asset.icon}"></i></div>
            <div class="asset-info">
                <div class="asset-name">${asset.name} (${asset.owned} unit)</div>
                <div class="asset-symbol">Nilai Total</div>
            </div>
            <div class="asset-price">Rp ${formatCurrencyFull(totalValue)}</div>
        </div>
        <div class="asset-chart"></div>
    `;
    card.addEventListener('click', () => openAssetModal(asset));
    // Panggil observer untuk menggambar grafik mini
    observeAndDrawChart(card.querySelector('.asset-chart'), asset.history, { days: 90, isMultiColor: true });
    return card;
}

export function openAssetModal(asset) {
    gameData.selectedAsset = asset;
    const change = ((asset.currentPrice - asset.history[asset.history.length - 2]) / asset.history[asset.history.length - 2]) * 100 || 0;
    
    dom.modalAssetIcon.innerHTML = `<i class="fas ${asset.icon}"></i>`;
    dom.modalAssetName.textContent = asset.name;
    dom.modalAssetSymbol.textContent = asset.symbol;
    dom.modalAssetPrice.textContent = formatCurrencyFull(asset.currentPrice);
    dom.modalAssetChange.textContent = `${change.toFixed(2)}%`;
    dom.modalAssetChange.className = `asset-change ${change >= 0 ? 'change-up' : 'change-down'}`;
    dom.modalOwned.textContent = asset.owned;
    dom.assetAmountInput.value = 1;

    dom.assetModal.style.display = 'flex';
    // Panggil observer untuk menggambar grafik di modal
    observeAndDrawChart(dom.modalAssetChart, asset.history, { days: 365, isMultiColor: true });
}

export function closeAssetModal() {
    dom.assetModal.style.display = 'none';
}

export function showTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
    
    document.getElementById('dashboard-tab').style.display = 'none';
    document.getElementById('market-tab').style.display = 'none';
    document.getElementById('portfolio-tab').style.display = 'none';
    
    document.getElementById(`${tabName}-tab`).style.display = 'block';
}

export function showAssetType(type) {
    document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.sub-tab[data-asset-type="${type}"]`).classList.add('active');
    
    dom.stockMarketEl.style.display = (type === 'stock') ? 'grid' : 'none';
    dom.cryptoMarketEl.style.display = (type === 'crypto') ? 'grid' : 'none';
}
