#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

#define SENSOR_NAME "S3"
#define RED_LED_PIN 5
#define GREEN_LED_PIN 6
#define BATTERY_PIN A0
#define INFRARED_INTERRUPT_PIN 2
#define RADIO_INTERRUPT_PIN 3
#define CE_PIN 7
#define CSN_PIN 8

RF24 radio(CE_PIN, CSN_PIN);
const byte adresses[6][5] = {"1Node", "2Node", "3Node", "4Node", "5Node", "6Node"};

volatile unsigned long lastSensorInterrupt = 0; // Para debouncing
const unsigned long debounceDelay = 200;

bool sendToPipe(const byte adress[6], const char* message) {
  noInterrupts(); //  Impede interrupções enquanto envia uma mensagem
  size_t messageSize = strlen(message) + 1; // Calcula o tamanho da mensagem, incluindo o caractere nulo
  bool result = radio.write(message, messageSize);  // Envia a mensagem
  // radio.openWritingPipe(adresses); // Configura o pipe de escrita
  interrupts(); //  Permite interrupções novamente
  return result;
}

void trigger() {
  volatile static bool emLeitura = true;
  if(emLeitura){
    digitalWrite(GREEN_LED_PIN, HIGH);
    digitalWrite(RED_LED_PIN, LOW);

    // Verifica se o tempo desde a última interrupção é maior que o tempo de debounce
    unsigned long interruptTime = millis();
    if (interruptTime - lastSensorInterrupt > debounceDelay) {
      lastSensorInterrupt = interruptTime; // Atualiza o tempo da última interrupção
      if(sendToPipe(adresses[1], SENSOR_NAME)){
        Serial.println("Mensagem Enviada");
      }
      else{
        Serial.println("Mensagem Perdida");
      }
    }
  }
  else{
    digitalWrite(RED_LED_PIN, HIGH);
    digitalWrite(GREEN_LED_PIN, LOW);
  }
  emLeitura = !emLeitura;
}

void setup() {
  Serial.begin(9600);
  while (!radio.begin()) {
    Serial.println(F("Modulo RF não está respondendo!!"));
    digitalWrite(RED_LED_PIN, HIGH);
    digitalWrite(GREEN_LED_PIN, HIGH);
  }
    radio.setDataRate( RF24_250KBPS );
    radio.enableAckPayload();

  radio.setPALevel(RF24_PA_MAX);
  radio.setRetries(5, 5);
  radio.openWritingPipe(adresses[1]);
  radio.stopListening();

  pinMode(BATTERY_PIN, INPUT);
  pinMode(INFRARED_INTERRUPT_PIN, INPUT);
  pinMode(RADIO_INTERRUPT_PIN, INPUT);
  pinMode(RED_LED_PIN, OUTPUT);
  pinMode(GREEN_LED_PIN, OUTPUT);

  digitalWrite(RED_LED_PIN, HIGH);
  digitalWrite(GREEN_LED_PIN, LOW);

  attachInterrupt(digitalPinToInterrupt(INFRARED_INTERRUPT_PIN), trigger, CHANGE);
}

void loop() {
  // float result = analogRead(BATTERY_PIN)* (5.0/1023) * (2.5);
  // Serial.println(result);
  // delay(1000);
}