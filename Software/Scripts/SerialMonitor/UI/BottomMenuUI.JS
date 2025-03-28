const BottomMenuUI = new Object();
BottomMenuUI.ScoreBoardWindow = new Object();
BottomMenuUI.dragRaceWindow = new Object();

BottomMenuUI.ScoreBoardWindow.open = () => {
  BottomMenuUI.ScoreBoardWindow.element = window.open('./ScoreBoard.html', '_blank');
}

BottomMenuUI.dragRaceWindow.open = () => {
  BottomMenuUI.dragRaceWindow.element = window.open('./dragRace.html', '_blank');
}

