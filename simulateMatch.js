// Updated simulateMatch.js
import myMove from "./moveLogic.js";
import * as Aggressive from "./enemySnakes/Aggressive.js";
import * as Evasive from "./enemySnakes/Evasive.js";
import * as Random from "./enemySnakes/Random.js";
import * as LeonAdvanced from "./enemySnakes/LeonAdvanced.js";
import * as LeonAggressive from "./enemySnakes/LeonAggressive.js";
import * as LeonDefensive from "./enemySnakes/LeonDefensive.js";
import * as LeonGreedy from "./enemySnakes/LeonGreedy.js";
import * as HazardAvoider from "./enemySnakes/HazardAvoider.js";
import * as HazardTrapper from "./enemySnakes/HazardTrapper.js";
import fs from "fs";

const REPLAY = [];
const MATCH_ID = Date.now();
const BOARD_WIDTH = 11;
const BOARD_HEIGHT = 11;
const ENEMY_COUNT = 3;
const SHRINK_EVERY_TURNS = 20;

const enemyBrains = [
  LeonAggressive, LeonDefensive, LeonGreedy,
  HazardAvoider, HazardTrapper,
  Aggressive, Evasive, Random, LeonAdvanced
];

const enemyLabels = [
  "LeonAggressive", "LeonDefensive", "LeonGreedy",
  "HazardAvoider", "HazardTrapper",
  "Aggressive", "Evasive", "Random", "LeonAdvanced"
];

function createInitialGameState() {
  const snakes = [
    createSnake("you", { x: 5, y: 5 }),
    ...Array.from({ length: ENEMY_COUNT }).map((_, i) =>
      createSnake(`enemy_${i}`, { x: i + 1, y: 1 })
    )
  ];

  return {
    game: { id: "game-id", ruleset: { name: "royale", version: "1.0.0", settings: {} }, timeout: 500 },
    turn: 0,
    board: { height: BOARD_HEIGHT, width: BOARD_WIDTH, food: [randomCoord()], hazards: [], snakes },
    you: snakes[0]
  };
}

function createSnake(id, head) {
  return { id, name: id, health: 100, body: [head, { x: head.x - 1, y: head.y }], length: 2, shout: "", squad: "" };
}

function randomCoord() {
  return { x: Math.floor(Math.random() * BOARD_WIDTH), y: Math.floor(Math.random() * BOARD_HEIGHT) };
}

function generateHazardRing(turn) {
  const layers = Math.floor(turn / SHRINK_EVERY_TURNS);
  const hazards = [];
  for (let i = 0; i < BOARD_WIDTH; i++) {
    for (let j = 0; j < BOARD_HEIGHT; j++) {
      if (i < layers || j < layers || i >= BOARD_WIDTH - layers || j >= BOARD_HEIGHT - layers) {
        hazards.push({ x: i, y: j });
      }
    }
  }
  return hazards;
}

function runMatch() {
  const gameState = createInitialGameState();
  const enemiesUsed = [];

  const sampledEnemies = enemyBrains
    .map((brain, i) => ({ brain, label: enemyLabels[i] }))
    .sort(() => Math.random() - 0.5)
    .slice(0, ENEMY_COUNT);

  for (let i = 0; i < sampledEnemies.length; i++) {
    const { label } = sampledEnemies[i];
    enemiesUsed.push(label);
  }

  const originalConsoleLog = console.log;
  console.log = function () {};

  while (true) {
    gameState.turn++;
    REPLAY.push(JSON.parse(JSON.stringify(gameState)));
    gameState.board.hazards = generateHazardRing(gameState.turn);

    const myMoveResponse = myMove(gameState);
    applyMove(gameState, "you", myMoveResponse.move);

    for (let i = 1; i < gameState.board.snakes.length; i++) {
      const enemy = gameState.board.snakes[i];
      if (enemy.health <= 0) continue;
      const brain = sampledEnemies[i - 1].brain;
      const enemyGameState = structuredClone(gameState);
      enemyGameState.you = enemy;
      const dir = brain.move(enemyGameState, enemy);
      applyMove(gameState, enemy.id, dir);
    }

    const alive = gameState.board.snakes.find(s => s.id === "you" && s.health > 0);
    if (!alive) {
      console.log = originalConsoleLog;
      const defeated = sampledEnemies
        .map((e, i) => ({ label: e.label, alive: gameState.board.snakes[i + 1].health > 0 }))
        .filter(e => !e.alive)
        .map(e => e.label);
      return { win: false, survival: gameState.turn, length: gameState.you.body.length, kills: 0, enemiesUsed, defeatedEnemies: defeated };
    }

    const remaining = gameState.board.snakes.filter(s => s.health > 0);
    if (remaining.length === 1 && remaining[0].id === "you") {
      console.log = originalConsoleLog;
      const defeated = sampledEnemies.map(e => e.label);
      return { win: true, survival: gameState.turn, length: gameState.you.body.length, kills: gameState.board.snakes.length - 1, enemiesUsed, defeatedEnemies: defeated };
    }

    for (let snake of gameState.board.snakes) {
      snake.health -= 1;
      const head = snake.body[0];
      if (gameState.board.hazards.some(h => h.x === head.x && h.y === head.y)) {
        snake.health -= 15;
      }
    }

    for (let snake of gameState.board.snakes) {
      const head = snake.body[0];
      const foodIdx = gameState.board.food.findIndex(f => f.x === head.x && f.y === head.y);
      if (foodIdx !== -1) {
        gameState.board.food.splice(foodIdx, 1);
        snake.health = 100;
        snake.body.push({ ...snake.body[snake.body.length - 1] });
        snake.length++;
        gameState.board.food.push(randomCoord());
      }
    }
  }
}

function applyMove(gameState, id, dir) {
  const snake = gameState.board.snakes.find(s => s.id === id);
  if (!snake || snake.health <= 0) return;

  const head = { ...snake.body[0] };
  const delta = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const [dx, dy] = delta[dir] || [0, 0];
  const newHead = { x: head.x + dx, y: head.y + dy };

  if (newHead.x < 0 || newHead.x >= BOARD_WIDTH || newHead.y < 0 || newHead.y >= BOARD_HEIGHT) {
    snake.health = 0;
    return;
  }

  for (const other of gameState.board.snakes) {
    for (const part of other.body) {
      if (part.x === newHead.x && part.y === newHead.y) {
        snake.health = 0;
        return;
      }
    }
  }

  snake.body.unshift(newHead);
  snake.body.pop();
}

export default runMatch;
