
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, User
from schemas import User, UserAuth, UserCreate, UserUpdate
from user_bl import create_user, auth

# Initialize database
Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=User)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@app.post("/users/auth", response_model=User)
def authenticate_user(user: UserAuth, db: Session = Depends(get_db)):
    return auth(db, user)