import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from database import Base
from sqlalchemy.orm import relationship

# Modelo para la tabla de usuarios
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)  # ID único para el usuario
    username = Column(String)  # Nombre de usuario
    name = Column(String)  # Nombre
    lastname = Column(String)  # Apellido
    email = Column(String)  # Correo electrónico
    password = Column(String)  # Contraseña encriptada
    group = Column(String)  # Grupo al que pertenece el usuario

    # Relaciones con otras tablas
    records = relationship('Record', back_populates='user')
    cars = relationship('Car', back_populates='user')
    parking_records = relationship('ParkingRecord', back_populates='user')

# Modelo para registros de parqueo
class ParkingRecord(Base):
    __tablename__ = 'parking_records'
    
    id = Column(Integer, primary_key=True, autoincrement=True)  # ID único para el registro
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)  # Relación con usuario
    car_id = Column(Integer, ForeignKey('cars.id'), nullable=False)  # Relación con carro
    parking_date = Column(DateTime, default=datetime.datetime.now)  # Fecha de parqueo
    longitude = Column(String(255), nullable=False)  # Longitud del parqueo
    latitude = Column(String(255), nullable=False)  # Latitud del parqueo
    location = Column(String(255), nullable=False)  # Ubicación en texto
    start_time = Column(DateTime, default=datetime.datetime.now)  # Hora de inicio del parqueo
    end_time = Column(DateTime, nullable=True)  # Hora de finalización del parqueo
    
    # Relaciones con usuario y carro
    user = relationship('User', back_populates='parking_records')
    car = relationship('Car', back_populates='parking_records')

# Modelo para registros multimedia
class Record(Base):
    __tablename__ = 'records'
    
    id = Column(Integer, primary_key=True, autoincrement=True)  # ID único para el registro
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)  # Relación con usuario
    video_url = Column(String(255), nullable=False)  # URL del video subido
    location = Column(String(255), nullable=False)  # Ubicación del evento
    created_at = Column(DateTime, default=datetime.datetime.now)  # Fecha y hora de creación
    sensor_aprox = Column(Integer, nullable=False)
    parking_record_id = Column(Integer, ForeignKey('parking_records.id'), nullable=True)  # Relación con registro de parqueo

    # Relación con usuario
    user = relationship('User', back_populates='records')

# Modelo para carros registrados
class Car(Base):
    __tablename__ = 'cars'
    
    id = Column(Integer, primary_key=True, autoincrement=True)  # ID único para el carro
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)  # Relación con usuario
    car_brand = Column(String(255), nullable=False)  # Marca del carro
    car_plate = Column(String(255), nullable=False)  # Placa del carro
    car_color = Column(String(255), nullable=False)  # Color del carro
    car_model = Column(String(255), nullable=False)  # Modelo del carro
    car_year = Column(Integer, nullable=False)  # Año del carro
    created_at = Column(DateTime, default=datetime.datetime.now)  # Fecha de creación del registro
    
    # Relación con usuario y registros de parqueo
    user = relationship('User', back_populates='cars')
    parking_records = relationship('ParkingRecord', back_populates='car')
