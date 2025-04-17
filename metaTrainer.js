// ===== metaTrainer.js =====
import fs from "fs";
import { execSync } from "child_process";

const GENERATIONS = 20;
const MATCH_COUNT = 100;
const CANDIDATES = 3;

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

function simulate(config) {
  fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
  execSync("npm run simulate-match", { stdio: "ignore" });
  const results = JSON.parse(fs.readFileSync("batch_results.json", "utf8"));

  let total = 0, survived = 0, starved = 0, kills = 0;
  for (const m of results) {
    total += m.score;
    if (m.survived) survived++;
    if (m.deathCause === "starvation" || m.reason === "starved") starved++;
    kills += m.kills;
  }
  return {
    score: total / results.length,
    survivalRate: (survived / results.length) * 100,
    starvationRate: (starved / results.length) * 100,
    avgKills: kills / results.length,
    config
  };
}

function trainMeta(gens = GENERATIONS) {
  let best = simulate(baseConfig);
  fs.writeFileSync("config_best.json", JSON.stringify(best.config, null, 2));
  fs.writeFileSync("training_log.csv", "generation,score,survivalRate,starvationRate,avgKills,config\n");
  fs.appendFileSync("training_log.csv", `1,${best.score.toFixed(2)},${best.survivalRate.toFixed(1)},${best.starvationRate.toFixed(1)},${best.avgKills.toFixed(2)},${JSON.stringify(best.config)}\n`);

  for (let g = 2; g <= gens; g++) {
    const candidates = [best];
    for (let i = 0; i < CANDIDATES - 1; i++) {
      candidates.push(simulate(mutate(best.config)));
    }
    const selected = candidates.reduce((a, b) => (b.score > a.score ? b : a));
    if (selected.score > best.score) {
      best = selected;
      fs.writeFileSync("config_best.json", JSON.stringify(best.config, null, 2));
    }
    fs.appendFileSync("training_log.csv", `${g},${selected.score.toFixed(2)},${selected.survivalRate.toFixed(1)},${selected.starvationRate.toFixed(1)},${selected.avgKills.toFixed(2)},${JSON.stringify(selected.config)}\n`);
    console.log(`Gen ${g}: Score ${selected.score.toFixed(2)} | Survival ${selected.survivalRate.toFixed(1)}% | Starved ${selected.starvationRate.toFixed(1)}% | Kills ${selected.avgKills.toFixed(2)}`);
  }

  console.log("\n🏆 Best Config:", best.config);
}

trainMeta();
