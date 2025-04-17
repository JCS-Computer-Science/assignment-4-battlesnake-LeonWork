import fs from "fs";
import { execSync } from "child_process";

if (!fs.existsSync("meta_config.json")) {
  console.error("Error: meta_config.json is missing.");
  process.exit(1);
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

function runMatch(config) {
  fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
  try {
    execSync("node simulateMatch.js", { stdio: "ignore" });
    const results = JSON.parse(fs.readFileSync("batch_results.json", "utf8"));
    return results;
  } catch (error) {
    console.error("Simulation failed:", error.message);
    return [];
  }
}

function scoreResults(results) {
  const survival = results.filter(r => r.survived).length;
  const starvation = results.filter(r => r.reason === "starved").length;
  const kills = results.reduce((sum, r) => sum + r.kills, 0);
  const wins = results.filter(r => r.win).length;
  const score = results.reduce((sum, r) => sum + r.score, 0);
  return {
    score,
    survivalRate: survival,
    starvationRate: starvation,
    avgKills: (kills / results.length).toFixed(2),
    winRate: wins,
  };
}

function autoCommit() {
  try {
    execSync(`git add .`);
    execSync(`git commit --allow-empty -m "🤖 Auto-trained new meta config"`);
    execSync(`git push`);
    console.log("✅ Auto-committed and pushed new config.");
  } catch (e) {
    console.error("❌ Auto-commit failed:", e.message);
  }
}

function train(gens = 30) {
  let best = baseConfig;
  let bestScore = -Infinity;

  for (let i = 0; i <= gens; i++) {
    const trial = i === 0 ? baseConfig : mutate(best);
    const results = runMatch(trial);
    const { score, survivalRate, starvationRate, avgKills, winRate } = scoreResults(results);

    console.log(`🎯 Gen ${i}: WinRate ${winRate} | Score ${score} | Survival ${survivalRate}.0%`);

    fs.appendFileSync("training_log.csv", `${i},${score},${survivalRate},${starvationRate},${avgKills},${winRate},${JSON.stringify(trial)}\n`);

    if (score > bestScore) {
      bestScore = score;
      best = trial;
      fs.writeFileSync("meta_config.json", JSON.stringify(best, null, 2));
    }
  }

  autoCommit();
}

train(30);
