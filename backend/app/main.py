import os
import uvicorn
import app.settings.config

from sqlalchemy.orm import Session
from fastapi import Depends, FastAPI, HTTPException, Request, Response
from typing import List
from typing import Optional
from os.path import join, dirname
from starlette.middleware.cors import CORSMiddleware
from app.api.api_v1 import api_router
from app.crud import user, game
from app.db.init_db import SessionLocal


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")
