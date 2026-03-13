/**
 * XRAG V37: Sovereign GMN Visualizer
 * REMOVE: Toy-like spirals
 * ADD: Industrial Point-Grid Substrate
 */

function refreshGMNViewport() {
    const container = document.getElementById('gmn-viewport');
    if (!container) return;

    // 清空現有的廉價視覺元素
    container.innerHTML = '<div id="formula-overlay" class="gmn-formula-overlay"></div>';
    
    // 創建一個極細的點陣背景 (Point Grid)
    const grid = document.createElement('canvas');
    grid.id = 'gmn-grid-canvas';
    grid.style.cssText = "position:absolute; top:0; left:0; width:100%; height:100%; z-index:1; opacity:0.15;";
    container.appendChild(grid);

    const ctx = grid.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    grid.width = container.clientWidth * dpr;
    grid.height = container.clientHeight * dpr;

    // 繪製專業的點陣
    ctx.fillStyle = "#00ff88";
    const gap = 20 * dpr;
    for (let x = 0; x < grid.width; x += gap) {
        for (let y = 0; y < grid.height; y += gap) {
            ctx.fillRect(x, y, 1 * dpr, 1 * dpr);
        }
    }

    console.log("GMN Substrate: Toy-logic purged. Industrial grid active.");
}

// 點擊公理時，只更新公式，不產生多餘動畫
window.updateGMN = function(data) {
    const overlay = document.getElementById('formula-overlay');
    if (overlay && data) {
        overlay.style.fontSize = "2.5rem";
        overlay.style.color = "#00ff88";
        overlay.innerHTML = `$$${data.equation}$$`;
        if (window.MathJax) MathJax.typesetPromise([overlay]);
    }
}

window.onload = refreshGMNViewport;
