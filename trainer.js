import fs from "fs";
import { execSync } from "child_process";

const MATCH_COUNT = 100;
const GENERATIONS = 30;
const LOG_FILE = "training_log.csv";

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

function parseBatchResults() {
  if (!fs.existsSync("batch_results.json")) return null;
  const batch = JSON.parse(fs.readFileSync("batch_results.json", "utf8"));
  const score = batch.reduce((sum, m) => sum + m.score, 0) / batch.length;
  const survived = batch.filter(m => m.survived).length;
  const starvationDeaths = batch.filter(m => m.reason === "starved").length;
  const kills = batch.reduce((sum, m) => sum + m.kills, 0);

  return {
    avgScore: score,
    survivalRate: (survived / batch.length) * 100,
    starvationRate: (starvationDeaths / batch.length) * 100,
    avgKills: kills / batch.length
  };
}

function runTrial(config, gen) {
  fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
  try {
    execSync("npm run simulate-match", { stdio: "ignore" });
  } catch (err) {
    console.error(`❌ Simulation failed (Gen ${gen}):`, err.message);
    return null;
  }
  return parseBatchResults();
}

function train(generations = GENERATIONS) {
  let best = baseConfig;
  let bestScore = -Infinity;

  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, "generation,score,survivalRate,starvationRate,avgKills,config\n");
  }

  for (let i = 0; i < generations; i++) {
    const trial = mutate(best);
    const result = runTrial(trial, i + 1);
    if (!result) continue;

    const { avgScore, survivalRate, starvationRate, avgKills } = result;

    console.log(`Gen ${i + 1}: Score ${avgScore.toFixed(2)} | Survival ${survivalRate.toFixed(1)}% | Starved ${starvationRate.toFixed(1)}% | Kills ${avgKills.toFixed(2)}`);
    fs.appendFileSync(LOG_FILE, `${i + 1},${avgScore.toFixed(2)},${survivalRate.toFixed(1)},${starvationRate.toFixed(1)},${avgKills.toFixed(2)},${JSON.stringify(trial)}\n`);

    if (avgScore > bestScore) {
      best = trial;
      bestScore = avgScore;
      fs.writeFileSync("config_best.json", JSON.stringify(best, null, 2));
    }
  }

  console.log("\n🏆 Best Config:", best);
}

train();
