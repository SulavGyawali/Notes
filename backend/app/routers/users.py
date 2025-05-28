from .. import schemas, models, utils
from ..database import get_db
from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List
from ..oauth2 import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.post("/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        hashed_pw = utils.get_password_hash(user.password)
        user.password = hashed_pw
        new_user = models.User(**user.model_dump())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")
    return new_user

@router.get("/current", response_model=schemas.User)
async def read_current_user(current_user: schemas.User = Depends(get_current_user)):
    return current_user


@router.get("/", response_model=List[schemas.User])
async def read_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@router.get("/{user_id}", response_model=schemas.User)
async def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    db.delete(user)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.put("/{user_id}", response_model=schemas.User)
async def update_user(user_id: int, new_user: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        hashed_pw = utils.get_password_hash(new_user.password)
        new_user.password = hashed_pw
        user_query = db.query(models.User).filter(models.User.id == user_id)
        if user_query.first() is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        
        user_query.update(new_user.model_dump())

        db.commit()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")
    return user_query.first()