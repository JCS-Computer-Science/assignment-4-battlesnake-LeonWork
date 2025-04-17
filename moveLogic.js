// ===== moveLogic.js with starvation and scoring improvements =====
import fs from "fs";
const config = JSON.parse(fs.readFileSync(new URL("./config_best.json", import.meta.url)));

function move(gameState) {
  const moves = ["up", "down", "left", "right"];
  const head = gameState.you.body[0];
  const neck = gameState.you.body[1];
  const width = gameState.board.width;
  const height = gameState.board.height;
  const center = { x: Math.floor(width / 2), y: Math.floor(height / 2) };
  const myLength = gameState.you.body.length;
  const health = gameState.you.health;
  const turn = gameState.turn;

  const allSnakes = gameState.board.snakes;
  const largerSnakes = allSnakes.filter(s => s.body.length > myLength);
  const smallerSnakes = allSnakes.filter(s => s.body.length < myLength);
  const IAmBiggest = largerSnakes.length === 0;
  const IAmSmallest = smallerSnakes.length === 0;
  const endGame = allSnakes.length <= 2;

  let mode = "balanced";
  if (IAmBiggest && endGame) mode = "hunter";
  else if (IAmSmallest) mode = "survivor";
  else if (IAmBiggest) mode = "aggressor";
  else if (endGame) mode = "conservative";

  let moveSafety = { up: true, down: true, left: true, right: true };
  moveSafety.left = neck.x < head.x ? false : moveSafety.left;
  moveSafety.right = neck.x > head.x ? false : moveSafety.right;
  moveSafety.down = neck.y < head.y ? false : moveSafety.down;
  moveSafety.up = neck.y > head.y ? false : moveSafety.up;

  if (head.x === 0) moveSafety.left = false;
  if (head.x === width - 1) moveSafety.right = false;
  if (head.y === 0) moveSafety.down = false;
  if (head.y === height - 1) moveSafety.up = false;

  for (const part of gameState.you.body) blockIf(head, part, moveSafety);
  for (const snake of gameState.board.snakes) {
    for (const part of snake.body) blockIf(head, part, moveSafety);
    const eHead = snake.body[0];
    if (snake.body.length >= myLength) {
      if (head.x + 1 === eHead.x && head.y === eHead.y) moveSafety.right = false;
      if (head.x - 1 === eHead.x && head.y === eHead.y) moveSafety.left = false;
      if (head.x === eHead.x && head.y + 1 === eHead.y) moveSafety.up = false;
      if (head.x === eHead.x && head.y - 1 === eHead.y) moveSafety.down = false;
    }
  }

  const safeMoves = Object.keys(moveSafety).filter(m => moveSafety[m]);
  const scores = {};
  const tail = gameState.you.body[gameState.you.body.length - 1];
  const zoneControl = getMyZoneScore(gameState);
  const enemyHeads = gameState.board.snakes.filter(s => s.id !== gameState.you.id).map(s => s.body[0]);
  const foodTargets = gameState.board.food;

  const needFood = health < 40 || myLength < 6 || turn > 150;

  for (const move of safeMoves) {
    const next = moveTo(head, move);
    let score = floodFill(next, gameState, 60);

    for (const enemyHead of enemyHeads) {
      const predictedEnemyMoves = [
        { x: enemyHead.x + 1, y: enemyHead.y },
        { x: enemyHead.x - 1, y: enemyHead.y },
        { x: enemyHead.x, y: enemyHead.y + 1 },
        { x: enemyHead.x, y: enemyHead.y - 1 }
      ];
      for (const enemyMove of predictedEnemyMoves) {
        if (next.x === enemyMove.x && next.y === enemyMove.y) {
          score -= 1000;
        }
      }
    }

    const futureSpace = floodFill(next, gameState, 40);
    if (futureSpace < config.spaceThreshold) score -= config.trapAvoidanceWeight;
    if (myLength > 10 && futureSpace < myLength / 2) score -= 50;
    if (futureSpace < 15 && dist(next, tail) < 5) score += config.tailPriorityWeight;

    if (turn > 2 && foodTargets.length) {
      const food = getSafeFood(head, gameState, myLength);
      if (food) {
        const foodDistance = dist(head, food);
        const closeEnemy = gameState.board.snakes.some(s => {
          if (s.id === gameState.you.id) return false;
          const eHead = s.body[0];
          return dist(eHead, food) <= foodDistance && s.body.length >= myLength;
        });
        if (!closeEnemy || (needFood && turn > 10)) {
          score += config.foodWeight * proximityBonus(move, head, food);
          if (needFood && foodDistance <= 5) score += 10;
          if (needFood && foodDistance <= 2) score += 20;
        } else if (!needFood && foodDistance > 5) {
          score -= 5;
        }
      }
    }

    scores[move] = score;
  }

  const bestMove = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || safeMoves[0] || "down";
  console.log(`[Turn ${gameState.turn}] Mode: ${mode} | Move: ${bestMove} | Health: ${health} | Length: ${myLength}`);
  return { move: bestMove };
}

