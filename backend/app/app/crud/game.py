from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from app import models, schemas


class CRUDGame():
    def get_game(self, db: Session, user_id: int, game_id: int):
        return db.query(models.Game).filter(models.Game.id == game_id, models.Game.owner_id == user_id).first()

    def get_new_exist_game(self, db: Session, user_id: int):
        return db.query(models.Game).filter(models.Game.owner_id == user_id, models.Game.score == 0).first()

    def create_game(self, db: Session, item: schemas.GameCreate, user_id: int):
        db_game = models.Game(**item, owner_id=user_id)
        db.add(db_game)
        db.commit()
        db.refresh(db_game)
        return db_game

    def get_best_global_score(self, db: Session):
        statement = text("""
            select MIN(g.score) as best_score from games g 
            where g."matched"=6"""
                         )
        return db.execute(statement)

    def get_best_score(self, db: Session, owner_id: int):
        statement = text(f"""
            select MIN(g.score) as best_score from games g 
            where g."matched"=6 and owner_id={owner_id} """
                         )
        return db.execute(statement)


game = CRUDGame()
