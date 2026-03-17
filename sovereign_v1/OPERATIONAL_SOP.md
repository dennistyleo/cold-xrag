# COLD_XRAG | Operational Manual & Sovereign Protocol (V36)

## **1. SYSTEM INITIALIZATION (Quick Start)**
To engage the sovereign audit substrate, the auditor must establish a local secure environment.

### **Step A: Environment Setup**
```bash
# Initialize local substrate
cd cold-xrag/sovereign_v1
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
pip install flask flask-cors numpy scipy
```

### **Step B: Launching the Substrate**
```bash
# Start the Backend Driver (Targeting Port 5003)
python3 app.py 

# Access the High-Fidelity Terminal
open http://127.0.0.1:5003
```

---

## **2. AUDIT WORKFLOW (The 4-Phase Protocol)**

### **Phase 1: Axiom Selection (L1-L2)**
- Navigate the **378-Axiom Library** via the sidebar.
- **Single Click:** Engages the claim (Gold Breathe animation).
- **Double Click:** Disengages/Resets the claim.
- *Note: 6 Invariants ($C_{\phi}$) are locked to ensure mathematical stability.*

### **Phase 2: Multidimensional Mapping (L3-L4)**
- **WORLD View:** Inspect the 3D material lattice. Ripples indicate structural stress admissibility.
- **CAUSAL View:** Monitor the branching DAG. Splines map the non-linear risk correlation between active axioms.

### **Phase 3: Formal Verification (L5)**
- Click **[GENERATE AUDIT REPORT]**.
- The system will freeze the current manifold and calculate the **Substrate Executive Score**.

### **Phase 4: Consensus Export**
- Capture the **Final Audit Hash** (SHA-256 fingerprint).
- Export the report as a PDF-ready package for IEEE/Investor review.

---

## **3. PROJECT ARCHITECTURE & ASSETS**
- **index.html:** Master Frontend (4K Material World / Fixed L5 Modals).
- **app.py:** Flask-based Backend (Signal Processing & API).
- **axioms.db:** SQLite database containing the full 378-equation library.
- **static/:** Asset directory for GNN textures and UI components.

---

## **4. COMPLIANCE & CONTACT**
**Classification:** Sovereign Baseline V36 (Fully Operational)  
**Lead Architect:** Dennis Leo (dennisleo@aichip.tw)
