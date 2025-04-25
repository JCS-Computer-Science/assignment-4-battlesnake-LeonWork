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


import e from "express";
export default function move(gameState) {
  gameState.board.snakes.forEach((snake) => console.log(snake.name));
  let moveSafety = {
    up: true,
    down: true,
    left: true,
    right: true,
  };
  let priorityMoves = {
    up: false,
    down: false,
    left: false,
    right: false,
  };
  let riskyMoves = {
    up: false,
    down: false,
    left: false,
    right: false,
  };
  let spaceScores = { up: 0, down: 0, left: 0, right: 0 };

  let myHead = gameState.you.body[0];
  let myNeck = gameState.you.body[1];

  let healthLimit = 100

  function safeBack() {
    moveSafety.left = myNeck.x < myHead.x ? false : moveSafety.left;
    moveSafety.right = myNeck.x > myHead.x ? false : moveSafety.right;
    moveSafety.down = myNeck.y < myHead.y ? false : moveSafety.down;
    moveSafety.up = myNeck.y > myHead.y ? false : moveSafety.up;
  }
  safeBack();

  function bounds() {
    moveSafety.left = myHead.x == 0 ? false : moveSafety.left;
    moveSafety.right =
      myHead.x == gameState.board.width - 1 ? false : moveSafety.right;
    moveSafety.down = myHead.y == 0 ? false : moveSafety.down;
    moveSafety.up =
      myHead.y == gameState.board.height - 1 ? false : moveSafety.up;
  }
  bounds();

  let myBody = gameState.you.body;

  function selfPreservation() {
    let ate = 1;
    if (gameState.you.health == 100) {
      ate = 0;
    }
    for (let i = 1; i < myBody.length - ate; i++) {
      moveSafety.right =
        myHead.x + 1 == myBody[i].x && myHead.y == myBody[i].y
          ? false
          : moveSafety.right;
      moveSafety.left =
        myHead.x - 1 == myBody[i].x && myHead.y == myBody[i].y
          ? false
          : moveSafety.left;
      moveSafety.up =
        myHead.x == myBody[i].x && myHead.y + 1 == myBody[i].y
          ? false
          : moveSafety.up;
      moveSafety.down =
        myHead.x == myBody[i].x && myHead.y - 1 == myBody[i].y
          ? false
          : moveSafety.down;

      riskyMoves.right =
        myHead.x + 1 == myBody[i].x && myHead.y == myBody[i].y
          ? false
          : riskyMoves.right;
      riskyMoves.left =
        myHead.x - 1 == myBody[i].x && myHead.y == myBody[i].y
          ? false
          : riskyMoves.left;
      riskyMoves.up =
        myHead.x == myBody[i].x && myHead.y + 1 == myBody[i].y
          ? false
          : riskyMoves.up;
      riskyMoves.down =
        myHead.x == myBody[i].x && myHead.y - 1 == myBody[i].y
          ? false
          : riskyMoves.down;
    }
  }

  function riskyPres() {
    let ate = 1;
    if (gameState.you.health == 100) {
      ate = 0;
    }
    for (let i = 1; i < myBody.length - ate; i++) {
      riskyMoves.right =
        myHead.x + 1 == myBody[i].x && myHead.y == myBody[i].y
          ? false
          : riskyMoves.right;
      riskyMoves.left =
        myHead.x - 1 == myBody[i].x && myHead.y == myBody[i].y
          ? false
          : riskyMoves.left;
      riskyMoves.up =
        myHead.x == myBody[i].x && myHead.y + 1 == myBody[i].y
          ? false
          : riskyMoves.up;
      riskyMoves.down =
        myHead.x == myBody[i].x && myHead.y - 1 == myBody[i].y
          ? false
          : riskyMoves.down;
    }
  }

  selfPreservation();
  riskyPres();
  // Add a new function to detect positions right behind enemy heads
  function detectEnemyNecks() {
    let enemyNecks = [];

    for (let snake of gameState.board.snakes) {
      if (snake.id == gameState.you.id) continue;
      let enemyNeck = snake.body[1];
      enemyNecks.push({ x: enemyNeck.x, y: enemyNeck.y });
    }
    return enemyNecks;
  }

  for (let j = 0; j < gameState.board.snakes.length; j++) {
    let enemySnake = gameState.board.snakes[j];
    if (enemySnake.id == gameState.you.id) continue;

    function enemyDodging() {
      let enemyNecks = detectEnemyNecks();
      let h = 1;
      if (enemySnake.health == 100) {
        h = 0;
      }

      for (let i = 0; i < enemySnake.body.length - h; i++) {
        let enemyBody = enemySnake.body[i];
        moveSafety.right =
          myHead.x + 1 == enemyBody.x && myHead.y == enemyBody.y
            ? false
            : moveSafety.right;
        moveSafety.left =
          myHead.x - 1 == enemyBody.x && myHead.y == enemyBody.y
            ? false
            : moveSafety.left;
        moveSafety.up =
          myHead.x == enemyBody.x && myHead.y + 1 == enemyBody.y
            ? false
            : moveSafety.up;
        moveSafety.down =
          myHead.x == enemyBody.x && myHead.y - 1 == enemyBody.y
            ? false
            : moveSafety.down;
      }

      for (let neck of enemyNecks) {
        moveSafety.right =
          myHead.x + 1 == neck.x && myHead.y == neck.y
            ? false
            : moveSafety.right;
        moveSafety.left =
          myHead.x - 1 == neck.x && myHead.y == neck.y
            ? false
            : moveSafety.left;
        moveSafety.up =
          myHead.x == neck.x && myHead.y + 1 == neck.y ? false : moveSafety.up;
        moveSafety.down =
          myHead.x == neck.x && myHead.y - 1 == neck.y
            ? false
            : moveSafety.down;
        riskyMoves.right =
          myHead.x + 1 == neck.x && myHead.y == neck.y
            ? false
            : riskyMoves.right;
        riskyMoves.left =
          myHead.x - 1 == neck.x && myHead.y == neck.y
            ? false
            : riskyMoves.left;
        riskyMoves.up =
          myHead.x == neck.x && myHead.y + 1 == neck.y ? false : riskyMoves.up;
        riskyMoves.down =
          myHead.x == neck.x && myHead.y - 1 == neck.y
            ? false
            : riskyMoves.down;
      }
    }
    enemyDodging();

    let enemyHead = enemySnake.body[0];
    let myLength = gameState.you.body.length;
    let enemyLength = enemySnake.body.length;

    if (enemyLength >= myLength) {
      let enemyMoves = [
        { x: enemyHead.x + 1, y: enemyHead.y },
        { x: enemyHead.x - 1, y: enemyHead.y },
        { x: enemyHead.x, y: enemyHead.y + 1 },
        { x: enemyHead.x, y: enemyHead.y - 1 },
      ];
      for (let move of enemyMoves) {
        if (myHead.x + 1 == move.x && myHead.y == move.y) {
          moveSafety.right = false;
          riskyMoves.right = true;
        }
        if (myHead.x - 1 == move.x && myHead.y == move.y) {
          moveSafety.left = false;
          riskyMoves.left = true;
        }
        if (myHead.x == move.x && myHead.y + 1 == move.y) {
          moveSafety.up = false;
          riskyMoves.up = true;
        }
        if (myHead.x == move.x && myHead.y - 1 == move.y) {
          moveSafety.down = false;
          riskyMoves.down = true;
        }
      }
      enemyDodging();
      selfPreservation();
      riskyPres();
    }

    if (enemyLength < myLength) {
      let enemyMoves = [
        { x: enemyHead.x + 1, y: enemyHead.y },
        { x: enemyHead.x - 1, y: enemyHead.y },
        { x: enemyHead.x, y: enemyHead.y + 1 },
        { x: enemyHead.x, y: enemyHead.y - 1 },
      ];
      for (let move of enemyMoves) {
        priorityMoves.right =
          myHead.x + 1 == move.x && myHead.y == move.y
            ? true
            : priorityMoves.right;
        priorityMoves.left =
          myHead.x - 1 == move.x && myHead.y == move.y
            ? true
            : priorityMoves.left;
        priorityMoves.up =
          myHead.x == move.x && myHead.y + 1 == move.y
            ? true
            : priorityMoves.up;
        priorityMoves.down =
          myHead.x == move.x && myHead.y - 1 == move.y
            ? true
            : priorityMoves.down;
      }
      enemyDodging();
      selfPreservation();
      riskyPres();
    }
  }
  function getNextPosition(pos, dir) {
    let newPos = { x: pos.x, y: pos.y };

    if (dir == "up") {
      newPos.y += 1;
    } else if (dir == "down") {
      newPos.y -= 1;
    } else if (dir == "left") {
      newPos.x -= 1;
    } else if (dir == "right") {
      newPos.x += 1;
    }

    return newPos;
  }
  // Updated evaluateSpace function with proper parameters
  function evaluateSpace() {
    let visited = new Set();
    Object.keys(moveSafety).forEach((dir) => {
      if (!moveSafety[dir]) {
        spaceScores[dir] = 0;
        return;
      }
      let nextPos = getNextPosition(myHead, dir);
      let space = floodFill(nextPos, 0, new Set(visited));
      let exitAnalysis = countExits(nextPos);

      spaceScores[dir] =
        space +
        exitAnalysis.scores.up * 0.2 +
        exitAnalysis.scores.down * 0.2 +
        exitAnalysis.scores.left * 0.2 +
        exitAnalysis.scores.right * 0.2 +
        exitAnalysis.count * 18; // Bonus for multiple good exits
    });
  }
  evaluateSpace();

  let myLength = gameState.you.body.length;
  let myHealth = gameState.you.health;

  for (let snake of gameState.board.snakes) {
    if (snake.id == gameState.you.id) continue;

    let enemyHead = snake.body[0];
    let enemyLength = snake.body.length;

    // Only hunt snakes that are strictly SMALLER than you
    if (myLength > enemyLength + 1 && myHealth > 60) {
      let distance =
        Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);

      if (distance <= 2) {
        priorityMoves.right = enemyHead.x > myHead.x || priorityMoves.right;
        priorityMoves.left = enemyHead.x < myHead.x || priorityMoves.left;
        priorityMoves.up = enemyHead.y > myHead.y || priorityMoves.up;
        priorityMoves.down = enemyHead.y < myHead.y || priorityMoves.down;
      }
    }
  }


  let longestSnake = 0
  for (const snake of gameState.board.snakes) { 
      if (snake.id == gameState.you.id) continue;
      if (snake.body.length > longestSnake) {
          longestSnake = snake.body.length;
      }
  }


  if (myHealth < healthLimit) {
    priorityMoves = { up: false, down: false, left: false, right: false };
    let bestFood = findBestFood(myHead, gameState.board.food, gameState);
    if (bestFood) {
      priorityMoves.right = bestFood.x > myHead.x;
      priorityMoves.left = bestFood.x < myHead.x;
      priorityMoves.up = bestFood.y > myHead.y;
      priorityMoves.down = bestFood.y < myHead.y;
    }

  }
  let safeMoves = Object.keys(moveSafety).filter(
    (direction) => moveSafety[direction]
  );
  let riskyOptions = Object.keys(riskyMoves).filter(
    (direction) => riskyMoves[direction]
  );
  let futureSafeMoves = safeMoves.filter((move) =>
    futureSense(move, gameState, 16)
  );
  let moveScores = {};
  futureSafeMoves = futureSafeMoves.filter((move) =>
    isValidMove(gameState, move)
  );
  futureSafeMoves.forEach((move) => {
    moveScores[move] = 0;
    moveScores[move] += spaceScores[move] * 3.5;
    if (myHealth < healthLimit) {
      if(gameState.turn < 100){
        moveScores[move] += priorityMoves[move] ? 60 : 0;
      } else {
        moveScores[move] += priorityMoves[move] ? 150 : 0;
      }
      
      if (myHealth < 30) {
        moveScores[move] += priorityMoves[move] ? 700 : 0;
      }
    }

    let nextPos = getNextPosition(myHead, move);
    let centerX = Math.floor(gameState.board.width / 2);
    let centerY = Math.floor(gameState.board.height / 2);
    let distanceToCenter =
      Math.abs(nextPos.x - centerX) + Math.abs(nextPos.y - centerY);

    if (gameState.turn < 150) {
      moveScores[move] += distanceToCenter * 6;
    }
    moveScores[move] = penalizeHeadProximity(moveScores[move], myHead, gameState)
    if (gameState.you.health > 40) {
      let nextMoves = countExits(nextPos, gameState.you.body.length).count;
      moveScores[move] += nextMoves * 5;
    }

    if (gameState.turn < 100 || myLength < longestSnake) {

      let bestFood = findBestFood(myHead, gameState.board.food, gameState);
      if (bestFood) {
        priorityMoves.right = bestFood.x > myHead.x;
        priorityMoves.left = bestFood.x < myHead.x;
        priorityMoves.up = bestFood.y > myHead.y;
        priorityMoves.down = bestFood.y < myHead.y;
      
        for (let dir in priorityMoves) {
          if (priorityMoves[dir]) {
            moveScores[dir] = moveScores[dir] || 0;
            moveScores[dir] += 300;
          }
        }
      }
      healthLimit = 35 * gameState.board.snakes.length; 
    } else {
      if (myLength + 1 <= longestSnake) {
        healthLimit = 30 * gameState.board.snakes.length - 0.5;
      } else {
        healthLimit = 25 * gameState.board.snakes.length - 1; 
      }
    }

        moveScores = centerControlStrategy(gameState, myHead, moveScores);

        moveScores = huntSmallerSnakes(gameState, myHead, myLength, myHealth, moveScores);

        moveScores = seekHeadCollisions(gameState, myHead, myLength, moveScores);

        moveScores = avoidTailsAboutToEat(gameState, myHead, moveScores);

        moveScores = enemyTrapped(gameState, moveScores)

    let myTail = myBody[myBody.length - 1];
    let tailPriorityMoves = [];

    if (myHead.x < myTail.x && moveSafety.right) {
      tailPriorityMoves.push("right");
    }
    if (myHead.x > myTail.x && moveSafety.left) {
      tailPriorityMoves.push("left");
    }
    if (myHead.y < myTail.y && moveSafety.up) {
      tailPriorityMoves.push("up");
    }
    if (myHead.y > myTail.y && moveSafety.down) {
      tailPriorityMoves.push("down");
    }
    const tailBias = Math.max(0, myBody.length - 1);

    for (const move of tailPriorityMoves) {
      if (moveScores[move] !== undefined) {
          moveScores[move] = moveScores[move] + (tailBias * 33);
      }
    }

    if (gameState.you.health > 50) {
      for (let snake of gameState.board.snakes) {
        if (snake.id == gameState.you.id) continue;

        if (snake.body.length < gameState.you.body.length) {
          let enemyHead = snake.body[0];
          let currentDistance =
            Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
          let newDistance =
            Math.abs(nextPos.x - enemyHead.x) +
            Math.abs(nextPos.y - enemyHead.y);
          if (newDistance < currentDistance) {
            moveScores[move] += 10;
          }
        }
      }
    }
    for (let snake of gameState.board.snakes) {
      if (snake.id == gameState.you.id) continue;
        let enemyHead = snake.body[0];
        if (enemyHead.x > myHead.x) {
          moveScores.right -= 15;
        }
        if (enemyHead.y > myHead.y) {
          moveScores.up -= 15;
        }
        if (enemyHead.x < myHead.x) {
          moveScores.left -= 15;
        }
        if (enemyHead.y < myHead.y) {
          moveScores.down -= 15;
        }
    }

    if (gameState.you.health < 100) {
      for (let snake of gameState.board.snakes) {
        if (snake.id == gameState.you.id) continue;

        if (snake.body.length > gameState.you.body.length) {
          let enemyHead = snake.body[0];
          let currentDistance =
            Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
          let newDistance =
            Math.abs(nextPos.x - enemyHead.x) +
            Math.abs(nextPos.y - enemyHead.y);
          if (newDistance < currentDistance) {
            moveScores[move] -= 10;
          }
        }
      }
    }
  });
  let bestMove = null;
  let bestScore = -100000;
  let futureSafeMovesFinal = safeMoves.filter((move) =>
    futureSense(move, gameState, 13)
  );
  if (futureSafeMovesFinal.length > 0) {
    futureSafeMovesFinal = futureSafeMovesFinal.filter(
      (move) => isValidMove(gameState, move) && moveSafety[move]
    );
    for (let move of futureSafeMovesFinal) {
      if (moveScores[move] > bestScore) {
        bestScore = moveScores[move];
        bestMove = move;
      }
    }
    if (bestMove && moveSafety[bestMove] && bestScore > 50) {
      console.log(
        `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Choosing best future-safe move: ${bestMove} (score: ${moveScores[bestMove]})`
      );
      return { move: bestMove };
    }
  }
  for (let depth of [10,9, 8, 7]) {
    let bestMoveAtDepth = null;
    let bestScoreAtDepth = -100000;
    let validMovesAtDepth = [];
    for (let move of safeMoves) {
      if (moveSafety[move] && futureSense(move, gameState, depth)) {
        validMovesAtDepth.push(move);
      }
    }
    if (validMovesAtDepth.length > 0) {
      let depthMoveScores = {};
      for (let move of validMovesAtDepth) {
        depthMoveScores[move] = 0;
        depthMoveScores[move] += spaceScores[move] * 2.3;
        if (myHealth < 50) {
          depthMoveScores[move] += priorityMoves[move] ? 400 : 0;
        } else {
          depthMoveScores[move] += priorityMoves[move] ? 20 : 0;
        }
        if (depthMoveScores[move] > bestScoreAtDepth) {
          bestScoreAtDepth = depthMoveScores[move];
          bestMoveAtDepth = move;
        }
      }
      if (bestMoveAtDepth) {
        console.log(
          `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Choosing best-scored safe move with ${depth} future-sense: ${bestMoveAtDepth} (score: ${bestScoreAtDepth})`
        );
        return { move: bestMoveAtDepth };
      }
    }
  }
  if (riskyOptions.length > 0) {
    let riskyMoveScores = {};
    
    riskyOptions.forEach(move => {
      riskyMoveScores[move] = 0;
      riskyMoveScores[move] += spaceScores[move];

      for (let depth = 10; depth >= 1; depth--) {
        if (futureSense(move, gameState, depth)) {
          riskyMoveScores[move] += depth * 10;
          break;
        }
      }
      let myTail = myBody[myBody.length - 1];
      if ((myHead.x < myTail.x && move == "right") ||
        (myHead.x > myTail.x && move == "left") ||
        (myHead.y < myTail.y && move == "up") ||
        (myHead.y > myTail.y && move == "down")) {
          riskyMoveScores[move] += 300;
    }
  if ((move.x == 0 || move.x == gameState.board.width - 1) && 
      (move.y == 0 || move.y == gameState.board.height - 1)) {
    riskyMoveScores[move] -= 100;
  }
  for (let snake of gameState.board.snakes) {
    if (snake.id == gameState.you.id) continue;
    if ((snake.body[snake.length-1].x == move.x) && (snake.body[snake.length-1].y == move.y)){
      riskyMoveScores[move] -= 40;
    }
  }

      if (priorityMoves[move]) {
        riskyMoveScores[move] += 15;
      }

      let nextPos = getNextPosition(myHead, move);
      let exitAnalysis = countExits(nextPos);
      riskyMoveScores[move] += exitAnalysis.count * 30; 
    });
    let bestRiskyScore = -Infinity;
    let bestRiskyMove = null;
    
    for (let move of riskyOptions) {
      if (riskyMoveScores[move] > bestRiskyScore) {
        bestRiskyScore = riskyMoveScores[move];
        bestRiskyMove = move;
      }
    }
    
    bestMove = bestRiskyMove || riskyOptions[0];
    console.log(
      `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Using fallback (1) risky move: ${bestMove} (score: ${bestRiskyScore}, future survival: ${Math.floor(bestRiskyScore/20)})`
    );
    return { move: bestMove };
  }
