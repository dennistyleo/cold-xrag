/**
 * XRAG V37: Sovereign Specification Substrate
 * PURGE: Basic Calculus/High-School Logic
 * INJECT: Causal Inference, Stochastic Physics, and ASIC Carrier Dynamics
 */

const axioms = {
    // --- 321-330: TRANSPORTATION & SUPPLY CHAIN (STOCHASTIC) ---
    "XRAG-0321": { 
        name: "Stochastic Inventory Wiener Process", 
        equation: "dS_t = \\mu S_t dt + \\sigma S_t dW_t", 
        type: "anchor",
        plot: { type: "brownian_motion" }
    },
    "XRAG-0324": { 
        name: "ARIMA Bullwhip Variance", 
        equation: "(1-\\sum_{i=1}^p \\phi_i L^i)X_t = (1+\\sum_{i=1}^q \\theta_i L^i)\\epsilon_t", 
        type: "anchor",
        plot: { type: "time_series_forecast" }
    },

    // --- 341-350: POWER MANAGEMENT (CARRIER PHYSICS) ---
    "XRAG-0341": { 
        name: "Miller Plateau Charge Dynamics", 
        equation: "Q_{GD} = \\int_{t_1}^{t_2} [I_G(t) - C_{GS}\\frac{dV_{GS}}{dt}] dt", 
        type: "anchor",
        plot: { type: "vgs_plateau_curve" }
    },
    "XRAG-0345": { 
        name: "ASIC Thermal Diffusion Tensor", 
        equation: "\\rho C_p \\frac{\\partial T}{\\partial t} = \\nabla \\cdot (k \\nabla T) + Q_{gen}", 
        type: "anchor",
        plot: { type: "heat_map_3d" }
    },

    // --- 370-378: UPASL CAUSAL LOGIC (AG-SPEC) ---
    "XRAG-0373": { 
        name: "Causal Intervention (Do-Calculus)", 
        equation: "P(Y|do(X)) = \\int P(Y|X,Z)P(Z) dZ", 
        type: "anchor",
        plot: { type: "directed_acyclic_graph" }
    },
    "XRAG-0378": { 
        name: "Bayesian Structural Reliability", 
        equation: "R(t) = P(T > t) = \\exp(-\\int_0^t \\lambda(\\tau) d\\tau)", 
        type: "anchor",
        plot: { type: "survival_function" }
    }
};

// Background Population: Fill with Information Theory & Discrete Math (NO BASIC CALC)
const advancedPool = [
    { n: "Kullback-Leibler Divergence", e: "D_{KL}(P||Q) = \\sum P(i) \\log \\frac{P(i)}{Q(i)}" },
    { n: "Hamiltonian Monte Carlo", e: "H(p,q) = U(q) + \\frac{1}{2}p^T M^{-1} p" },
    { n: "Eigen-Decomposition Trace", e: "\\text{Tr}(A) = \\sum_{i=1}^n \\lambda_i" },
    { n: "Poisson Point Process", e: "P(N(B)=k) = \\frac{(\\Lambda(B))^k}{k!}e^{-\\Lambda(B)}" }
];

for (let i = 1; i <= 378; i++) {
    const id = "XRAG-" + String(i).padStart(4, "0");
    if (!axioms[id]) {
        const item = advancedPool[i % advancedPool.length];
        axioms[id] = { name: item.n, equation: item.e, type: "latent" };
    }
}
