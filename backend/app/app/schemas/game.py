from typing import List

from pydantic import BaseModel


class GameBase(BaseModel):
    score: int

class GameAction(BaseModel):
    row: int
    col: int


class GameCreate(GameBase):
    answer: List[List[int]]
    current_state: List[dict]


class Game(GameBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True
