lap = new Object();

const iterationsElement = document.querySelector("#Iterations span");
lap.iterations = 0;
const lastTimeElement = document.querySelector("#LastTime span");
lap.lastTime = 0;
const topSpeedElement = document.querySelector("#TopSpeed span");
lap.topSpeed = -1;
const averageSpeedElement = document.querySelector("#AverageSpeed span");
lap.averageSpeed = 0;
const averageTimeElement = document.querySelector("#AverageTime span");
lap.averageTime = 0;
const bestTimeElement = document.querySelector("#BestTime span");
lap.bestTime = -1;
const lowSpeedElement = document.querySelector("#LowSpeed span");
lap.lowSpeed = -1;
const lowTimeElement = document.querySelector("#LowTime span");
lap.lowTime = -1;
const lastSpeedElement = document.querySelector("#LastSpeed span");
lap.lastSpeed = 0;

let KmDaPista = 0.005;

lap.stopWatch = new StopWatch ((time) => lap.updateTime(time));

lap.updateTime = (time) => {
  StopWatchUI.updateTime(time);
}

lap.updateCheckpoint = () =>{
  if(!lap.stopWatch.isRunning){
    lap.stopWatch.start();
  }else{
    speed = KmDaPista/(lap.stopWatch.elapsedTime / (1000 * 60 * 60));

    lap.iterations++;
    lap.averageSpeed += speed;
    lap.averageTime += lap.stopWatch.elapsedTime;
    lap.lastTime = lap.stopWatch.elapsedTime;
    lap.lastSpeed = speed;

    if(lap.topSpeed == -1 || lap.topSpeed > speed) lap.topSpeed = speed;
    if(lap.bestTime == -1 || lap.bestTime > lap.stopWatch.elapsedTime) lap.bestTime = lap.stopWatch.elapsedTime;
    if(lap.lowSpeed == -1 || lap.lowSpeed < speed) lap.lowSpeed = speed;
    if(lap.lowTime == -1 || lap.lowTime < lap.stopWatch.elapsedTime) lap.lowTime = lap.stopWatch.elapsedTime;

    updateInfo();
    lap.stopWatch.start();
  }
}

function updateInfo(){
  iterationsElement.innerHTML = lap.iterations;
  lastTimeElement.innerHTML = formatTime(lap.lastTime);
  topSpeedElement.innerHTML = lap.topSpeed.toFixed(2) + " Km/h";
  averageSpeedElement.innerHTML = (lap.averageSpeed/lap.iterations).toFixed(2) + " Km/h";
  averageTimeElement.innerHTML = formatTime(parseInt(lap.averageTime/lap.iterations));
  bestTimeElement.innerHTML = formatTime(lap.bestTime);
  lowSpeedElement.innerHTML = lap.lowSpeed.toFixed(2) + " Km/h";
  lowTimeElement.innerHTML = formatTime(lap.lowTime);
  lastSpeedElement.innerHTML = lap.lastSpeed.toFixed(2) + " Km/h";
}

const straightCountElement = document.querySelector("#retas");
const doubleStraightCountElement = document.querySelector("#retasDuplas");
const longCornerCountElement = document.querySelector("#curvaLonga");
const smallCornerCountElement = document.querySelector("#curvaCurta");
function calcRaceSize(){
  KmDaPista = (straightCountElement.value * 32 + doubleStraightCountElement.value * 64 + longCornerCountElement.value*84.8 + smallCornerCountElement.value*28.3)/100000;
}