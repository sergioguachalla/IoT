import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from database import Base
from sqlalchemy.orm import relationship


class User(Base):
   __tablename__ = "users"

   id = Column(Integer, primary_key=True, index=True)
   username = Column(String)
   name = Column(String)
   lastname = Column(String)
   email = Column(String)
   password = Column(String)
   group = Column(String)

   records = relationship('Record', back_populates='user')

class Record(Base):
    __tablename__ = 'records'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    video_url = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now)
    
    user = relationship('User', back_populates='records')