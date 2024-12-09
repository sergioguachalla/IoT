import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(subject, body, to_email):
    """
    Envía un correo electrónico usando un servidor SMTP local.
    """
    from_email = "iot@ucb.edu.bo"  # Dirección de correo del remitente
    smtp_server = "localhost"  # Servidor SMTP
    smtp_port = 1025  # Puerto del servidor SMTP

    # Crear el mensaje
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject

    # Adjuntar el contenido del correo
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Enviar el correo usando el servidor SMTP
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.sendmail(from_email, to_email, msg.as_string())
        print("Email sent successfully")
    except Exception as e:
        # Manejo de errores al enviar el correo
        print(f"Failed to send email: {e}")

# Example usage
send_email("Test Subject", "This is a test email body.", "recipient@example.com")