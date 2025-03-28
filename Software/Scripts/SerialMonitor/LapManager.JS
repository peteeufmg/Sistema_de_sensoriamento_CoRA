class Lap {
  constructor (CommandUI, CheckpointsUI){
    this.CommandUI = CommandUI;
    this.CheckpointsUI = CheckpointsUI;
    this.checkpoints = new Checkpoints();
    this.isRunning = false;
    this.stopWatch = new StopWatch ((time) => this.updateTime(time));
    this.currentCompetitor = undefined;
  }
  updateTime (time) {
    StopWatchUI.updateTime(time);
    if(this.currentCompetitor){
      this.currentCompetitor.time = time;
    }
  }
  setCompetitor(competitor){
    this.currentCompetitor = competitor;
    this.reset();
  }

  reset (){
    this.checkpoints.clearAll();
    this.stopWatch.reset();
    this.isRunning = false;
    this.CheckpointsUI.clearAll()
  }

  start (){
    if(!this.isRunning){
      this.CommandUI.lapStart();
      this.stopWatch.start();
      this.isRunning = true;
    }
  }

  end (){
    if(this.isRunning){
      this.CommandUI.lapEnd();
      this.stopWatch.stop();
      this.isRunning = false;
    }
  }

  manualEnd(){
    this.CommandUI.lapEnd();
    this.stopWatch.stop();
    this.isRunning = false;
    var lastTime = this.checkpoints.getLastTime();

    this.checkpoints.clear(this.checkpoints.count - 1);
    this.CheckpointsUI.clear(this.checkpoints.count - 1);
    
    this.stopWatch.setTime(lastTime);
  }

  isValidUpdate (index) {
    var isIndexActive = this.checkpoints.states[index];
    var isPreviousActive = this.checkpoints.states[index - 1];
  
    if(index == 0 && !this.isRunning){
      return true;
    } else if (!isIndexActive && isPreviousActive && this.isRunning){
      return true
    } else {
      return false;
    }
  }

  updateCheckpoint (index){
    if(this.isValidUpdate(index)){
      var lastSensor = this.checkpoints.states.length - 1;
  
      if (index == 0)  this.start();
      if (index == lastSensor)  this.end();
  
      this.checkpoints.states[index] = true;
      this.checkpoints.times[index] = this.stopWatch.elapsedTime;
      var time = this.stopWatch.elapsedTime;
      this.currentCompetitor.checkpoints = index;
      this.CheckpointsUI.setCheckpointTime(time, index)
    }
  }

  manualUpdateCheckpoint (index){
    this.checkpoints.manualUpdates++;
    this.CommandUI.manualUpdateCheckpoint(index);
    this.updateCheckpoint(index);
  }
}

class Checkpoints{
  constructor(){
    this.count = 10;
    this.manualUpdates = 0;
    this.states = Array(this.count).fill(false);
    this.times = Array(this.count).fill(undefined);
  }

  clearAll (){
    this.states = Array(this.count).fill(false);
    this.times = Array(this.count).fill(undefined);
  }

  clear (index) {
    this.states[index] = false;
    this.times[index] = undefined;
  }

  getLastTime(){
    for(var i = this.count - 1; i >= 0; i--){
      if(this.times[i] != undefined){
        return this.times[i];
      }
    }
  }
}