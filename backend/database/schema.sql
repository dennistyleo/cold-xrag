CREATE TABLE axioms (
    serial VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    equation TEXT NOT NULL,
    family VARCHAR(100),
    domain VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    parameters JSONB,
    applications JSONB,
    latex TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain VARCHAR(50) NOT NULL,
    signal_data JSONB NOT NULL,
    l1_results JSONB,
    l2_results JSONB,
    l3_results JSONB,
    l4_results JSONB,
    l5_results JSONB,
    audit_hash VARCHAR(64) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add missing P0 indexes
CREATE INDEX idx_axioms_domain ON axioms(domain);
CREATE INDEX idx_axioms_category ON axioms(category);
CREATE INDEX idx_axioms_family ON axioms(family);
