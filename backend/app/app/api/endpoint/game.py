import numpy as np
import copy
from app import models, schemas
from fastapi import APIRouter, Depends, HTTPException, Body, status
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified
from app.db.get_db import get_db
from app.api.endpoint.login import oauth2_scheme
from app.crud import game as game_crud
from .user import get_current_active_user


router = APIRouter(
    responses={404: {"description": "Not found"}},
)


def get_best_global_score(db: Session):
    return [row[0] for row in game_crud.get_best_global_score(db)]


def get_best_score(db: Session, user_id: int):
    return [row[0] for row in game_crud.get_best_score(db, user_id)]


def new_game():
    game = np.array([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6], np.int32)
    np.random.shuffle(game)
    game = game.reshape(3, 4)
    return dict(answer=game.tolist(), current_state=np.zeros(shape=(3, 4)).tolist(), actions=[])


@router.get("/{game_id}")
async def get_game(db: Session = Depends(get_db), user: schemas.User = Depends(get_current_active_user), game_id: int = None):
    game = game_crud.get_game(db, user.id, game_id)
    if not game:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Game not found.",
        )
    best_global_score = get_best_global_score(db)[0]
    best_score = get_best_score(db, user.id)[0]
    actions_length = len(game.actions)
    last_action = {}
    if actions_length > 0:
        last_action = game.actions[-1]
    return {"score": game.score, "current_state": game.current_state, "id": game.id, "best_global_score": best_global_score, "best_score": best_score, "last_action": last_action, "is_finished": game.matched == 6}


@router.post("/start/")
async def create_new_game(db: Session = Depends(get_db), user: schemas.User = Depends(get_current_active_user)):
    item = new_game()
    game = game_crud.get_new_exist_game(db, user.id)
    if not game:
        game = game_crud.create_game(db, item, user.id)
    best_global_score = get_best_global_score(db)[0]
    best_score = get_best_score(db, user.id)[0]
    return {"score": game.score, "current_state": game.current_state, "id": game.id, "best_global_score": best_global_score, "best_score": best_score, "is_finished": False}


@router.patch("/action/")
async def play_game(db: Session = Depends(get_db), user: schemas.User = Depends(get_current_active_user), action: schemas.GameAction = Body(..., embed=True), game_id: int = Body(...)):
    if action.row < 0 or action.row > 2 or action.col < 0 or action.col > 3:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid parameter",
        )

    game = game_crud.get_game(db, user.id, game_id)

    if not game:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Game not found, Please create a new game.",
        )
    elif game.matched >= 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This game is already finished, Please create a new game.",
        )
    elif game.score >= 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Game Over.",
        )
    elif game.current_state[action.row][action.col] != 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This card is already opened.",
        )

    actions_length = len(game.actions)
    last_action = {}
    if actions_length > 0:
        last_action = game.actions[-1]
    is_even_action = len(game.actions) % 2 == 0

    card_value = game.answer[action.row][action.col]

    game.score += 1

    action_dict = {"row": action.row, "col": action.col, "matched": False, "is_even_action": is_even_action, "is_finished": False}
    is_finished = False

    current_state = game.current_state
    if actions_length > 0 and not is_even_action:
        if game.answer[last_action['row']][last_action['col']] == card_value:
            # matched
            game.current_state[action.row][action.col] = card_value
            game.matched += 1
            action_dict['matched'] = True
            if game.matched == 6:
                action_dict['is_finished'] = True
                is_finished = True
            if game.score < 12 and game.matched == 6:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Something went wrong.",
                )
        else:
            # no matched
            current_state = copy.deepcopy(game.current_state)
            current_state[action.row][action.col] = card_value
            # current_state
            game.current_state[last_action['row']][last_action['col']] = 0
    else:
        game.current_state[action.row][action.col] = card_value

    game.actions.append(action_dict)
    flag_modified(game, "actions")
    flag_modified(game, "current_state")
    db.commit()
    db.refresh(game)
    return {"score": game.score, "current_state": current_state, "id": game.id, "card_value": card_value, "last_action": last_action, "is_finished": is_finished}