if (safeMoves.length > 0) {
  let bestSafeScore = -10000000;
  let bestSafeMove = null;
  for (let move of safeMoves) {
    let score = 0;
    let nextPos = getNextPosition(myHead, move);
    score += spaceScores[move] * 3;
    for (let depth = 10; depth >= 1; depth -= 1) {
      if (futureSense(move, gameState, depth)) {
        score += depth * 10;
        break;
      }
    }
    let myTail = myBody[myBody.length - 1];
    if ((myHead.x < myTail.x && move == "right") ||
        (myHead.x > myTail.x && move == "left") ||
        (myHead.y < myTail.y && move == "up") ||
        (myHead.y > myTail.y && move == "down")) {
          score += 120;
    }
    let exitCount = countExits(nextPos).count;
    score += exitCount * 18;
    let floodSpace = floodFill(nextPos, 0, new Set());
    score += floodSpace * 2;
    if (score > bestSafeScore) {
      bestSafeScore = score;
      bestSafeMove = move;
    }
  }
  
  console.log(
    `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Choosing best safe move: ${bestSafeMove} (score: ${bestSafeScore})`
  );
  return { move: bestSafeMove || safeMoves[0] };
} else {
    const allDirections = ["up", "down", "left", "right"];
    if (riskyOptions.length > 0) {
      bestMove = riskyOptions[0];
      console.log(
        `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Using fallback (2) risky move: ${bestMove}`
      );
      return { move: bestMove };
    }
    for (let dir of allDirections) {
      let nextPos = getNextPosition(myHead, dir);
      if (
        nextPos.x >= 0 &&
        nextPos.x < gameState.board.width &&
        nextPos.y >= 0 &&
        nextPos.y < gameState.board.height
      ) {
        let hitSelf = false;
        for (let i = 0; i < myBody.length - 1; i++) {
          if (nextPos.x == myBody[i].x && nextPos.y == myBody[i].y) {
            hitSelf = true;
            break;
          }
        }
        if (!hitSelf) {
          console.log(
            `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Last resort move: ${dir}`
          );
          return { move: dir };
        }
      }
    }
    const randomDir =
      allDirections[Math.floor(Math.random() * allDirections.length)];
    console.log(
      `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - No valid moves, using random direction: ${randomDir}`
    );
    return { move: randomDir };
  }

  //  floodFill and countExits functions
  function floodFill(pos, depth, visited, limit = 100) {
    const key = `${pos.x},${pos.y}`;
    if (visited.has(key) || depth > limit) return 0;
    visited.add(key);

    // Out of bounds
    if (
      pos.x < 0 ||
      pos.x >= gameState.board.width ||
      pos.y < 0 ||
      pos.y >= gameState.board.height
    )
      return 0;

    // Check if the tile is occupied by any body
    for (let snake of gameState.board.snakes) {
      for (let i = 0; i < snake.body.length; i++) {
        const segment = snake.body[i];
        if (segment.x == pos.x && segment.y == pos.y) return 0;
      }
    }

    // Avoid tiles enemy heads might move into
    const dangerousTiles = getEnemyHeadNextMoves();
    for (let danger of dangerousTiles) {
      if (danger.x == pos.x && danger.y == pos.y) return 0;
    }

    let space = 1;
    for (let dx of [-1, 1]) {
      space += floodFill(
        { x: pos.x + dx, y: pos.y },
        depth + 1,
        visited,
        limit
      );
    }
    for (let dy of [-1, 1]) {
      space += floodFill(
        { x: pos.x, y: pos.y + dy },
        depth + 1,
        visited,
        limit
      );
    }
    return space;
  }

  function countExits(pos, myLength) {
    const directions = {
      up: { x: pos.x, y: pos.y + 1 },
      down: { x: pos.x, y: pos.y - 1 },
      left: { x: pos.x - 1, y: pos.y },
      right: { x: pos.x + 1, y: pos.y },
    };

    const enemyHeadMoves = getEnemyHeadNextMoves(myLength);
    let scores = {};
    let count = 0;

    for (let dir in directions) {
      const p = directions[dir];
      let isSafe = true;

      // Check board boundaries
      if (
        p.x < 0 ||
        p.x > gameState.board.width - 1 ||
        p.y < 0 ||
        p.y > gameState.board.height - 1
      ) {
        isSafe = false;
      }

      // Check bodies
      if (isSafe) {
        for (let snake of gameState.board.snakes) {
          for (let segment of snake.body) {
            if (segment.x == p.x && segment.y == p.y) {
              isSafe = false;
              break;
            }
          }
          if (!isSafe) break;
        }
      }

      // Check if an enemy might move there next
      if (isSafe) {
        for (let danger of enemyHeadMoves) {
          if (danger.x == p.x && danger.y == p.y) {
            isSafe = false;
            break;
          }
        }
      }

      scores[dir] = isSafe ? 1 : 0;
      if (isSafe) count += 1;
    }

    return { scores, count };
  }

  function getEnemyHeadNextMoves(myLength = 0) {
    const dangerTiles = [];

    for (let snake of gameState.board.snakes) {
      if (snake.id == gameState.you.id) continue; // Skip yourself

      // Mark snakes of equal or greater length as dangerous
      const isDangerous = snake.body.length >= myLength;
      if (!isDangerous) continue;

      const head = snake.body[0];
      const possibleMoves = [
        { x: head.x + 1, y: head.y },
        { x: head.x - 1, y: head.y },
        { x: head.x, y: head.y + 1 },
        { x: head.x, y: head.y - 1 },
      ];

      for (let move of possibleMoves) {
        // Ignore out-of-bounds
        if (
          move.x >= 0 &&
          move.x < gameState.board.width &&
          move.y >= 0 &&
          move.y < gameState.board.height
        ) {
          dangerTiles.push(move);
        }
      }
    }

    return dangerTiles;
  }
}

