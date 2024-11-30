from sqlalchemy.orm import Session

from models import Car, User, Record



def get_all_records_for_user_and_car(session: Session, user_id: int, car_id: int):
   records = session.query(Record).filter(Record.user_id == user_id, Record.car_id == car_id).all()
   return records

def get_all_records(session: Session):
   records = session.query(Record).all()
   return records