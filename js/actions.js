// js/actions.js
// Menangani semua aksi yang dapat dilakukan pengguna, seperti membeli, menjual, atau bekerja.

import { gameData } from './state.js';
import { workLevels } from './config.js';
import { assetAmountInput } from './dom.js';
import { showNotification, formatCurrencyFull } from './utils.js';
import { updateUI, closeAssetModal } from './ui.js';

export function work() {
    const currentLevel = workLevels[gameData.workLevel - 1];
    const earnAmount = currentLevel.earnAmount;

    if (gameData.workEarned >= currentLevel.max) {
        if (gameData.workLevel < workLevels.length) {
            showNotification(`Anda harus naik ke Level ${gameData.workLevel + 1} untuk lanjut bekerja!`, false);
        } else {
            showNotification('Anda sudah mencapai level maksimal!', false);
        }
        return;
    }

    // Cek untuk naik level
    if (gameData.workEarned + earnAmount > currentLevel.max) {
        if (gameData.workLevel < workLevels.length) {
            const nextLevel = workLevels[gameData.workLevel];
            if (gameData.balance >= nextLevel.cost) {
                gameData.balance -= nextLevel.cost;
                gameData.workLevel++;
                gameData.workEarned = 0;
                gameData.history.push({ type: 'level', level: gameData.workLevel, timestamp: new Date() });
                showNotification(`Selamat! Anda naik ke Level ${gameData.workLevel}!`);
            } else {
                showNotification(`Dana tidak cukup untuk naik level (butuh ${formatCurrencyFull(nextLevel.cost)})`, false);
                return;
            }
        }
    }

    gameData.balance += earnAmount;
    gameData.workEarned += earnAmount;
    gameData.history.push({ type: 'work', amount: earnAmount, timestamp: new Date() });
    showNotification(`Anda mendapatkan Rp ${formatCurrencyFull(earnAmount)} dari bekerja!`);
    updateUI();
}

export function buyAsset() {
    const asset = gameData.selectedAsset;
    if (!asset) return;

    const amount = parseInt(assetAmountInput.value);
    if (isNaN(amount) || amount <= 0) {
        showNotification('Masukkan jumlah yang valid', false);
        return;
    }

    const totalCost = amount * asset.currentPrice;
    if (totalCost > gameData.balance) {
        showNotification('Saldo tidak mencukupi', false);
        return;
    }

    gameData.balance -= totalCost;
    asset.owned += amount;
    gameData.history.push({ type: 'buy', assetName: asset.symbol, amount, price: asset.currentPrice, timestamp: new Date() });
    showNotification(`Berhasil membeli ${amount} unit ${asset.name}!`);
    updateUI();
    closeAssetModal();
}

export function sellAsset() {
    const asset = gameData.selectedAsset;
    if (!asset) return;
    
    const amount = parseInt(assetAmountInput.value);
    if (isNaN(amount) || amount <= 0) {
        showNotification('Masukkan jumlah yang valid', false);
        return;
    }

    if (amount > asset.owned) {
        showNotification('Anda tidak memiliki cukup aset', false);
        return;
    }

    const totalValue = amount * asset.currentPrice;
    gameData.balance += totalValue;
    asset.owned -= amount;
    gameData.history.push({ type: 'sell', assetName: asset.symbol, amount, price: asset.currentPrice, timestamp: new Date() });
    showNotification(`Berhasil menjual ${amount} unit ${asset.name}!`);
    updateUI();
    closeAssetModal();
}