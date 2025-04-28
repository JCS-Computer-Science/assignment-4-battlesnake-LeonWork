// export default function move(gameState) {
//   const myHead = gameState.you.body[0];
//   const myNeck = gameState.you.body[1];
//   const myTail = gameState.you.body[gameState.you.body.length - 1];
//   const center = {
//       x: Math.floor(gameState.board.width - 1) / 2,
//       y: Math.floor(gameState.board.height - 1) / 2
//   }
//   const nearMid = myHead.x > 1 && myHead.x < gameState.board.width - 2 && myHead.y > 1 && myHead.y < gameState.board.height - 2;
//   let targetMoves = {
//       up: false,
//       down: false,
//       left: false,
//       right: false
//   }
//   let moveSafety = {
//       up: true,
//       down: true,
//       left: true,
//       right: true
//   };
//   let pathSafety = {
//       up: true,
//       down: true,
//       left: true,
//       right: true
//   };
//   if (myNeck.x < myHead.x || 0 == myHead.x) { moveSafety.left = false; }
//   if (myNeck.x > myHead.x || gameState.board.width == myHead.x + 1) { moveSafety.right = false; }
//   if (myNeck.y < myHead.y || 0 == myHead.y) { moveSafety.down = false; }
//   if (myNeck.y > myHead.y || gameState.board.height == myHead.y + 1) { moveSafety.up = false; }
//   for (let s = 0; s < gameState.board.snakes.length; s++) {
//       for (let i = 0; i < gameState.board.snakes[s].body.length - 1; i++) {
//           let body = gameState.board.snakes[s].body[i];
//           if (body.x == myHead.x - 1 && body.y == myHead.y) {
//               moveSafety.left = false;
//           } else if (body.x == myHead.x + 1 && body.y == myHead.y) {
//               moveSafety.right = false;
//           } else if (body.y == myHead.y - 1 && body.x == myHead.x) {
//               moveSafety.down = false;
//           } else if (body.y == myHead.y + 1 && body.x == myHead.x) {
//               moveSafety.up = false;
//           }
//       }
//       //deal with head on collisions
//       if (gameState.board.snakes[s].id != gameState.you.id && gameState.board.snakes[s].body.length >= gameState.you.body.length) {
//           let head = gameState.board.snakes[s].body[0];
//           let adjacent = {
//               left: { x: myHead.x - 1, y: myHead.y },
//               right: { x: myHead.x + 1, y: myHead.y },
//               up: { x: myHead.x, y: myHead.y + 1 },
//               down: { x: myHead.x, y: myHead.y - 1 }
//           };
//           for (let direction in adjacent) {
//               let square = adjacent[direction];
//               if ((head.x == square.x - 1 && head.y == square.y) ||
//                   (head.x == square.x + 1 && head.y == square.y) ||
//                   (head.x == square.x && head.y == square.y - 1) ||
//                   (head.x == square.x && head.y == square.y + 1)) {
//                   pathSafety[direction] = false;
//               }
//           }
//       }
//   }

//   function moveTo(pos) {
//       let xDis = pos.x - myHead.x;
//       let yDis = pos.y - myHead.y;
//       if (xDis < 0) { targetMoves.left = true; } else if (xDis > 0) { targetMoves.right = true; }
//       if (yDis < 0) { targetMoves.down = true; } else if (yDis > 0) { targetMoves.up = true; }
//   }

//   let isHungry = gameState.you.health < 20 || gameState.you.body.length % 2 != 0 || gameState.board.snakes.some(s => s.id !== gameState.you.id && s.body.length >= gameState.you.body.length - 2);
//   //if (nearMid == false && gameState.you.health > 8 && gameState.you.body.length > 4) { isHungry = false; };
//   if (isHungry && gameState.board.food.length > 0) {
//       let closestFood = gameState.board.food[0];
//       let targetFood = {
//           distanceTotal: Math.abs(closestFood.x - myHead.x) + Math.abs(closestFood.y - myHead.y),
//           distanceX: closestFood.x - myHead.x,
//           distanceY: closestFood.y - myHead.y
//       }
//       for (let i = 1; i < gameState.board.food.length; i++) {
//           let food = gameState.board.food[i];
//           let d = Math.abs(food.x - myHead.x) + Math.abs(food.y - myHead.y);
//           if (d < targetFood.distanceTotal) {
//               closestFood = food;
//               targetFood = {
//                   distanceTotal: d,
//                   distanceX: food.x - myHead.x,
//                   distanceY: food.y - myHead.y,
//               }
//           }
//       }
//       moveTo(closestFood);
//   } else if (nearMid) {
//       moveTo(myTail);
//       //moveTo(center);
//   } else {
//       //moveTo(center);
//       moveTo(myTail)
//   }
//   // Queue-based flood fill
//   function floodpath(x, y) {
//       const directions = [
//           { x: 0, y: 1 },  // up
//           { x: 0, y: -1 }, // down
//           { x: -1, y: 0 }, // left
//           { x: 1, y: 0 }   // right
//       ];
  
