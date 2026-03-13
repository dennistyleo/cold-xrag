/**
 * XRAG IMS Integrated Controller
 * Handles Multilingual Toggle, UPASL Refusal, and Axiom Mapping
 */

let currentMode = "triage"; 
let currentLang = "en";

const i18n = {
    en: { start: "START PIPELINE", prompt: "Expert Prompt", triage: "Triage (UPASL)", deep: "Axiom Mapping" },
    cn: { start: "啟動分析流水線", prompt: "專家提示 (NL)", triage: "分診 (UPASL)", deep: "公理映射" },
    de: { start: "PIPELINE STARTEN", prompt: "Experten-Prompt", triage: "Triage (UPASL)", deep: "Axiom-Zuordnung" }
};

// 語言切換執行
function setAppLang(lang) {
    currentLang = lang;
    document.getElementById('active-lang').innerText = `🌐 ${lang.toUpperCase()}`;
    document.getElementById('prompt-label').innerText = i18n[lang].prompt;
    document.querySelector('.btn-pipeline').innerText = i18n[lang].start;
    document.getElementById('decision-label').innerText = `Mode: ${i18n[lang][currentMode]}`;
    addLog(`System localization switched to ${lang.toUpperCase()}.`);
}

// 切換獨立決策模式 (盾牌 vs 螺旋)
function toggleDecisionMode() {
    currentMode = (currentMode === "triage") ? "deep_dive" : "triage";
    document.getElementById('decision-label').innerText = `Mode: ${i18n[currentLang][currentMode]}`;
    document.getElementById('decision-icon').innerText = (currentMode === "triage") ? "🛡️" : "🧬";
    
    // 通知後端同步模式
    fetch('/api/config', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ mode: currentMode })
    });
    addLog(`Decision Engine mode set to ${currentMode.toUpperCase()}.`);
}

// 執行 IMS 流水線分析
async function executeIMSAnalysis() {
    const prompt = document.getElementById('nl-input').value;
    addLog(`Initiating pipeline: ${prompt || 'Default simulation'}`);
    
    try {
        const res = await fetch('/api/decision', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ source: 'NL', data: prompt })
        });
        const data = await res.json();
        
        renderResults(data);
    } catch (e) {
        addLog(`Pipeline Error: ${e.message}`, true);
    }
}

// 渲染三語結果與日誌
function renderResults(data) {
    const localized = data.locales[currentLang];
    const reportArea = document.getElementById('report-content');
    
    // 更新日誌 (強制使用英文數字日期解決中文時間問題)
    const time = new Date().toISOString().replace('T', ' ').substr(0, 19);
    addLog(`[${data.metadata.request_id}] ${localized.status}: ${localized.msg}`);

    // 更新中央報告區
    reportArea.innerHTML = `
        <div style="border-left: 4px solid ${data.code === 0 ? '#0f0' : '#f44'}; padding-left: 15px;">
            <h3 style="margin:0; color: ${data.code === 0 ? '#0f0' : '#f44'};">DECISION: ${localized.status}</h3>
            <p style="margin: 5px 0;"><b>Axiom Mapping:</b> ${localized.axiom}</p>
            <p style="font-size: 12px; color: #888;">Hash: ${data.metadata.sha256}</p>
            <p style="font-size: 13px; color: #ccc;">${localized.details || localized.msg}</p>
        </div>
    `;
}

function addLog(msg, isError = false) {
    const log = document.getElementById('activity-log');
    const entry = document.createElement('div');
    entry.style.color = isError ? '#f44' : '#0c0';
    entry.style.marginBottom = '2px';
    entry.innerText = `> ${msg}`;
    log.prepend(entry);
}
document.addEventListener('click', (e) => {
    if(e.target.textContent.includes('375')) alert('IMPACT: .00');
});

/* V37 IMPACT LOGIC */
document.addEventListener('click', (e) => {
    if(e.target.textContent.includes('375')) {
        alert('QUANTIFIED IMPACT: .00');
    }
});
