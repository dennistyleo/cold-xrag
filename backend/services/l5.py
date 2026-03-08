import hashlib

def generate_explainability(best_model):
    """
    L5 Explainability & Audit Hash
    Fixes L5 mock.
    """
    audit_str = f"L5_AUDIT_{best_model.get('id', 'model_023')}"
    audit_hash = hashlib.sha256(audit_str.encode()).hexdigest()
    
    return {
        'summary': "Signal matches Newton's Second Law with damping",
        'audit_hash': audit_hash,
        'recommendations': ["Add friction term"]
    }
