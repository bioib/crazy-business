// js/chart.js
// Logika untuk menggambar grafik menggunakan SVG, dipicu oleh IntersectionObserver.

/**
 * Peta untuk menyimpan data dan opsi yang terkait dengan setiap elemen grafik.
 * Ini memungkinkan observer untuk mengambil data yang benar saat elemen terlihat.
 */
const chartDataMap = new Map();

/**
 * Observer yang akan memicu penggambaran grafik saat elemen masuk ke viewport.
 */
const chartObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Jika elemen terlihat di layar
        if (entry.isIntersecting) {
            const container = entry.target;
            // Ambil data dan opsi yang tersimpan untuk elemen ini
            const { data, options } = chartDataMap.get(container);
            
            // Gambar grafik
            renderChart(container, data, options);
            
            // Hapus data dari peta dan berhenti mengamati elemen ini untuk menghemat sumber daya
            chartDataMap.delete(container);
            observer.unobserve(container);
        }
    });
}, { threshold: 0.01 }); // Picu bahkan jika hanya 1% elemen terlihat

/**
 * Fungsi publik untuk mulai mengamati elemen kontainer dan menggambar grafik saat terlihat.
 * @param {HTMLElement} container - Elemen kontainer untuk grafik.
 * @param {number[]} data - Array data numerik untuk grafik.
 * @param {object} options - Opsi kustomisasi untuk grafik.
 */
export function observeAndDrawChart(container, data, options = {}) {
    if (!container || !data || data.length < 2) {
        return; // Jangan lakukan apa-apa jika tidak ada kontainer atau data yang cukup
    }
    // Simpan data dan opsi agar bisa diakses oleh observer nanti
    chartDataMap.set(container, { data, options });
    // Mulai amati elemen
    chartObserver.observe(container);
}

/**
 * Fungsi inti yang melakukan penggambaran SVG.
 * @param {HTMLElement} container - Elemen kontainer untuk menempatkan SVG.
 * @param {number[]} allData - Array data lengkap.
 * @param {object} options - Opsi seperti { days, isMultiColor, stroke }.
 */
function renderChart(container, allData, options) {
    container.innerHTML = '';
    const data = allData.slice(-(options.days || allData.length));
    if (data.length < 2) return;

    const chartHeight = container.clientHeight;
    const chartWidth = container.clientWidth;

    if (chartHeight === 0 || chartWidth === 0) {
        console.warn('Gagal menggambar grafik: Dimensi kontainer adalah nol.', container);
        return;
    }

    const svg = createSvgElement('svg', { 
        width: '100%', 
        height: '100%', 
        viewBox: `0 0 ${chartWidth} ${chartHeight}`, 
        preserveAspectRatio: 'none' 
    });

    const maxValue = Math.max(...data);
    const minValue = options.isMultiColor ? Math.min(...data) : Math.min(0, ...data);
    const valueRange = maxValue - minValue || 1;

    if (options.isMultiColor) {
        // Gambar segmen garis berwarna untuk grafik mini
        let lastY = chartHeight - ((data[0] - minValue) / valueRange) * chartHeight;
        for (let i = 1; i < data.length; i++) {
            const x1 = ((i - 1) / (data.length - 1)) * chartWidth;
            const x2 = (i / (data.length - 1)) * chartWidth;
            const y2 = chartHeight - ((data[i] - minValue) / valueRange) * chartHeight;
            if (!isFinite(x1) || !isFinite(lastY) || !isFinite(x2) || !isFinite(y2)) continue;
            
            const color = data[i] >= data[i-1] ? '#2ecc71' : '#e74c3c';
            svg.appendChild(createPathSegment(x1, lastY, x2, y2, color));
            lastY = y2;
        }
    } else {
        // Gambar satu garis utuh untuk grafik utama
        let pathData = '';
        for (let i = 0; i < data.length; i++) {
            const x = (i / (data.length - 1)) * chartWidth;
            const y = chartHeight - ((data[i] - minValue) / valueRange) * chartHeight;
            if (!isFinite(x) || !isFinite(y)) continue;
            pathData += `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
        }
        const path = createSvgElement('path', {
            d: pathData,
            stroke: options.stroke || '#00c9ff',
            'stroke-width': 2,
            fill: 'none',
            'vector-effect': 'non-scaling-stroke'
        });
        svg.appendChild(path);
    }
    
    container.appendChild(svg);
}

// Helper untuk membuat elemen SVG
function createSvgElement(tag, attributes) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
    return el;
}

// Helper untuk membuat segmen path SVG
function createPathSegment(x1, y1, x2, y2, stroke) {
    return createSvgElement('path', {
        d: `M ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)}`,
        stroke: stroke,
        'stroke-width': 2,
        fill: 'none',
        'vector-effect': 'non-scaling-stroke'
    });
}
