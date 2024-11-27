

import datetime
from sqlalchemy.orm import Session
from schemas import CarBase, CarDb
from models import Car

def save_car(car: CarBase, db: Session):
      db_car = Car(
         user_id=car.user_id,
         car_brand=car.brand,
         car_plate=car.plate,
         car_color=car.color,
         car_model=car.model,
         car_year=car.year,
         created_at= datetime.datetime.now()
      )
      db.add(db_car)
      db.commit()
      db.refresh(db_car)
      return db_car

def get_cars_by_user_id(user_id: int, db: Session):
    return db.query(Car).filter(Car.user_id == user_id).all()