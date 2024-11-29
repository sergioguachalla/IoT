
from datetime import datetime
import os
from fastapi import File, HTTPException, UploadFile
from sqlalchemy.orm import Session
from schemas import  ParkingRecordBase, RecordCreate, RecordDb
from models import Record, ParkingRecord
from google_bl import upload_video_to_drive

 

def save_record(db: Session, record: RecordCreate):
    

    db_record = Record(
         user_id=record.user_id,
         video_url=record.video_url,
         location=record.location,
         created_at= datetime.now(),
         parking_record_id=record.parking_record_id
    )
    print("db_record", db_record)
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


def get_record_by_user_id(db: Session, user_id: int):
    return db.query(Record).filter(Record.user_id == user_id).all()

def save_parking_record(db: Session, record: ParkingRecordBase):
    db_parking_record = ParkingRecord(
        user_id=record.user_id,
        car_id=record.car_id,
        longitude=record.longitude,
        latitude=record.latitude,
        location=record.location,
        start_time=datetime.now(),
        end_time= None,
        parking_date=datetime.now()
    )
    db.add(db_parking_record)
    db.commit()
    db.refresh(db_parking_record)

    return db_parking_record

def update_parking_record(db: Session, record_id):
    db_parking_record = db.query(ParkingRecord).filter(ParkingRecord.id == record_id).first()
    if db_parking_record is None:
        raise HTTPException(status_code=404, detail="Parking record not found")
    db_parking_record.end_time = datetime.now()
    db.commit()
    db.refresh(db_parking_record)
    return db_parking_record