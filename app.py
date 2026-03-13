from flask import Flask, render_template, jsonify
import random
import math

app = Flask(__name__)

# --- STRÜVER MODEL V4 CONSTANTS ---
# Reference: STRÜVER Model — Formula-Only.pdf
ALPHA = 0.20  
BETA = 0.40   
THETA = 0.45  
TAU_OUT = 0.05
K1, K2, K3 = 1.0, 1.5, 0.8 # Hazard weights

def softplus(x, tau):
    try:
        return tau * math.log(1 + math.exp(x / tau))
    except OverflowError:
        return x

@app.route('/')
def index():
    # Serves the stable V36 dashboard
    return render_template('dashboard.html')

@app.route('/api/telemetry')
def get_telemetry():
    """
    Computes Strüver Diagnostics for UPASL/IMS.
    Maps to V36 DOM via axiom_render.js.
    """
    # Generate 2-simplex domain shares
    shares = [random.uniform(0.1, 0.5) for _ in range(3)]
    total = sum(shares)
    rho = [s/total for s in shares]
    
    # D_band: Balance Band Violation
    d_band = sum([softplus(r - BETA, TAU_OUT) + softplus(ALPHA - r, TAU_OUT) for r in rho])
    
    # O: Overdominance Indicator
    o_indicator = softplus(max(rho) - THETA, TAU_OUT)
    
    # G: Instability Velocity
    g_velocity = random.uniform(0.01, 0.12)
    
    # h_tilde: Normalized Hazard Score
    h_raw = K1 * d_band + K2 * o_indicator + K3 * g_velocity
    h_tilde = 1 - math.exp(-h_raw)
    
    # Determine violation for JS visual leverage
    v_type = "none"
    if o_indicator > 0.02: v_type = "overdominance"
    elif d_band > 0.05: v_type = "imbalance"

    return jsonify({
        "h_tilde": h_tilde,
        "g_velocity": g_velocity,
        "violation_type": v_type,
        "financial_impact": h_tilde * 416.00 # Strategic value mapping
    })

if __name__ == '__main__':
    # Environment Locked to Port 5003 for V37
    app.run(port=5003, debug=True)
