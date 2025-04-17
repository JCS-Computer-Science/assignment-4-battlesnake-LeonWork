import fs from "fs";
import { execSync } from "child_process";

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

function averageScoreFromLog() {
    try {
      const batch = JSON.parse(fs.readFileSync("batch_results.json", "utf8"));
      return batch.reduce((sum, m) => sum + m.score, 0) / batch.length;
    } catch {
      return -9999;
    }
  }
  
function runTrial(config, generation) {
  fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
  execSync("npm run simulate-match");
  return averageScoreFromLog();
}

function train(gens = 20) {
  let best = baseConfig;
  let bestScore = -Infinity;

  for (let i = 0; i < gens; i++) {
    const trial = mutate(best);
    const score = runTrial(trial, i);
    console.log(`Gen ${i + 1}: Score ${score.toFixed(2)} — Config:`, trial);

    if (score > bestScore) {
      bestScore = score;
      best = trial;
      fs.writeFileSync("config_best.json", JSON.stringify(best, null, 2));
    }
  }

  console.log("\n📈 Best Evolved Config:", best);
}

train(30);
