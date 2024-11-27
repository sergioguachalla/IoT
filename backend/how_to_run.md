# Instrucciones
## Hacer correr `docker compose up -d`

## Instalar las dependencias:
- `pip install -r requirements.txt`
- `python -m pip install -r requirements.txt` (si es que no corre el primer comando)
  
## Credenciales
- Para el tema de las credenciales de Google Cloud crear un directorio "credentials" y pegar adentro del mismo el archivo "credentials.json"
- La estructura debe ser la siguiente: <br> 
  * backend
    * credentials
      * credentials.json

## Correr el servidor
- Correr el comando `uvicorn main:app --host 0.0.0.0 --port 8000`
- O correr el siguiente comando si el siguiente no funciona `python -m uvicorn main:app --host 0.0.0.0 --port 8000`

