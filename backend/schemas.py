from datetime import datetime
from pydantic import BaseModel, EmailStr

# Esquema base para usuarios, incluye campos esenciales
class UserBase(BaseModel):
    username: str  # Nombre de usuario
    name: str  # Nombre del usuario
    lastname: str  # Apellido del usuario
    email: EmailStr  # Correo electrónico validado por Pydantic

# Esquema extendido para crear un nuevo usuario, incluye la contraseña
class UserCreate(UserBase):
    password: str  # Contraseña requerida para registro

# Esquema para actualizar un usuario, permite valores opcionales
class UserUpdate(BaseModel):
    username: str | None = None  # Nombre de usuario opcional
    name: str | None = None  # Nombre opcional
    lastname: str | None = None  # Apellido opcional
    email: EmailStr | None = None  # Correo electrónico opcional
    password: str | None = None  # Contraseña opcional

# Esquema para representar un usuario completo, incluye su ID
class User(UserBase):
    id: int  # ID único del usuario

    class Config:
        orm_mode = True  # Habilitar compatibilidad con SQLAlchemy

# Esquema para la autenticación de usuarios
class UserAuth(BaseModel):
    username: str  # Nombre de usuario
    password: str  # Contraseña para autenticación

# Esquema base para registros multimedia
class RecordBase(BaseModel):
    user_id: int  # ID del usuario asociado al registro
    location: str  # Ubicación del registro
    parking_record_id: int  # ID del registro de parqueo relacionado

# Esquema extendido para crear un registro multimedia
class RecordCreate(RecordBase):
    video_url: str  # URL del video relacionado con el registro

# Esquema para representar registros multimedia almacenados
class RecordDb(RecordBase):
    video_url: str  # URL del video
    created_at: datetime  # Fecha y hora de creación del registro

# Esquema completo de registros multimedia con ID y compatibilidad con SQLAlchemy
class Record(RecordBase):
    id: int  # ID único del registro
    video_url: str  # URL del video
    created_at: datetime  # Fecha y hora de creación del registro

    class Config:
        orm_mode = True  # Habilitar compatibilidad con SQLAlchemy

# Esquema base para un automóvil
class CarBase(BaseModel):
    user_id: int  # ID del usuario propietario del automóvil
    brand: str  # Marca del automóvil
    plate: str  # Placa del automóvil
    color: str  # Color del automóvil
    model: str  # Modelo del automóvil
    year: int  # Año del automóvil

# Esquema extendido para representar automóviles almacenados
class CarDb(CarBase):
    created_at: datetime  # Fecha y hora de creación del registro

# Esquema de respuesta estándar para los endpoints
class ResponseDto(BaseModel):
    message: str | None  # Mensaje de respuesta
    data: dict | list | None  # Datos asociados a la respuesta
    success: bool  # Indica si la operación fue exitosa

# Esquema base para registros de parqueo
class ParkingRecordBase(BaseModel):
    user_id: int  # ID del usuario asociado al parqueo
    car_id: int  # ID del automóvil utilizado en el parqueo
    longitude: str  # Longitud del lugar de parqueo
    latitude: str  # Latitud del lugar de parqueo
    location: str  # Ubicación del parqueo en formato legible
    end_time: datetime | None  # Hora de finalización del parqueo (opcional)

# Esquema extendido para representar registros de parqueo almacenados
class ParkingRecordDb(ParkingRecordBase):
    id: int  # ID único del registro
    parking_date: datetime  # Fecha del parqueo
    start_time: datetime  # Hora de inicio del parqueo
