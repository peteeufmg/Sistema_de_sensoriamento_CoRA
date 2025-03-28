const arduinoFilters = [
  { usbVendorId: 0x2341, usbProductId: 0x0043 }, // Arduino Uno e alguns modelos de Nano
  { usbVendorId: 0x2341, usbProductId: 0x0001 }, // Outro ID comum para o Arduino Uno e Nano
  { usbVendorId: 0x2341, usbProductId: 0x0243 }, // Alguns modelos mais recentes do Arduino Nano
  { usbVendorId: 0x1A86, usbProductId: 0x7523 }, // Arduino Nano com chipset CH340
  { usbVendorId: 0x0403, usbProductId: 0x6001 }  // Arduino Nano com chipset FT232
];

const SerialCOM = new Object();
const MSG_END_CHAR = '\n';
SerialCOM.baudrate = 9600;
SerialCOM.dataBuffer = '';
SerialCOM.isEnable = false;
SerialCOM.isConnected = false;

navigator.serial.addEventListener("disconnect", async (event) => {
  port = await event.target || event.port;
  if(port == SerialCOM.selectedPort){
    SerialCOM.forcedDisconnect();
  } 
});

SerialCOM.serialToogleConnection = async () => {
  if(SerialCOM.isConnected) SerialCOM.disconnect();
  else SerialCOM.connect();
}
SerialCOM.disconnect = async () => {
  if(SerialCOM.selectedPort != null && SerialCOM.serialReader != null){
    SerialCOM.serialReader.cancel().then(async () => {
      await SerialCOM.selectedPort.close();
      SerialCOM.isConnected = false;
      CommandUI.disconnect();
    });
  }
}
SerialCOM.forcedDisconnect = () => {
  SerialCOM.isConnected = false;
  CommandUI.lostConnection();
}
SerialCOM.connect = async () => {
    // Prompt user to select any serial port.
    SerialCOM.selectedPort = await navigator.serial.requestPort({filters : arduinoFilters});
    if(SerialCOM.selectedPort != null){
      await SerialCOM.selectedPort.open({baudRate: SerialCOM.baudrate});
      SerialCOM.serialReader = SerialCOM.selectedPort.readable.getReader();
      SerialCOM.isConnected = true;
      CommandUI.connect();
      SerialCOM.readSerial();
    }
}
SerialCOM.readSerial = async () => {
  while (true) {
    const { value, done } = await SerialCOM.serialReader.read();
    if (done) {
      SerialCOM.serialReader.releaseLock();
      break;
    } else {
      SerialCOM.dataBuffer += new TextDecoder().decode(value);
      SerialCOM.dataBuffer = SerialCOM.readSerial.flowManager(SerialCOM.dataBuffer);
      }
  }
}

SerialCOM.readSerial.flowManager = (buffer) => {
  if(buffer.includes(MSG_END_CHAR)){
    var data = buffer.split(MSG_END_CHAR);
    buffer = data.pop();
    data.forEach(message => {
      CommandUI.log(message);
      if (SerialCOM.isEnable) {
        SerialCOM.processSerialMessage(message.replace(/\s/g, "").toUpperCase());
      }
    });
  }
  return buffer;
}

SerialCOM.checkpointsDictionary = {
  "S0" : 0,
  "S1" : 1,
  "S2" : 2,
  "S3" : 3,
  "S4" : 4,
  "S5" : 5,
  "S6" : 6,
  "S7" : 7,
  "S8" : 8,
  "S9" : 9,
}

SerialCOM.processSerialMessage = (message) => {
  
  if(SerialCOM.checkpointsDictionary[message] != null){
    lap.updateCheckpoint(SerialCOM.checkpointsDictionary[message]);
  }
}

