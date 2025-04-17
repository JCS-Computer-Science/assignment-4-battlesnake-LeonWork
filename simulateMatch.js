import fs from "fs";
import { move as simulateMove } from "./moveLogic.js";

const BOARD_WIDTH = 11;
const BOARD_HEIGHT = 11;
const MAX_TURNS = 300;
const MATCH_COUNT = 100;
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

function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function smartEnemyMove(snake, board) {
  const directions = ["up", "down", "left", "right"];
  const head = snake.body[0];
  let bestMove = "up";
  let maxValue = -Infinity;

  for (const dir of directions) {
    const next = moveTo(head, dir);
    if (next.x < 0 || next.x >= board.width || next.y < 0 || next.y >= board.height) continue;

    let occupied = false;
    for (const s of board.snakes) {
      for (const part of s.body) {
        if (part.x === next.x && part.y === next.y) {
          occupied = true;
          break;
        }
      }
      if (occupied) break;
    }
    if (occupied) continue;

    let value = 0;
    const nearestFood = board.food.sort((a, b) => manhattan(next, a) - manhattan(next, b))[0];
    const tail = snake.body[snake.body.length - 1];

    switch (snake.type) {
      case "aggressive": {
        const enemies = board.snakes.filter(s => s.id !== snake.id);
        for (const e of enemies) {
          const eHead = e.body[0];
          value += 10 / (manhattan(next, eHead) + 1);
        }
        break;
      }
      case "evasive": {
        for (const s of board.snakes) {
          if (s.id === snake.id) continue;
          value -= 5 / (manhattan(next, s.body[0]) + 1);
        }
        value += 3 / (manhattan(next, tail) + 1);
        break;
      }
      case "hunter": {
        if (nearestFood) {
          value += 20 / (manhattan(next, nearestFood) + 1);
        }
        break;
      }
    }

    let space = 0;
    const visited = new Set();
    const queue = [next];
    while (queue.length && space < 20) {
      const curr = queue.shift();
      const key = `${curr.x},${curr.y}`;
      if (visited.has(key)) continue;
      if (curr.x < 0 || curr.y < 0 || curr.x >= board.width || curr.y >= board.height) continue;
      let block = false;
      for (const s of board.snakes) {
        for (const part of s.body) {
          if (part.x === curr.x && part.y === curr.y) {
            block = true;
            break;
          }
        }
        if (block) break;
      }
      if (block) continue;
      visited.add(key);
      space++;
      queue.push({ x: curr.x + 1, y: curr.y });
      queue.push({ x: curr.x - 1, y: curr.y });
      queue.push({ x: curr.x, y: curr.y + 1 });
      queue.push({ x: curr.x, y: curr.y - 1 });
    }
    value += space * 0.5;

    if (value > maxValue) {
      maxValue = value;
      bestMove = dir;
    }
  }

  return bestMove;
}

function centerDistance(pos) {
  const center = { x: Math.floor(BOARD_WIDTH / 2), y: Math.floor(BOARD_HEIGHT / 2) };
  return Math.abs(pos.x - center.x) + Math.abs(pos.y - center.y);
}

function simulateSingleMatch(matchIndex) {
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

    const newEnemyHeads = {};
    for (const snake of gameState.board.snakes) {
      if (snake.id === "you") continue;
      const move = smartEnemyMove(snake, gameState.board);
      const newHead = moveTo(snake.body[0], move);
      newEnemyHeads[snake.id] = newHead;
      snake.body.unshift(newHead);
      snake.body.pop();
    }

    const nextMove = simulateMove(gameState);
    const newHead = moveTo(gameState.you.body[0], nextMove.move);

    for (const [id, enemyHead] of Object.entries(newEnemyHeads)) {
      if (enemyHead.x === newHead.x && enemyHead.y === newHead.y) {
        const myLen = gameState.you.body.length;
        const enemy = gameState.board.snakes.find(s => s.id === id);
        if (enemy && enemy.body.length >= myLen) {
          alive = false;
          reason = "head_to_head_loss";
          break;
        } else {
          kills++;
        }
      }
    }
    if (!alive) break;

    if (
      newHead.x < 0 || newHead.x >= BOARD_WIDTH ||
      newHead.y < 0 || newHead.y >= BOARD_HEIGHT
    ) {
      alive = false;
      reason = "out_of_bounds";
      break;
    }

    const nearWall = newHead.x === 0 || newHead.y === 0 || newHead.x === BOARD_WIDTH - 1 || newHead.y === BOARD_HEIGHT - 1;
    if (!nearWall) avoidedWalls++;
    if (centerDistance(newHead) <= 3) stayedNearCenter++;
    if (turn % 50 === 0 && turn > 0) longSurvivalBonus++;

    const occupied = new Set();
    for (const snake of gameState.board.snakes) {
      for (const part of snake.body) {
        occupied.add(`${part.x},${part.y}`);
      }
    }
    if (occupied.has(`${newHead.x},${newHead.y}`)) {
      alive = false;
      reason = "collision";
      break;
    }

    gameState.you.body.unshift(newHead);
    gameState.you.health -= 1;

    const foodIndex = gameState.board.food.findIndex(f => f.x === newHead.x && f.y === newHead.y);
    if (foodIndex !== -1) {
      gameState.you.health = 100;
      gameState.board.food.splice(foodIndex, 1);
      foodEaten++;
      if (Math.random() < 0.85) {
        gameState.board.food.push({ x: randInt(0, BOARD_WIDTH - 1), y: randInt(0, BOARD_HEIGHT - 1) });
      }
    } else {
      gameState.you.body.pop();
    }

    if (gameState.you.health <= 0) {
      alive = false;
      reason = "starved";
      break;
    }
  }

  const score =
    (alive ? 300 : 0) +
    gameState.turn +
    foodEaten * 6 +
    kills * 30 +
    Math.floor(stayedNearCenter / 10) * 5 +
    Math.floor(avoidedWalls / 10) * 3 +
    longSurvivalBonus * 10;

  return {
    match: matchIndex,
    survived: alive,
    turns: gameState.turn + 1,
    reason,
    foodEaten,
    kills,
    stayedNearCenter,
    avoidedWalls,
    longSurvivalBonus,
    score
  };
}

const results = [];
for (let i = 0; i < MATCH_COUNT; i++) {
  const result = simulateSingleMatch(i + 1);
  results.push(result);
}

const avgScore = (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(2);
const survived = results.filter(r => r.survived).length;

console.log(`✅ Simulated ${MATCH_COUNT} matches`);
console.log(`🏁 Survived: ${survived}/${MATCH_COUNT}`);
console.log(`📊 Avg Score: ${avgScore}`);

fs.writeFileSync("batch_results.json", JSON.stringify(results, null, 2));