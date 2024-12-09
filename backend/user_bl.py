from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate, UserUpdate, UserAuth
from auth_util import hash_password, verify_password

# Obtener todos los usuarios con soporte para paginación
def get_all_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()

# Obtener un usuario específico por su ID
def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

# Obtener un usuario específico por su nombre de usuario
def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

# Crear un nuevo usuario con contraseña encriptada
def create_user(db: Session, user: UserCreate):
    hashed_password = hash_password(user.password)  # Encriptar la contraseña del usuario
    db_user = User(
        username=user.username,  # Nombre de usuario
        name=user.name,  # Nombre
        lastname=user.lastname,  # Apellido
        email=user.email,  # Correo electrónico
        password=hashed_password,  # Contraseña encriptada
        group="users"  # Grupo predeterminado
    )
    db.add(db_user)  # Agregar el usuario a la sesión de la base de datos
    db.commit()  # Confirmar los cambios
    db.refresh(db_user)  # Actualizar la instancia del usuario con los datos almacenados
    return db_user

# Actualizar los datos de un usuario existente
def update_user(db: Session, user_id: int, user_update: UserUpdate):
    db_user = db.query(User).filter(User.id == user_id).first()  # Buscar el usuario por ID
    if not db_user:
        return None  # Retornar None si el usuario no existe
    update_data = user_update.dict(exclude_unset=True)  # Obtener solo los campos modificados
    for key, value in update_data.items():  # Aplicar los cambios al usuario
        setattr(db_user, key, value)
    db.commit()  # Confirmar los cambios
    db.refresh(db_user)  # Actualizar la instancia del usuario
    return db_user

# Eliminar un usuario por su ID
def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.id == user_id).first()  # Buscar el usuario por ID
    if db_user:
        db.delete(db_user)  # Eliminar el usuario
        db.commit()  # Confirmar los cambios
    return db_user

# Autenticar a un usuario verificando su contraseña
def auth(db: Session, user_auth: UserAuth):
    user = get_user_by_username(db, user_auth.username)  # Buscar el usuario por nombre de usuario
    if not user:
        return False  # Retornar False si el usuario no existe
    if not verify_password(user_auth.password, user.password):  # Verificar la contraseña
        return False  # Retornar False si la contraseña no coincide
    user_dict = {  # Crear un diccionario con los datos del usuario
        "id": user.id,
        "username": user.username,
        "name": user.name,
        "lastname": user.lastname,
        "email": user.email,
        "group": user.group
    }
    return user_dict  # Retornar los datos del usuario autenticado
