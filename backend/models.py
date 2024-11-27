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
    cars = relationship('Car', back_populates='user')
    parking_records = relationship('ParkingRecord', back_populates='user')

class ParkingRecord(Base):
    __tablename__ = 'parking_records'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    car_id = Column(Integer, ForeignKey('cars.id'), nullable=False)
    parking_date = Column(DateTime, default=datetime.datetime.now)
    longitude = Column(String(255), nullable=False)
    latitude = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    start_time = Column(DateTime, default=datetime.datetime.now)
    end_time = Column(DateTime, nullable=True)
    
    user = relationship('User', back_populates='parking_records')
    car = relationship('Car', back_populates='parking_records')


class Record(Base):
    __tablename__ = 'records'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    video_url = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now)
    parking_record_id = Column(Integer, ForeignKey('parking_records.id'), nullable=True)

    user = relationship('User', back_populates='records')

class Car(Base):
    __tablename__ = 'cars'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    car_brand = Column(String(255), nullable=False)
    car_plate = Column(String(255), nullable=False)
    car_color = Column(String(255), nullable=False)
    car_model = Column(String(255), nullable=False)
    car_year = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now)
    
    user = relationship('User', back_populates='cars')
    parking_records = relationship('ParkingRecord', back_populates='car')


