import fs from "fs";
import { move as simulateMove } from "./moveLogic.js";

const BOARD_WIDTH = 11;
const BOARD_HEIGHT = 11;
const MAX_TURNS = 300;
const ENEMY_COUNT = 3;
const FOOD_COUNT = 6;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSafePos(used) {
  let pos;
  let attempts = 0;
  do {
    pos = { x: randInt(1, BOARD_WIDTH - 2), y: randInt(1, BOARD_HEIGHT - 2) };
    attempts++;
  } while (used[`${pos.x},${pos.y}`] && attempts < 100);
  used[`${pos.x},${pos.y}`] = true;
  return pos;
}

function safeBody(start, used) {
  const second = { x: start.x - 1, y: start.y };
  used[`${start.x},${start.y}`] = true;
  used[`${second.x},${second.y}`] = true;
  return [start, second];
}

function generateGameState() {
  const used = {};
  const youHead = randomSafePos(used);
  const youBody = safeBody(youHead, used);
  const you = {
    id: "you",
    name: "MySnake",
    health: 100,
    body: youBody,
    latency: "0",
    head: youHead,
    length: youBody.length,
    shout: "",
    squad: ""
  };

  const snakes = [you];
  for (let i = 0; i < ENEMY_COUNT; i++) {
    const head = randomSafePos(used);
    const body = safeBody(head, used);
    const type = i === 0 ? "aggressive" : i === 1 ? "evasive" : "hunter";
    snakes.push({
      id: `enemy_${i}`,
      name: `SmartBot${i}`,
      health: 100,
      body,
      latency: "0",
      head,
      length: body.length,
      shout: type,
      type
    });
  }

  const food = [];
  for (let i = 0; i < FOOD_COUNT; i++) {
    food.push(randomSafePos(used));
  }

  return {
    game: {
      id: `game-${Math.floor(Math.random() * 1000000)}`,
      ruleset: { name: "standard", version: "v1.0.17" },
      timeout: 500
    },
    turn: 0,
    board: {
      height: BOARD_HEIGHT,
      width: BOARD_WIDTH,
      food,
      snakes
    },
    you
  };
}

function moveTo(pos, dir) {
  return {
    x: dir === "left" ? pos.x - 1 : dir === "right" ? pos.x + 1 : pos.x,
    y: dir === "up" ? pos.y + 1 : dir === "down" ? pos.y - 1 : pos.y
  };
}

function simulateSingleMatch(index, silent = false) {
  const gameState = generateGameState();
  let alive = true;
  let reason = "maxTurns";
  let foodEaten = 0;
  let kills = 0;
  let stayedNearCenter = 0;
  let avoidedWalls = 0;
  let longSurvivalBonus = 0;

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    gameState.turn = turn;
    const allSnakes = gameState.board.snakes;
    const moveMap = {};

    for (const snake of allSnakes) {
      const move = snake.id === "you"
        ? simulateMove(gameState).move
        : ["up", "down", "left", "right"][Math.floor(Math.random() * 4)];
      const newHead = moveTo(snake.body[0], move);
      moveMap[snake.id] = newHead;
    }

    for (const snake of allSnakes) {
      const newHead = moveMap[snake.id];
      snake.body.unshift(newHead);
      snake.health--;
      const foodIdx = gameState.board.food.findIndex(f => f.x === newHead.x && f.y === newHead.y);
      if (foodIdx !== -1) {
        snake.health = 100;
        gameState.board.food.splice(foodIdx, 1);
        if (snake.id === "you") foodEaten++;
        if (Math.random() < 0.85) {
          gameState.board.food.push({ x: randInt(0, BOARD_WIDTH - 1), y: randInt(0, BOARD_HEIGHT - 1) });
        }
      } else {
        snake.body.pop();
      }
    }

    const positions = {};
    for (const snake of allSnakes) {
      const head = snake.body[0];
      const key = `${head.x},${head.y}`;
      if (!positions[key]) positions[key] = [];
      positions[key].push(snake);
    }

    for (const snake of allSnakes) {
      const head = snake.body[0];
      const key = `${head.x},${head.y}`;
      const collision =
        head.x < 0 || head.x >= BOARD_WIDTH ||
        head.y < 0 || head.y >= BOARD_HEIGHT ||
        positions[key].length > 1 ||
        allSnakes.some(s => s !== snake && s.body.some(p => p.x === head.x && p.y === head.y));

      if (collision || snake.health <= 0) {
        snake.health = 0;
        if (snake.id === "you") {
          alive = false;
          reason = snake.health <= 0 ? "starved" : "collision";
        }
      }
    }

    const head = gameState.you.body[0];
    const nearWall = head.x === 0 || head.y === 0 || head.x === BOARD_WIDTH - 1 || head.y === BOARD_HEIGHT - 1;
    if (!nearWall) avoidedWalls++;
    if (Math.abs(head.x - 5) + Math.abs(head.y - 5) <= 3) stayedNearCenter++;
    if (turn % 50 === 0 && turn > 0) longSurvivalBonus++;

    gameState.board.snakes = gameState.board.snakes.filter(s => s.health > 0);
    if (!gameState.board.snakes.some(s => s.id === "you")) break;
  }

  const aliveSnakes = gameState.board.snakes.filter(s => s.health > 0);
  const onlyYouLeft = aliveSnakes.length === 1 && aliveSnakes[0].id === "you";
  const top2 = aliveSnakes.length <= 2 && aliveSnakes.some(s => s.id === "you");

  const score =
    (alive ? 500 : 0) +
    (onlyYouLeft ? 1000 : 0) +
    (top2 && !onlyYouLeft ? 300 : 0) +
    gameState.turn +
    foodEaten * 8 +
    kills * 40 +
    Math.floor(stayedNearCenter / 10) * 5 +
    Math.floor(avoidedWalls / 10) * 3 +
    longSurvivalBonus * 15;

  return {
    match: index,
    survived: alive,
    win: alive && onlyYouLeft,
    score
  };
}

export async function simulateMatches(mode, matchCount, options = {}) {
  const silent = options.silent ?? false;
  let wins = 0, scoreSum = 0, survived = 0, tourneyWins = 0;

  for (let i = 0; i < matchCount; i++) {
    const result = simulateSingleMatch(i + 1, silent);
    scoreSum += result.score;
    if (result.win) wins++;
    if (result.survived) survived++;
    if (result.win) tourneyWins++; // assume win = tournament win
  }

  return {
    winRate: (wins / matchCount) * 100,
    averageScore: scoreSum / matchCount,
    survivalRate: (survived / matchCount) * 100,
    tournamentWinRate: (tourneyWins / matchCount) * 100
  };
}

// Runner block: allows standalone use
if (process.argv[1].endsWith("simulateMatch.js")) {
  const mode = process.argv[2] || "survivor";
  const matchCount = parseInt(process.argv[3], 10) || 100;

  simulateMatches(mode, matchCount).then(result => {
    console.log(`\n✅ Simulated ${matchCount} matches as ${mode}`);
    console.log(`🏁 Survived: ${result.survivalRate.toFixed(1)}%`);
    console.log(`🎯 Win Rate: ${result.winRate.toFixed(1)}%`);
    console.log(`📊 Avg Score: ${result.averageScore.toFixed(1)}`);
  });
}