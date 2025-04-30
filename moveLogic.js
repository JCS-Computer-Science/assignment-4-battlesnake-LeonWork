import fs from 'fs';

// Prefer best config if it exists
let CONFIG = fs.existsSync("config_best.json")
  ? JSON.parse(fs.readFileSync("config_best.json"))
  : JSON.parse(fs.readFileSync("config.json"));

function move(gameState) {
  const myHead = gameState.you.body[0];
  const myLength = gameState.you.length;
  const board = gameState.board;

  const possibleMoves = ["up", "down", "left", "right"];
  const scores = {};

  for (const move of possibleMoves) {
    const newPos = getNewPosition(myHead, move);

    if (isOutOfBounds(newPos, board) || isOccupied(newPos, gameState)) {
      scores[move] = -Infinity;
      continue;
    }

    let score = 0;

    // Food seeking
    const nearest = nearestFood(newPos, board.food);
    if (nearest && gameState.you.health < 50) {
      const dist = manhattan(newPos, nearest);
      score += CONFIG.foodWeight / (dist + 1);
    }

    // Trap detection
    const space = floodFill(newPos, board, gameState);
    if (space < CONFIG.minSpaceThreshold) {
      score -= CONFIG.trapAvoidanceWeight;
    }

    // Hazard penalty
    if (isInHazard(newPos, board)) {
      score -= CONFIG.hazardAvoidanceWeight;
    }

    // Tail chase
    const myTail = gameState.you.body[gameState.you.body.length - 1];
    if (manhattan(newPos, myTail) < 3) {
      score += CONFIG.tailChaseWeight;
    }

    // Center control
    const center = { x: Math.floor(board.width / 2), y: Math.floor(board.height / 2) };
    const distToCenter = manhattan(newPos, center);
    score += CONFIG.centerControlWeight / (distToCenter + 1);

    scores[move] = score;
  }

  // Get best move or fallback
  let bestMove = Object.entries(scores).reduce((best, current) =>
    current[1] > best[1] ? current : best
  )[0];

  const bestPos = getNewPosition(myHead, bestMove);

  // Fallback if all are bad or move is still unsafe
  if (isOutOfBounds(bestPos, board) || isOccupied(bestPos, gameState)) {
    const fallback = possibleMoves.find(m => {
      const pos = getNewPosition(myHead, m);
      return !isOutOfBounds(pos, board) && !isOccupied(pos, gameState);
    });
    console.log(`⚠️ Unsafe best move (${bestMove}), fallback to ${fallback}`);
    bestMove = fallback || "down"; // default last resort
  }

  return { move: bestMove };
}

// --- Helpers ---
function getNewPosition(pos, dir) {
  const delta = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  return { x: pos.x + delta[dir][0], y: pos.y + delta[dir][1] };
}

function isOutOfBounds(pos, board) {
  return pos.x < 0 || pos.x >= board.width || pos.y < 0 || pos.y >= board.height;
}

function isOccupied(pos, gameState) {
  return gameState.board.snakes.some(snake =>
    snake.body.some(segment => segment.x === pos.x && segment.y === pos.y)
  );
}

function isInHazard(pos, board) {
  return board.hazards?.some(hz => hz.x === pos.x && hz.y === pos.y);
}

function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function nearestFood(pos, foodList) {
  if (foodList.length === 0) return null;
  return foodList.reduce((closest, current) =>
    manhattan(pos, current) < manhattan(pos, closest) ? current : closest
  );
}

function floodFill(start, board, gameState) {
  const visited = new Set();
  const queue = [start];
  let count = 0;

  while (queue.length > 0 && count < 100) {
    const pos = queue.shift();
    const key = `${pos.x},${pos.y}`;
    if (visited.has(key) || isOutOfBounds(pos, board) || isOccupied(pos, gameState)) continue;

    visited.add(key);
    count++;

    queue.push({ x: pos.x + 1, y: pos.y });
    queue.push({ x: pos.x - 1, y: pos.y });
    queue.push({ x: pos.x, y: pos.y + 1 });
    queue.push({ x: pos.x, y: pos.y - 1 });
  }

  return count;
}

export default move;
