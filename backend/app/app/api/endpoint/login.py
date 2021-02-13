from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError
from sqlalchemy.orm import Session
from app.db.get_db import get_db
from app.schemas.token import Token, TokenData
from app.schemas.user import UserCreate
from app.crud import user as user_crud
from app.security import verify_password, create_access_token, decode_access_token

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

def verify_access_token(token: str, expection = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Token",
            headers={"WWW-Authenticate": "Bearer"},
        )):
    try:
        payload = decode_access_token(token)
        user_id: int = payload.get("id")
        if user_id is None:
            raise expection
        token_data = TokenData(user_id=user_id)
    except JWTError:
        raise expection
    return token_data

def login(username: str, password: str, db: Session):
    user = authenticate_user(db, username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(user.id)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/token/", response_model=Token)
async def get_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return login(form_data.username, form_data.password, db)

@router.post("/login/")
async def login_for_access_token(body: UserCreate = Body(...), db: Session = Depends(get_db)):
    return login(body.username, body.password, db)

@router.get("/verify/")
async def verify(token: str = Depends(oauth2_scheme)):
    verify_access_token(token)
    return True
