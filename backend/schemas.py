from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    username: str
    name: str
    lastname: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: str | None = None
    name: str | None = None
    lastname: str | None = None
    email: EmailStr | None = None
    password: str | None = None

class User(UserBase):
    id: int

    class Config:
        orm_mode = True
