# MCP API Spec

## Health
- GET /health/
- Response: { "status": "ok" }

## Predict
- POST /predict/
- Request: { "code": "<string>" }
- Response: { "output": "<string>" }

## Explain
- POST /explain/
- Request: { "code": "<string>" }
- Response: { "explanation": "<string>" }
