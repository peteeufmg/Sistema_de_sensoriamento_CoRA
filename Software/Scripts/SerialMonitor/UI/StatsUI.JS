const INVALID_TIME_TEXT = '--.--.---.---';

function formatTime(time) {
  var minutes = Math.floor(time / 60000);
  var seconds = Math.floor((time % 60000) / 1000);
  var milliseconds = time % 1000;
  return (
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + ":" +
    (milliseconds < 100 ? "0" : "") + (milliseconds < 10 ? "0" : "") + milliseconds
    );
}

const CheckpointsUI = new Object();
CheckpointsUI.Container = document.querySelector('#CheckpointsContainerUI');

CheckpointsUI.clear = (checkpointNum) => {
  CheckpointsUI.spans[checkpointNum].innerText = INVALID_TIME_TEXT;
}

CheckpointsUI.clearAll = () => {
  CheckpointsUI.spans.forEach(span => {
    span.innerText = INVALID_TIME_TEXT;
  });
}

CheckpointsUI.setCheckpointTime = (time, index) => {
  CheckpointsUI.spans[index].innerText = formatTime(time);
}

CheckpointsUI.load = (amount) => {
  CheckpointsUI.spans = []; 
  CheckpointsUI.Container.innerHTML = '';
  for(var i = 0; i < amount; i++){
      var label = document.createElement("label");
      label.classList.add("Label");
      label.innerHTML = `
      <button id="CheckpointButton${i}" onclick="if(SerialCOM.isEnable)lap.manualUpdateCheckpoint(${i})">${i}</button>
      Checkpoint ${i}: `;
      var span = document.createElement("span");
      label.appendChild(span);
      CheckpointsUI.spans.push(span);
      CheckpointsUI.clear(i);
      CheckpointsUI.Container.appendChild(label);
  }
}

const StopWatchUI = new Object();
StopWatchUI.element = document.querySelector('#StopWatch');

StopWatchUI.updateTime = (time) => {
  StopWatchUI.element.innerText = formatTime(time);
}