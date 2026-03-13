# COLD_XRAG | Operational SOP (Baseline V42)

## Phase 0: Repository Acquisition
- git clone https://github.com/dennistyleo/cold-xrag.git

## Phase 1: Environment & Server
- conda activate xr-ml-env
- python3 app.py (Target: http://127.0.0.1:5003)

## Phase 2: Ingest Driver Integration (Contract v1.0.0)
- Input: STDIN (cat candidate.axiom | ./xrag-driver) [cite: 26]
- Budget: MAX 2MB, Nesting Depth 32 
- Grammar: No 'exec', 'eval', 'import' 
- Domain Invariant: Epsilon (ε) must be in [0, 1] [cite: 91]

## Phase 3: Exit Codes [cite: 137]
- 0: ACCEPT | 2: REJECT | 3: REFUSE | 64: BAD INPUT
