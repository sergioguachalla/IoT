from fastapi import FastAPI, WebSocket, HTTPException
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

app = FastAPI()

def send_email(subject: str, to_email: str, body: str, video_url: str):
    from_email = "iot@ucb.edu.bo"
    smtp_server = "localhost"
    smtp_port = 1025

    # Construcción del mensaje
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject

    # Plantilla HTML
    html_body = f"""
    <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }}
                .email-container {{
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }}
                .header {{
                    background-color: #4CAF50;
                    color: white;
                    text-align: center;
                    padding: 15px;
                    border-radius: 10px 10px 0 0;
                }}
                .content {{
                    padding: 20px;
                    font-size: 16px;
                    color: #333;
                }}
                .footer {{
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>{subject}</h1>
                </div>
                <div class="content">
                    <p>{body}</p>
                    <a href="{video_url}">Haz click en este enlace para poder ver la foto que hemos capturado</a>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Universidad Católica Boliviana</p>
                </div>
            </div>
        </body>
    </html>
    """

    # Adjuntar cuerpo HTML
    msg.attach(MIMEText(html_body, 'html'))

    # Enviar email
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.sendmail(from_email, to_email, msg.as_string())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error enviando email: {e}")

# Endpoint para enviar emails
@app.post("/users/email")
async def send_user_email(to_email: str, body: str, subject: str):
    send_email(subject, to_email, body)
    return {"message": "Email enviado exitosamente"}
