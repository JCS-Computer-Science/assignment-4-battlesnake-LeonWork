// === metaTrainer.js ===
import fs from "fs";
import { execSync } from "child_process";

const GENERATIONS = 30;
const CANDIDATES_PER_GEN = 4;

if (!fs.existsSync("config.json")) {
  console.error("❌ config.json missing.");
  process.exit(1);
}

const baseConfig = JSON.parse(fs.readFileSync("config.json", "utf8"));

function mutate(config) {
  const mutateVal = (x) => parseFloat((x * (0.9 + Math.random() * 0.2)).toFixed(2));
  return {
    foodWeight: mutateVal(config.foodWeight),
    aggressionWeight: mutateVal(config.aggressionWeight),
    tailPriorityWeight: mutateVal(config.tailPriorityWeight),
    trapAvoidanceWeight: mutateVal(config.trapAvoidanceWeight),
    spaceThreshold: Math.max(5, Math.min(20, Math.round(config.spaceThreshold + (Math.random() - 0.5) * 2)))
  };
}

function runSimulation(config) {
  fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
  execSync("npm run simulate-match", { stdio: "ignore" });
  const results = JSON.parse(fs.readFileSync("batch_results.json", "utf8"));

  const totalScore = results.reduce((sum, m) => sum + m.score, 0);
  const avgKills = results.reduce((sum, m) => sum + (m.kills || 0), 0) / results.length;
  const starvationDeaths = results.filter(m => m.reason === "starved").length;
  const survivalRate = results.filter(m => m.survived).length / results.length * 100;
  const starvationRate = starvationDeaths / results.length * 100;

  return { totalScore, survivalRate, starvationRate, avgKills };
}

function runTournament(config) {
  fs.writeFileSync("config_best.json", JSON.stringify(config, null, 2));
  execSync("node tournamentRunner.js", { stdio: "ignore" });
  const results = JSON.parse(fs.readFileSync("tournament_results.json", "utf8"));
  const winRate = results.filter(r => r.win).length / results.length * 100;
  return winRate;
}

function fitness({ totalScore, survivalRate, starvationRate, avgKills }, winRate) {
  return (
    totalScore / 100 +
    winRate * 2 +
    survivalRate +
    avgKills * 50 -
    starvationRate * 1.5
  );
}

function autoCommit(message) {
  execSync("git add config_best.json meta_training_log.csv", { stdio: "ignore" });
  execSync(`git commit -m \"🤖 ${message}\"`, { stdio: "ignore" });
  execSync("git push", { stdio: "ignore" });
}

function train(generations = GENERATIONS) {
  let best = baseConfig;
  let bestMetrics = runSimulation(best);
  const bestWinRate = runTournament(best);
  let bestFitness = fitness(bestMetrics, bestWinRate);

  console.log(`\n🎯 Gen 0: WinRate ${bestWinRate.toFixed(1)}% | Score ${bestMetrics.totalScore} | Survival ${bestMetrics.survivalRate.toFixed(1)}%`);

  fs.writeFileSync("config_best.json", JSON.stringify(best, null, 2));
  fs.appendFileSync("meta_training_log.csv", `generation,score,survivalRate,starvationRate,avgKills,winRate,config\n`);
  fs.appendFileSync("meta_training_log.csv", `0,${bestMetrics.totalScore},${bestMetrics.survivalRate},${bestMetrics.starvationRate},${bestMetrics.avgKills},${bestWinRate},${JSON.stringify(best)}\n`);

  for (let i = 1; i <= generations; i++) {
    const candidates = Array.from({ length: CANDIDATES_PER_GEN }, () => mutate(best));
    const evaluations = candidates.map((config) => {
      const sim = runSimulation(config);
      const winRate = runTournament(config);
      return { config, fitness: fitness(sim, winRate), sim, winRate };
    });

    const top = evaluations.reduce((a, b) => (a.fitness > b.fitness ? a : b));

    if (top.fitness > bestFitness) {
      best = top.config;
      bestFitness = top.fitness;
      fs.writeFileSync("config_best.json", JSON.stringify(best, null, 2));
    }

    fs.appendFileSync(
      "meta_training_log.csv",
      `${i},${top.sim.totalScore},${top.sim.survivalRate},${top.sim.starvationRate},${top.sim.avgKills},${top.winRate},${JSON.stringify(top.config)}\n`
    );

    console.log(`Gen ${i}: WinRate ${top.winRate.toFixed(1)}% | Score ${top.sim.totalScore} | Survival ${top.sim.survivalRate.toFixed(1)}%`);
  }

  autoCommit("Auto-trained new meta config");
  console.log("\n🏁 Final Best Config:", best);
}

train();