// checking for dead ends and enemy movement
function futureSense(move, gameState, depth) {
  if (depth <= 0) {
    // base case
    return true;
  }

  let newGameState = JSON.parse(JSON.stringify(gameState));
  let mySnake = newGameState.you;
  let myBody = mySnake.body;

  let newHead = { ...myBody[0] }; // clone so it can't be changed
  if (move == "up") {
    newHead.y += 1;
  } else if (move == "down") {
    newHead.y -= 1;
  } else if (move == "left") {
    newHead.x -= 1;
  } else if (move == "right") {
    newHead.x += 1;
  }

  myBody.unshift(newHead);
  if (
    newHead.x < 0 ||
    newHead.x > newGameState.board.width - 1 ||
    newHead.y < 0 ||
    newHead.y > newGameState.board.height - 1
  ) {
    return false;
  }
  let x = 1
  if(mySnake.health == 100){
    x = 0
  }
  mySnake.health -= 1;
  for (let i = 1; i < myBody.length - x; i++) {
    if (newHead.x == myBody[i].x && newHead.y == myBody[i].y) {
      return false;
    }
  }

  for (let snake of newGameState.board.snakes) {
    if (snake.id == mySnake.id) continue;

    let enemyHead = snake.body[0];
    let possibleEnemyMoves = [];

    let directions = [
      { move: "up", x: enemyHead.x, y: enemyHead.y + 1 },
      { move: "down", x: enemyHead.x, y: enemyHead.y - 1 },
      { move: "left", x: enemyHead.x - 1, y: enemyHead.y },
      { move: "right", x: enemyHead.x + 1, y: enemyHead.y },
    ];

    for (let dir of directions) {
      if (
        dir.x < 0 ||
        dir.x > newGameState.board.width ||
        dir.y < 0 ||
        dir.y > newGameState.board.height
      ) {
        continue;
      }
      let hitBody = false;
      for (let i = 0; i < snake.body.length - 1; i++) {
        if (dir.x == snake.body[i].x && dir.y == snake.body[i].y) {
          hitBody = true;
          break;
        }
      }
      if (!hitBody) {
        possibleEnemyMoves.push(dir);
      }
    }
    if (possibleEnemyMoves.length == 0) continue;

    let randomMove =
      possibleEnemyMoves[Math.floor(Math.random() * possibleEnemyMoves.length)];

    snake.body.unshift({ x: randomMove.x, y: randomMove.y });
    if (snake.health != 100) {
      snake.body.pop();
    }
  }

  for (let snake of newGameState.board.snakes) {
    if (snake.id == mySnake.id) continue;

    if (snake.body.length > 0) {
      let enemyHead = snake.body[0];
      if (newHead.x == enemyHead.x && newHead.y == enemyHead.y) {
        if (myBody.length <= snake.body.length) {
          return false;
        }
      }
    }
    for (let i = 0; i < snake.body.length - 1; i++) {
      if (newHead.x == snake.body[i].x && newHead.y == snake.body[i].y) {
        return false;
      }
    }
  }
  let nextMoves = ["up", "down", "left", "right"];
  for (let nextMove of nextMoves) {
    if (futureSense(nextMove, newGameState, depth - 1)) {
      return true;
    }
  }
  return false;
}

