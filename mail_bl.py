import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email(subject, body, to_email):
   from_email = "iot@ucb.edu.bo"
   # May need to change the smtp server
   smtp_server = "localhost"
   smtp_port = 1025

   msg = MIMEMultipart()
   msg['From'] = from_email
   msg['To'] = to_email
   msg['Subject'] = subject

   msg.attach(MIMEText(body, 'plain'))

   try:
      with smtplib.SMTP(smtp_server, smtp_port) as server:
         server.sendmail(from_email, to_email, msg.as_string())
      print("Email sent successfully")
   except Exception as e:
      print(f"Failed to send email: {e}")

# Example usage
send_email("Test Subject", "This is a test email body.", "recipient@example.com")