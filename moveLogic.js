import fs from "fs";

// Load best trained config globally
const config = JSON.parse(fs.readFileSync(new URL("./config_best.json", import.meta.url)));

function move(gameState) {
  const head = gameState.you.body[0];
  const neck = gameState.you.body[1];
  const myLength = gameState.you.body.length;
  const health = gameState.you.health;
  const turn = gameState.turn;
  const board = gameState.board;
  const moves = ["up", "down", "left", "right"];
  const tail = gameState.you.body[myLength - 1];

  // Decision factors
  const needFood = health < 40 || myLength < 6 || turn > 150;
  const endGame = board.snakes.length <= 2;
  const isBig = board.snakes.every(s => s.id === gameState.you.id || s.body.length <= myLength);
  const isSmall = board.snakes.some(s => s.id !== gameState.you.id && s.body.length > myLength);

  let moveSafety = { up: true, down: true, left: true, right: true };
  moveSafety.left = neck.x < head.x ? false : moveSafety.left;
  moveSafety.right = neck.x > head.x ? false : moveSafety.right;
  moveSafety.down = neck.y < head.y ? false : moveSafety.down;
  moveSafety.up = neck.y > head.y ? false : moveSafety.up;

  if (head.x === 0) moveSafety.left = false;
  if (head.x === board.width - 1) moveSafety.right = false;
  if (head.y === 0) moveSafety.down = false;
  if (head.y === board.height - 1) moveSafety.up = false;

  for (const part of gameState.you.body) blockIf(head, part, moveSafety);
  for (const snake of board.snakes) {
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

  for (const move of safeMoves) {
    const next = moveTo(head, move);
    let score = floodFill(next, gameState, 60);

    // Danger from enemy heads
    for (const snake of board.snakes) {
      if (snake.id === gameState.you.id) continue;
      const eHead = snake.body[0];
      const enemyMoves = [
        { x: eHead.x + 1, y: eHead.y },
        { x: eHead.x - 1, y: eHead.y },
        { x: eHead.x, y: eHead.y + 1 },
        { x: eHead.x, y: eHead.y - 1 }
      ];
      for (const eMove of enemyMoves) {
        if (next.x === eMove.x && next.y === eMove.y) score -= 1000;
      }
    }

    const futureSpace = floodFill(next, gameState, 40);
    if (futureSpace < config.spaceThreshold) score -= config.trapAvoidanceWeight;
    if (myLength > 10 && futureSpace < myLength / 2) score -= 50;
    if (futureSpace < 15 && dist(next, tail) < 5) score += config.tailPriorityWeight;

    // Food logic
    const food = getSafeFood(head, gameState, myLength);
    if (food) {
      const foodDistance = dist(head, food);
      const enemyCloser = board.snakes.some(s => {
        if (s.id === gameState.you.id) return false;
        const eDist = dist(s.body[0], food);
        return eDist < foodDistance || (eDist === foodDistance && s.body.length >= myLength);
      });

      if (needFood || (!enemyCloser && foodDistance <= 5)) {
        score += config.foodWeight * proximityBonus(move, head, food);
        if (needFood && foodDistance <= 5) score += 10;
        if (needFood && foodDistance <= 2) score += 20;
      } else if (!needFood && foodDistance > 5) {
        score -= 5;
      }
    }

    scores[move] = score;
  }

  const bestMove = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || safeMoves[0] || "down";
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

export { move };