function isValidMove(gameState, move) {
  const head = gameState.you.head;
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  let newPos = { x: head.x, y: head.y };

  if (move == "up") {
    newPos.y += 1;
  } else if (move == "down") {
    newPos.y -= 1;
  } else if (move == "left") {
    newPos.x -= 1;
  } else if (move == "right") {
    newPos.x += 1;
  }
  if (
    newPos.x < 0 ||
    newPos.x >= boardWidth ||
    newPos.y < 0 ||
    newPos.y >= boardHeight
  ) {
    return false;
  }

  return true;
}

function penalizeHeadProximity(moveScores, myHead, gameState) {
  const myLength = gameState.you.body.length;

  for (const move in moveScores) {
    let nextPos = getNextPosition(myHead, move);
    for (const snake of gameState.board.snakes) {
      if (snake.id == gameState.you.id) continue;
      
      const enemyHead = snake.body[0];
      const enemyLength = snake.body.length;
      const distance = Math.abs(nextPos.x - enemyHead.x) + Math.abs(nextPos.y - enemyHead.y);
      let sizePenalty = 1;
      if (enemyLength >= myLength) {
        sizePenalty = 2.5;
      } else {
        sizePenalty = 0.5;
      }
      // Determine penalty based on distance
      if (distance <= 1) {
        moveScores[move] -= 200 * sizePenalty;
      } else if (distance == 2) {
        moveScores[move] -= 100 * sizePenalty;
      } else if (distance == 3) {
        moveScores[move] -= 50 * sizePenalty;
      } else if (distance <= 5) {
        moveScores[move] -= 20 * sizePenalty;
      }
    }
  }
  
  return moveScores;
}