//       let visited = new Set();
//       let queue = [{ x: x, y: y, risk: 0 }];
//       let path = [];
  
//       visited.add(`${x},${y}`);
  
//       function bottleNeck(x, y) {
//           let risk = 0;
//           for (let snake of gameState.board.snakes) {
//               if (snake.id !== gameState.you.id) {
//                   for (let i = 0; i < snake.body.length; i++) {
//                       let bodyPart = snake.body[i];
//                       if (
//                           (bodyPart.x === x - 1 && bodyPart.y === y) ||
//                           (bodyPart.x === x + 1 && bodyPart.y === y) ||
//                           (bodyPart.x === x && bodyPart.y === y - 1) ||
//                           (bodyPart.x === x && bodyPart.y === y + 1) 
//                       ) {
//                           risk++;
//                       }
//                   }
//                   if (
//                       ((snake.body.some(part => part.x === x - 1 && part.y === y) && snake.body.some(part => part.x === x + 1 && part.y === y)) || 
//                        (snake.body.some(part => part.x === x && part.y === y - 1) && snake.body.some(part => part.x === x && part.y === y + 1)))
//                   ) {
//                       risk += 2;
//                   }}}
//           return risk;
//       }        
  
//       while (queue.length > 0) {
//           let { x, y, risk = 0 } = queue.shift();
//           path.push({ x, y, risk });
      
//           for (let { x: dx, y: dy } of directions) {
//               let newX = x + dx;
//               let newY = y + dy;
//               const key = `${newX},${newY}`;
      
//               if (newX >= 0 && newX < gameState.board.width &&
//                   newY >= 0 && newY < gameState.board.height &&
//                   !visited.has(key)) {
      
//                   let isBlocked = false;
//                   for (let s = 0; s < gameState.board.snakes.length; s++) {
//                       for (let i = 0; i < gameState.board.snakes[s].body.length - 1; i++) {
//                           let body = gameState.board.snakes[s].body[i];
//                           if (body.x == newX && body.y == newY) {
//                               isBlocked = true;
//                               break;
//                           }
//                       }
//                       if (isBlocked) break;
//                   }
      
//                   if (!isBlocked) {
//                       visited.add(key);
//                       const risk = bottleNeck(newX, newY);
//                       queue.push({ x: newX, y: newY, risk });
//                   }
//               }
//           }
//       }        
  
//       return path;
//   }
// // Function to check if the tail is adjacent to the filled space
// function checkTailAdjacencyToFilledSpace(path, tail) {
//   return path.some(space => 
//       (space.x === tail.x - 1 && space.y === tail.y) ||
//       (space.x === tail.x + 1 && space.y === tail.y) ||
//       (space.x === tail.x && space.y === tail.y - 1) ||
//       (space.x === tail.x && space.y === tail.y + 1)
//   );
// }
// function totalRisk(path) {
//   return path.reduce((sum, step) => sum + (step.risk || 0), 0);
// }
// let rightPath = floodpath(myHead.x + 1, myHead.y);
// let leftPath = floodpath(myHead.x - 1, myHead.y);
// let upPath = floodpath(myHead.x, myHead.y + 1);
// let downPath = floodpath(myHead.x, myHead.y - 1);

