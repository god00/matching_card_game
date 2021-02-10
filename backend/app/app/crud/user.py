from sqlalchemy.orm import Session
from app import models, schemas, security


class CRUDUser():
    def get_user(self, db: Session, user_id: int):
        return db.query(models.User).filter(models.User.id == user_id).first()


    def get_user_by_username(self, db: Session, username: str):
        return db.query(models.User).filter(models.User.username == username).first()


    def get_users(self, db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.User).offset(skip).limit(limit).all()


    def create_user(self, db: Session, user: schemas.UserCreate):
        hashed_password = security.get_password_hash(user.password)
        db_user = models.User(username=user.username, hashed_password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user


user = CRUDUser()
