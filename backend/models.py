from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
   __tablename__ = "users"

   id = Column(Integer, primary_key=True, index=True)
   username = Column(String)
   name = Column(String)
   lastname = Column(String)
   email = Column(String)
   password = Column(String)
   group = Column(String)