// if (rightPath.length > gameState.you.body.length || leftPath.length > gameState.you.body.length || upPath.length > gameState.you.body.length || downPath.length > gameState.you.body.length) {
//   if (rightPath.length <= gameState.you.body.length) { pathSafety.right = false; console.log("dead end detected right on turn " + gameState.turn); }
//   if (leftPath.length <= gameState.you.body.length) { pathSafety.left = false; console.log("dead end detected left on turn " + gameState.turn); }
//   if (upPath.length <= gameState.you.body.length) { pathSafety.up = false; console.log("dead end detected up on turn " + gameState.turn); }
//   if (downPath.length <= gameState.you.body.length) { pathSafety.down = false; console.log("dead end detected down on turn " + gameState.turn); }
// } else {
//   console.log("all dead end detected on turn " + gameState.turn);
//   if (checkTailAdjacencyToFilledSpace(rightPath, myTail)&&moveSafety.right) {
//       pathSafety.right = true;pathSafety.left = false; pathSafety.up = false; pathSafety.down = false;
//       console.log("Tail is adjacent to filled space right on turn " + gameState.turn);
//   }else if (checkTailAdjacencyToFilledSpace(leftPath, myTail)&&moveSafety.left) {
//       pathSafety.right = false;pathSafety.left = true; pathSafety.up = false; pathSafety.down = false;
//       console.log("Tail is adjacent to filled space left on turn " + gameState.turn);
//   }else if (checkTailAdjacencyToFilledSpace(upPath, myTail)&&moveSafety.up) {
//       pathSafety.right = false;pathSafety.left = false; pathSafety.up = true; pathSafety.down = false;
//       console.log("Tail is adjacent to filled space up on turn " + gameState.turn);
//   }else if (checkTailAdjacencyToFilledSpace(downPath, myTail)&&moveSafety.right) {
//       pathSafety.right = false;pathSafety.left = false; pathSafety.up = false; pathSafety.down = true;
//       console.log("Tail is adjacent to filled space down on turn " + gameState.turn);
//   } else {
//       // Find the direction with the biggest flood fill area
//       let directionAreas = {
//           right: moveSafety.right ? rightPath.length : 0,
//           left: moveSafety.left ? leftPath.length : 0,
//           up: moveSafety.up ? upPath.length : 0,
//           down: moveSafety.down ? downPath.length : 0
//       };
//       let bestDirection = Object.keys(directionAreas).reduce((a, b) => directionAreas[a] > directionAreas[b] ? a : b);
//       // Set that direction as the only safe one
//       pathSafety.right = false;
//       pathSafety.left = false;
//       pathSafety.up = false;
//       pathSafety.down = false;
//       pathSafety[bestDirection] = true;
//       console.log("Choosing largest flood fill area: " + bestDirection + " on turn " + gameState.turn);
//   }
// }

// let directionInfo = {
//   right: { path: rightPath, risk: totalRisk(rightPath), length: rightPath.length, safe: moveSafety.right && pathSafety.right },
//   left: { path: leftPath, risk: totalRisk(leftPath), length: leftPath.length, safe: moveSafety.left && pathSafety.left },
//   up: { path: upPath, risk: totalRisk(upPath), length: upPath.length, safe: moveSafety.up && pathSafety.up },
//   down: { path: downPath, risk: totalRisk(downPath), length: downPath.length, safe: moveSafety.down && pathSafety.down },
// };

// let safeDirections = Object.keys(directionInfo).filter(dir => directionInfo[dir].safe);

// if (safeDirections.length === 0) {
//   safeDirections = Object.keys(moveSafety).filter(dir => moveSafety[dir]);
// }

// let prioritized = Object.keys(targetMoves).filter(dir => targetMoves[dir] && safeDirections.includes(dir));

// let bestMove;

// if (prioritized.length > 0) {
//   // Among prioritized directions, pick lowest-risk one with decent space
//   bestMove = prioritized.reduce((best, current) => {
//       if (!best) return current;
//       const b = directionInfo[best];
//       const c = directionInfo[current];
//       if (c.length >= gameState.you.body.length && c.risk < b.risk) return current;
//       if (c.length > b.length) return current;
//       return best;
//   }, null);
// } else {
//   // Pick the safest overall direction by low risk and big path
//   bestMove = safeDirections.reduce((best, current) => {
//       if (!best) return current;
//       const b = directionInfo[best];
//       const c = directionInfo[current];
//       if (c.length >= gameState.you.body.length && c.risk < b.risk) return current;
//       if (c.length > b.length) return current;
//       return best;
//   }, null);
// }

// const nextMove = bestMove || safeDirections[Math.floor(Math.random() * safeDirections.length)];
// return { move: nextMove };
// }

