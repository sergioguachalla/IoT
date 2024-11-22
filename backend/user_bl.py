from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate, UserUpdate, UserAuth
from auth_util import hash_password, verify_password

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

#TODO: HASH PASSWORD
def create_user(db: Session, user: UserCreate):
    hashed_password = hash_password(user.password)
    db_user = User(
        username=user.username,
        name=user.name,
        lastname=user.lastname,
        email=user.email,
        password=hashed_password,  
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user_update: UserUpdate):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        return None
    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

def auth(db: Session, user_auth: UserAuth):
    user = get_user_by_username(db, user_auth.username)
    if not user:
        return None
    if not verify_password(user.password, user_auth.password):
        return None
    return user