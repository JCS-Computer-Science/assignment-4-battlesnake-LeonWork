export function move(gameState, self) {
    const myHead = self.body[0];
    const others = gameState.board.snakes.filter(s => s.id !== self.id);
    const target = others[0]?.body[0] || { x: 0, y: 0 };
  
    const options = ["up", "down", "left", "right"];
    let bestDir = "up";
    let bestScore = -Infinity;
  
    for (const dir of options) {
      const next = getNewPosition(myHead, dir);
      const score =
        10 - manhattan(next, target) - hazardPenalty(next, gameState.board);
      if (score > bestScore) {
        bestScore = score;
        bestDir = dir;
      }
    }
  
    return bestDir;
  }
  
  function hazardPenalty(pos, board) {
    return board.hazards.some(h => h.x === pos.x && h.y === pos.y) ? 100 : 0;
  }
  
  function getNewPosition(pos, dir) {
    const delta = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    return { x: pos.x + delta[dir][0], y: pos.y + delta[dir][1] };
  }
  
  function manhattan(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
  