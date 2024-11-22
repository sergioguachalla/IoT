import hashlib
import os

def hash_password(password: str) -> str:
   # Generate a random salt
   salt = os.urandom(16)
   # Hash the password with the salt
   hashed_password = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
   # Combine the salt and hashed password
   return salt.hex() + hashed_password.hex()

def verify_password(stored_password: str, provided_password: str) -> bool:
   # Extract the salt from the stored password
   salt = bytes.fromhex(stored_password[:32])
   # Extract the hashed password from the stored password
   stored_hashed_password = stored_password[32:]
   # Hash the provided password with the extracted salt
   hashed_password = hashlib.pbkdf2_hmac('sha256', provided_password.encode(), salt, 100000)
   # Compare the hashed passwords
   return hashed_password.hex() == stored_hashed_password