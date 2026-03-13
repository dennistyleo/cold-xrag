/**
 * COLD_XRAG V40 - Sovereign Logic Plugin
 * 外部掛載模式：嚴禁修改 HTML 原始碼，確保佈局零漂移。
 */
const XRAG_Master = {
    init() {
        this.injectStyles();
        this.bindEvents();
        console.log("V40 Master Plugin Linked. HTML Structure Intact.");
    },
    injectStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .leveraged { 
                color: #dfbf37 !important; border-left: 2px solid #dfbf37 !important;
                background: linear-gradient(90deg, rgba(223,191,55,0.08) 0%, transparent 100%);
                animation: breathe 3s ease-in-out infinite;
            }
            @keyframes breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            #audit-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.98); backdrop-filter: blur(25px); display: none; justify-content: center; align-items: center; z-index: 9999; }
        `;
        document.head.appendChild(style);
    },
    bindEvents() {
        // 綁定 V36 原有的 Axiom 375 節點
        const ax375 = document.getElementById('axiom-375-leaf');
        if (ax375) {
            ax375.classList.add('leveraged');
            // 覆蓋點擊事件以顯示 Sandbox 診斷視窗
            ax375.onclick = () => this.triggerAudit('375');
        }
    },
    triggerAudit(id) {
        alert("CRITICAL_REJECTION: Axiom 375 violates Carnot Bedrock (eta <= 0.25).\nSovereign Ingest Verified: Physical causality enforced.");
        // 未來這裡可以動態生成 Modal DIV，而不需預存在 HTML 中
    }
};
XRAG_Master.init();
