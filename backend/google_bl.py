from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload

# Permisos requeridos para interactuar con Google Drive
SCOPES = ['https://www.googleapis.com/auth/drive']
CREDENTIALS_FILE = 'credentials/credentials.json'

# Autenticación con Google Drive usando credenciales de servicio
credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=SCOPES)
service = build('drive', 'v3', credentials=credentials)

def upload_video_to_drive(file_path: str, file_name: str, mime_type: str) -> str:
    """
    Sube un archivo a Google Drive y retorna su URL público.
    """
    try:
        # Preparar el archivo para subir
        media = MediaFileUpload(file_path, mimetype=mime_type, resumable=True)

        # Metadatos del archivo a subir
        file_metadata = {
            'name': file_name,
            'mimeType': mime_type
        }

        # Subir el archivo a Google Drive
        uploaded_file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        ).execute()

        # Obtener el ID del archivo subido
        file_id = uploaded_file.get('id')

        # Asignar permisos de lectura pública al archivo
        permission = {
            'type': 'anyone',
            'role': 'reader'
        }
        service.permissions().create(fileId=file_id, body=permission).execute()

        # Construir la URL pública del archivo
        file_url = f"https://drive.google.com/file/d/{file_id}/view?usp=sharing"
        print(f"File uploaded successfully: {file_id}")

        return file_url

    except HttpError as error:
        # Manejo de errores de la API de Google Drive
        raise Exception(f"Error uploading file to Google Drive: {str(error)}")
