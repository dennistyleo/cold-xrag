import sys
import os
import json

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
try:
    from cold_xrag import FORMULAS
except ImportError:
    print("Could not import FORMULAS from cold_xrag.py")
    sys.exit(1)

out_file = os.path.join(os.path.dirname(__file__), "axioms_data.sql")

with open(out_file, "w") as f:
    f.write("DELETE FROM axioms;\n")
    
    serial_num = 1
    for domain, flist in FORMULAS.items():
        for item in flist:
            name = item.get("name", "").replace("'", "''")
            equation = item.get("equation", "").replace("'", "''")
            family = item.get("family", "").replace("'", "''")
            category = item.get("category", "").replace("'", "''")
            serial = f"AX{serial_num:03d}"
            
            f.write(f"INSERT INTO axioms (serial, name, equation, family, domain, category) ")
            f.write(f"VALUES ('{serial}', '{name}', '{equation}', '{family}', '{domain}', '{category}');\n")
            
            serial_num += 1

print(f"Generated {serial_num - 1} SQL insert statements in {out_file}.")
