export function move(gameState, self) {
    const myHead = self.body[0];
    const enemyHeads = gameState.board.snakes
      .filter(s => s.id !== self.id)
      .map(s => s.body[0]);
  
    let bestDir = "up";
    let bestDist = Infinity;
  
    for (const dir of ["up", "down", "left", "right"]) {
      const newPos = getNewPosition(myHead, dir);
      for (const head of enemyHeads) {
        const dist = manhattan(newPos, head);
        if (dist < bestDist) {
          bestDist = dist;
          bestDir = dir;
        }
      }
    }
  
    return bestDir;
  }
  
  function getNewPosition(pos, dir) {
    const delta = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    return { x: pos.x + delta[dir][0], y: pos.y + delta[dir][1] };
  }
  
  function manhattan(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
  