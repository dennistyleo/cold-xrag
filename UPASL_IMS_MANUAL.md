# COLD_XRAG | Operational SOP (V36 Frozen Contract)

## Step 1: Physical DUT Setup
1. Connect the **Device Under Test (DUT)** to the local network bridge.
2. Ensure the Flask server is initialized on the host machine:
   ```bash
   python3 app.py
Confirm UI Accessibility: http://127.0.0.1:5003.

Step 2: Parameter Input & Ingestion
Verify ingest_protocol.py is configured with the target device UUID (4ec055ab).

Input target efficiency thresholds (e.g., Carnot η = 0.25) in the backend config.

Start the Ingestion Pulse:

Bash
python3 ingest_protocol.py
Output Verification: Observe the IMS: MONITOR window. Raw hex packets must flow immediately; the Agent will auto-detect the device type and map relevant axioms.

Step 3: The Reasoning Process
Selection: Click the Axiom 375 node (Domain 02: Physics) in the sidebar.

Analysis: Navigate to the CAUSAL tab to view the Granger Matrix.

Abduction: If the system score (0.854) drifts, observe the WORLD canvas. The Agent will cross-reference 17 domains to identify the specific axiom breach.

Step 4: Final Output & Report
Click GENERATE AUDIT REPORT (Bottom Right).

The output must present Admissibility Metrics for the DUT.

Requirement Met: Final report must be signed by the Agent UUID to meet the "Frozen Contract" specifications.

Operational Integrity Level: Sovereign | Author: Dennis Leo