function moveTo(pos, dir) {
  return {
    x: dir === "left" ? pos.x - 1 : dir === "right" ? pos.x + 1 : pos.x,
    y: dir === "up" ? pos.y + 1 : dir === "down" ? pos.y - 1 : pos.y
  };
}

function blockIf(head, part, safety) {
  if (head.x + 1 === part.x && head.y === part.y) safety.right = false;
  if (head.x - 1 === part.x && head.y === part.y) safety.left = false;
  if (head.x === part.x && head.y + 1 === part.y) safety.up = false;
  if (head.x === part.x && head.y - 1 === part.y) safety.down = false;
}

function floodFill(start, gameState, limit = 100) {
  const width = gameState.board.width;
  const height = gameState.board.height;
  const visited = new Set();
  const queue = [start];
  const blocked = {};
  for (const snake of gameState.board.snakes) {
    for (const part of snake.body) blocked[`${part.x},${part.y}`] = true;
  }
  let count = 0;
  while (queue.length && count < limit) {
    const curr = queue.shift();
    const key = `${curr.x},${curr.y}`;
    if (visited.has(key) || blocked[key]) continue;
    if (curr.x < 0 || curr.x >= width || curr.y < 0 || curr.y >= height) continue;
    visited.add(key);
    count++;
    queue.push({ x: curr.x + 1, y: curr.y });
    queue.push({ x: curr.x - 1, y: curr.y });
    queue.push({ x: curr.x, y: curr.y + 1 });
    queue.push({ x: curr.x, y: curr.y - 1 });
  }
  return count;
}

function dist(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function proximityBonus(dir, from, to) {
  const next = moveTo(from, dir);
  return 1 / (dist(next, to) + 1);
}

function getSafeFood(myHead, gameState, myLength) {
  let best = null;
  let bestDist = Infinity;
  for (const food of gameState.board.food) {
    const myD = dist(myHead, food);
    let safe = true;
    for (const snake of gameState.board.snakes) {
      if (snake.id === gameState.you.id) continue;
      const eHead = snake.body[0];
      const eDist = dist(eHead, food);
      if (eDist < myD || (eDist === myD && snake.body.length >= myLength)) {
        safe = false;
        break;
      }
    }
    if (safe && myD < bestDist) {
      bestDist = myD;
      best = food;
    }
  }
  return best;
}

function getMyZoneScore(gameState) {
  const width = gameState.board.width || 11;
  const height = gameState.board.height || 11;
  const board = Array.from({ length: width }, () => Array(height).fill(null));
  for (const snake of gameState.board.snakes) {
    for (const part of snake.body) {
      if (part.x >= 0 && part.x < width && part.y >= 0 && part.y < height) {
        board[part.x][part.y] = "X";
      }
    }
  }
  const distances = {};
  for (const snake of gameState.board.snakes) {
    const id = snake.id;
    const head = snake.body[0];
    const queue = [{ x: head.x, y: head.y, dist: 0 }];
    const visited = new Set();
    while (queue.length) {
      const { x, y, dist } = queue.shift();
      const key = `${x},${y}`;
      if (x < 0 || y < 0 || x >= width || y >= height) continue;
      if (visited.has(key)) continue;
      if (board[x][y] !== null && board[x][y] !== id) continue;
      visited.add(key);
      if (!distances[key] || dist < distances[key].dist) distances[key] = { id, dist };
      queue.push({ x: x + 1, y, dist: dist + 1 });
      queue.push({ x: x - 1, y, dist: dist + 1 });
      queue.push({ x, y: y + 1, dist: dist + 1 });
      queue.push({ x, y: y - 1, dist: dist + 1 });
    }
  }
  let myControl = 0;
  let total = 0;
  for (const key in distances) {
    total++;
    if (distances[key].id === gameState.you.id) myControl++;
  }
  return myControl / total;
}

export { move };
