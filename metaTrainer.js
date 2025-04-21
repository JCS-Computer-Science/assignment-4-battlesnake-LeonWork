import fs from "fs";
import { execSync } from "child_process";

const fallbackMetaConfig = {
  foodWeight: 9.24,
  aggressionWeight: 3.9,
  tailPriorityWeight: 3.36,
  trapAvoidanceWeight: 27.42,
  spaceThreshold: 19
};

if (!fs.existsSync("meta_config.json")) {
  console.warn("⚠️ meta_config.json is missing, creating default baseline config.");
  fs.writeFileSync("meta_config.json", JSON.stringify(fallbackMetaConfig, null, 2));
}

if (!fs.existsSync("configs_archive")) {
  fs.mkdirSync("configs_archive");
}

const baseConfig = JSON.parse(fs.readFileSync("meta_config.json", "utf8"));

function mutate(config) {
  const mutateVal = (x, range = 0.05) => {
    const factor = 1 + (Math.random() * range * 2 - range);
    return parseFloat((x * factor).toFixed(2));
  };

  return {
    foodWeight: mutateVal(config.foodWeight),
    aggressionWeight: mutateVal(config.aggressionWeight),
    tailPriorityWeight: mutateVal(config.tailPriorityWeight),
    trapAvoidanceWeight: mutateVal(config.trapAvoidanceWeight),
    spaceThreshold: Math.max(5, Math.min(20, Math.round(config.spaceThreshold + (Math.random() - 0.5))))
  };
}

function average(results, key) {
  return parseFloat((results.reduce((sum, r) => sum + (r[key] || 0), 0) / results.length).toFixed(2));
}

function averageWinRate(results) {
  return results.filter(r => r.win).length / results.length * 100;
}

function averageTournamentWinRate() {
  const results = JSON.parse(fs.readFileSync("tournament_results.json", "utf8"));
  return results.filter(r => r.win).length / results.length * 100;
}

function runTrial(config) {
  fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
  try {
    execSync("node simulateMatch.js", { stdio: "ignore" });
    execSync("npm run tournament", { stdio: "ignore" });
  } catch (error) {
    return { score: -9999, results: [], tournamentWinRate: 0 };
  }
  const results = JSON.parse(fs.readFileSync("batch_results.json", "utf8"));
  const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
  const tournamentWinRate = averageTournamentWinRate();
  const winRate = averageWinRate(results);
  const fitness = avgScore + (winRate * 20) + tournamentWinRate * 5;
  return { score: Math.round(avgScore), results, winRate, tournamentWinRate, fitness };
}

function autoCommit() {
  try {
    execSync("git config --global user.name 'github-actions'");
    execSync("git config --global user.email 'bot@github.com'");
    execSync("git add config_best.json meta_config.json training_log.csv");
    execSync("git commit -m '🤖 Auto-trained new meta config'");
    execSync("git push");
  } catch (e) {
    console.warn("⚠️ Auto-commit skipped or failed:", e.message);
  }
}

function archiveConfig(config, fitness) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `configs_archive/config_${timestamp}_F${Math.round(fitness)}.json`;
  fs.writeFileSync(filename, JSON.stringify(config, null, 2));
}

function train(gens = 30) {
  let best = baseConfig;
  let bestFitness = -Infinity;
  const logLines = [];

  for (let i = 0; i < gens; i++) {
    const trial = mutate(best);
    const { score, results, winRate, tournamentWinRate, fitness } = runTrial(trial);
    const survival = average(results, "survived") * 100;
    const starvation = average(results, "starved") * 100;
    const kills = average(results, "kills");

    console.log(`🎯 Gen ${i}: WinRate ${winRate.toFixed(1)}% | Score ${score} | Survival ${survival.toFixed(1)}% | Tourney Wins ${tournamentWinRate.toFixed(1)}% | Fitness ${fitness.toFixed(0)}`);

    logLines.push(`${i},${score},${survival},${starvation},${kills},${tournamentWinRate.toFixed(0)},${fitness.toFixed(0)},${JSON.stringify(trial)}`);

    if (fitness > bestFitness) {
      bestFitness = fitness;
      best = trial;
      fs.writeFileSync("config_best.json", JSON.stringify(best, null, 2));
      fs.writeFileSync("meta_config.json", JSON.stringify(best, null, 2));
      archiveConfig(best, fitness);
    }
  }

  if (!fs.existsSync("training_log.csv")) {
    fs.writeFileSync("training_log.csv", `generation,score,survivalRate,starvationRate,avgKills,winRate,fitness,config\n`);
  }
  fs.appendFileSync("training_log.csv", logLines.join("\n") + "\n");
  autoCommit();
}

train();