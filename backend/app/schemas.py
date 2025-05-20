from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    username: str
    email: EmailStr
    password: str

class NoteBase(BaseModel):
    title: str
    description: str

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    created_at: datetime
    updated_at: datetime
    user_id: int

    class Config:
        from_attributes = True

class NoteUpdate(BaseModel):
    title: str
    description: str
    user_id: int
    pass

class NoteDelete(BaseModel):
    id: int
    user_id: int
    pass

class Login(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class TokenVerify(BaseModel):
    valid: bool
    reason: str | None = None