export default function move(gameState) {
    const myHead = gameState.you.body[0];
    const myNeck = gameState.you.body[1];
    const myTail = gameState.you.body[gameState.you.body.length - 1];
  
    const boardWidth = gameState.board.width;
    const boardHeight = gameState.board.height;
  
    const directions = ["up", "down", "left", "right"];
    const moveSafety = { up: true, down: true, left: true, right: true };
  
    const adjacentSquares = {
      up: { x: myHead.x, y: myHead.y + 1 },
      down: { x: myHead.x, y: myHead.y - 1 },
      left: { x: myHead.x - 1, y: myHead.y },
      right: { x: myHead.x + 1, y: myHead.y },
    };
  
    // Helper function to check if a position is out of bounds
    const isOutOfBounds = (x, y) => x < 0 || y < 0 || x >= boardWidth || y >= boardHeight;
  
    // Mark moves unsafe due to boundaries
    const markUnsafeMoves = () => {
      for (const direction in adjacentSquares) {
        const { x, y } = adjacentSquares[direction];
        if (isOutOfBounds(x, y)) {
          moveSafety[direction] = false;
        }
      }
    };
  
    markUnsafeMoves();
  
    // Mark moves unsafe due to collisions with own body or other snakes
    for (const snake of gameState.board.snakes) {
      for (const bodyPart of snake.body) {
        for (const direction in adjacentSquares) {
          const { x, y } = adjacentSquares[direction];
          if (bodyPart.x === x && bodyPart.y === y) {
            moveSafety[direction] = false;
          }
        }
      }
    }
  
    // Aggressive targeting: prioritize smaller snake heads
    let target = null;
    for (const snake of gameState.board.snakes) {
      if (snake.id !== gameState.you.id && snake.body.length < gameState.you.body.length) {
        const enemyHead = snake.body[0];
        const distance =
          Math.abs(enemyHead.x - myHead.x) + Math.abs(enemyHead.y - myHead.y);
        if (!target || distance < target.distance) {
          target = { x: enemyHead.x, y: enemyHead.y, distance };
        }
      }
    }
  
    // If no smaller snake heads, target food as a fallback (only when health is critically low)
    if (!target && gameState.you.health < 20 && gameState.board.food.length > 0) {
      target = gameState.board.food.reduce((closest, food) => {
        const distance =
          Math.abs(food.x - myHead.x) + Math.abs(food.y - myHead.y);
        return distance < closest.distance ? { ...food, distance } : closest;
      }, { distance: Infinity });
    }
  
    // Fallback target: move toward the tail to increase space if no aggression is possible
    if (!target) {
      target = myTail;
    }
  
    // Determine target moves
    const targetMoves = { up: false, down: false, left: false, right: false };
    if (target.x < myHead.x) targetMoves.left = true;
    if (target.x > myHead.x) targetMoves.right = true;
    if (target.y < myHead.y) targetMoves.down = true;
    if (target.y > myHead.y) targetMoves.up = true;
  
    // Flood fill to assess path safety (only minimal safety checks for aggression)
    const floodFill = (x, y) => {
      const visited = new Set();
      const queue = [{ x, y }];
      let area = 0;
  
      while (queue.length > 0) {
        const { x, y } = queue.shift();
        const key = `${x},${y}`;
  
        if (visited.has(key) || isOutOfBounds(x, y)) continue;
        visited.add(key);
  
        // Check for collisions
        if (gameState.board.snakes.some(snake => snake.body.some(part => part.x === x && part.y === y))) {
          continue;
        }
  
        area++;
        queue.push({ x: x + 1, y });
        queue.push({ x: x - 1, y });
        queue.push({ x, y: y + 1 });
        queue.push({ x, y: y - 1 });
      }
  
      return area;
    };
  
    for (const direction in adjacentSquares) {
      const { x, y } = adjacentSquares[direction];
      if (moveSafety[direction]) {
        const area = floodFill(x, y);
        if (area <= gameState.you.body.length) {
          moveSafety[direction] = false;
        }
      }
    }
  
    // Choose the most aggressive move
    const safeDirections = directions.filter(dir => moveSafety[dir]);
    const prioritizedDirections = directions.filter(dir => targetMoves[dir] && safeDirections.includes(dir));
  
    const nextMove = prioritizedDirections[0] || directions.find(dir => safeDirections.includes(dir)) || "up";
  
    return { move: nextMove };
  }