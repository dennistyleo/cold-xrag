# COLD_XRAG | Operational SOP (Freeze-Ingest Driver Edition)

## Phase 1: DUT Setup & Agent Initialization
1. Ensure the DUT (Device Under Test) is connected.
2. Launch the Flask Backend (Port 5003):
   ```bash
   python3 app.py
Phase 2: Generating the Freeze Package
Execute the XRAG logic to generate a candidate.axiom or frozen.axiom JSON.

Grammar Check: Ensure payload.record.parameters keys match ^[a-zA-Z][a-zA-Z0-9_]{0,63}$.

Budget Check: Ensure the JSON is < 2MB and nesting depth is < 32.

Phase 3: Connecting to the Ingest Driver (Alex's Interface)
The driver acts as a stateless, deterministic validator (Contract v1.0.0).

Pipe the JSON: Redirect the XRAG freeze package to the driver's STDIN:

Bash
cat candidate_package.json | ./xrag-driver
Exit Code Audit:

0 (ACCEPT): Package is syntactically valid and compliant.

2 (REJECT): Budget or grammar violation (Check for forbidden tokens like exec or eval).

3 (REFUSE): Missing required bounds (requires_bounds=true but bounds incomplete).

Phase 4: Validating the Audit Record
Locate the output JSON from the driver.

Verify references.audit.sha256. This hash represents the stable canonical record of the axiom.

Once ACCEPT is received, the axiom is deployed to the Frozen Surface for diagnostic reasoning.

Contract Version: freeze-ingest-contract/1.0.0 | Prepared for AIChip Corp.
