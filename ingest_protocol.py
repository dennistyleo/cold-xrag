import time
import random
import requests

# 針對 Cold_XRAG V40 Master 進行實時數據注入
def run_ingestion():
    print("🚀 [SOVEREIGN_INGEST] Starting Data Stream to Cold_XRAG...")
    endpoint = "http://127.0.0.1:5003/ingest" # 假設您的 Flask 接收路徑
    
    while True:
        # 模擬 PHM 軸承數據
        eta = round(random.uniform(0.18, 0.35), 4)
        packet = {
            "uuid": "4ec055ab",
            "timestamp": time.time(),
            "metrics": {"eta": eta, "temp": 42.5 + random.random()},
            "status": "CRITICAL" if eta > 0.25 else "STABLE"
        }
        
        # 模擬終端機輸出
        print(f"> [INGEST] Packet: {packet['uuid']} | ETA: {eta} | {'🚨 BREACH' if eta > 0.25 else '✅ OK'}")
        
        # 如果 Flask 已啟動，此處可執行 POST 送出數據
        # try: requests.post(endpoint, json=packet)
        # except: pass
        
        time.sleep(1.5)

if __name__ == "__main__":
    run_ingestion()
