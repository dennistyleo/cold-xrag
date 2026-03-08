# Cold-XRAG API Documentation

## `/api/health`
**Method**: GET
Returns system health.

## `/api/domains`
**Method**: GET
Returns a list of 8 domains and metadata.

## `/api/categories?domain={domain}`
**Method**: GET
Returns categories for a domain.

## `/api/formulas?domain={domain}&category={cat}`
**Method**: GET
Returns formula nodes.

## `/api/analyze`
**Method**: POST
**Body**: `{"domain": "physics"}`
Starts L1-L5 execution job. Returns `job_id`.

## `/api/analysis/{id}`
**Method**: GET
Returns L1-L5 analysis results and metrics.
