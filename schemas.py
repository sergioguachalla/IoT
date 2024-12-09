import datetime
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
class UserAuth(BaseModel):
    username: str
    password: str


class RecordBase(BaseModel):
    user_id: int
    location: str
    parking_record_id: int 
    
class RecordCreate(RecordBase):
    video_url: str
    sensor_aprox: int


class RecordDb(RecordBase):
    video_url: str
    created_at: datetime.datetime
    
class Record(RecordBase):
    id: int
    video_url: str
    created_at: datetime.datetime
    sensor_aprox: int

    class Config:
        orm_mode = True


class CarBase(BaseModel):
    user_id: int
    brand: str
    plate: str
    color: str
    model: str
    year: int

class CarDb(CarBase):
    created_at: datetime.datetime

class ResponseDto(BaseModel):
    message: str | None
    data: dict | list | None
    success: bool


class ParkingRecordBase(BaseModel):
    user_id: int
    car_id: int
    longitude: str
    latitude: str
    location: str
    end_time: datetime.datetime | None = None  # Haz que end_time sea opcional

class ParkingRecordDb(ParkingRecordBase):
    id: int
    parking_date: datetime.datetime
    start_time: datetime.datetime