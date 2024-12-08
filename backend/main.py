
import os
from fastapi import FastAPI, Depends, File, HTTPException, UploadFile, Query
from sqlalchemy.orm import Session
from cars_bl import get_cars_by_user_id, save_car
from mail_bl import send_email
from records_bl import get_record_by_user_id, save_parking_record, save_record, update_parking_record
from database import SessionLocal, engine
from models import Base, Car, User
from schemas import CarBase, ParkingRecordBase, ResponseDto, User, UserAuth, UserCreate, UserUpdate, RecordBase, RecordCreate
from user_bl import create_user, auth, get_all_users
from google_bl import upload_video_to_drive
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
Base.metadata.create_all(bind=engine)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=ResponseDto)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    user = create_user(db, user)
    if not user:
        return ResponseDto(message="Error al crear el usuario", data=None, success=False)
    user_data = {
        "id": user.id,
        "username": user.username,
        "name": user.name,
        "lastname": user.lastname,
        "email": user.email,
        "group": user.group
    }
    return ResponseDto(message="Usuario creado exitosamente", data=user_data, success=True)

@app.post("/users/auth", response_model=ResponseDto)
def authenticate_user(user: UserAuth, db: Session = Depends(get_db)):
    if not auth(db, user):
        return ResponseDto(message="Nombre de usuario o contraseña incorrectos", data=None, success=False)
    user_data = auth(db, user)
    return ResponseDto(message="Autenticación exitosa", data=user_data, success=True)

@app.get("/users/all")
def get_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_all_users(db, skip, limit)


@app.post("/users/car", response_model=None) 
def create_car( car: CarBase, db: Session = Depends(get_db)):
    return save_car(car, db)

@app.get("/users/{user_id}/cars")
def get_cars(user_id: int, db: Session = Depends(get_db)):
    return get_cars_by_user_id(user_id, db)

@app.get("/users/{user_id}/records")
def get_records_history(user_id: int, db: Session = Depends(get_db)):
    return get_record_by_user_id(db, user_id)

##Google Drive API Test
@app.post("/upload/")
async def upload_video(user_id: int, 
                       location: str,
                       parking_record_id: int,
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

    

    record_db = RecordCreate(user_id=user_id, location=location, video_url=file_url, parking_record_id=parking_record_id)
    return save_record(db, record_db, file_url)

    
@app.post("/users/parking_record", response_model=ResponseDto)
def create_parking_record(record: ParkingRecordBase, db: Session = Depends(get_db)):
    if save_parking_record(db, record):

        response = ResponseDto(message="Registro de parqueo creado exitosamente", data=None, success=True)
    else:
        response = ResponseDto(message="Error al crear el registro de parqueo", data=None, success=False)
    return response


@app.put("/users/parking_record/{record_id}", response_model=ResponseDto)
def update_parking_record_time(record_id: int, db: Session = Depends(get_db)):
    if update_parking_record(db, record_id):
        response = ResponseDto(message="Registro de parqueo actualizado exitosamente", data=None, success=True)
    else:
        response = ResponseDto(message="Error al actualizar el registro de parqueo", data=None, success=False)
    return response


@app.post("/users/mail", response_model=None)
def send_email_api(subject: str, body: str, to_email: str):
    send_email(subject, body, to_email)
    return {"message": "Email sent successfully"}