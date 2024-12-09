from sqlalchemy.orm import Session

from models import Car, User, Record



def get_all_records_for_user_and_car(session: Session, user_id: int, car_id: int):
   records = session.query(Record).filter(Record.user_id == user_id, Record.car_id == car_id).all()
   return records

def get_users_count(session: Session):
    return session.query(User).count()


def get_records_count(session: Session):
      return session.query(Record).count()

def get_average_records_per_user(session: Session):
      user_count = get_users_count(session)
      if user_count == 0:
         return 0
      record_count = get_records_count(session)
      return record_count / user_count



def get_dashboard_data(db: Session):
    # Example: Fetch the latest parking records
    records = db.query(Record).order_by(Record.created_at.desc()).limit(10).all()
    records = [record.__dict__ for record in records]
    return {
         "records": records,
         "users_count": get_users_count(db),
         "records_count": get_records_count(db),
         "average_records_per_user": get_average_records_per_user(db)
    }
def get_all_records(session: Session):
   records = session.query(Record).all()
   return records
