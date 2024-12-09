from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# URL de conexión para la base de datos PostgreSQL
SQLALCHEMY_DATABASE_URL = os.getenv("DB_URL") or f"postgresql://postgres:postgres@localhost:5433/iot"


# Configuración del motor de SQLAlchemy
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Creación de sesiones para interactuar con la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para definir los modelos
Base = declarative_base()
