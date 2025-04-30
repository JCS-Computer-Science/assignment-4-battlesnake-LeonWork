// trainer.js
import fs from "fs";
import runMatch from "./simulateMatch.js";

// --- Training Settings ---
const GENERATIONS = 20;
const CANDIDATES = 5;
const MATCHES_PER_CANDIDATE = 8;

// --- Load base config ---
const baseConfig = JSON.parse(fs.readFileSync("config.json", "utf8"));

// --- Mutation Function ---
function mutateConfig(config) {
  const mutated = { ...config };
  for (const key in mutated) {
    if (typeof mutated[key] === "number") {
      const delta = (Math.random() - 0.5) * 0.4 * mutated[key]; // stronger mutation
      mutated[key] = Math.max(0.1, parseFloat((mutated[key] + delta).toFixed(2)));
    }
  }
  return mutated;
}

// --- Score a Config + Track Enemies ---
function scoreConfig(tempConfig, beatCounter) {
  fs.writeFileSync("config.json", JSON.stringify(tempConfig, null, 2));
  let wins = 0, turnsSurvived = 0, totalKills = 0;
  const defeated = [];

  for (let i = 0; i < MATCHES_PER_CANDIDATE; i++) {
    const result = runMatch();
    if (!result) continue;
    turnsSurvived += result.survival;
    if (result.win) wins++;
    totalKills += result.kills || 0;
    defeated.push(...(result.defeatedEnemies || []));
  }

  const avgSurvival = turnsSurvived / MATCHES_PER_CANDIDATE;

  // Adaptive scoring formula
  let score;
  if (wins < MATCHES_PER_CANDIDATE) {
    score = wins * 1000 + avgSurvival + totalKills * 100;
  } else {
    const consistencyBonus = Math.pow(avgSurvival, 1.25); // emphasize longer survival
    score = 10000 + consistencyBonus * 4 + totalKills * 300;
  }

  // Update beatCounter
  for (const name of defeated) {
    beatCounter[name] = (beatCounter[name] || 0) + 1;
  }

  return { score, wins, avgSurvival, config: tempConfig };
}

// --- Train ---
function train() {
  let best = { config: baseConfig, score: 0, wins: 0, avgSurvival: 0 };
  const beatCounter = {};

  for (let gen = 1; gen <= GENERATIONS; gen++) {
    console.log(`\n📈 Generation ${gen}`);
    const candidates = [];

    for (let i = 0; i < CANDIDATES; i++) {
      const mutated = mutateConfig(best.config);
      const result = scoreConfig(mutated, beatCounter);
      console.log(
        `  Candidate ${i + 1}: Score ${result.score.toFixed(1)} | Wins: ${result.wins} | Avg Survival: ${result.avgSurvival.toFixed(1)}`
      );
      candidates.push(result);
    }

    const top = candidates.reduce((a, b) => (a.score > b.score ? a : b));
    if (top.score > best.score) {
      best = top;
      fs.writeFileSync("config_best.json", JSON.stringify(best.config, null, 2));
      console.log(`✅ New best config saved with score ${best.score.toFixed(1)}`);
    } else {
      console.log(`⏭ No improvement. Keeping previous best score: ${best.score.toFixed(1)}`);
    }
  }

  // Show real enemy names sorted by most beaten
  console.log(`\n🏆 ENEMY BEAT COUNTS:`);
  Object.entries(beatCounter)
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, count]) => {
      console.log(`  • ${name}: ${count} wins`);
    });
}

train();
