// === tournamentRunner.js ===
import fs from "fs";
import { move as myMove } from "./moveLogic.js";

const BOARD_WIDTH = 11;
const BOARD_HEIGHT = 11;
const MATCH_COUNT = 50;
const MAX_TURNS = 300;
const SILENT = process.env.SILENT === "1";


function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveTo(pos, dir) {
  return {
    x: dir === "left" ? pos.x - 1 : dir === "right" ? pos.x + 1 : pos.x,
    y: dir === "up" ? pos.y + 1 : dir === "down" ? pos.y - 1 : pos.y
  };
}

function randomMove() {
  return ["up", "down", "left", "right"][randInt(0, 3)];
}

function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function randomSafePos(used) {
  let pos, attempts = 0;
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

function getEnemyMove(snake, board) {
  const head = snake.body[0];
  const tail = snake.body.at(-1);
  const food = board.food[0];
  const dirTo = (from, to) => {
    if (to.x < from.x) return "left";
    if (to.x > from.x) return "right";
    if (to.y < from.y) return "down";
    return "up";
  };

  if (snake.name === "Aggressor") {
    const target = board.snakes.find(s => s.id !== snake.id && s.body.length < snake.body.length);
    return target ? dirTo(head, target.body[0]) : randomMove();
  }

  if (snake.name === "Evasive") {
    return dirTo(head, tail);
  }

  if (snake.name === "Chaser") {
    return food ? dirTo(head, food) : randomMove();
  }

  return randomMove();
}

function generateGameState() {
  const used = {};
  const youHead = randomSafePos(used);
  const youBody = safeBody(youHead, used);
  const you = {
    id: "you", name: "MySnake", health: 100, body: youBody,
    head: youHead, length: youBody.length
  };

  const enemies = ["Aggressor", "Evasive", "Chaser"].map((name, i) => {
    const head = randomSafePos(used);
    const body = safeBody(head, used);
    return {
      id: `enemy_${i}`, name, health: 100, body,
      head, length: body.length
    };
  });

  const food = Array.from({ length: 6 }, () => randomSafePos(used));
  return {
    turn: 0,
    board: { height: BOARD_HEIGHT, width: BOARD_WIDTH, food, snakes: [you, ...enemies] },
    you
  };
}

function simulateMatch() {
  const state = generateGameState();
  const history = [];

  for (let t = 0; t < MAX_TURNS; t++) {
    state.turn = t;
    const allSnakes = state.board.snakes;
    const moves = {};

    for (const snake of allSnakes) {
      const move = snake.id === "you" ? myMove(state).move : getEnemyMove(snake, state.board);
      moves[snake.id] = moveTo(snake.body[0], move);
    }

    for (const snake of allSnakes) {
      if (!moves[snake.id]) continue;
      snake.body.unshift(moves[snake.id]);
      snake.health--;
      const foodIdx = state.board.food.findIndex(f => f.x === moves[snake.id].x && f.y === moves[snake.id].y);
      if (foodIdx !== -1) {
        state.board.food.splice(foodIdx, 1);
        snake.health = 100;
        if (Math.random() < 0.9) state.board.food.push(randomSafePos({}));
      } else {
        snake.body.pop();
      }
    }

    state.board.snakes = allSnakes.filter(s => s.health > 0 && !collides(s, allSnakes));
    if (!state.board.snakes.some(s => s.id === "you")) break;
    history.push({ turn: t, youLength: state.you.body.length });
  }

  return {
    survived: state.board.snakes.some(s => s.id === "you"),
    length: state.you.body.length,
    turns: state.turn,
    win: state.board.snakes[0]?.id === "you"
  };
}

function collides(snake, others) {
  const head = snake.body[0];
  return others.some(s =>
    s.body.slice(1).some(p => p.x === head.x && p.y === head.y) ||
    head.x < 0 || head.x >= BOARD_WIDTH ||
    head.y < 0 || head.y >= BOARD_HEIGHT
  );
}

const results = Array.from({ length: MATCH_COUNT }, simulateMatch);
const wins = results.filter(r => r.win).length;
const survivalRate = (results.filter(r => r.survived).length / MATCH_COUNT) * 100;
const avgLength = results.reduce((a, b) => a + b.length, 0) / MATCH_COUNT;

if (!SILENT) {
  console.log(`\n🏆 Tournament Results (${MATCH_COUNT} matches)`);
  console.log(`🥇 Wins: ${wins}`);
  console.log(`💡 Survival Rate: ${survivalRate.toFixed(1)}%`);
  console.log(`📏 Avg Final Length: ${avgLength.toFixed(2)}\n`);
}


fs.writeFileSync("tournament_results.json", JSON.stringify(results, null, 2));
