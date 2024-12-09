from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload

SCOPES = ['https://www.googleapis.com/auth/drive']
CREDENTIALS_FILE = 'credentials/credentials.json'

credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=SCOPES)
service = build('drive', 'v3', credentials=credentials)

def upload_video_to_drive(file_path: str, file_name: str, mime_type: str) -> str:
    try:
        media = MediaFileUpload(file_path, mimetype=mime_type, resumable=True)

        file_metadata = {
            'name': file_name,
            'mimeType': mime_type
        }

        uploaded_file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        ).execute()

        file_id = uploaded_file.get('id')

        permission = {
            'type': 'anyone',
            'role': 'reader'
        }
        service.permissions().create(fileId=file_id, body=permission).execute()

        file_url = f"https://drive.google.com/file/d/{file_id}/view?usp=sharing"
        print(f"File uploaded successfully: {file_id}")

        return file_url

    except HttpError as error:
        raise Exception(f"Error uploading file to Google Drive: {str(error)}")