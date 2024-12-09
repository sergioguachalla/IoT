from datetime import datetime
from sqlalchemy.orm import Session
from schemas import ParkingRecordBase, RecordCreate
from models import Record, ParkingRecord
from google_bl import upload_video_to_drive
from mail_bl import send_email
from user_bl import get_user_by_id

# Guardar un nuevo registro multimedia en la base de datos
def save_record(db: Session, record: RecordCreate, video_url: str):
  
    db_record = Record(
         user_id=record.user_id,
         video_url=record.video_url,
         location=record.location,
         created_at=datetime.now(),
         parking_record_id=record.parking_record_id
    )
    print("db_record", db_record)
    db.add(db_record)  # Agregar el registro a la sesión de la base de datos
    db.commit()  # Confirmar los cambios en la base de datos
    db.refresh(db_record)  # Actualizar la instancia con los datos guardados
    user = get_user_by_id(db, record.user_id)
    send_email("Notificación de estacionamiento", user.email, f"Se ha registrado movimiento cerca de su auto en {record.location}.", video_url)

    return db_record

# Obtener todos los registros multimedia de un usuario
def get_record_by_user_id(db: Session, user_id: int):
    return db.query(Record).filter(Record.user_id == user_id).all()

# Guardar un nuevo registro de parqueo
def save_parking_record(db: Session, record: ParkingRecordBase):
    db_parking_record = ParkingRecord(
        user_id=record.user_id,
        car_id=record.car_id,
        longitude=record.longitude,
        latitude=record.latitude,
        location=record.location,
        start_time=datetime.now(),
        end_time=None,
        parking_date=datetime.now()
    )
    db.add(db_parking_record)
    db.commit()
    db.refresh(db_parking_record)
    return db_parking_record

# Actualizar el tiempo de finalización de un registro de parqueo
def update_parking_record(db: Session, record_id):
    db_parking_record = db.query(ParkingRecord).filter(ParkingRecord.id == record_id).first()
    if db_parking_record is None:
        raise HTTPException(status_code=404, detail="Parking record not found")
    db_parking_record.end_time = datetime.now()  # Asignar la hora actual como hora de fin
    db.commit()
    db.refresh(db_parking_record)
    return db_parking_record
