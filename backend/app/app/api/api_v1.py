from fastapi import APIRouter

from .endpoint import user, game, login

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(user.router, prefix="/users", tags=["users"])
api_router.include_router(game.router, prefix="/games", tags=["games"])