from fastapi import APIRouter, Depends, HTTPException, status, Response, Header
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas import Login, Token, TokenVerify
from ..utils import verify_password
from ..oauth2 import create_access_token, refresh_access_token, create_refresh_token, verify_access_token_time
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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
    refresh_token = create_refresh_token(data={"sub": user.email})
    response = {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }
    return response

@router.get('/refresh-token', response_model=Token)
async def refresh_token(token: str = Depends(oauth2_scheme), authorization: str = Header(...)):
    if not token:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Token not provided")
    new_token = refresh_access_token(token)
    if not new_token:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid token")
    return {"access_token": new_token, "refresh_token": token, "token_type": "bearer"}

@router.get('/verify-token', response_model=TokenVerify)
async def verify_token(token : str = Depends(oauth2_scheme)):
    if not token:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Token not provided")
    verification_result = verify_access_token_time(token)
    print(verification_result)
    if not verification_result["valid"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=verification_result["reason"])
    return {"valid": True}


@router.post('/logout')
async def logout(response: Response):
    response.delete_cookie(key="Authorization")
    return {"message": "Logged out successfully"}

