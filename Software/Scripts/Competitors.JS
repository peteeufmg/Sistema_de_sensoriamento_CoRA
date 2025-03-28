class Competitors {
  constructor(){
    this.child  = [];
    this.advanced = [];
  }
  add(Competitor){
    this[`${Competitor.category}`].push(Competitor);
  }
}

class Competitor{
  constructor(teamName, institution, category){
    this.name = teamName;
    this.institution = institution;
    this.category = category;

    this.time = null;
    this.checkpoints = null;
    this.classification = null;

    this.attempts = [];
  }
  setAttempt(index, times = [], checkpoints = null){
    var attempt = new Attempt(times, checkpoints);
    this.attempts[index] = attempt;
  }
}
class Attempt{
  constructor(times, checkpoints){
    this.times = times;
    this.checkpoints = checkpoints;
  }
}