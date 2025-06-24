# AI Service

This FastAPI application exposes machine learning capabilities. Start with `uvicorn main:app`.

### `/generate-program`

POST a JSON body `{ "description": "adults with autism" }` and receive a response
with a generated program title and description. CORS is enabled for all origins.