function huntSmallerSnakes(gameState, myHead, myLength, myHealth, moveScores) {
  if (myLength < 5 || myHealth < 50) return moveScores;
  
  for (let snake of gameState.board.snakes) {
    if (snake.id == gameState.you.id) continue;
    
    const enemyHead = snake.body[0];
    const enemyLength = snake.body.length;

    if (myLength > enemyLength) {
      const distance = Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);

      const sizeDiff = myLength - enemyLength;
      const huntBonus = Math.min(sizeDiff * 10, 50);

      if (distance <= 2) {
        moveScores.right = enemyHead.x > myHead.x ? moveScores.right + 200 + huntBonus : moveScores.right;
        moveScores.left = enemyHead.x < myHead.x ? moveScores.left + 200 + huntBonus : moveScores.left;
        moveScores.up = enemyHead.y > myHead.y ? moveScores.up + 200 + huntBonus : moveScores.up;
        moveScores.down = enemyHead.y < myHead.y ? moveScores.down + 200 + huntBonus : moveScores.down;
      } else if (distance <= 4) {
        moveScores.right = enemyHead.x > myHead.x ? moveScores.right + 100 + huntBonus : moveScores.right;
        moveScores.left = enemyHead.x < myHead.x ? moveScores.left + 100 + huntBonus : moveScores.left;
        moveScores.up = enemyHead.y > myHead.y ? moveScores.up + 100 + huntBonus : moveScores.up;
        moveScores.down = enemyHead.y < myHead.y ? moveScores.down + 100 + huntBonus : moveScores.down;
      } else if (distance <= 6 && sizeDiff > 2) {
        moveScores.right = enemyHead.x > myHead.x ? moveScores.right + 50 : moveScores.right;
        moveScores.left = enemyHead.x < myHead.x ? moveScores.left + 50 : moveScores.left;
        moveScores.up = enemyHead.y > myHead.y ? moveScores.up + 50 : moveScores.up;
        moveScores.down = enemyHead.y < myHead.y ? moveScores.down + 50 : moveScores.down;
      }
    }
  }
  
  return moveScores;
}

function seekHeadCollisions(gameState, myHead, myLength, moveScores) {
  for (let snake of gameState.board.snakes) {
    if (snake.id == gameState.you.id) continue;
    
    const enemyHead = snake.body[0];
    const enemyLength = snake.body.length;

    if (myLength > enemyLength) {

      const enemyMoves = [
        { x: enemyHead.x + 1, y: enemyHead.y },
        { x: enemyHead.x - 1, y: enemyHead.y },
        { x: enemyHead.x, y: enemyHead.y + 1 },
        { x: enemyHead.x, y: enemyHead.y - 1 }
      ];
 
      for (let enemyMove of enemyMoves) {
        if (myHead.x + 1 == enemyMove.x && myHead.y == enemyMove.y) {
          moveScores.right += 150;
        }
        if (myHead.x - 1 == enemyMove.x && myHead.y == enemyMove.y) {
          moveScores.left += 150;
        }
        if (myHead.x == enemyMove.x && myHead.y + 1 == enemyMove.y) {
          moveScores.up += 150;
        }
        if (myHead.x == enemyMove.x && myHead.y - 1 == enemyMove.y) {
          moveScores.down += 150;
        }
      }
    }
  }
  
  return moveScores;
}

function centerControlStrategy(gameState, myHead, moveScores) {
  if (gameState.turn > 100) return moveScores;
  
  const centerX = Math.floor(gameState.board.width / 2);
  const centerY = Math.floor(gameState.board.height / 2);

  const distanceToCenter = Math.abs(myHead.x - centerX) + Math.abs(myHead.y - centerY);
  
  if (distanceToCenter <= 2) return moveScores;

  const moveTowardsCenter = {
    right: myHead.x < centerX,
    left: myHead.x > centerX,
    up: myHead.y < centerY,
    down: myHead.y > centerY
  };
  
  for (let dir in moveTowardsCenter) {
    if (moveTowardsCenter[dir]) {
      moveScores[dir] = moveScores[dir] || 0;
      const turnFactor = Math.max(1, 100 - gameState.turn) / 100;
      moveScores[dir] += 50 * turnFactor;
    } 
  }
  
  return moveScores;
}

function findBestFood(snakeHead, foodLocations, gameState) {
  let foodScores = [];
  const myLength = gameState.you.body.length;
  
  if (!foodLocations || foodLocations.length == 0) return null;
  for (let food of foodLocations) {
    const distance = Math.abs(snakeHead.x - food.x) + Math.abs(snakeHead.y - food.y);

    let score = 100 - distance * 5;

    const isCorner = 
      (food.x == 0 || food.x == gameState.board.width - 1) &&
      (food.y == 0 || food.y == gameState.board.height - 1);
    
    if (isCorner) score -= 250;
    const isEdge = 
      food.x == 0 || food.x == gameState.board.width - 1 ||
      food.y == 0 || food.y == gameState.board.height - 1;
    
    if (isEdge) score -= 150;
    for (let snake of gameState.board.snakes) {
      if (snake.id == gameState.you.id) continue;
      
      const enemyHead = snake.body[0];
      const enemyDistance = Math.abs(enemyHead.x - food.x) + Math.abs(enemyHead.y - food.y);
      const myDistance = Math.abs(snakeHead.x - food.x) + Math.abs(snakeHead.y - food.y);
      if (enemyDistance < myDistance) {
        if (snake.body.length >= myLength) {
          score -= 70;
        } else {
          score -= 30;
        }
      }
      
      if (enemyDistance == myDistance && snake.body.length > myLength) {
        score -= 50;
      }
    }
  
    const centerX = Math.floor(gameState.board.width / 2);
    const centerY = Math.floor(gameState.board.height / 2);
    const centerDistance = Math.abs(food.x - centerX) + Math.abs(food.y - centerY);
    score -= centerDistance * 2;
    
    foodScores.push({ food, score });
  }
  foodScores.sort((a, b) => b.score - a.score);
  return foodScores[0].food;
}

