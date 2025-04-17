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

const baseConfig = JSON.parse(fs.readFileSync("meta_config.json", "utf8"));

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
  if (!fs.existsSync("batch_results.json")) return -9999;
  const results = JSON.parse(fs.readFileSync("batch_results.json", "utf8"));
  const totalScore = results.reduce((sum, m) => sum + m.score, 0);
  return Math.round(totalScore);
}

function average(results, key) {
  return parseFloat((results.reduce((sum, r) => sum + (r[key] || 0), 0) / results.length).toFixed(2));
}

function averageWinRate(results) {
  return results.filter(r => r.win).length / results.length * 100;
}

function runTrial(config) {
  fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
  try {
    execSync("npm run simulate-match", { stdio: "ignore" });
  } catch (error) {
    return { score: -9999, results: [] };
  }
  const results = JSON.parse(fs.readFileSync("batch_results.json", "utf8"));
  return { score: averageScoreFromLog(), results };
}

function autoCommit() {
  try {
    execSync("git config --global user.name 'github-actions'");
    execSync("git config --global user.email 'bot@github.com'");
    execSync("git add config_best.json training_log.csv");
    execSync("git commit -m '🤖 Auto-trained new meta config'");
    execSync("git push");
  } catch (e) {
    console.warn("⚠️ Auto-commit skipped or failed:", e.message);
  }
}

function train(gens = 30) {
  let best = baseConfig;
  let bestScore = -Infinity;
  const logLines = [];

  for (let i = 0; i < gens; i++) {
    const trial = mutate(best);
    const { score, results } = runTrial(trial);
    const survival = average(results, "survived") * 100;
    const starvation = average(results, "starved") * 100;
    const kills = average(results, "kills");
    const winRate = averageWinRate(results);

    console.log(`🎯 Gen ${i}: WinRate ${winRate.toFixed(1)}% | Score ${score} | Survival ${survival.toFixed(1)}%`);

    logLines.push(`${i},${score},${survival},${starvation},${kills},${winRate.toFixed(0)},${JSON.stringify(trial)}`);

    if (score > bestScore) {
      bestScore = score;
      best = trial;
      fs.writeFileSync("config_best.json", JSON.stringify(best, null, 2));
    }
  }

  fs.appendFileSync("training_log.csv", `generation,score,survivalRate,starvationRate,avgKills,winRate,config\n` + logLines.join("\n") + "\n");
  autoCommit();
}

train();