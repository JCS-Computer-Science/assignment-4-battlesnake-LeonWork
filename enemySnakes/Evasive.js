export function move(gameState, self) {
    const myHead = self.body[0];
    const board = gameState.board;
  
    const distances = {
      up: myHead.y,
      down: board.height - myHead.y - 1,
      left: myHead.x,
      right: board.width - myHead.x - 1,
    };
  
    return Object.entries(distances).reduce((a, b) => (a[1] < b[1] ? a : b))[0];
  }
  