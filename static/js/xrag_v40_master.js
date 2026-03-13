/**
 * COLD_XRAG V40 - FINAL SOVEREIGN MASTER
 * 鎖定物理佈局，動態注入功能，徹底終結漂移。
 */
const XRAG_Master = {
    init() {
        this.applyVFX();
        this.bindAxioms();
        console.log("Sovereign V40 Master Plugin: Active on V36 Base.");
    },
    applyVFX() {
        const style = document.createElement('style');
        style.innerHTML = `
            .leveraged { 
                color: #dfbf37 !important; border-left: 2px solid #dfbf37 !important;
                background: linear-gradient(90deg, rgba(223,191,55,0.08) 0%, transparent 100%);
                animation: breathe 3s ease-in-out infinite; font-weight: bold;
            }
            @keyframes breathe { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 2px #dfbf37); } 50% { opacity: 0.5; filter: drop-shadow(0 0 8px #dfbf37); } }
            #audit-modal-v40 { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.98); backdrop-filter: blur(30px); display: none; justify-content: center; align-items: center; z-index: 9999; }
        `;
        document.head.appendChild(style);
        
        // 建立診斷彈窗 DIV (不改動 HTML 原始碼)
        const modal = document.createElement('div');
        modal.id = 'audit-modal-v40';
        modal.innerHTML = '<div style="width:1100px; height:700px; background:#0a0a0a; border:1px solid #222; display:grid; grid-template-columns:350px 1fr; border-radius:4px; overflow:hidden;">' +
            '<aside style="background:#0d0d0d; border-right:1px solid #1a1a1a; padding:45px; display:flex; flex-direction:column;">' +
            '<div style="font-size:10px; color:#dfbf37; margin-bottom:40px; letter-spacing:3px;">STRATEGIC AUDIT</div>' +
            '<div style="font-size:32px; font-weight:bold; color:#dfbf37;" id="m-trust">100%</div><div style="font-size:9px; color:#444;">TRUST ENTROPY</div>' +
            '<button onclick="document.getElementById(\'audit-modal-v40\').style.display=\'none\'" style="margin-top:auto; padding:15px; background:none; border:1px solid #333; color:#888; cursor:pointer;">CLOSE</button></aside>' +
            '<main style="padding:80px; text-align:center;"><div id="m-node-id" style="width:120px; height:120px; border:2px solid #dfbf37; border-radius:50%; margin:0 auto; display:flex; align-items:center; justify-content:center; color:#dfbf37; font-size:28px; font-weight:bold;">375</div>' +
            '<h2 id="m-status" style="margin-top:50px; color:#39FF14;">STATUS: VALIDATED</h2><p id="m-msg" style="color:#777; margin-top:20px; line-height:2.4;">Sovereign Verified: Physical causality enforced.</p></main></div>';
        document.body.appendChild(modal);
    },
    bindAxioms() {
        const ax375 = document.getElementById('axiom-375-leaf');
        if (ax375) {
            ax375.classList.add('leveraged');
            ax375.onclick = () => this.triggerAudit('375');
        }
    },
    triggerAudit(id) {
        document.getElementById('audit-modal-v40').style.display = 'flex';
        const rej = (id === '375');
        document.getElementById('m-status').innerText = rej ? "STATUS: REJECTED" : "STATUS: VALIDATED";
        document.getElementById('m-status').style.color = rej ? "#FF3131" : "#39FF14";
        document.getElementById('m-msg').innerText = rej ? "CRITICAL_REJECTION: Value violates Carnot Bedrock (eta <= 0.25)." : "Aligned with Sovereign Ontology.";
        document.getElementById('m-trust').innerText = rej ? "0%" : "100%";
        
        // 觸發 3D 曲線聯動
        if(window.app && typeof window.app.render === 'function') {
            window.app.render('world'); // V36 原生 Lorenz 視圖
        }
    }
};
window.addEventListener('load', () => XRAG_Master.init());
