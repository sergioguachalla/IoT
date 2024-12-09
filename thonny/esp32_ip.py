import network
import urequests
import time
from machine import Pin, PWM

# Configuración Wi-Fi
wifi_ssid = 'iPhone'
wifi_password = '12345678'

# URLs del backend
current_user_url = "http://172.20.10.3:8000/users/current"
record_url = "http://172.20.10.3:8000/users/record"
esp32_cam_url = "http://172.20.10.4/capture"  # Cambia esto por la IP de tu ESP32-CAM

# Configuración de los pines del LED RGB
led_red = PWM(Pin(19), freq=1000)
led_green = PWM(Pin(18), freq=1000)
led_blue = PWM(Pin(5), freq=1000)

# Configuración de los pines del sensor PIR
pir_sensor = Pin(13, Pin.IN)

# Función para establecer el color del LED
def set_color(red, green, blue):
    led_red.duty(red)
    led_green.duty(green)
    led_blue.duty(blue)

# Conexión a Wi-Fi
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(wifi_ssid, wifi_password)
    while not wlan.isconnected():
        time.sleep(1)
    print("Conectado a Wi-Fi")

# Obtener el usuario actualmente autenticado
def get_authenticated_user():
    try:
        response = urequests.get(current_user_url)
        if response.status_code == 200:
            data = response.json()
            user_data = data.get("data")
            print(f"Usuario autenticado: {user_data}")
            return user_data
        else:
            print(f"Error al obtener usuario autenticado: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error al hacer la solicitud: {e}")
        return None

# Capturar imagen desde la ESP32-CAM
def capture_image():
    try:
        response = urequests.get(esp32_cam_url)
        if response.status_code == 200:
            print("Imagen capturada exitosamente.")
            # Guarda la imagen en una URL pública, aquí asumimos que esp32_cam_url devuelve la URL
            print(response)
            return esp32_cam_url
        else:
            print(f"Error al capturar imagen: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error en captura de imagen: {e}")
        return None

# Enviar un POST al backend
def send_record_post(user_id, sensor_aprox, video_url, location="Main Parking Lot", parking_record_id=1):
    payload = {
        "user_id": user_id,
        "sensor_aprox": sensor_aprox,
        "location": location,
        "video_url": video_url,
        "parking_record_id": parking_record_id,
    }
    try:
        response = urequests.post(record_url, json=payload)
        if response.status_code == 201:
            print(f"Registro enviado exitosamente: {payload}")
        else:
            print(f"Error al enviar el registro: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"Error al hacer el POST: {e}")

# Bucle principal con detección de movimiento
def motion_detection(user_id):
    last_state = -1
    while True:
        pir_value = pir_sensor.value()
        if pir_value != last_state:  # Solo enviar si cambia el estado
            if pir_value == 1:
                print("Movimiento detectado: LED rojo.")
                set_color(1023, 0, 0)  # Rojo
                
                # Captura la imagen y envía el POST con la URL
                video_url = capture_image() or "https://example.com/default-image.jpg"
                print(video_url)
                #send_record_post(user_id, sensor_aprox=1, video_url=video_url)
            else:
                print("Sin movimiento: LED verde.")
                set_color(0, 1023, 0)  # Verde
                
                # Envía el POST sin captura de imagen
                send_record_post(user_id, sensor_aprox=0, video_url="https://example.com/no-movement.jpg")
            last_state = pir_value
        time.sleep(2)  # Ajustar para control de frecuencia de POST

# Programa principal
try:
    connect_wifi()
    user_data = get_authenticated_user()
    if user_data:
        user_id = user_data.get("id")  # Ajusta según la estructura del JSON
        print("Iniciando detección de movimiento...")
        motion_detection(user_id)
    else:
        print("No se pudo autenticar al usuario.")
except KeyboardInterrupt:
    print("Programa interrumpido. Apagando el LED.")
    set_color(0, 0, 0)

