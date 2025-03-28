
const CommandUI = new Object();
CommandUI.Console = document.querySelector("#SerialConsole");

CommandUI.checkSerial = () => {
  if ("serial" in navigator) {
    console.log("Serial é suportado!");
  } else{
      alert("Serial não é suportado pelo seu navegador!");
    }
}

CommandUI.scrollToBottomOfConsole = ()=>{
  CommandUI.Console.scrollTop = CommandUI.Console.scrollHeight;
}

CommandUI.log = (data) => {
  CommandUI.Console.innerText += data + '\n';
  CommandUI.scrollToBottomOfConsole();
}
CommandUI.lapEnd = () =>{
  // CommandUI.log("Fim da tentativa!");
}
CommandUI.lapStart = () =>{
  // CommandUI.log("Largada!");
}

CommandUI.manualUpdateCheckpoint = (index)=>{
  CommandUI.log(`Check${index} acionado manualmente`);
  console.log(`Checkpoint ${index} acionado Manualmente`);
}

CommandUI.ConnectButton = document.querySelector("#ConnectButton");

CommandUI.connect = () => {
  CommandUI.ConnectButton.textContent = "Conectado";
  CommandUI.ConnectButton.classList.remove("waiting");
  CommandUI.ConnectButton.classList.add("confirm");
}

CommandUI.disconnect = () => {
  CommandUI.ConnectButton.textContent = "Desconectado";
  CommandUI.ConnectButton.classList.remove("confirm");
  CommandUI.ConnectButton.classList.remove("waiting");
}
CommandUI.lostConnection = () => {
  CommandUI.ConnectButton.textContent = "Conexão Perdida";
  CommandUI.ConnectButton.classList.add("waiting");
  CommandUI.ConnectButton.classList.remove("confirm");;
}