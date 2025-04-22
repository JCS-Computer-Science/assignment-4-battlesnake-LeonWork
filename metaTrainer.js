// === metaTrainer.js with per-mode best config saving ===
import fs from "fs";
import { simulateMatches } from "./simulateMatch.js";

const MODES = ["balanced", "aggressor", "survivor", "hunter"];
const GENERATIONS = 30;
const MATCHES_PER_CONFIG = 50;
const CANDIDATES = 5;
const CONFIG_DIR = "./";

function loadConfig(path) {
  try {
    return JSON.parse(fs.readFileSync(path));
  } catch {
    return {
      foodWeight: 10,
      aggressionWeight: 4,
      tailPriorityWeight: 3.5,
      trapAvoidanceWeight: 28,
      spaceThreshold: 19
    };
  }
}

function saveConfig(path, config) {
  fs.writeFileSync(path, JSON.stringify(config, null, 2));
}

function mutateConfig(config) {
  const delta = () => (Math.random() * 0.6 - 0.3);
  return {
    foodWeight: +(config.foodWeight + delta()).toFixed(2),
    aggressionWeight: +(config.aggressionWeight + delta()).toFixed(2),
    tailPriorityWeight: +(config.tailPriorityWeight + delta()).toFixed(2),
    trapAvoidanceWeight: +(config.trapAvoidanceWeight + delta()).toFixed(2),
    spaceThreshold: 19
  };
}

function fitness(result) {
  return result.winRate * 20 + result.averageScore + result.survivalRate * 10 + result.tournamentWinRate * 15;
}

async function train(mode) {
  console.log(`\n🚀 Training MODE: ${mode.toUpperCase()} (${GENERATIONS} gens)`);

  const metaPath = `${CONFIG_DIR}meta_config_${mode}.json`;
  const bestPath = `${CONFIG_DIR}config_best_${mode}.json`;

  let baseConfig = loadConfig(bestPath);
  if (!fs.existsSync(metaPath)) {
    console.warn(`⚠️ ${metaPath} is missing, creating default config.`);
    saveConfig(metaPath, baseConfig);
  }

  let bestFitness = -Infinity;
  let bestConfig = baseConfig;

  for (let gen = 0; gen < GENERATIONS; gen++) {
    const candidates = [bestConfig, ...Array(CANDIDATES - 1).fill(0).map(() => mutateConfig(bestConfig))];
    let topScore = -Infinity;
    let topResult = null;
    let topCandidate = null;

    for (const config of candidates) {
      fs.writeFileSync("config.json", JSON.stringify(config));
      const result = await simulateMatches(mode, MATCHES_PER_CONFIG);
      const score = fitness(result);
      if (score > topScore) {
        topScore = score;
        topCandidate = config;
        topResult = result;
      }
    }

    const winRate = topResult.winRate.toFixed(1);
    const survival = topResult.survivalRate.toFixed(1);
    const tourneyWins = topResult.tournamentWinRate.toFixed(1);
    const summary = `🎯 Gen ${gen} [${mode}]: WinRate ${winRate}% | Score ${topResult.averageScore} | Survival ${survival}% | Tourney Wins ${tourneyWins}% | Fitness ${topScore}`;
    console.log(summary);

    if (topScore > bestFitness) {
      bestFitness = topScore;
      bestConfig = topCandidate;
      saveConfig(metaPath, topCandidate);
      saveConfig(bestPath, topCandidate);
    }
  }
}

async function main() {
  const mode = process.argv[2];
  if (!MODES.includes(mode)) {
    console.error("❌ Please pass a valid mode (balanced, aggressor, survivor, hunter)");
    process.exit(1);
  }
  await train(mode);
}

main();
