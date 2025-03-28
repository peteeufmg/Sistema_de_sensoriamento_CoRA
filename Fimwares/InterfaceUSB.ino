#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

#define CE_PIN 7
#define CSN_PIN 8
#define SENSOR_NAME "SS"


RF24 radio(CE_PIN, CSN_PIN);
const byte adresses[6][5] = {"1Node", "2Node", "3Node", "4Node", "5Node", "6Node"};

bool sendToPipe(const byte adresses[6], const char* message) {
  radio.stopListening();
  radio.openWritingPipe(adresses); // Configura o pipe de escrita
  size_t messageSize = strlen(message) + 1; // Calcula o tamanho da mensagem, incluindo o caractere nulo
  bool result = radio.write(message, messageSize); // Envia a mensagem
  radio.startListening();
  return result;
}

void receive() {
  if (radio.available()) {
    char text[32] = "";
    radio.read(&text, sizeof(text)); // Lê a mensagem recebida
    Serial.println(text); // Exibe a mensagem no monitor serial
  }
}

void setup() {
  Serial.begin(9600);
  while (!radio.begin()) {
    Serial.println(F("Modulo RF não está respondendo!!"));
  }
  radio.setDataRate( RF24_250KBPS );
  radio.enableAckPayload();
  // radio.openWritingPipe(adresses[0]);
  radio.setPALevel(RF24_PA_MAX);
  radio.openReadingPipe(1, adresses[1]);
  radio.startListening();
}

void loop() {
  receive();
}