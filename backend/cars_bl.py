import datetime
from sqlalchemy.orm import Session
from schemas import CarBase, CarDb
from models import Car

# Guarda un nuevo registro de automóvil en la base de datos
def save_car(car: CarBase, db: Session):
      db_car = Car(  # Crea una nueva instancia del modelo Car
         user_id=car.user_id,  # ID del usuario propietario del automóvil
         car_brand=car.brand,  # Marca del automóvil
         car_plate=car.plate,  # Placa del automóvil
         car_color=car.color,  # Color del automóvil
         car_model=car.model,  # Modelo del automóvil
         car_year=car.year,    # Año del automóvil
         created_at= datetime.datetime.now()  # Fecha y hora actuales como fecha de creación
      )
      db.add(db_car)  # Agrega el nuevo registro a la sesión de la base de datos
      db.commit()  # Confirma la transacción para guardar los cambios en la base de datos
      db.refresh(db_car)  # Actualiza la instancia db_car con los datos guardados
      return db_car  # Devuelve el registro de automóvil guardado

# Obtiene todos los automóviles asociados a un usuario específico
def get_cars_by_user_id(user_id: int, db: Session):
    # Realiza una consulta en la base de datos para buscar automóviles con el ID del usuario
    return db.query(Car).filter(Car.user_id == user_id).all()
