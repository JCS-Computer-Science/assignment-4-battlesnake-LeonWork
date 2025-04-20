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

function average(results, key) {
  return parseFloat((results.reduce((sum, r) => sum + (r[key] || 0), 0) / results.length).toFixed(2));
}

function averageWinRate(results) {
  return results.filter(r => r.win).length / results.length * 100;
}

function runTrial(config) {
  fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
  try {
    execSync("node simulateMatch.js", { stdio: "ignore", env: { ...process.env, SILENT: "1" } });
    execSync("npm run tournament", { stdio: "ignore", env: { ...process.env, SILENT: "1" } });

    const results = JSON.parse(fs.readFileSync("batch_results.json", "utf8"));
    const tournamentResults = JSON.parse(fs.readFileSync("tournament_results.json", "utf8"));

    const score = results.reduce((sum, r) => sum + r.score, 0) / results.length;
    const tournamentWinRate = tournamentResults.filter(r => r.win).length / tournamentResults.length * 100;

    return { score: Math.round(score), results, tournamentWinRate };

  } catch (error) {
    console.warn("❌ runTrial failed:", error.message);
    return { score: -9999, results: [], tournamentWinRate: 0 };
  }
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

function train(gens = 30) {
  let best = baseConfig;
  let bestScore = -Infinity;
  const logLines = [];

  for (let i = 0; i < gens; i++) {
    const trial = mutate(best);
    const { score, results, tournamentWinRate } = runTrial(trial);
    const survival = average(results, "survived") * 100 || 0;
    const starvation = average(results, "starved") * 100 || 0;
    const kills = average(results, "kills") || 0;
    const winRate = averageWinRate(results) || 0;

    console.log(`🎯 Gen ${i}: WinRate ${winRate.toFixed(1)}% | Score ${score} | Survival ${survival.toFixed(1)}% | Tourney Wins ${tournamentWinRate.toFixed(1)}%`);

    logLines.push(`${i},${score},${survival},${starvation},${kills},${tournamentWinRate.toFixed(0)},${JSON.stringify(trial)}`);

    if (score > bestScore) {
      bestScore = score;
      best = trial;

      // ✅ Save only if it's actually better
      fs.writeFileSync("config_best.json", JSON.stringify(best, null, 2));
      fs.writeFileSync("meta_config.json", JSON.stringify(best, null, 2));
    }
  }

  if (!fs.existsSync("training_log.csv")) {
    fs.writeFileSync("training_log.csv", `generation,score,survivalRate,starvationRate,avgKills,winRate,config\n`);
  }
  fs.appendFileSync("training_log.csv", logLines.join("\n") + "\n");

  autoCommit();
}

train();