function avoidTailsAboutToEat(gameState, myHead, moveScores) {
  const myNextPositions = {
    up: { x: myHead.x, y: myHead.y + 1 },
    down: { x: myHead.x, y: myHead.y - 1 },
    left: { x: myHead.x - 1, y: myHead.y },
    right: { x: myHead.x + 1, y: myHead.y }
  };
  
  for (const snake of gameState.board.snakes) {
    if (snake.id == gameState.you.id) continue;
    const enemyHead = snake.body[0];
    const enemyTail = snake.body[snake.body.length - 1];
    let aboutToEat = false;
    const enemyNextMoves = [
      { x: enemyHead.x + 1, y: enemyHead.y },
      { x: enemyHead.x - 1, y: enemyHead.y },
      { x: enemyHead.x, y: enemyHead.y + 1 },
      { x: enemyHead.x, y: enemyHead.y - 1 }
    ];
    for (const food of gameState.board.food) {
      for (const nextMove of enemyNextMoves) {
        if (nextMove.x == food.x && nextMove.y == food.y) {
          aboutToEat = true;
          break;
        }
      }
      if (aboutToEat) break;
    }
    if (aboutToEat) {
      for (const [direction, nextPos] of Object.entries(myNextPositions)) {
        if (nextPos.x == enemyTail.x && nextPos.y == enemyTail.y) {
          moveScores[direction] -= 300;
          console.log(`Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Avoiding move ${direction} - enemy about to eat, tail won't move!`);
        }
      }
    }
  }
  
  return moveScores;
}

function enemyTrapped(gameState, moveScores) {
  const enemySnakes = gameState.board.snakes.filter(snake => snake.id !== gameState.you.id);
  
  for (const enemy of enemySnakes) {
    if (enemy.body[0].x == 1 || enemy.body[0].x == gameState.board.width - 2) {

      let neckX = enemy.body[1].x;
      let neckY = enemy.body[1].y;
      let headY = enemy.body[0].y;
      if (neckX == enemy.body[0].x) {
        if (neckY > headY && gameState.you.body[0].x == enemy.body[0].x && gameState.you.body[0].y == headY - 1) {
          moveScores.down += 100; 
        }
        else if (neckY < headY && gameState.you.body[0].x == enemy.body[0].x && gameState.you.body[0].y == headY + 1) {
          moveScores.up += 100; 
        }
      }
    }
    
    if (enemy.body[0].y == 1 || enemy.body[0].y == gameState.board.height - 2) {

      let neckX = enemy.body[1].x;
      let neckY = enemy.body[1].y;
      let headX = enemy.body[0].x;
      
      if (neckY == enemy.body[0].y) {

        if (neckX > headX && gameState.you.body[0].y == enemy.body[0].y && gameState.you.body[0].x == headX - 1) {
          moveScores.right += 100;
        }
        else if (neckX < headX && gameState.you.body[0].y == enemy.body[0].y && gameState.you.body[0].x == headX + 1) {
          moveScores.left += 100;
        }
      }
    }
  }
  return moveScores;
}

//work on code

// export default function move(game) {
//     const gameState = game;
//     const myHead = gameState.you.body[0];
//     const myTail = gameState.you.body[gameState.you.body.length - 1];
//     const headNode = getNodeId(myHead, gameState);
  
//     let board = {};
//     let c = 0;
//     for (let y = 0; y < gameState.board.height; y++) {
//       for (let x = 0; x < gameState.board.width; x++) {
//         board[c] = { position: { x, y }, connections: [], id: c };
//         c++;
//       }
//     }
//     board = connectNodes(gameState, board);
  
//     const enemySnakes = gameState.board.snakes.filter(s => s.id !== gameState.you.id);
//     const largestEnemy = enemySnakes.reduce((biggest, s) => s.body.length > biggest.body.length ? s : biggest, { body: [] });
//     const is1v1 = enemySnakes.length === 1;
//     const riskFactor = is1v1 ? 1.5 : 1.0;
//     const aggressiveMode = gameState.you.body.length < largestEnemy.body.length + 5;
//     const isHungry = aggressiveMode || gameState.you.health < 60;
  
//     let spaceWeight = 1.2;
//     let predictedWeight = 0.25;
//     const turn = gameState.turn;
//     const boardArea = gameState.board.height * gameState.board.width;

//     if (turn < 80 && boardArea > 100) { // Early game, open board
//         spaceWeight = 1.15;
//         predictedWeight = 0.2;
//     } else if (turn > 200 && gameState.you.health < 70) { // Late game, survival mode
//         spaceWeight = 1.3;
//         predictedWeight = 0.4;
//     } else if (isHungry && boardArea < 100) { // Food race, small board
//         spaceWeight = 0.8;
//         predictedWeight = 0.1;
//     } else if (checkEnclosure(board, headNode, gameState)) { // Anti-trap strategy
//         spaceWeight = 1.5;
//         predictedWeight = 0.5;
//     }

//     let targetNode;
//     if (isHungry && gameState.board.food.length > 0) {
//       targetNode = nearestFood(gameState, board, myHead, myHead);
//     } else {
//       const boxingNode = boxEnemyInCorner(gameState, board);
//       targetNode = boxingNode || getNodeId(myTail, gameState);
  
//       const tailNode = getNodeId(myTail, gameState);
//       const tailPath = aStar(board, headNode, tailNode);
//       const reachableTail = bfs(board, tailNode);
  
//       if (tailPath.path.length > 1 && reachableTail > gameState.you.body.length * 1.2) {
//         targetNode = tailNode;
//       }
//     }
  
//     if (checkEnclosure(board, headNode, gameState)) {
//       const escape = findClosestOpening(gameState, board, headNode);
//       if (escape) targetNode = escape.opening || targetNode;
//     }
  
//     let path = aStar(board, headNode, targetNode);
//     if (!path || !path.path || path.path.length < 2 || detectLoopTrap(path.path, board, gameState)) {
//       const tailNode = getNodeId(myTail, gameState);
//       const tailPath = aStar(board, headNode, tailNode);
//       if (tailPath.path.length > 1 && !detectLoopTrap(tailPath.path, board, gameState)) {
//         path = tailPath;
//       }
//     }
  
//     function hasDeadEnd(path) {
//       if (!path || path.length === 0) return true;
//       const finalNode = path[path.length - 1];
//       const reachable = bfs(board, finalNode);
//       return reachable < gameState.you.body.length * 1.2;
//     }
  
//     function pathSpaceEvaluation(path) {
//       if (!path || path.length === 0) return 0;
//       const lastNode = path[path.length - 1];
//       return bfs(board, lastNode);
//     }
  
//     function forkFlexibility(node) {
//       return board[node].connections.length;
//     }
  
