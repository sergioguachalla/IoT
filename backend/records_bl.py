
from datetime import datetime
import os
from fastapi import File, HTTPException, UploadFile
from sqlalchemy.orm import Session
from schemas import  RecordCreate, RecordDb
from models import Record
from google_bl import upload_video_to_drive


def save_record(db: Session, record: RecordCreate):
    

    db_record = Record(
         user_id=record.user_id,
         video_url=record.video_url,
         location=record.location,
         created_at= datetime.now(),
    )
    print("db_record", db_record)
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


def get_record_by_user_id(db: Session, user_id: int):
    return db.query(Record).filter(Record.user_id == user_id).all()