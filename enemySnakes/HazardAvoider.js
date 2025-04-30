export function move(gameState, self) {
    const head = self.body[0];
    const board = gameState.board;
  
    const directions = ["up", "down", "left", "right"];
    const scores = { up: 0, down: 0, left: 0, right: 0 };
  
    const center = { x: Math.floor(board.width / 2), y: Math.floor(board.height / 2) };
  
    for (const dir of directions) {
      const newPos = getNewPosition(head, dir);
      if (isInHazard(newPos, board)) {
        scores[dir] -= 1000;
      }
  
      // Prefer the center
      const distToCenter = manhattan(newPos, center);
      scores[dir] -= distToCenter;
    }
  
    const best = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
    return best;
  }
  
  function getNewPosition(pos, dir) {
    const delta = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    return { x: pos.x + delta[dir][0], y: pos.y + delta[dir][1] };
  }
  
  function isInHazard(pos, board) {
    return board.hazards.some(hz => hz.x === pos.x && hz.y === pos.y);
  }
  
  function manhattan(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
  