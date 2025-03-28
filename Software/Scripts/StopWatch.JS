class StopWatch {
  constructor(returnFunction) {
    var stopWatchInterval;
    this.elapsedTime = 0;
    this.isRunning = false;

    this.start = function (startTime = new Date().getTime()) {
      if(this.isRunning) this.stop();
      this.elapsedTime = 0;
      this.isRunning = true;
      stopWatchInterval = setInterval(() => {
        var currentTime = new Date().getTime();
        this.elapsedTime = currentTime - startTime;
        returnFunction(this.elapsedTime);
      }, 1);
    };

    this.stop = function () {
      this.isRunning = false;
      clearInterval(stopWatchInterval);
      returnFunction(this.elapsedTime);
    };

    this.setTime = function (time) {
      if(this.isRunning) this.stop();
      this.elapsedTime = time;
      returnFunction(this.elapsedTime);
    };
    
    this.reset = function () {
      if(this.isRunning) this.stop();
      clearInterval(stopWatchInterval);
      this.elapsedTime = 0;
      returnFunction(this.elapsedTime);
    };
  }
}