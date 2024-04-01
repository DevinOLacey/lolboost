from fastapi import FastAPI  # , HTTPException
from fastapi.middleware.cors import CORSMiddleware

import os

from routers import accounts
from authenticator import authenticator

app = FastAPI()
app.include_router(accounts.router, tags=["accounts"])
app.include_router(authenticator.router, tags=["accounts"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# pipelines
@app.get("/")
def root():
    return {"message": "You hit the root path!"}
