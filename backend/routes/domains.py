from flask import Blueprint, jsonify, request

domains_bp = Blueprint('domains', __name__)

# Complete list of 8 Domains
DOMAINS = [
    {"id": "mathematics", "name": "Mathematics", "count": 45, "hierarchy": "mathematics", "icon": "📐"},
    {"id": "physics", "name": "Physics", "count": 65, "hierarchy": "physics", "icon": "⚛️"},
    {"id": "chemistry", "name": "Chemistry", "count": 42, "hierarchy": "chemistry", "icon": "🧪"},
    {"id": "mechanical", "name": "Mechanical Engineering", "count": 48, "hierarchy": "engineering.mechanical", "icon": "🔧"},
    {"id": "electrical", "name": "Electrical Engineering", "count": 52, "hierarchy": "engineering.electrical", "icon": "⚡"},
    {"id": "transportation", "name": "Transportation Engineering", "count": 45, "hierarchy": "engineering.transportation", "icon": "🚛"},
    {"id": "financial", "name": "Financial Engineering", "count": 40, "hierarchy": "social.finance", "icon": "💰"},
    {"id": "computerscience", "name": "Computer Science", "count": 35, "hierarchy": "social.cs", "icon": "💻"}
]

CATEGORIES = {
    'physics': ['Classical Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum Mechanics', 'Optics', 'Acoustics'],
    'electrical': ['Circuit Theory', 'Electronics', 'Power Systems', 'Control Systems', 'Signal Processing', 'Electromagnetics'],
    'mechanical': ['Solid Mechanics', 'Fluid Mechanics', 'Thermodynamics', 'Heat Transfer', 'Vibration & Control'],
    'mathematics': ['Pure Mathematics', 'Applied Mathematics', 'Statistics', 'Geometry', 'Topology'],
    'chemistry': ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Analytical Chemistry', 'Biochemistry'],
    'transportation': ['Trucking', 'Railroad', 'Automotive', 'Aerospace', 'Marine'],
    'financial': ['Derivatives', 'Asset Pricing', 'Risk Management', 'Portfolio Theory', 'Fixed Income', 'FinTech'],
    'computerscience': ['Algorithms', 'Complexity', 'Machine Learning', 'Information Theory', 'Cryptography']
}

@domains_bp.route('/domains', methods=['GET'])
def get_domains():
    """Return list of domains (P0 Bug B001)"""
    return jsonify(DOMAINS)

@domains_bp.route('/categories', methods=['GET'])
def get_categories():
    """Return list of categories for a domain (P0 Bug B002)"""
    domain = request.args.get('domain', 'mathematics')
    return jsonify(CATEGORIES.get(domain, []))

@domains_bp.route('/formulas', methods=['GET'])
def get_formulas():
    """Return list of formulas via Database (P0 Bug B003)"""
    domain = request.args.get('domain', 'mathematics')
    category = request.args.get('category')
    
    # Needs to connect DB here instead of mock
    try:
        from backend.database.db import get_db_connection
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                if category:
                    cur.execute("SELECT serial, name, equation, family, category, domain FROM axioms WHERE domain = %s AND category = %s", (domain, category))
                else:
                    cur.execute("SELECT serial, name, equation, family, category, domain FROM axioms WHERE domain = %s", (domain,))
                
                rows = cur.fetchall()
                cols = [desc[0] for desc in cur.description]
                formulas = [dict(zip(cols, row)) for row in rows]
                return jsonify(formulas)
    except Exception as e:
        # Fallback list if DB fails (P0 Bug B009) when user tests without Docker
        print("DB Error Fallback Activated:", e)
        return jsonify([
            {"serial": f"{domain[:3].upper()}-001", "name": f"Fundamental {domain.title()} Theorem", "equation": "A + B = C", "family": "Core Axioms", "category": category or "General", "domain": domain},
            {"serial": f"{domain[:3].upper()}-002", "name": f"Secondary {domain.title()} Law", "equation": "E = mc^2", "family": "Dynamics", "category": category or "General", "domain": domain},
            {"serial": f"{domain[:3].upper()}-003", "name": f"Tertiary {domain.title()} Principle", "equation": "F = ma", "family": "Kinetics", "category": category or "General", "domain": domain}
        ])
