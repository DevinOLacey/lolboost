from fastapi import FastAPI  # , HTTPException
from fastapi.middleware.cors import CORSMiddleware

# from fastapi.staticfiles import StaticFiles
import os

# from routers import card, posts, accounts, collection
# from authenticator import authenticator

app = FastAPI()


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
