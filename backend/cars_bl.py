

import datetime
from sqlalchemy.orm import Session
from schemas import CarBase, CarDb


def save_car(car: CarBase, db: Session):
      db_car = CarDb(
         user_id=car.user_id,
         brand=car.brand,
         plate=car.plate,
         color=car.color,
         model=car.model,
         year=car.year,
         created_at= datetime.datetime.now()
      )
      db.add(db_car)
      db.commit()
      db.refresh(db_car)
      return db_car