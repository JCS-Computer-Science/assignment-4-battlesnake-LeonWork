import { execSync } from "child_process";
import fs from "fs";

const MODES = ["balanced", "aggressor", "survivor", "hunter"];
const CONFIG_DIR = "./";

function loadConfig(path) {
  try {
    return JSON.parse(fs.readFileSync(path));
  } catch {
    return null;
  }
}

function fitness(result) {
  return result.winRate * 20 + result.averageScore + result.survivalRate * 10 + result.tournamentWinRate * 15;
}

let globalBestScore = -Infinity;
let globalBestMode = "";
let globalBestConfig = null;

for (const mode of MODES) {
  console.log(`\n🚀 Training MODE: ${mode.toUpperCase()}`);
  const cmd = `MODE=${mode} node metaTrainer.js`;
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (err) {
    console.error(`❌ Failed training for ${mode}:`, err.message);
    continue;
  }

  const resultPath = `${CONFIG_DIR}batch_results.json`;
  const resultData = JSON.parse(fs.readFileSync(resultPath));
  const scores = resultData.map(r => r.score);
  const avgScore = scores.reduce((a, b) => a + b) / scores.length;
  const survivalRate = resultData.filter(r => r.survived).length / resultData.length * 100;
  const winRate = resultData.filter(r => r.win).length / resultData.length * 100;

  const fakeResult = { averageScore: avgScore, winRate, survivalRate, tournamentWinRate: winRate }; // tournamentWinRate ≈ winRate
  const score = fitness(fakeResult);

  console.log(`📊 ${mode.toUpperCase()} fitness: ${score.toFixed(2)}`);

  if (score > globalBestScore) {
    globalBestScore = score;
    globalBestMode = mode;
    globalBestConfig = loadConfig(`${CONFIG_DIR}config_best_${mode}.json`);
  }
}

if (globalBestConfig) {
  fs.writeFileSync(`${CONFIG_DIR}config_best.json`, JSON.stringify(globalBestConfig, null, 2));
  console.log(`\n🏆 GLOBAL BEST CONFIG is from MODE: ${globalBestMode.toUpperCase()} with score ${globalBestScore.toFixed(2)}`);
  console.log(`✅ Saved to config_best.json`);
}
