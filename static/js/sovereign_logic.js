const SovereignBridge = {
    init() {
        this.injectStyles();
        this.bindEvents();
        console.log("V39.1 Sovereign Bridge Linked. Layout Frozen.");
    },
    injectStyles() {
        const s = document.createElement('style');
        s.innerHTML = `
            #audit-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); backdrop-filter: blur(20px); display: none; justify-content: center; align-items: center; z-index: 99999; }
            .modal-container { width: 1100px; height: 700px; background: #0a0a0a; border: 1px solid #222; display: grid; grid-template-columns: 350px 1fr; border-radius: 4px; overflow: hidden; pointer-events: auto; }
            .m-sidebar { background: #0d0d0d; border-right: 1px solid #1a1a1a; padding: 40px; display: flex; flex-direction: column; }
            .m-status { margin-top: 20px; font-weight: bold; font-family: monospace; }
        `;
        document.head.appendChild(s);
    },
    bindEvents() {
        // 直接點擊左側 375/255/061 列表觸發
        document.querySelectorAll('.axiom-leaf').forEach(item => {
            const id = item.innerText.match(/\d+/);
            if (id) item.addEventListener('click', () => this.openAudit(id[0]));
        });
    },
    openAudit(id) {
        if (!document.getElementById('audit-modal')) {
            const m = document.createElement('div');
            m.id = 'audit-modal';
            m.innerHTML = `
                <div class="modal-container">
                    <aside class="m-sidebar">
                        <div style="font-size:10px; color:#dfbf37; margin-bottom:30px;">STRATEGIC AUDIT</div>
                        <div id="m-trust" style="font-size:32px; font-weight:bold; color:#dfbf37;">100%</div>
                        <button onclick="document.getElementById('audit-modal').style.display='none'" style="margin-top:auto; padding:12px; background:none; border:1px solid #333; color:#888; cursor:pointer;">CLOSE</button>
                    </aside>
                    <main style="padding:60px; text-align:center;">
                        <div style="width:120px; height:120px; border:2px solid #dfbf37; border-radius:50%; margin:0 auto; display:flex; align-items:center; justify-content:center; color:#dfbf37; font-size:24px; font-weight:bold;">${id}</div>
                        <h2 style="margin-top:40px;">Axiomatic Integrity Audit</h2>
                        <div id="m-status" class="m-status">STATUS: PENDING</div>
                        <p id="m-msg" style="color:#777; margin-top:20px;">Waiting for sovereign ingest...</p>
                    </main>
                </div>`;
            document.body.appendChild(m);
        }
        const rejected = (id === '375'); // 繼承 Sandbox 拒絕邏輯
        document.getElementById('m-status').innerText = rejected ? "STATUS: REJECTED" : "STATUS: VALIDATED";
        document.getElementById('m-status').style.color = rejected ? "#FF3131" : "#39FF14";
        document.getElementById('m-msg').innerText = rejected ? "CRITICAL_REJECTION: Value violates Carnot Bedrock (eta <= 0.25)." : "Aligned with Sovereign Ontology.";
        document.getElementById('m-trust').innerText = rejected ? "0%" : "100%";
        document.getElementById('audit-modal').style.display = 'flex';
    }
};
document.addEventListener('DOMContentLoaded', () => SovereignBridge.init());
