#include "esp_camera.h"
#include <WiFi.h>
#include <HTTPClient.h>

#define CAMERA_MODEL_AI_THINKER
#include "camera_pins.h"

// Configuración Wi-Fi
const char *ssid = "iPhone";
const char *password = "12345678";

// URL del servidor backend
const char *backend_url = "http://172.20.10.3:8000/users/record";

// Configuración del flash LED
#define LED_FLASH_PIN 4

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado.");

  // Configuración de la cámara
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.frame_size = FRAMESIZE_SVGA;
  config.jpeg_quality = 10;
  config.fb_count = 2;

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Fallo al inicializar la cámara: 0x%x", err);
    return;
  }

  // Configuración del flash
  pinMode(LED_FLASH_PIN, OUTPUT);
  digitalWrite(LED_FLASH_PIN, LOW);
}

// Función para capturar una foto y enviarla al backend
void capture_and_send() {
  digitalWrite(LED_FLASH_PIN, HIGH); // Encender el flash
  delay(100);

  camera_fb_t *fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Fallo al capturar imagen.");
    digitalWrite(LED_FLASH_PIN, LOW); // Apagar el flash
    return;
  }

  // Enviar la imagen al servidor
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(backend_url);
    http.addHeader("Content-Type", "image/jpeg");

    int httpResponseCode = http.POST(fb->buf, fb->len);
    if (httpResponseCode == 201) {
      Serial.println("Imagen enviada exitosamente.");
    } else {
      Serial.printf("Fallo al enviar imagen. Código HTTP: %d\n", httpResponseCode);
    }
    http.end();
  } else {
    Serial.println("WiFi no conectado.");
  }

  esp_camera_fb_return(fb);
  digitalWrite(LED_FLASH_PIN, LOW); // Apagar el flash
}

// Servidor web para recibir comando de captura
void startCameraServer() {
  WiFiServer server(80);
  server.begin();

  while (true) {
    WiFiClient client = server.available();
    if (client) {
      String request = client.readStringUntil('\r');
      client.flush();
      if (request.indexOf("/capture") != -1) {
        capture_and_send();
      }
      client.stop();
    }
  }
}

void loop() {
  startCameraServer();
}
