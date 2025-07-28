// js/utils.js
// Kumpulan fungsi utilitas umum yang digunakan di seluruh aplikasi.

import { notificationEl } from './dom.js';

// Format angka ke format mata uang ringkas (Rb, Jt)
export function formatCurrency(amount) {
    if (amount >= 1000000) {
        return (amount / 1000000).toFixed(amount < 10000000 ? 1 : 0) + 'Jt';
    }
    if (amount >= 1000) {
        return (amount / 1000).toFixed(amount < 10000 ? 1 : 0) + 'Rb';
    }
    return amount.toFixed(0);
}

// Format angka ke format mata uang Indonesia lengkap (dengan titik)
export function formatCurrencyFull(amount) {
    return Number(amount.toFixed(0)).toLocaleString('id-ID');
}

// Menampilkan notifikasi di layar
export function showNotification(message, isSuccess = true) {
    notificationEl.textContent = message;
    notificationEl.style.display = 'block';
    notificationEl.style.background = isSuccess 
        ? 'linear-gradient(to right, #00b09b, #96c93d)' 
        : 'linear-gradient(to right, #ff416c, #ff4b2b)';
    
    setTimeout(() => {
        notificationEl.style.display = 'none';
    }, 3000);
}

// Membuat data riwayat harga aset secara acak untuk simulasi
export function generate5YearHistory(basePrice, volatility) {
    const history = [];
    let currentPrice = basePrice;
    
    // Tambahkan data 5 tahun (1825 hari)
    for (let i = 0; i < 1825; i++) {
        // Simulasikan perubahan harga
        const changePercent = (Math.random() * 2 - 1) * volatility;
        currentPrice = Math.max(10, Math.round(currentPrice * (1 + changePercent)));
        history.push(currentPrice);
    }
    
    return history;
}