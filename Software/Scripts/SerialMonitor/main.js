CommandUI.checkSerial();
const lap = new Lap(CommandUI, CheckpointsUI);
CheckpointsUI.load(lap.checkpoints.count);

// Exemplo de competidor
competidores = new Competitors();
competidor = new Competitor("Coreanos Loucos","UFMG/BH", "advanced");
competidores.add(competidor);

lap.setCompetitor(competidores.advanced[0]);