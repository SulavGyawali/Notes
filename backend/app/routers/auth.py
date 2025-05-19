from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas import Login, Token
from ..utils import verify_password
from ..oauth2 import create_access_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

@router.post('/login', response_model=Token)
async def login(user_creds:Login,db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_creds.email).first()

    if user is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid credentials")
    
    if not verify_password(user_creds.password, user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.email})

    return {"access_token": access_token, "token_type": "bearer"}



@router.post('/logout')
async def logout(response: Response):
    response.delete_cookie(key="Authorization")
    return {"message": "Logged out successfully"}

