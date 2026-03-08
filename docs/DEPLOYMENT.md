# Deployment Guide

We provide a `docker-compose.yml` to spin up the entire application.

## Prerequisites
- Docker Engine & Docker Compose

## Quickstart

```bash
cd docker
docker-compose up --build -d
```

This will:
1. Initialize the `coldxrag` PostgreSQL database.
2. Automatically inject the `schema.sql` and `axioms_data.sql` scripts.
3. Boot the Flask backend on `http://localhost:5000`.

## Testing Output
Ensure the database has correctly inserted all axioms:
```bash
docker exec -it coldxrag-db-1 psql -U postgres -d coldxrag -c "SELECT count(*) FROM axioms;"
```
*(Should return exactly 372)*
