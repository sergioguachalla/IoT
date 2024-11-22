
import os
from fastapi import FastAPI, Depends, File, HTTPException, UploadFile, Query
from sqlalchemy.orm import Session
from records_bl import save_record
from database import SessionLocal, engine
from models import Base, User
from schemas import User, UserAuth, UserCreate, UserUpdate, RecordBase, RecordCreate
from user_bl import create_user, auth

from google_bl import upload_video_to_drive

# Initialize database
Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=User)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@app.post("/users/auth", response_model=User)
def authenticate_user(user: UserAuth, db: Session = Depends(get_db)):
    return auth(db, user)


##Google Drive API Test
@app.post("/upload/")
async def upload_video(user_id: int, 
                       location: str,
                       file: UploadFile = File(...),
                         db: Session = Depends(get_db)):
    try:
        # Guardar temporalmente el archivo en el servidor
        temp_file_path = f"temp_{file.filename}"
        with open(temp_file_path, "wb") as f:
            f.write(await file.read())

        # Llamar al método de google_bl para subir el video
        file_url = upload_video_to_drive(temp_file_path, file.filename, file.content_type)

        # Eliminar el archivo temporal
        os.remove(temp_file_path)


    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

    

    record_db = RecordCreate(user_id=user_id, location=location, video_url=file_url)
    return save_record(db, record_db)

    
    

