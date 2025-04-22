import { execSync } from "child_process";

const modes = ["balanced", "aggressor", "survivor", "hunter"];
const generations = 30;

for (const mode of modes) {
  console.log(`\n🚀 Training MODE: ${mode.toUpperCase()} (${generations} gens)`);
  try {
    execSync(`MODE=${mode} node metaTrainer.js`, { stdio: "inherit" });
  } catch (err) {
    console.warn(`❌ Failed training for ${mode}:`, err.message);
  }
}