//     const allMoves = ['up', 'down', 'left', 'right'];
//     const safeMoves = allMoves.filter(move => isMoveSafe(move, gameState));
//     const riskyMoves = allMoves.filter(move => !isHeadOnRisk(move, gameState));
//     const superSafeMoves = safeMoves.filter(move => riskyMoves.includes(move));
//     const validMoves = superSafeMoves.filter(move => isMoveSafe(move, gameState));
  
//     const avoidMoves = new Set();
//     for (const enemy of enemySnakes) {
//       const enemyHead = enemy.body[0];
//       const enemyNexts = ['up', 'down', 'left', 'right'].map(d => getNextPosition(enemyHead, d));
//       for (const pos of enemyNexts) {
//         if (pos.x === myHead.x + 1 && pos.y === myHead.y) avoidMoves.add('right');
//         if (pos.x === myHead.x - 1 && pos.y === myHead.y) avoidMoves.add('left');
//         if (pos.x === myHead.x && pos.y === myHead.y + 1) avoidMoves.add('up');
//         if (pos.x === myHead.x && pos.y === myHead.y - 1) avoidMoves.add('down');
//       }
//     }
  
//     const filteredMoves = validMoves.filter(move => !avoidMoves.has(move));
  
//     function getForkBias(state) {
//       const turn = state.turn;
//       const snakes = state.board.snakes;
//       const mySnake = state.you;
//       const boardArea = state.board.height * state.board.width;
//       const enemySnakes = snakes.filter(s => s.id !== mySnake.id);
  
//       const is1v1 = snakes.length === 2;
//       const isSolo = snakes.length === 1;
//       const isEarly = turn < 80;
//       const isLate = turn > 225;
//       const lowHealth = mySnake.health < 30;
//       const isHungry = mySnake.health < 60 || mySnake.body.length < 6;
//       const isDominant = enemySnakes.every(s => mySnake.body.length > s.body.length + 2);
  
//       if (isSolo) return 0.0;
//       if (is1v1 && isDominant && mySnake.health > 50) return 0.5;
//       if (isEarly) return boardArea > 150 ? 3.5 : 3.0;
//       if (lowHealth) return 2.5;
//       if (isLate) return 1.0;
//       if (isHungry) return 3.0;
  
//       return 2.0;
//     }
  
//     const forkWeight = getForkBias(gameState);
//     console.log(`[DEBUG] Turn ${gameState.turn} | Snakes: ${gameState.board.snakes.length} | Fork Bias: ${forkWeight} | Space Weight: ${spaceWeight} | Predicted Weight: ${predictedWeight}`);
//     const predictedSpace = pathSpaceEvaluation(path.path);
//     const scoredMoves = filteredMoves.map(move => {
//       const neighbor = getNextPosition(myHead, move);
//       const neighborNode = getNodeId(neighbor, gameState);
//       const zone = neighborNode !== undefined ? bfsZoneOwnership(board, neighborNode, gameState) : 0;
//       const space = neighborNode !== undefined ? bfs(board, neighborNode) : 0;
//       const forks = neighborNode !== undefined ? forkFlexibility(neighborNode) : 0;
//       const midPathTrap = detectLoopTrap([headNode, neighborNode], board, gameState);
//         return {
//         move,
//         score: midPathTrap ? -Infinity : zone * riskFactor + space * spaceWeight + forks * forkWeight * 0.9 + predictedSpace * predictedWeight
//         };
//     }).sort((a, b) => b.score - a.score);
  
//     let nextMove = path.path[1] ? calculateNextMove(path.path[1], board, headNode) : null;
//     if (pathSpaceEvaluation(path.path) < gameState.you.body.length * 1.2 && scoredMoves.length > 0) {
//       nextMove = scoredMoves[0].move;
//     }
  
//     if (!filteredMoves.includes(nextMove)) {
//       if (scoredMoves.length > 0) {
//         nextMove = scoredMoves[0].move;
//       }
//     }
  
//     if (!nextMove || !isMoveSafe(nextMove, gameState)) {
//         const emergencyMoves = allMoves.filter(m => isMoveSafe(m, gameState));
//         if (emergencyMoves.length > 0) {
//             // Choose the move with max space to survive longer
//             nextMove = emergencyMoves.reduce((best, move) => {
//                 const pos = getNextPosition(myHead, move);
//                 const node = getNodeId(pos, gameState);
//                 const space = node !== undefined ? bfs(board, node) : 0;
//                 return space > best.space ? { move, space } : best;
//             }, { move: null, space: -1 }).move;
//         } else {
//             nextMove = 'up'; // final desperation
//         }
//     }    
  
//     for (const enemy of enemySnakes) {
//       const tail = enemy.body[enemy.body.length - 1];
//       const tailNode = getNodeId(tail, gameState);
//       const tailPath = aStar(board, headNode, tailNode);
//       if (tailPath.path.length > 0 && bfs(board, tailNode) < 20) {
//         nextMove = calculateNextMove(tailPath.path[1], board, headNode);
//       }
//     }
  
//     for (const enemy of enemySnakes) {
//       const enemyHead = enemy.body[0];
//       const distance = Math.abs(enemyHead.x - myHead.x) + Math.abs(enemyHead.y - myHead.y);
//       if (gameState.you.body.length > enemy.body.length && (is1v1 || gameState.you.health > 40)) {
//         if (distance <= 2) {
//           const attackMove = allMoves.find(move => {
//             const pos = getNextPosition(myHead, move);
//             return pos.x === enemyHead.x && pos.y === enemyHead.y && isMoveSafe(move, gameState);
//           });
//           if (attackMove) {
//             nextMove = attackMove;
//             break;
//           }
//         }
//       }
//     }
  
//     if (!isMoveSafe(nextMove, gameState)) {
//       nextMove = safeMoves[0] || 'up';
//     }
  
//     console.log(`MOVE ${gameState.turn}: ${nextMove}`);
//     return { move: nextMove };
//   }

// function bfsZoneOwnership(board, startNode, gameState) {
//     const visited = new Set();
//     const queue = [startNode];
//     const enemyHeads = gameState.board.snakes.filter(s => s.id !== gameState.you.id).map(s => s.body[0]);
//     let myControl = 0;

//     while (queue.length > 0) {
//         const node = queue.shift();
//         if (!visited.has(node)) {
//             visited.add(node);
//             const pos = board[node].position;
//             const enemyNearby = enemyHeads.some(h => Math.abs(h.x - pos.x) + Math.abs(h.y - pos.y) <= 2);
//             if (!enemyNearby) myControl++;

//             for (const [neighbor] of board[node].connections) {
//                 if (!visited.has(neighbor)) queue.push(neighbor);
//             }
//         }
//     }
//     return myControl;
// }


// function boxEnemyInCorner(gameState, board) {
//     const corners = [
//         { x: 0, y: 0 },
//         { x: 0, y: gameState.board.height - 1 },
//         { x: gameState.board.width - 1, y: 0 },
//         { x: gameState.board.width - 1, y: gameState.board.height - 1 }
//     ];
//     const enemies = gameState.board.snakes.filter(s => s.id !== gameState.you.id);
//     for (const corner of corners) {
//         for (const enemy of enemies) {
//             const eHead = enemy.body[0];
//             if (Math.abs(eHead.x - corner.x) <= 3 && Math.abs(eHead.y - corner.y) <= 3) {
//                 return getNodeId(corner, gameState);
//             }
//         }
//     }
//     return null;
// }

