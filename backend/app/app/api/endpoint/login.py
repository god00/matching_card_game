from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.db.get_db import get_db
from app.schemas.token import Token
from sqlalchemy.orm import Session
from app.crud import user as user_crud
from app.security import verify_password, create_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/token")

router = APIRouter(
    responses={404: {"description": "Not found"}},
)


def authenticate_user(db, username: str, password: str):
    user = user_crud.get_user_by_username(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(user.id)
    return {"access_token": access_token, "token_type": "bearer"}
