import json

# 模擬 Strüver 功能邏輯的狀態向量 x(t) [cite: 10-11]
mock_state = {
    "S": 0.61,  # Energy Balance (Strength)
    "M": 0.375, # Thermodynamic (Morality)
    "W": 0.255  # System Load (Knowledge)
}

def mock_evaluator(state):
    # 執行 Strüver 歸一化穩定性指標計算 [cite: 77-79]
    phi_star = (0.4 * state["S"]) + (0.3 * state["M"]) + (0.3 * state["W"])
    
    # 執行 70/30 定律檢查: 假設秩序部分為 0.3 [cite: 203-208]
    is_admissible = 0.25 <= (state["M"]) <= 0.45 # 寬容帶測試 [cite: 209-210]
    
    return {
        "integrity": round(phi_star, 3),
        "decision": "ACCEPT" if is_admissible else "REJECT",
        "rationale": "Within stability corridor" if is_admissible else "Drift out of bounds"
    }

result = mock_evaluator(mock_state)
print(f"Test Result: {json.dumps(result, indent=2)}")

