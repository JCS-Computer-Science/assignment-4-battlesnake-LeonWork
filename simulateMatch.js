import fs from "fs";
import { move as simulateMove } from "./moveLogic.js";


const BOARD_WIDTH = 11;
const BOARD_HEIGHT = 11;
const MAX_TURNS = 150;
const MATCH_COUNT = 100;
const ENEMY_COUNT = 2;
const FOOD_COUNT = 5;


function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateGameState() {
  const used = {};

  function safeBody(start) {
    const second = { x: start.x - 1, y: start.y };
    used[`${start.x},${start.y}`] = true;
    used[`${second.x},${second.y}`] = true;
    return [start, second];
  }

  function randomSafePos() {
    let pos;
    let attempts = 0;
    do {
      pos = {
        x: randInt(2, BOARD_WIDTH - 3),
        y: randInt(2, BOARD_HEIGHT - 3),
      };
      attempts++;
    } while (used[`${pos.x},${pos.y}`] && attempts < 100);
    used[`${pos.x},${pos.y}`] = true;
    return pos;
  }

  const youHead = randomSafePos();
  const youBody = safeBody(youHead);
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
    const head = randomSafePos();
    const body = safeBody(head);
    snakes.push({
      id: `enemy_${i}`,
      name: `Enemy${i}`,
      health: 100,
      body,
      latency: "0",
      head,
      length: body.length,
      shout: "",
      squad: ""
    });
  }

  const food = [];
  for (let i = 0; i < FOOD_COUNT; i++) {
    food.push(randomSafePos());
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


function simulateSingleMatch(matchIndex) {
  const gameState = generateGameState();
  let alive = true;
  let reason = "maxTurns";
  const log = [];

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    gameState.turn = turn;

    const nextMove = simulateMove(gameState);
    const newHead = moveTo(gameState.you.body[0], nextMove.move);

    
    if (
      newHead.x < 0 || newHead.x >= BOARD_WIDTH ||
      newHead.y < 0 || newHead.y >= BOARD_HEIGHT
    ) {
      alive = false;
      reason = "out_of_bounds";
      break;
    }

    
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

      
      const newFood = {
        x: randInt(0, BOARD_WIDTH - 1),
        y: randInt(0, BOARD_HEIGHT - 1)
      };
      gameState.board.food.push(newFood);
    } else {
      gameState.you.body.pop(); 
    }

    if (gameState.you.health <= 0) {
      alive = false;
      reason = "starved";
      break;
    }

    log.push({
      match: matchIndex,
      turn,
      move: nextMove.move,
      head: newHead,
      health: gameState.you.health,
      length: gameState.you.body.length
    });
  }

  for (const entry of log) {
    fs.appendFileSync("match_log.jsonl", JSON.stringify(entry) + "\n");
  }

  return {
    match: matchIndex,
    survived: alive,
    turns: gameState.turn + 1,
    reason,
    score: (alive ? 100 : 0) + gameState.turn
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
