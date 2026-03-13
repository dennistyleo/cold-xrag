from flask import Flask, render_template, jsonify
import random
import math

app = Flask(__name__)

# --- STRÜVER MODEL CONSTANTS (V37 PHYSICAL BASELINE) ---
ALPHA = 0.20  # Lower balance bound
BETA = 0.40   # Upper balance bound
THETA = 0.45  # Overdominance threshold
TAU_OUT = 0.05
K1, K2, K3, K4 = 1.0, 1.5, 0.8, 0.5  # Hazard weighting constants

def softplus(x, tau):
    try:
        return tau * math.log(1 + math.exp(x / tau))
    except OverflowError:
        return x

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/api/telemetry')
def get_telemetry():
    """
    Simulates live DUT analysis using Strüver Model diagnostics.
    Provides the data for UPASL (Security) and IMS (Monitoring).
    """
    # Simulate Domain Shares (rho_i) for a TRIAS architecture
    shares = [random.uniform(0.1, 0.5) for _ in range(3)]
    total = sum(shares)
    rho = [s/total for s in shares]
    
    # 1. Calculate Balance Band Violation (D_band)
    d_band = sum([softplus(r - BETA, TAU_OUT) + softplus(ALPHA - r, TAU_OUT) for r in rho])
    
    # 2. Calculate Overdominance Indicator (O)
    o_indicator = softplus(max(rho) - THETA, TAU_OUT)
    
    # 3. Calculate Instability Velocity (G)
    g_velocity = random.uniform(0.01, 0.15) # Simulated rate of change
    
    # 4. Calculate Raw Hazard (h_raw) and Normalized Hazard (h_tilde)
    h_raw = K1 * d_band + K2 * o_indicator + K3 * g_velocity
    h_tilde = 1 - math.exp(-h_raw)
    
    # Determine Violation Type for JS Leverage
    violation_type = "none"
    if o_indicator > 0.01:
        violation_type = "overdominance"
    elif d_band > 0.05:
        violation_type = "imbalance"

    return jsonify({
        "h_tilde": h_tilde,
        "g_velocity": g_velocity,
        "d_band": d_band,
        "o_indicator": o_indicator,
        "violation_type": violation_type,
        "financial_impact": h_tilde * 416.00 # Mapping to V37 economic authority
    })

if __name__ == '__main__':
    # Environment Locked to Port 5003
    app.run(port=5003, debug=True)