// function detectLoopTrap(path, board, gameState) {
//     if (!path || path.length < 3) return false;

//     const snakeLength = gameState.you.body.length;
//     const lookahead = Math.min(path.length, 5); // Check first few steps

//     for (let i = 1; i < lookahead; i++) {
//         const node = path[i];
//         const reachable = bfs(board, node);
//         if (reachable < snakeLength * 1.1) {
//             return true; // Trap detected at mid-path node
//         }
//     }

//     const lastNode = path[path.length - 1];
//     const finalReachable = bfs(board, lastNode);
//     return finalReachable < snakeLength * 1.1;
// }

// function isMoveSafe(move, gameState) {
//     const myHead = gameState.you.body[0];
//     const newHead = getNextPosition(myHead, move);
//     if (
//         newHead.x < 0 || newHead.x >= gameState.board.width ||
//         newHead.y < 0 || newHead.y >= gameState.board.height
//     ) {
//         return false;
//     }
//     for (const snake of gameState.board.snakes) {
//         for (const segment of snake.body.slice(0, -1)) {
//             if (segment.x === newHead.x && segment.y === newHead.y) {
//                 return false;
//             }
//         }
//     }
//     return true;
// }

// function isHeadOnRisk(move, gameState) {
//     const myHead = gameState.you.body[0];
//     const newHead = getNextPosition(myHead, move);
//     for (const snake of gameState.board.snakes) {
//         if (snake.id === gameState.you.id) continue;
//         const enemyHead = snake.body[0];
//         if (snake.body.length >= gameState.you.body.length) {
//             if (beside(newHead, enemyHead)) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }

// function getNextPosition(pos, move) {
//     const delta = { up: [0, 1], down: [0, -1], left: [-1, 0], right: [1, 0] };
//     return {
//         x: pos.x + delta[move][0],
//         y: pos.y + delta[move][1]
//     };
// }
// function connectNodes(gameState, board) {
//     const snakeBodies = [];
//     const snakeHeads = [];
//     const food = [];
//     const tailNode = getNodeId(gameState.you.body[gameState.you.body.length - 1], gameState);

//     for (const snake of gameState.board.snakes) {
//         if (snake.id !== gameState.you.id) {
//             for (let i = 0; i < snake.body.length - 1; i++) {
//                 snakeBodies.push(getNodeId(snake.body[i], gameState));
//             }
//             const head = snake.body[0];
//             if (snake.body.length >= gameState.you.body.length) {
//                 [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
//                     snakeHeads.push(getNodeId({ x: head.x + dx, y: head.y + dy }, gameState));
//                 });
//             }
//         }
//     }

//     for (const segment of gameState.you.body) {
//         const id = getNodeId(segment, gameState);
//         if (id !== tailNode || (gameState.you.health === 100 && beside(gameState.you.body[0], gameState.you.body[gameState.you.body.length - 1]))) {
//             snakeBodies.push(id);
//         }
//     }

//     for (const f of gameState.board.food) {
//         food.push(getNodeId(f, gameState));
//     }

//     for (const i in board) {
//         for (const j in board) {
//             const a = board[i].position;
//             const b = board[j].position;
//             if (beside(a, b) && !snakeBodies.includes(Number(j))) {
//                 if (snakeHeads.includes(Number(j))) board[i].connections.push([Number(j), 100]);
//                 else if (food.includes(Number(j))) board[i].connections.push([Number(j), 5]);
//                 else board[i].connections.push([Number(j), 1]);
//             }
//         }
//     }
//     return board;
// }

// function aStar(graph, start, target) {
//     const open = [{ node: start, f: 0, path: [start] }];
//     const gScores = { [start]: 0 };

//     while (open.length > 0) {
//         open.sort((a, b) => a.f - b.f);
//         const current = open.shift();
//         if (current.node === target) return { path: current.path, cost: gScores[target] };

//         for (const [neighbor, cost] of graph[current.node].connections) {
//             const g = gScores[current.node] + cost;
//             if (!(neighbor in gScores) || g < gScores[neighbor]) {
//                 gScores[neighbor] = g;
//                 const f = g + heuristic(neighbor, target, graph);
//                 open.push({ node: neighbor, f, path: [...current.path, neighbor] });
//             }
//         }
//     }
//     return { path: [], cost: Infinity };
// }

// function heuristic(a, b, graph) {
//     return Math.abs(graph[a].position.x - graph[b].position.x) + Math.abs(graph[a].position.y - graph[b].position.y);
// }

// function getNodeId(pos, gameState) {
//     if (pos.y >= 0 && pos.y < gameState.board.height && pos.x >= 0 && pos.x < gameState.board.width) {
//         return pos.y * gameState.board.width + pos.x;
//     }
//     return undefined;
// }

// function nearestFood(gameState, board, myHead, start) {
//     const foodNodes = gameState.board.food.map(f => getNodeId(f, gameState));
//     const safeFood = bfs(board, getNodeId(start, gameState), gameState, foodNodes);
//     let best = { dist: Infinity, node: null };
//     for (const node of safeFood) {
//         const p = aStar(board, getNodeId(myHead, gameState), node);
//         if (p.path.length < best.dist && p.cost <= 70) {
//             best = { dist: p.path.length, node };
//         }
//     }
//     return best.node || getNodeId(gameState.you.body[gameState.you.body.length - 1], gameState);
// }

// function checkEnclosure(board, headNode, gameState) {
//     const directions = [[0, 1], [0, -1], [-1, 0], [1, 0]];
//     return directions.every(([dx, dy]) => {
//         const neighbor = getNodeId({ x: board[headNode].position.x + dx, y: board[headNode].position.y + dy }, gameState);
//         return neighbor && bfs(board, neighbor) < gameState.you.body.length;
//     });
// }

// function findClosestOpening(gameState, board, headNode) {
//     const tailIdx = gameState.you.body.length - 1;
//     for (let turn = 0; turn <= tailIdx; turn++) {
//         const futureTail = gameState.you.body[tailIdx - turn];
//         const node = getNodeId(futureTail, gameState);
//         if (aStar(board, headNode, node).path.length > 0) return { opening: node, turns: turn };
//     }
//     return null;
// }

// function bfs(graph, start, gameState = undefined, targets = undefined) {
//     const visited = new Set();
//     const queue = [start];
//     let count = 0;
//     const foundTargets = [];
//     while (queue.length > 0) {
//         const node = queue.shift();
//         if (!visited.has(node)) {
//             visited.add(node);
//             count++;
//             if (targets && targets.includes(node)) foundTargets.push(node);
//             for (const [neighbor] of graph[node].connections) {
//                 if (!visited.has(neighbor)) queue.push(neighbor);
//             }
//         }
//     }
//     return targets ? foundTargets : count;
// }

// function beside(a, b) {
//     return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y)) === 1;
// }

// function calculateNextMove(target, board, head) {
//     const dx = board[target].position.x - board[head].position.x;
//     const dy = board[target].position.y - board[head].position.y;
//     if (dx === 1) return 'right';
//     if (dx === -1) return 'left';
//     if (dy === 1) return 'up';
//     if (dy === -1) return 'down';
// } 
