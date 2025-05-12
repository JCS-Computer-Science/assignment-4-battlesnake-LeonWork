
// // // // export default function move(gameState) {
// // // //     gameState.board.snakes.forEach((snake) => console.log(snake.name));
// // // //     let moveSafety = {
// // // //       up: true,
// // // //       down: true,
// // // //       left: true,
// // // //       right: true,
// // // //     };
// // // //     let priorityMoves = {
// // // //       up: false,
// // // //       down: false,
// // // //       left: false,
// // // //       right: false,
// // // //     };
// // // //     let riskyMoves = {
// // // //       up: false,
// // // //       down: false,
// // // //       left: false,
// // // //       right: false,
// // // //     };
// // // //     let spaceScores = { up: 0, down: 0, left: 0, right: 0 };
  
// // // //     let myHead = gameState.you.body[0];
// // // //     let myNeck = gameState.you.body[1];
  
// // // //     let healthLimit = 100;
  
// // // //     function safeBack() {
// // // //       moveSafety.left = myNeck.x < myHead.x ? false : moveSafety.left;
// // // //       moveSafety.right = myNeck.x > myHead.x ? false : moveSafety.right;
// // // //       moveSafety.down = myNeck.y < myHead.y ? false : moveSafety.down;
// // // //       moveSafety.up = myNeck.y > myHead.y ? false : moveSafety.up;
// // // //     }
// // // //     safeBack();
  
// // // //     function bounds() {
// // // //       moveSafety.left = myHead.x == 0 ? false : moveSafety.left;
// // // //       moveSafety.right =
// // // //         myHead.x == gameState.board.width - 1 ? false : moveSafety.right;
// // // //       moveSafety.down = myHead.y == 0 ? false : moveSafety.down;
// // // //       moveSafety.up =
// // // //         myHead.y == gameState.board.height - 1 ? false : moveSafety.up;
// // // //     }
// // // //     bounds();
  
// // // //     let myBody = gameState.you.body;
  
// // // //     function selfPreservation() {
// // // //       let ate = 1;
// // // //       if (gameState.you.health == 100) {
// // // //         ate = 0;
// // // //       }
// // // //       for (let i = 1; i < myBody.length - ate; i++) {
// // // //         moveSafety.right =
// // // //           myHead.x + 1 == myBody[i].x && myHead.y == myBody[i].y
// // // //             ? false
// // // //             : moveSafety.right;
// // // //         moveSafety.left =
// // // //           myHead.x - 1 == myBody[i].x && myHead.y == myBody[i].y
// // // //             ? false
// // // //             : moveSafety.left;
// // // //         moveSafety.up =
// // // //           myHead.x == myBody[i].x && myHead.y + 1 == myBody[i].y
// // // //             ? false
// // // //             : moveSafety.up;
// // // //         moveSafety.down =
// // // //           myHead.x == myBody[i].x && myHead.y - 1 == myBody[i].y
// // // //             ? false
// // // //             : moveSafety.down;
  
// // // //         riskyMoves.right =
// // // //           myHead.x + 1 == myBody[i].x && myHead.y == myBody[i].y
// // // //             ? false
// // // //             : riskyMoves.right;
// // // //         riskyMoves.left =
// // // //           myHead.x - 1 == myBody[i].x && myHead.y == myBody[i].y
// // // //             ? false
// // // //             : riskyMoves.left;
// // // //         riskyMoves.up =
// // // //           myHead.x == myBody[i].x && myHead.y + 1 == myBody[i].y
// // // //             ? false
// // // //             : riskyMoves.up;
// // // //         riskyMoves.down =
// // // //           myHead.x == myBody[i].x && myHead.y - 1 == myBody[i].y
// // // //             ? false
// // // //             : riskyMoves.down;
// // // //       }
// // // //     }
  
// // // //     function riskyPres() {
// // // //       let ate = 1;
// // // //       if (gameState.you.health == 100) {
// // // //         ate = 0;
// // // //       }
// // // //       for (let i = 1; i < myBody.length - ate; i++) {
// // // //         riskyMoves.right =
// // // //           myHead.x + 1 == myBody[i].x && myHead.y == myBody[i].y
// // // //             ? false
// // // //             : riskyMoves.right;
// // // //         riskyMoves.left =
// // // //           myHead.x - 1 == myBody[i].x && myHead.y == myBody[i].y
// // // //             ? false
// // // //             : riskyMoves.left;
// // // //         riskyMoves.up =
// // // //           myHead.x == myBody[i].x && myHead.y + 1 == myBody[i].y
// // // //             ? false
// // // //             : riskyMoves.up;
// // // //         riskyMoves.down =
// // // //           myHead.x == myBody[i].x && myHead.y - 1 == myBody[i].y
// // // //             ? false
// // // //             : riskyMoves.down;
// // // //       }
// // // //     }
  
// // // //     selfPreservation();
// // // //     riskyPres();
  
// // // //     // Add a new function to detect positions right behind enemy heads
// // // //     function detectEnemyNecks() {
// // // //       let enemyNecks = [];
  
// // // //       for (let snake of gameState.board.snakes) {
// // // //         if (snake.id == gameState.you.id) continue;
// // // //         let enemyNeck = snake.body[1];
// // // //         enemyNecks.push({ x: enemyNeck.x, y: enemyNeck.y });
// // // //       }
// // // //       return enemyNecks;
// // // //     }
  
// // // //     for (let j = 0; j < gameState.board.snakes.length; j++) {
// // // //       let enemySnake = gameState.board.snakes[j];
// // // //       if (enemySnake.id == gameState.you.id) continue;
  
// // // //       function enemyDodging() {
// // // //         let enemyNecks = detectEnemyNecks();
// // // //         let h = 1;
// // // //         if (enemySnake.health == 100) {
// // // //           h = 0;
// // // //         }
  
// // // //         for (let i = 0; i < enemySnake.body.length - h; i++) {
// // // //           let enemyBody = enemySnake.body[i];
// // // //           moveSafety.right =
// // // //             myHead.x + 1 == enemyBody.x && myHead.y == enemyBody.y
// // // //               ? false
// // // //               : moveSafety.right;
// // // //           moveSafety.left =
// // // //             myHead.x - 1 == enemyBody.x && myHead.y == enemyBody.y
// // // //               ? false
// // // //               : moveSafety.left;
// // // //           moveSafety.up =
// // // //             myHead.x == enemyBody.x && myHead.y + 1 == enemyBody.y
// // // //               ? false
// // // //               : moveSafety.up;
// // // //           moveSafety.down =
// // // //             myHead.x == enemyBody.x && myHead.y - 1 == enemyBody.y
// // // //               ? false
// // // //               : moveSafety.down;
// // // //         }
  
// // // //         for (let neck of enemyNecks) {
// // // //           moveSafety.right =
// // // //             myHead.x + 1 == neck.x && myHead.y == neck.y
// // // //               ? false
// // // //               : moveSafety.right;
// // // //           moveSafety.left =
// // // //             myHead.x - 1 == neck.x && myHead.y == neck.y
// // // //               ? false
// // // //               : moveSafety.left;
// // // //           moveSafety.up =
// // // //             myHead.x == neck.x && myHead.y + 1 == neck.y ? false : moveSafety.up;
// // // //           moveSafety.down =
// // // //             myHead.x == neck.x && myHead.y - 1 == neck.y
// // // //               ? false
// // // //               : moveSafety.down;
// // // //           riskyMoves.right =
// // // //             myHead.x + 1 == neck.x && myHead.y == neck.y
// // // //               ? false
// // // //               : riskyMoves.right;
// // // //           riskyMoves.left =
// // // //             myHead.x - 1 == neck.x && myHead.y == neck.y
// // // //               ? false
// // // //               : riskyMoves.left;
// // // //           riskyMoves.up =
// // // //             myHead.x == neck.x && myHead.y + 1 == neck.y ? false : riskyMoves.up;
// // // //           riskyMoves.down =
// // // //             myHead.x == neck.x && myHead.y - 1 == neck.y
// // // //               ? false
// // // //               : riskyMoves.down;
// // // //         }
// // // //       }
// // // //       enemyDodging();
  
// // // //       let enemyHead = enemySnake.body[0];
// // // //       let myLength = gameState.you.body.length;
// // // //       let enemyLength = enemySnake.body.length;
  
// // // //       if (enemyLength >= myLength) {
// // // //         let enemyMoves = [
// // // //           { x: enemyHead.x + 1, y: enemyHead.y },
// // // //           { x: enemyHead.x - 1, y: enemyHead.y },
// // // //           { x: enemyHead.x, y: enemyHead.y + 1 },
// // // //           { x: enemyHead.x, y: enemyHead.y - 1 },
// // // //         ];
// // // //         for (let move of enemyMoves) {
// // // //           if (myHead.x + 1 == move.x && myHead.y == move.y) {
// // // //             moveSafety.right = false;
// // // //             riskyMoves.right = true;
// // // //           }
// // // //           if (myHead.x - 1 == move.x && myHead.y == move.y) {
// // // //             moveSafety.left = false;
// // // //             riskyMoves.left = true;
// // // //           }
// // // //           if (myHead.x == move.x && myHead.y + 1 == move.y) {
// // // //             moveSafety.up = false;
// // // //             riskyMoves.up = true;
// // // //           }
// // // //           if (myHead.x == move.x && myHead.y - 1 == move.y) {
// // // //             moveSafety.down = false;
// // // //             riskyMoves.down = true;
// // // //           }
// // // //         }
// // // //         enemyDodging();
// // // //         selfPreservation();
// // // //         riskyPres();
// // // //       }
  
// // // //       if (enemyLength < myLength) {
// // // //         let enemyMoves = [
// // // //           { x: enemyHead.x + 1, y: enemyHead.y },
// // // //           { x: enemyHead.x - 1, y: enemyHead.y },
// // // //           { x: enemyHead.x, y: enemyHead.y + 1 },
// // // //           { x: enemyHead.x, y: enemyHead.y - 1 },
// // // //         ];
// // // //         for (let move of enemyMoves) {
// // // //           priorityMoves.right =
// // // //             myHead.x + 1 == move.x && myHead.y == move.y
// // // //               ? true
// // // //               : priorityMoves.right;
// // // //           priorityMoves.left =
// // // //             myHead.x - 1 == move.x && myHead.y == move.y
// // // //               ? true
// // // //               : priorityMoves.left;
// // // //           priorityMoves.up =
// // // //             myHead.x == move.x && myHead.y + 1 == move.y
// // // //               ? true
// // // //               : priorityMoves.up;
// // // //           priorityMoves.down =
// // // //             myHead.x == move.x && myHead.y - 1 == move.y
// // // //               ? true
// // // //               : priorityMoves.down;
// // // //         }
// // // //         enemyDodging();
// // // //         selfPreservation();
// // // //         riskyPres();
// // // //       }
// // // //     }
// // // //     function getNextPosition(pos, dir) {
// // // //       let newPos = { x: pos.x, y: pos.y };
  
// // // //       if (dir == "up") {
// // // //         newPos.y += 1;
// // // //       } else if (dir == "down") {
// // // //         newPos.y -= 1;
// // // //       } else if (dir == "left") {
// // // //         newPos.x -= 1;
// // // //       } else if (dir == "right") {
// // // //         newPos.x += 1;
// // // //       }
  
// // // //       return newPos;
// // // //     }
// // // //     // Updated evaluateSpace function with proper parameters
// // // //     function evaluateSpace() {
// // // //       let visited = new Set();
// // // //       Object.keys(moveSafety).forEach((dir) => {
// // // //         if (!moveSafety[dir]) {
// // // //           spaceScores[dir] = 0;
// // // //           return;
// // // //         }
// // // //         let nextPos = getNextPosition(myHead, dir);
// // // //         let space = floodFill(nextPos, 0, new Set(visited));
// // // //         let exitAnalysis = countExits(nextPos);
  
// // // //         spaceScores[dir] =
// // // //           space * 4 +
// // // //           exitAnalysis.scores.up +
// // // //           exitAnalysis.scores.down +
// // // //           exitAnalysis.scores.left +
// // // //           exitAnalysis.scores.right +
// // // //           exitAnalysis.count * 50; // Bonus for multiple good exits
// // // //       });
// // // //     }
// // // //     evaluateSpace();
  
// // // //     for (let haz of gameState.board.hazards) {
// // // //       if (myHead.x - 1 === haz.x && myHead.y === haz.y) {
// // // //         riskyMoves.left = true;
// // // //         moveSafety.left = false;
// // // //       }
// // // //       if (myHead.x + 1 === haz.x && myHead.y === haz.y) {
// // // //         riskyMoves.right = true;
// // // //         moveSafety.right = false;
// // // //       }
// // // //       if (myHead.y - 1 === haz.y && myHead.x === haz.x) {
// // // //         riskyMoves.down = true;
// // // //         moveSafety.down = false;
// // // //       }
// // // //       if (myHead.y + 1 === haz.y && myHead.x === haz.x) {
// // // //         riskyMoves.up = true;
// // // //         moveSafety.up = false;
// // // //       }
  
// // // //       if (myHead.x === haz.x && myHead.y === haz.y) {
// // // //         priorityMoves = { up: false, down: false, left: false, right: false };
  
// // // //         const safeDirections = [];
  
// // // //         if (
// // // //           !isCoordinateHazard(myHead.x, myHead.y + 1, gameState.board.hazards)
// // // //         ) {
// // // //           safeDirections.push("up");
// // // //         }
// // // //         if (
// // // //           !isCoordinateHazard(myHead.x, myHead.y - 1, gameState.board.hazards)
// // // //         ) {
// // // //           safeDirections.push("down");
// // // //         }
// // // //         if (
// // // //           !isCoordinateHazard(myHead.x + 1, myHead.y, gameState.board.hazards)
// // // //         ) {
// // // //           safeDirections.push("right");
// // // //         }
// // // //         if (
// // // //           !isCoordinateHazard(myHead.x - 1, myHead.y, gameState.board.hazards)
// // // //         ) {
// // // //           safeDirections.push("left");
// // // //         }
  
// // // //         if (safeDirections.length > 0) {
// // // //           for (let dir of safeDirections) {
// // // //             priorityMoves[dir] = true;
// // // //           }
// // // //         } else {
// // // //           if (
// // // //             !isCoordinateHazard(myHead.x, myHead.y + 2, gameState.board.hazards)
// // // //           ) {
// // // //             priorityMoves.up = true;
// // // //           }
// // // //           if (
// // // //             !isCoordinateHazard(myHead.x, myHead.y - 2, gameState.board.hazards)
// // // //           ) {
// // // //             priorityMoves.down = true;
// // // //           }
// // // //           if (
// // // //             !isCoordinateHazard(myHead.x + 2, myHead.y, gameState.board.hazards)
// // // //           ) {
// // // //             priorityMoves.right = true;
// // // //           }
// // // //           if (
// // // //             !isCoordinateHazard(myHead.x - 2, myHead.y, gameState.board.hazards)
// // // //           ) {
// // // //             priorityMoves.left = true;
// // // //           }
// // // //         }
// // // //         if (gameState.you.health < 50) {
// // // //           const foodDirections = getDirectionsTowardNearestFood(
// // // //             myHead,
// // // //             gameState.board.food,
// // // //             gameState.board.hazards
// // // //           );
// // // //           for (let dir of foodDirections) {
// // // //             if (priorityMoves[dir]) {
// // // //               priorityMoves[dir] = true;
// // // //             }
// // // //           }
// // // //         }
// // // //       }
// // // //     }
  
// // // //     function isCoordinateHazard(x, y, hazards) {
// // // //       return hazards.some((haz) => haz.x === x && haz.y === y);
// // // //     }
  
// // // //     function getDirectionsTowardNearestFood(head, foodArray, hazards) {
// // // //       const directions = [];
// // // //       if (!foodArray || foodArray.length === 0) return directions;
  
// // // //       // Find nearest food
// // // //       let nearestFood = null;
// // // //       let minDistance = Infinity;
  
// // // //       for (let food of foodArray) {
// // // //         const dist = Math.abs(head.x - food.x) + Math.abs(head.y - food.y);
// // // //         if (dist < minDistance && !isCoordinateHazard(food.x, food.y, hazards)) {
// // // //           minDistance = dist;
// // // //           nearestFood = food;
// // // //         }
// // // //       }
  
// // // //       if (!nearestFood) return directions;
  
// // // //       // Determine safe directions toward food
// // // //       const dx = nearestFood.x - head.x;
// // // //       const dy = nearestFood.y - head.y;
  
// // // //       if (dx > 0 && !isCoordinateHazard(head.x + 1, head.y, hazards)) {
// // // //         directions.push("right");
// // // //       } else if (dx < 0 && !isCoordinateHazard(head.x - 1, head.y, hazards)) {
// // // //         directions.push("left");
// // // //       }
  
// // // //       if (dy > 0 && !isCoordinateHazard(head.x, head.y + 1, hazards)) {
// // // //         directions.push("up");
// // // //       } else if (dy < 0 && !isCoordinateHazard(head.x, head.y - 1, hazards)) {
// // // //         directions.push("down");
// // // //       }
  
// // // //       return directions;
// // // //     }
  
// // // //     let myLength = gameState.you.body.length;
// // // //     let myHealth = gameState.you.health;
  
// // // //     let longestSnake = 0;
// // // //     for (const snake of gameState.board.snakes) {
// // // //       if (snake.id == gameState.you.id) continue;
// // // //       if (snake.body.length > longestSnake) {
// // // //         longestSnake = snake.body.length;
// // // //       }
// // // //     }
  
// // // //     if (myHealth < 100) {
// // // //       priorityMoves = { up: false, down: false, left: false, right: false };
// // // //       let bestFood = findBestFood(myHead, gameState.board.food, gameState);
// // // //       if (bestFood) {
// // // //         priorityMoves.right = bestFood.x > myHead.x;
// // // //         priorityMoves.left = bestFood.x < myHead.x;
// // // //         priorityMoves.up = bestFood.y > myHead.y;
// // // //         priorityMoves.down = bestFood.y < myHead.y;
// // // //       }
// // // //     }
  
// // // //     let safeMoves = Object.keys(moveSafety).filter(
// // // //       (direction) => moveSafety[direction]
// // // //     );
// // // //     let riskyOptions = Object.keys(riskyMoves).filter(
// // // //       (direction) => riskyMoves[direction]
// // // //     );
// // // //     let futureSafeMoves = safeMoves.filter((move) =>
// // // //       futureSense(move, gameState, 16)
// // // //     );
// // // //     let moveScores = {};
// // // //     futureSafeMoves = futureSafeMoves.filter((move) =>
// // // //       isValidMove(gameState, move)
// // // //     );
// // // //     futureSafeMoves.forEach((move) => {
// // // //       moveScores[move] = 0;
// // // //       moveScores[move] += spaceScores[move] * 2.5;
// // // //       let lowLimit = 30;
// // // //       for (let haz in gameState.board.hazards) {
// // // //         if (move.x == haz.x) {
// // // //           lowLimit = 50;
// // // //         }
// // // //         if (move.y == haz.y) {
// // // //           lowLimit = 50;
// // // //         }
// // // //       }
  
// // // //       if (myHealth < healthLimit || gameState.turn < 150) {
// // // //         if (gameState.turn < 200) {
// // // //           moveScores[move] += priorityMoves[move] ? 180 : 0;
// // // //         } else {
// // // //           moveScores[move] += priorityMoves[move] ? 200 : 0;
// // // //         }
  
// // // //         if (myHealth < lowLimit) {
// // // //           moveScores[move] += priorityMoves[move] ? 30000 : 0;
// // // //         }
// // // //         if (myHealth < lowLimit / 2) {
// // // //           moveScores[move] += priorityMoves[move] ? 50000 : 0;
// // // //         }
// // // //       }
  
// // // //       let nextPos = getNextPosition(myHead, move);
// // // //       let centerX = Math.floor(gameState.board.width / 2);
// // // //       let centerY = Math.floor(gameState.board.height / 2);
// // // //       let distanceToCenter =
// // // //         Math.abs(nextPos.x - centerX) + Math.abs(nextPos.y - centerY);
  
// // // //       if (gameState.turn < 150) {
// // // //         moveScores[move] += distanceToCenter * 10;
// // // //       }
  
// // // //       moveScores[move] = penalizeHeadProximity(
// // // //         moveScores[move],
// // // //         myHead,
// // // //         gameState
// // // //       );
  
// // // //       let isCorner =
// // // //         (move.x == 0 || move.x == gameState.board.width - 1) &&
// // // //         (move.y == 0 || move.y == gameState.board.height - 1);
  
// // // //       if (isCorner) moveScores[move] -= 2500;
  
// // // //       if (gameState.you.health > 40) {
// // // //         let nextMoves = countExits(nextPos, gameState.you.body.length).count;
// // // //         moveScores[move] += nextMoves * 5;
// // // //       }
  
// // // //       if (gameState.turn < 100 || myLength < longestSnake) {
// // // //         let bestFood = findBestFood(myHead, gameState.board.food, gameState);
// // // //         if (bestFood) {
// // // //           priorityMoves.right = bestFood.x > myHead.x;
// // // //           priorityMoves.left = bestFood.x < myHead.x;
// // // //           priorityMoves.up = bestFood.y > myHead.y;
// // // //           priorityMoves.down = bestFood.y < myHead.y;
  
// // // //           for (let dir in priorityMoves) {
// // // //             if (priorityMoves[dir]) {
// // // //               moveScores[dir] = moveScores[dir] || 0;
// // // //               moveScores[dir] += 600;
// // // //             }
// // // //           }
// // // //         }
// // // //         healthLimit = 20 * gameState.board.snakes.length;
// // // //       } else {
// // // //         if (myLength + 1 <= longestSnake) {
// // // //           healthLimit = 15 * gameState.board.snakes.length;
// // // //         } else {
// // // //           healthLimit = 10 * gameState.board.snakes.length;
// // // //         }
// // // //       }
  
// // // //       moveScores = centerControlStrategy(gameState, myHead, moveScores);
  
// // // //       moveScores = huntSmallerSnakes(
// // // //         gameState,
// // // //         myHead,
// // // //         myLength,
// // // //         myHealth,
// // // //         moveScores
// // // //       );
  
// // // //       moveScores = avoidTailsAboutToEat(gameState, myHead, moveScores);
  
// // // //       moveScores = enemyTrapped(gameState, moveScores);
  
// // // //       let myTail = myBody[myBody.length - 1];
// // // //       let secondLast = myBody[myBody.length - 2]; // To detect if tail is moving
// // // //       let tailWillMove = !gameState.board.food.some(
// // // //         (f) => f.x === myHead.x && f.y === myHead.y
// // // //       ); // If not eating, tail moves
  
// // // //       let tailPriorityMoves = [];
  
// // // //       // Directions towards tail
// // // //       if (myHead.x < myTail.x && moveSafety.right) {
// // // //         if (
// // // //           !(myTail.x === secondLast.x && myTail.y === secondLast.y) ||
// // // //           tailWillMove
// // // //         ) {
// // // //           tailPriorityMoves.push("right");
// // // //         }
// // // //       }
// // // //       if (myHead.x > myTail.x && moveSafety.left) {
// // // //         if (
// // // //           !(myTail.x === secondLast.x && myTail.y === secondLast.y) ||
// // // //           tailWillMove
// // // //         ) {
// // // //           tailPriorityMoves.push("left");
// // // //         }
// // // //       }
// // // //       if (myHead.y < myTail.y && moveSafety.up) {
// // // //         if (
// // // //           !(myTail.x === secondLast.x && myTail.y === secondLast.y) ||
// // // //           tailWillMove
// // // //         ) {
// // // //           tailPriorityMoves.push("up");
// // // //         }
// // // //       }
// // // //       if (myHead.y > myTail.y && moveSafety.down) {
// // // //         if (
// // // //           !(myTail.x === secondLast.x && myTail.y === secondLast.y) ||
// // // //           tailWillMove
// // // //         ) {
// // // //           tailPriorityMoves.push("down");
// // // //         }
// // // //       }
  
// // // //       const tailBias = Math.max(0, myBody.length - 4);
// // // //       for (const move of tailPriorityMoves) {
// // // //         if (moveScores[move] !== undefined) {
// // // //           moveScores[move] += tailBias * 10;
// // // //         }
// // // //       }
// // // //       if (gameState.you.health > 50) {
// // // //         for (let snake of gameState.board.snakes) {
// // // //           if (snake.id == gameState.you.id) continue;
  
// // // //           if (snake.body.length < gameState.you.body.length) {
// // // //             let enemyHead = snake.body[0];
// // // //             let currentDistance =
// // // //               Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
// // // //             let newDistance =
// // // //               Math.abs(nextPos.x - enemyHead.x) +
// // // //               Math.abs(nextPos.y - enemyHead.y);
// // // //             if (newDistance < currentDistance) {
// // // //               moveScores[move] += 100;
// // // //             }
// // // //           }
// // // //         }
// // // //       }
  
// // // //       if (gameState.you.health < 100) {
// // // //         for (let snake of gameState.board.snakes) {
// // // //           if (snake.id == gameState.you.id) continue;
  
// // // //           if (snake.body.length > gameState.you.body.length) {
// // // //             let enemyHead = snake.body[0];
// // // //             let currentDistance =
// // // //               Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
// // // //             let newDistance =
// // // //               Math.abs(nextPos.x - enemyHead.x) +
// // // //               Math.abs(nextPos.y - enemyHead.y);
// // // //             if (newDistance < currentDistance) {
// // // //               moveScores[move] -= 300 / gameState.board.snakes.length;
// // // //             }
// // // //           }
// // // //         }
// // // //       }
// // // //     });
// // // //     let bestMove = null;
// // // //     let bestScore = -100000;
// // // //     let futureSafeMovesFinal = safeMoves.filter((move) =>
// // // //       futureSense(move, gameState, 12)
// // // //     );
// // // //     if (futureSafeMovesFinal.length > 0) {
// // // //       futureSafeMovesFinal = futureSafeMovesFinal.filter(
// // // //         (move) => isValidMove(gameState, move) && moveSafety[move]
// // // //       );
// // // //       for (let move of futureSafeMovesFinal) {
// // // //         if (moveScores[move] > bestScore) {
// // // //           bestScore = moveScores[move];
// // // //           bestMove = move;
// // // //         }
// // // //       }
// // // //       if (bestMove && moveSafety[bestMove]) {
// // // //         console.log(
// // // //           `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Choosing best future-safe move: ${bestMove} (score: ${moveScores[bestMove]})`
// // // //         );
// // // //         return { move: bestMove };
// // // //       }
// // // //     }
// // // //     for (let depth of [10, 9, 8, 7, 6, 5, 3]) {
// // // //       let bestMoveAtDepth = null;
// // // //       let bestScoreAtDepth = -100000;
// // // //       let validMovesAtDepth = [];
// // // //       for (let move of safeMoves) {
// // // //         if (moveSafety[move] && futureSense(move, gameState, depth)) {
// // // //           validMovesAtDepth.push(move);
// // // //         }
// // // //       }
// // // //       if (validMovesAtDepth.length > 0) {
// // // //         let depthMoveScores = {};
// // // //         for (let move of validMovesAtDepth) {
// // // //           depthMoveScores[move] = 0;
// // // //           depthMoveScores[move] += spaceScores[move] * 2.6;
// // // //           if (myHealth < 20) {
// // // //             depthMoveScores[move] += priorityMoves[move] ? 400 : 0;
// // // //           } else {
// // // //             depthMoveScores[move] += priorityMoves[move] ? 20 : 0;
// // // //           }
// // // //           if (depthMoveScores[move] > bestScoreAtDepth) {
// // // //             bestScoreAtDepth = depthMoveScores[move];
// // // //             bestMoveAtDepth = move;
// // // //           }
// // // //         }
// // // //         if (bestMoveAtDepth) {
// // // //           console.log(
// // // //             `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Choosing best-scored safe move with ${depth} future-sense: ${bestMoveAtDepth} (score: ${bestScoreAtDepth})`
// // // //           );
// // // //           return { move: bestMoveAtDepth };
// // // //         }
// // // //       }
// // // //     }
// // // //     if (riskyOptions.length > 0) {
// // // //       let riskyMoveScores = {};
// // // //       let riskyMoveSurvival = {}; // Track how many future moves each risky option allows
  
// // // //       riskyOptions.forEach((move) => {
// // // //         riskyMoveScores[move] = 0;
// // // //         riskyMoveSurvival[move] = 0;
  
// // // //         // Calculate how many future moves this risky option allows
// // // //         for (let depth = 5; depth >= 1; depth--) {
// // // //           if (futureSense(move, gameState, depth)) {
// // // //             riskyMoveSurvival[move] = depth;
// // // //             riskyMoveScores[move] += depth * 10;
// // // //             break;
// // // //           }
// // // //         }
  
// // // //         riskyMoveScores[move] += spaceScores[move] * 2;
  
// // // //         for (let snake of gameState.board.snakes) {
// // // //           if (snake.id == gameState.you.id) continue;
// // // //           if (
// // // //             snake.body[snake.length - 1].x == move.x &&
// // // //             snake.body[snake.length - 1].y == move.y
// // // //           ) {
// // // //             riskyMoveScores[move] -= 40;
// // // //           }
// // // //           for (let food of gameState.board.food) {
// // // //             if (snake.body[0].x + 1 == food.x && snake.body[0].y == food.y) {
// // // //               riskyMoveScores.right -= 40;
// // // //             }
// // // //             if (snake.body[0].x - 1 == food.x && snake.body[0].y == food.y) {
// // // //               riskyMoveScores.left -= 40;
// // // //             }
// // // //             if (snake.body[0].x == food.x && snake.body[0].y + 1 == food.y) {
// // // //               riskyMoveScores.up -= 40;
// // // //             }
// // // //             if (snake.body[0].x == food.x && snake.body[0].y - 1 == food.y) {
// // // //               riskyMoveScores.down -= 40;
// // // //             }
// // // //           }
// // // //         }
  
// // // //         if (priorityMoves[move]) {
// // // //           riskyMoveScores[move] += 15;
// // // //         }
  
// // // //         let nextPos = getNextPosition(myHead, move);
// // // //         let exitAnalysis = countExits(nextPos);
// // // //         riskyMoveScores[move] += exitAnalysis.count * 50;
// // // //       });
  
// // // //       let bestRiskyScore = -Infinity;
// // // //       let bestRiskyMove = null;
  
// // // //       let viableRiskyOptions = riskyOptions.filter(
// // // //         (move) => riskyMoveSurvival[move] > myLength / 5
// // // //       );
// // // //       if (viableRiskyOptions.length > 0) {
// // // //         for (let move of viableRiskyOptions) {
// // // //           if (riskyMoveScores[move] > bestRiskyScore) {
// // // //             bestRiskyScore = riskyMoveScores[move];
// // // //             bestRiskyMove = move;
// // // //           }
// // // //         }
  
// // // //         bestMove = bestRiskyMove || viableRiskyOptions[0];
// // // //         console.log(
// // // //           `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Using fallback (1) risky move: ${bestMove} ` +
// // // //             `(score: ${bestRiskyScore}, future survival: ${riskyMoveSurvival[bestMove]})`
// // // //         );
// // // //         return { move: bestMove };
// // // //       } else {
// // // //         console.log(
// // // //           `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - No risky moves allow sufficient future survival`
// // // //         );
// // // //       }
// // // //     }
// // // //     if (safeMoves.length > 0) {
// // // //       let bestSafeScore = -10000000;
// // // //       let bestSafeMove = null;
// // // //       for (let move of safeMoves) {
// // // //         let score = 0;
// // // //         let nextPos = getNextPosition(myHead, move);
// // // //         score += spaceScores[move] * 3;
// // // //         for (let depth = 10; depth >= 1; depth -= 1) {
// // // //           if (futureSense(move, gameState, depth)) {
// // // //             score += depth * 10;
// // // //             break;
// // // //           }
// // // //         }
// // // //         let myTail = myBody[myBody.length - 1];
// // // //         if (
// // // //           (myHead.x < myTail.x && move == "right") ||
// // // //           (myHead.x > myTail.x && move == "left") ||
// // // //           (myHead.y < myTail.y && move == "up") ||
// // // //           (myHead.y > myTail.y && move == "down")
// // // //         ) {
// // // //           score += 500;
// // // //         }
// // // //         let exitCount = countExits(nextPos).count;
// // // //         score += exitCount * 18;
// // // //         let floodSpace = floodFill(nextPos, 0, new Set());
// // // //         score += floodSpace * 4;
// // // //         if (score > bestSafeScore) {
// // // //           bestSafeScore = score;
// // // //           bestSafeMove = move;
// // // //         }
// // // //       }
  
// // // //       console.log(
// // // //         `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Choosing best safe move: ${bestSafeMove} (score: ${bestSafeScore})`
// // // //       );
// // // //       return { move: bestSafeMove || safeMoves[0] };
// // // //     } else {
// // // //       if (riskyOptions.length > 0) {
// // // //         let bestRiskyScore = -10000000;
// // // //         let bestRiskyMove = null;
  
// // // //         for (let move of riskyOptions) {
// // // //           let score = 0;
// // // //           let nextPos = getNextPosition(myHead, move);
  
// // // //           // Factor in space around move (if available)
// // // //           score += (spaceScores[move] || 0) * 2;
  
// // // //           // Look ahead for potential survivability
// // // //           for (let depth = 10; depth >= 1; depth--) {
// // // //             if (futureSense(move, gameState, depth)) {
// // // //               score += depth * 6;
// // // //               break;
// // // //             }
// // // //           }
  
// // // //           // Tail bias (escape routes)
// // // //           let myTail = myBody[myBody.length - 1];
// // // //           if (
// // // //             (myHead.x < myTail.x && move == "right") ||
// // // //             (myHead.x > myTail.x && move == "left") ||
// // // //             (myHead.y < myTail.y && move == "up") ||
// // // //             (myHead.y > myTail.y && move == "down")
// // // //           ) {
// // // //             score += 300;
// // // //           }
  
// // // //           // Exit count (escape options from that tile)
// // // //           let exitCount = countExits(nextPos).count;
// // // //           score += exitCount * 12;
  
// // // //           // Flood fill (how much space after move)
// // // //           let floodSpace = floodFill(nextPos, 0, new Set());
// // // //           score += floodSpace * 2; // risky = more lenient
  
// // // //           if (score > bestRiskyScore) {
// // // //             bestRiskyScore = score;
// // // //             bestRiskyMove = move;
// // // //           }
// // // //         }
  
// // // //         console.log(
// // // //           `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Using fallback (2) risky move: ${bestRiskyMove} (score: ${bestRiskyScore})`
// // // //         );
// // // //         return { move: bestRiskyMove || riskyOptions[0] };
// // // //       }
// // // //       const allDirections = ["up", "down", "left", "right"];
// // // //       for (let dir of allDirections) {
// // // //         let nextPos = getNextPosition(myHead, dir);
// // // //         if (
// // // //           nextPos.x >= 0 &&
// // // //           nextPos.x < gameState.board.width &&
// // // //           nextPos.y >= 0 &&
// // // //           nextPos.y < gameState.board.height
// // // //         ) {
// // // //           let hitSelf = false;
// // // //           for (let i = 0; i < myBody.length - 1; i++) {
// // // //             if (nextPos.x == myBody[i].x && nextPos.y == myBody[i].y) {
// // // //               hitSelf = true;
// // // //               break;
// // // //             }
// // // //           }
// // // //           if (!hitSelf) {
// // // //             console.log(
// // // //               `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Last resort move: ${dir}`
// // // //             );
// // // //             return { move: dir };
// // // //           }
// // // //         }
// // // //       }
// // // //       const randomDir =
// // // //         allDirections[Math.floor(Math.random() * allDirections.length)];
// // // //       console.log(
// // // //         `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - No valid moves, using random direction: ${randomDir}`
// // // //       );
// // // //       return { move: randomDir };
// // // //     }
  
// // // //     //  floodFill and countExits functions
// // // //     function floodFill(pos, depth, visited, limit = 30) {
// // // //       const key = `${pos.x},${pos.y}`;
// // // //       if (visited.has(key) || depth > limit) return 0;
// // // //       visited.add(key);
  
// // // //       // Out of bounds
// // // //       if (
// // // //         pos.x < 0 ||
// // // //         pos.x >= gameState.board.width ||
// // // //         pos.y < 0 ||
// // // //         pos.y >= gameState.board.height
// // // //       )
// // // //         return 0;
  
// // // //       // Check if the tile is occupied by any body
// // // //       for (let snake of gameState.board.snakes) {
// // // //         for (let i = 0; i < snake.body.length; i++) {
// // // //           const segment = snake.body[i];
// // // //           if (segment.x == pos.x && segment.y == pos.y) return 0;
// // // //         }
// // // //       }
  
// // // //       // Avoid tiles enemy heads might move into
// // // //       const dangerousTiles = getEnemyHeadNextMoves();
// // // //       for (let danger of dangerousTiles) {
// // // //         if (danger.x == pos.x && danger.y == pos.y) return 0;
// // // //       }
  
// // // //       let space = 1;
// // // //       for (let dx of [-1, 1]) {
// // // //         space += floodFill(
// // // //           { x: pos.x + dx, y: pos.y },
// // // //           depth + 1,
// // // //           visited,
// // // //           limit
// // // //         );
// // // //       }
// // // //       for (let dy of [-1, 1]) {
// // // //         space += floodFill(
// // // //           { x: pos.x, y: pos.y + dy },
// // // //           depth + 1,
// // // //           visited,
// // // //           limit
// // // //         );
// // // //       }
// // // //       return space;
// // // //     }
  
// // // //     function countExits(pos, myLength) {
// // // //       const directions = {
// // // //         up: { x: pos.x, y: pos.y + 1 },
// // // //         down: { x: pos.x, y: pos.y - 1 },
// // // //         left: { x: pos.x - 1, y: pos.y },
// // // //         right: { x: pos.x + 1, y: pos.y },
// // // //       };
  
// // // //       const enemyHeadMoves = getEnemyHeadNextMoves(myLength);
// // // //       let scores = {};
// // // //       let count = 0;
  
// // // //       for (let dir in directions) {
// // // //         const p = directions[dir];
// // // //         let isSafe = true;
  
// // // //         // Check board boundaries
// // // //         if (
// // // //           p.x < 0 ||
// // // //           p.x > gameState.board.width - 1 ||
// // // //           p.y < 0 ||
// // // //           p.y > gameState.board.height - 1
// // // //         ) {
// // // //           isSafe = false;
// // // //         }
  
// // // //         // Check bodies
// // // //         if (isSafe) {
// // // //           for (let snake of gameState.board.snakes) {
// // // //             for (let segment of snake.body) {
// // // //               if (segment.x == p.x && segment.y == p.y) {
// // // //                 isSafe = false;
// // // //                 break;
// // // //               }
// // // //             }
// // // //             if (!isSafe) break;
// // // //           }
// // // //         }
  
// // // //         // Check if an enemy might move there next
// // // //         if (isSafe) {
// // // //           for (let danger of enemyHeadMoves) {
// // // //             if (danger.x == p.x && danger.y == p.y) {
// // // //               isSafe = false;
// // // //               break;
// // // //             }
// // // //           }
// // // //         }
  
// // // //         scores[dir] = isSafe ? 1 : 0;
// // // //         if (isSafe) count += 1;
// // // //       }
  
// // // //       return { scores, count };
// // // //     }
  
// // // //     function getEnemyHeadNextMoves(myLength = 0) {
// // // //       const dangerTiles = [];
  
// // // //       for (let snake of gameState.board.snakes) {
// // // //         if (snake.id == gameState.you.id) continue; // Skip yourself
  
// // // //         // Mark snakes of equal or greater length as dangerous
// // // //         const isDangerous = snake.body.length >= myLength;
// // // //         if (!isDangerous) continue;
  
// // // //         const head = snake.body[0];
// // // //         const possibleMoves = [
// // // //           { x: head.x + 1, y: head.y },
// // // //           { x: head.x - 1, y: head.y },
// // // //           { x: head.x, y: head.y + 1 },
// // // //           { x: head.x, y: head.y - 1 },
// // // //         ];
  
// // // //         for (let move of possibleMoves) {
// // // //           // Ignore out-of-bounds
// // // //           if (
// // // //             move.x >= 0 &&
// // // //             move.x < gameState.board.width &&
// // // //             move.y >= 0 &&
// // // //             move.y < gameState.board.height
// // // //           ) {
// // // //             dangerTiles.push(move);
// // // //           }
// // // //         }
// // // //       }
  
// // // //       return dangerTiles;
// // // //     }
// // // //   }
  
// // // //   // checking for dead ends and enemy movement
// // // //   function futureSense(move, gameState, depth) {
// // // //     if (depth <= 0) {
// // // //       // base case
// // // //       return true;
// // // //     }
  
// // // //     let newGameState = JSON.parse(JSON.stringify(gameState));
// // // //     let mySnake = newGameState.you;
// // // //     let myBody = mySnake.body;
  
// // // //     let newHead = { ...myBody[0] }; // clone so it can't be changed
// // // //     if (move == "up") {
// // // //       newHead.y += 1;
// // // //     } else if (move == "down") {
// // // //       newHead.y -= 1;
// // // //     } else if (move == "left") {
// // // //       newHead.x -= 1;
// // // //     } else if (move == "right") {
// // // //       newHead.x += 1;
// // // //     }
  
// // // //     myBody.unshift(newHead);
// // // //     if (
// // // //       newHead.x < 0 ||
// // // //       newHead.x > newGameState.board.width - 1 ||
// // // //       newHead.y < 0 ||
// // // //       newHead.y > newGameState.board.height - 1
// // // //     ) {
// // // //       return false;
// // // //     }
// // // //     let x = 1;
// // // //     if (mySnake.health == 100) {
// // // //       x = 0;
// // // //     }
// // // //     mySnake.health -= 1;
// // // //     for (let i = 1; i < myBody.length - 1; i++) {
// // // //       if (newHead.x == myBody[i].x && newHead.y == myBody[i].y) {
// // // //         return false;
// // // //       }
// // // //     }
  
// // // //     for (let snake of newGameState.board.snakes) {
// // // //       if (snake.id == mySnake.id) continue;
  
// // // //       let enemyHead = snake.body[0];
// // // //       let possibleEnemyMoves = [];
  
// // // //       let directions = [
// // // //         { move: "up", x: enemyHead.x, y: enemyHead.y + 1 },
// // // //         { move: "down", x: enemyHead.x, y: enemyHead.y - 1 },
// // // //         { move: "left", x: enemyHead.x - 1, y: enemyHead.y },
// // // //         { move: "right", x: enemyHead.x + 1, y: enemyHead.y },
// // // //       ];
  
// // // //       for (let dir of directions) {
// // // //         if (
// // // //           dir.x < 0 ||
// // // //           dir.x > newGameState.board.width ||
// // // //           dir.y < 0 ||
// // // //           dir.y > newGameState.board.height
// // // //         ) {
// // // //           continue;
// // // //         }
// // // //         let hitBody = false;
// // // //         for (let i = 0; i < snake.body.length - 1; i++) {
// // // //           if (dir.x == snake.body[i].x && dir.y == snake.body[i].y) {
// // // //             hitBody = true;
// // // //             break;
// // // //           }
// // // //         }
// // // //         if (!hitBody) {
// // // //           possibleEnemyMoves.push(dir);
// // // //         }
// // // //       }
// // // //       if (possibleEnemyMoves.length == 0) continue;
  
// // // //       let randomMove =
// // // //         possibleEnemyMoves[Math.floor(Math.random() * possibleEnemyMoves.length)];
  
// // // //       snake.body.unshift({ x: randomMove.x, y: randomMove.y });
// // // //       if (snake.health != 100) {
// // // //         snake.body.pop();
// // // //       }
// // // //     }
  
// // // //     for (let snake of newGameState.board.snakes) {
// // // //       if (snake.id == mySnake.id) continue;
  
// // // //       if (snake.body.length > 0) {
// // // //         let enemyHead = snake.body[0];
// // // //         if (newHead.x == enemyHead.x && newHead.y == enemyHead.y) {
// // // //           if (myBody.length <= snake.body.length) {
// // // //             return false;
// // // //           }
// // // //         }
// // // //       }
// // // //       for (let i = 0; i < snake.body.length - 1; i++) {
// // // //         if (newHead.x == snake.body[i].x && newHead.y == snake.body[i].y) {
// // // //           return false;
// // // //         }
// // // //       }
// // // //     }
// // // //     let nextMoves = ["up", "down", "left", "right"];
// // // //     for (let nextMove of nextMoves) {
// // // //       if (futureSense(nextMove, newGameState, depth - 1)) {
// // // //         return true;
// // // //       }
// // // //     }
// // // //     return false;
// // // //   }
  
// // // //   function isValidMove(gameState, move) {
// // // //     const head = gameState.you.head;
// // // //     const boardWidth = gameState.board.width;
// // // //     const boardHeight = gameState.board.height;
  
// // // //     let newPos = { x: head.x, y: head.y };
  
// // // //     if (move == "up") {
// // // //       newPos.y += 1;
// // // //     } else if (move == "down") {
// // // //       newPos.y -= 1;
// // // //     } else if (move == "left") {
// // // //       newPos.x -= 1;
// // // //     } else if (move == "right") {
// // // //       newPos.x += 1;
// // // //     }
// // // //     if (
// // // //       newPos.x < 0 ||
// // // //       newPos.x >= boardWidth ||
// // // //       newPos.y < 0 ||
// // // //       newPos.y >= boardHeight
// // // //     ) {
// // // //       return false;
// // // //     }
  
// // // //     return true;
// // // //   }
  
// // // //   function penalizeHeadProximity(moveScores, myHead, gameState) {
// // // //     const myLength = gameState.you.body.length;
  
// // // //     for (const move in moveScores) {
// // // //       let nextPos = getNextPosition(myHead, move);
// // // //       for (const snake of gameState.board.snakes) {
// // // //         if (snake.id == gameState.you.id) continue;
  
// // // //         const enemyHead = snake.body[0];
// // // //         const enemyLength = snake.body.length;
// // // //         const distance =
// // // //           Math.abs(nextPos.x - enemyHead.x) + Math.abs(nextPos.y - enemyHead.y);
// // // //         let sizePenalty = 1;
// // // //         if (enemyLength >= myLength) {
// // // //           sizePenalty = 2.5;
// // // //         } else {
// // // //           sizePenalty = 0.5;
// // // //         }
// // // //         // Determine penalty based on distance
// // // //         if (distance <= 1) {
// // // //           moveScores[move] -= 200 * sizePenalty;
// // // //         } else if (distance == 2) {
// // // //           moveScores[move] -= 100 * sizePenalty;
// // // //         } else if (distance == 3) {
// // // //           moveScores[move] -= 50 * sizePenalty;
// // // //         } else if (distance <= 5) {
// // // //           moveScores[move] -= 20 * sizePenalty;
// // // //         }
// // // //       }
// // // //     }
  
// // // //     return moveScores;
// // // //   }
  
// // // //   function huntSmallerSnakes(gameState, myHead, myLength, myHealth, moveScores) {
// // // //     if (myLength < 5 || myHealth < 50) return moveScores;
  
// // // //     for (let snake of gameState.board.snakes) {
// // // //       if (snake.id == gameState.you.id) continue;
  
// // // //       const enemyHead = snake.body[0];
// // // //       const enemyLength = snake.body.length;
  
// // // //       if (myLength > enemyLength) {
// // // //         const distance =
// // // //           Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
  
// // // //         const sizeDiff = myLength - enemyLength;
// // // //         const huntBonus = Math.min(sizeDiff * 10, 50);
  
// // // //         if (distance <= 5) {
// // // //           moveScores.right =
// // // //             enemyHead.x > myHead.x
// // // //               ? moveScores.right + 400 + huntBonus
// // // //               : moveScores.right;
// // // //           moveScores.left =
// // // //             enemyHead.x < myHead.x
// // // //               ? moveScores.left + 400 + huntBonus
// // // //               : moveScores.left;
// // // //           moveScores.up =
// // // //             enemyHead.y > myHead.y
// // // //               ? moveScores.up + 400 + huntBonus
// // // //               : moveScores.up;
// // // //           moveScores.down =
// // // //             enemyHead.y < myHead.y
// // // //               ? moveScores.down + 400 + huntBonus
// // // //               : moveScores.down;
// // // //         } else if (distance <= 8) {
// // // //           moveScores.right =
// // // //             enemyHead.x > myHead.x
// // // //               ? moveScores.right + 200 + huntBonus
// // // //               : moveScores.right;
// // // //           moveScores.left =
// // // //             enemyHead.x < myHead.x
// // // //               ? moveScores.left + 200 + huntBonus
// // // //               : moveScores.left;
// // // //           moveScores.up =
// // // //             enemyHead.y > myHead.y
// // // //               ? moveScores.up + 200 + huntBonus
// // // //               : moveScores.up;
// // // //           moveScores.down =
// // // //             enemyHead.y < myHead.y
// // // //               ? moveScores.down + 200 + huntBonus
// // // //               : moveScores.down;
// // // //         } else if (distance <= 10 && sizeDiff > 2) {
// // // //           moveScores.right =
// // // //             enemyHead.x > myHead.x ? moveScores.right + 50 : moveScores.right;
// // // //           moveScores.left =
// // // //             enemyHead.x < myHead.x ? moveScores.left + 50 : moveScores.left;
// // // //           moveScores.up =
// // // //             enemyHead.y > myHead.y ? moveScores.up + 50 : moveScores.up;
// // // //           moveScores.down =
// // // //             enemyHead.y < myHead.y ? moveScores.down + 50 : moveScores.down;
// // // //         }
// // // //       }
// // // //     }
  
// // // //     return moveScores;
// // // //   }
  
// // // //   function centerControlStrategy(gameState, myHead, moveScores) {
// // // //     if (gameState.turn > 100) return moveScores;
  
// // // //     const centerX = Math.floor(gameState.board.width / 2);
// // // //     const centerY = Math.floor(gameState.board.height / 2);
  
// // // //     const distanceToCenter =
// // // //       Math.abs(myHead.x - centerX) + Math.abs(myHead.y - centerY);
  
// // // //     if (distanceToCenter <= 2) return moveScores;
  
// // // //     const moveTowardsCenter = {
// // // //       right: myHead.x < centerX,
// // // //       left: myHead.x > centerX,
// // // //       up: myHead.y < centerY,
// // // //       down: myHead.y > centerY,
// // // //     };
  
// // // //     for (let dir in moveTowardsCenter) {
// // // //       if (moveTowardsCenter[dir]) {
// // // //         moveScores[dir] = moveScores[dir] || 0;
// // // //         moveScores[dir] += 500;
// // // //       }
// // // //     }
  
// // // //     return moveScores;
// // // //   }
  
// // // //   function findBestFood(snakeHead, foodLocations, gameState) {
// // // //     let foodScores = [];
// // // //     const myLength = gameState.you.body.length;
// // // //     const myHealth = gameState.you.health;
// // // //     const isStarving = myHealth < 31; // threshold
  
// // // //     // Check if we're currently in a hazard
// // // //     const inHazard = gameState.board.hazards.some(
// // // //       (haz) => haz.x === snakeHead.x && haz.y === snakeHead.y
// // // //     );
  
// // // //     if (!foodLocations || foodLocations.length == 0) return null;
  
// // // //     // First pass: find all reachable food
// // // //     for (let food of foodLocations) {
// // // //       const pathLength = bfsPathLength(snakeHead, food, gameState);
// // // //       if (pathLength === -1) continue;
  
// // // //       let isInHazard = gameState.board.hazards.some(
// // // //         (haz) => food.x === haz.x && food.y === haz.y
// // // //       );
  
// // // //       if (isInHazard && !isStarving && !inHazard) continue;
  
// // // //       let score = 100 - pathLength * 5;
  
// // // //       const myDistance =
// // // //         Math.abs(snakeHead.x - food.x) + Math.abs(snakeHead.y - food.y);
  
// // // //       for (let snake of gameState.board.snakes) {
// // // //         if (snake.id == gameState.you.id) continue;
  
// // // //         const enemyHead = snake.body[0];
// // // //         const enemyDistance =
// // // //           Math.abs(enemyHead.x - food.x) + Math.abs(enemyHead.y - food.y);
  
// // // //         if (enemyDistance < myDistance) {
// // // //           if (snake.body.length > myLength) {
// // // //             score -= 200;
// // // //           }
// // // //         }
// // // //       }
  
// // // //       foodScores.push({ food, score, isInHazard, pathLength });
// // // //     }
  
// // // //     // If we're in hazard and can't reach safe area in 2 moves, prioritize closest food
// // // //     if (inHazard) {
// // // //       let canReachSafeIn2Moves = canReachSafeAreaInMoves(snakeHead, gameState, 2);
// // // //       if (gameState.you.health < 31) {
// // // //         canReachSafeIn2Moves = canReachSafeAreaInMoves(snakeHead, gameState, 1);
// // // //       }
// // // //       if (!canReachSafeIn2Moves && foodScores.length > 0) {
// // // //         foodScores.sort((a, b) => a.pathLength - b.pathLength);
// // // //         return foodScores[0].food;
// // // //       }
// // // //     }
  
// // // //     if (foodScores.length == 0) {
// // // //       if (isStarving) {
// // // //         for (let food of foodLocations) {
// // // //           const pathLength = bfsPathLength(snakeHead, food, gameState);
// // // //           if (pathLength === -1) continue;
  
// // // //           let isInHazard = gameState.board.hazards.some(
// // // //             (haz) => food.x === haz.x && food.y === haz.y
// // // //           );
  
// // // //           if (isInHazard) {
// // // //             let score = 100 - pathLength * 5 - 50;
// // // //             foodScores.push({ food, score, isInHazard, pathLength });
// // // //           }
// // // //         }
// // // //       }
// // // //       if (foodScores.length === 0) return null;
// // // //     }
  
// // // //     foodScores.sort((a, b) => {
// // // //       if (a.isInHazard && !b.isInHazard) return 1;
// // // //       if (!a.isInHazard && b.isInHazard) return -1;
// // // //       return b.score - a.score;
// // // //     });
  
// // // //     return foodScores[0].food;
// // // //   }
  
// // // //   // Helper function to check if we can reach a safe area within some moves
// // // //   function canReachSafeAreaInMoves(start, gameState, maxMoves) {
// // // //     const { width, height } = gameState.board;
// // // //     const visited = new Set();
// // // //     const queue = [{ pos: start, dist: 0 }];
  
// // // //     const key = (x, y) => `${x},${y}`;
  
// // // //     const isSafe = (x, y) => {
// // // //       if (x < 0 || x >= width || y < 0 || y >= height) return false;
  
// // // //       const isHazardFree = !gameState.board.hazards.some(
// // // //         (haz) => haz.x === x && haz.y === y
// // // //       );
  
// // // //       const isSnakeFree = !gameState.board.snakes.some((snake) =>
// // // //         snake.body.some((segment) => segment.x === x && segment.y === y)
// // // //       );
  
// // // //       return isHazardFree && isSnakeFree;
// // // //     };
  
// // // //     while (queue.length > 0) {
// // // //       const { pos, dist } = queue.shift();
// // // //       const k = key(pos.x, pos.y);
// // // //       if (visited.has(k)) continue;
// // // //       visited.add(k);
  
// // // //       if (dist <= maxMoves) {
// // // //         const isCurrentHazard = gameState.board.hazards.some(
// // // //           (haz) => haz.x === pos.x && haz.y === pos.y
// // // //         );
// // // //         if (!isCurrentHazard) {
// // // //           return true;
// // // //         }
// // // //       } else {
// // // //         return false;
// // // //       }
  
// // // //       for (const [dx, dy] of [
// // // //         [0, 1],
// // // //         [1, 0],
// // // //         [-1, 0],
// // // //         [0, -1],
// // // //       ]) {
// // // //         const nx = pos.x + dx;
// // // //         const ny = pos.y + dy;
// // // //         if (isSafe(nx, ny)) {
// // // //           queue.push({ pos: { x: nx, y: ny }, dist: dist + 1 });
// // // //         }
// // // //       }
// // // //     }
  
// // // //     return false;
// // // //   }
  
// // // //   function bfsPathLength(start, goal, gameState) {
// // // //     const { width, height } = gameState.board;
// // // //     const visited = new Set();
// // // //     const queue = [{ pos: start, dist: 0 }];
  
// // // //     const key = (x, y) => `${x},${y}`;
  
// // // //     const isSafe = (x, y) => {
// // // //       if (x < 0 || x >= width || y < 0 || y >= height) return false;
  
// // // //       for (const snake of gameState.board.snakes) {
// // // //         for (const segment of snake.body) {
// // // //           if (segment.x === x && segment.y === y) {
// // // //             if (segment.x === goal.x && segment.y === goal.y) continue; // allow goal
// // // //             return false;
// // // //           }
// // // //         }
// // // //       }
// // // //       return true;
// // // //     };
  
// // // //     while (queue.length > 0) {
// // // //       const { pos, dist } = queue.shift();
// // // //       const k = key(pos.x, pos.y);
// // // //       if (visited.has(k)) continue;
// // // //       visited.add(k);
  
// // // //       if (pos.x === goal.x && pos.y === goal.y) return dist;
  
// // // //       for (const [dx, dy] of [
// // // //         [0, 1],
// // // //         [1, 0],
// // // //         [-1, 0],
// // // //         [0, -1],
// // // //       ]) {
// // // //         const nx = pos.x + dx;
// // // //         const ny = pos.y + dy;
// // // //         if (isSafe(nx, ny)) {
// // // //           queue.push({ pos: { x: nx, y: ny }, dist: dist + 1 });
// // // //         }
// // // //       }
// // // //     }
  
// // // //     return -1; // unreachable
// // // //   }
  
// // // //   function avoidTailsAboutToEat(gameState, myHead, moveScores) {
// // // //     const myNextPositions = {
// // // //       up: { x: myHead.x, y: myHead.y + 1 },
// // // //       down: { x: myHead.x, y: myHead.y - 1 },
// // // //       left: { x: myHead.x - 1, y: myHead.y },
// // // //       right: { x: myHead.x + 1, y: myHead.y },
// // // //     };
  
// // // //     for (const snake of gameState.board.snakes) {
// // // //       if (snake.id == gameState.you.id) continue;
// // // //       const enemyHead = snake.body[0];
// // // //       const enemyTail = snake.body[snake.body.length - 1];
// // // //       let aboutToEat = false;
// // // //       const enemyNextMoves = [
// // // //         { x: enemyHead.x + 1, y: enemyHead.y },
// // // //         { x: enemyHead.x - 1, y: enemyHead.y },
// // // //         { x: enemyHead.x, y: enemyHead.y + 1 },
// // // //         { x: enemyHead.x, y: enemyHead.y - 1 },
// // // //       ];
// // // //       for (const food of gameState.board.food) {
// // // //         for (const nextMove of enemyNextMoves) {
// // // //           if (nextMove.x == food.x && nextMove.y == food.y) {
// // // //             aboutToEat = true;
// // // //             break;
// // // //           }
// // // //         }
// // // //         if (aboutToEat) break;
// // // //       }
// // // //       if (aboutToEat) {
// // // //         for (const [direction, nextPos] of Object.entries(myNextPositions)) {
// // // //           if (nextPos.x == enemyTail.x && nextPos.y == enemyTail.y) {
// // // //             moveScores[direction] -= 300;
// // // //             console.log(
// // // //               `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Avoiding move ${direction} - enemy about to eat, tail won't move!`
// // // //             );
// // // //           }
// // // //         }
// // // //       }
// // // //     }
  
// // // //     return moveScores;
// // // //   }
  
// // // //   function enemyTrapped(gameState, moveScores) {
// // // //     const myHead = gameState.you.body[0];
// // // //     const myLength = gameState.you.body.length;
// // // //     const board = gameState.board;
  
// // // //     const directions = [
// // // //       { name: "up", dx: 0, dy: -1 },
// // // //       { name: "down", dx: 0, dy: 1 },
// // // //       { name: "left", dx: -1, dy: 0 },
// // // //       { name: "right", dx: 1, dy: 0 },
// // // //     ];
  
// // // //     const isOccupied = (x, y) => {
// // // //       for (const snake of board.snakes) {
// // // //         for (const segment of snake.body) {
// // // //           if (segment.x === x && segment.y === y) return true;
// // // //         }
// // // //       }
// // // //       return false;
// // // //     };
  
// // // //     const inBounds = (x, y) =>
// // // //       x >= 0 && x < board.width && y >= 0 && y < board.height;
  
// // // //     for (const enemy of board.snakes) {
// // // //       if (enemy.id === gameState.you.id) continue;
// // // //       const head = enemy.body[0];
// // // //       const nearWall =
// // // //         head.x === 0 ||
// // // //         head.x === board.width - 1 ||
// // // //         head.y === 0 ||
// // // //         head.y === board.height - 1;
  
// // // //       if (!nearWall) continue;
  
// // // //       let escapeRoutes = 0;
// // // //       let lastOpenDir = null;
  
// // // //       for (const dir of directions) {
// // // //         const nx = head.x + dir.dx;
// // // //         const ny = head.y + dir.dy;
  
// // // //         if (!inBounds(nx, ny)) continue;
// // // //         if (!isOccupied(nx, ny)) {
// // // //           escapeRoutes++;
// // // //           lastOpenDir = dir;
// // // //         }
// // // //       }
  
// // // //       if (escapeRoutes === 1 && lastOpenDir) {
// // // //         // Check if your head is pushing into that single tile
// // // //         const yourNextToThatTile =
// // // //           myHead.x === head.x + lastOpenDir.dx &&
// // // //           myHead.y === head.y + lastOpenDir.dy;
  
// // // //         if (yourNextToThatTile) {
// // // //           moveScores[lastOpenDir.name] =
// // // //             (moveScores[lastOpenDir.name] || 0) + 1500;
// // // //         }
// // // //       }
// // // //     }
  
// // // //     return moveScores;
// // // //   }


// // // export default function move(game) {
// // //   const gameState = game;
// // //   const myHead = gameState.you.body[0];
// // //   const myTail = gameState.you.body[gameState.you.body.length - 1];
// // //   const headNode = getNodeId(myHead, gameState);

// // //   let board = {};
// // //   let c = 0;
// // //   for (let y = 0; y < gameState.board.height; y++) {
// // //       for (let x = 0; x < gameState.board.width; x++) {
// // //           board[c] = { position: { x, y }, connections: [], id: c };
// // //           c++;
// // //       }
// // //   }
// // //   board = connectNodes(gameState, board);

// // //   const enemySnakes = gameState.board.snakes.filter(s => s.id !== gameState.you.id);
// // //   const largestEnemy = enemySnakes.reduce((biggest, s) => s.body.length > biggest.body.length ? s : biggest, { body: [] });
// // //   const is1v1 = enemySnakes.length === 1;
// // //   const riskFactor = is1v1 ? 1.5 : 1.0;
// // //   const aggressiveMode = gameState.you.body.length < largestEnemy.body.length + 5;
// // //   const inHazard = isHazard(myHead, gameState);
// // //   const isHungry = aggressiveMode || gameState.you.health < 60 || inHazard;

// // //   let spaceWeight = 1.2;
// // //   let predictedWeight = 0.25;
// // //   const turn = gameState.turn;
// // //   const boardArea = gameState.board.height * gameState.board.width;

// // //   const predictionDepth = is1v1 && turn > 150 ? 3 : 2;
// // //   const futureEnemyZones = predictEnemyZones(gameState, predictionDepth);

// // //   if (turn < 80 && boardArea > 100) {
// // //       spaceWeight = 1.3;
// // //       predictedWeight = 0.4;
// // //   } else if (is1v1 && turn > 200 && gameState.you.health < 75) {
// // //       spaceWeight = 1.1;
// // //       predictedWeight = 0.2;
// // //   } else if (isHungry && boardArea < 100) {
// // //       spaceWeight = 0.8;
// // //       predictedWeight = 0.1;
// // //   } else if (checkEnclosure(board, headNode, gameState)) {
// // //       spaceWeight = 1.6;
// // //       predictedWeight = 0.5;
// // //   }

// // //   let targetNode;
// // //   if (isHungry && gameState.board.food.length > 0) {
// // //       targetNode = nearestFood(gameState, board, myHead, myHead);
// // //   } else {
// // //       const boxingNode = boxEnemyInCorner(gameState, board);
// // //       targetNode = boxingNode || getNodeId(myTail, gameState);

// // //       const tailNode = getNodeId(myTail, gameState);
// // //       const tailPath = aStar(board, headNode, tailNode);
// // //       const reachableTail = bfs(board, tailNode);

// // //       if (tailPath.path.length > 1 && reachableTail > gameState.you.body.length * 1.2) {
// // //           targetNode = tailNode;
// // //       }
// // //   }
// // //   // Trap setting strategy in 1v1 situations
// // //   if (is1v1 && turn > 75) {
// // //       const enemy = enemySnakes[0];
// // //       const enemyHead = enemy.body[0];
// // //       const enemyTail = enemy.body[enemy.body.length - 1];
// // //       const enemyTailNode = getNodeId(enemyTail, gameState);
// // //       const myPathToTail = aStar(board, headNode, enemyTailNode);
// // //       const myReachableTailSpace = enemyTailNode ? bfs(board, enemyTailNode) : 0;
    
// // //       // Priority 1: Cut off enemy tail if they're in a tight area
// // //       if (myPathToTail.path.length > 1 && myReachableTailSpace < 20) {
// // //           console.log(`[TRAP] Closing in on enemy tail at (${enemyTail.x}, ${enemyTail.y})`);
// // //           targetNode = enemyTailNode;
// // //       }
// // //       // Priority 2: Intercept likely escape tiles if enemy is near wall or corner
// // //       const enemyNearWall = (
// // //           enemyHead.x <= 1 || enemyHead.x >= gameState.board.width - 2 ||
// // //           enemyHead.y <= 1 || enemyHead.y >= gameState.board.height - 2
// // //       );
// // //       if (enemyNearWall) {
// // //           const seen = new Set();
// // //           const queue = [{ pos: enemyHead, depth: 0 }];
// // //           const escapeOptions = [];
    
// // //           while (queue.length > 0) {
// // //               const { pos, depth } = queue.shift();
// // //               const key = `${pos.x},${pos.y}`;
// // //               if (seen.has(key) || depth > 2) continue;
// // //               seen.add(key);
    
// // //               if (depth > 0 && isTileEmpty(pos, gameState)) {
// // //                   escapeOptions.push(pos);
// // //               }
    
// // //               for (const move of ['up', 'down', 'left', 'right']) {
// // //                   const next = getNextPosition(pos, move);
// // //                   if (
// // //                       next.x >= 0 && next.x < gameState.board.width &&
// // //                       next.y >= 0 && next.y < gameState.board.height
// // //                   ) {
// // //                       queue.push({ pos: next, depth: depth + 1 });
// // //                   }
// // //               }
// // //           }
     
// // //           // Optional: prioritize closest escape tiles first
// // //           escapeOptions.sort((a, b) => {
// // //               const aNode = getNodeId(a, gameState);
// // //               const bNode = getNodeId(b, gameState);
// // //               return aStar(board, headNode, aNode).path.length - aStar(board, headNode, bNode).path.length;
// // //           });
      
// // //           for (const escapePos of escapeOptions) {
// // //               const escapeNode = getNodeId(escapePos, gameState);
// // //               const pathToEscape = aStar(board, headNode, escapeNode);
// // //               if (pathToEscape.path.length > 0 && pathToEscape.path.length <= 6) {
// // //                   console.log(`[TRAP] Intercepting enemy escape route at (${escapePos.x}, ${escapePos.y})`);
// // //                   targetNode = escapeNode;
// // //                   break;
// // //               }
// // //           }
// // //       }
// // //   }
      
// // //   if (checkEnclosure(board, headNode, gameState)) {
// // //       const escape = findClosestOpening(gameState, board, headNode);
// // //       if (escape) targetNode = escape.opening || targetNode;
// // //   }
  
// // //   let path = aStar(board, headNode, targetNode);
// // //   if (!path || !path.path || path.path.length < 2 || detectLoopTrap(path.path, board, gameState)) {
// // //       const tailNode = getNodeId(myTail, gameState);
// // //       const tailPath = aStar(board, headNode, tailNode);
// // //       if (tailPath.path.length > 1 && !detectLoopTrap(tailPath.path, board, gameState)) {
// // //           path = tailPath;
// // //       }
// // //   }
  
// // //   function pathSpaceEvaluation(path) {
// // //       if (!path || path.length === 0) return 0;
// // //       const lastNode = path[path.length - 1];
// // //       return bfs(board, lastNode);
// // //   }
  
// // //   function forkFlexibility(node) {
// // //       return board[node].connections.length;
// // //   }
  
// // //   const allMoves = ['up', 'down', 'left', 'right'];
// // //   const safeMoves = allMoves.filter(move => isMoveSafe(move, gameState));
// // //   const riskyMoves = allMoves.filter(move => !isHeadOnRisk(move, gameState));
// // //   const superSafeMoves = safeMoves.filter(move => riskyMoves.includes(move));
// // //   const validMoves = superSafeMoves.filter(move => isMoveSafe(move, gameState));
// // //   const escapeHazardMoves = superSafeMoves.filter(move => {
// // //       const nextPos = getNextPosition(myHead, move);
// // //       return !isHazard(nextPos, gameState) && isMoveSafe(move, gameState);
// // //   })
  
// // //   const avoidMoves = new Set();
// // //   for (const enemy of enemySnakes) {
// // //       const enemyHead = enemy.body[0];
// // //       const enemyNexts = ['up', 'down', 'left', 'right'].map(d => getNextPosition(enemyHead, d));
// // //       for (const pos of enemyNexts) {
// // //           if (pos.x === myHead.x + 1 && pos.y === myHead.y) avoidMoves.add('right');
// // //           if (pos.x === myHead.x - 1 && pos.y === myHead.y) avoidMoves.add('left');
// // //           if (pos.x === myHead.x && pos.y === myHead.y + 1) avoidMoves.add('up');
// // //           if (pos.x === myHead.x && pos.y === myHead.y - 1) avoidMoves.add('down');
// // //       }
// // //   }

// // //   const filteredMoves = validMoves.filter(move => !avoidMoves.has(move));

// // //   function getForkBias(state) {
// // //       const turn = state.turn;
// // //       const snakes = state.board.snakes;
// // //       const mySnake = state.you;
// // //       const boardArea = state.board.height * state.board.width;
// // //       const enemySnakes = snakes.filter(s => s.id !== mySnake.id);

// // //       const isNow1v1 = snakes.length === 2;
// // //       const isSolo = snakes.length === 1;
// // //       const isEarly = turn < 80;
// // //       const isLate = turn > 225;
// // //       const lowHealth = mySnake.health < 30;
// // //       const isHungryNow = mySnake.health < 60 || mySnake.body.length < 6;
// // //       const isDominant = enemySnakes.every(s => mySnake.body.length > s.body.length + 2);

// // //       if (isSolo) return 0.0;
// // //       if (isNow1v1 && isDominant && mySnake.health > 50) return 0.5;
// // //       if (isEarly) return boardArea > 150 ? 3.5 : 3.0;
// // //       if (lowHealth) return 2.5;
// // //       if (isLate) return 1.0;
// // //       if (isHungryNow) return 3.0;

// // //       return 1.8;
// // //   }

// // //   const forkWeight = getForkBias(gameState);
// // //   console.log(`[DEBUG] Turn ${gameState.turn} | Snakes: ${gameState.board.snakes.length} | Fork Bias: ${forkWeight} | Space Weight: ${spaceWeight} | Predicted Weight: ${predictedWeight}`);
// // //   const predictedSpace = pathSpaceEvaluation(path.path);
// // //   const scoredMoves = filteredMoves.map(move => {
// // //       const neighbor = getNextPosition(myHead, move);
// // //       const neighborNode = getNodeId(neighbor, gameState);

// // //       // Predictive enemy cutoff check
// // //       if (futureEnemyZones.has(`${neighbor.x},${neighbor.y}`)) {
// // //           return { move, score: -Infinity };
// // //       }
// // //       const zone = neighborNode !== undefined ? bfsZoneOwnership(board, neighborNode, gameState) : 0;
// // //       const space = neighborNode !== undefined ? bfs(board, neighborNode) : 0;
// // //       const forks = neighborNode !== undefined ? forkFlexibility(neighborNode) : 0;
// // //       const midPathTrap = detectLoopTrap([headNode, neighborNode], board, gameState);
// // //       const hazardPenalty = isHazard(neighbor, gameState) ? -25 + Math.floor(gameState.you.health / 5) : 0;
// // //       return {
// // //           move,
// // //           score: midPathTrap ? -Infinity : zone * riskFactor + space * spaceWeight + forks * forkWeight * 0.9 + predictedSpace * predictedWeight + hazardPenalty
// // //       };
// // //   }).sort((a, b) => b.score - a.score);
  
// // //   let nextMove = path.path[1] ? calculateNextMove(path.path[1], board, headNode) : null;
// // //   if (inHazard && escapeHazardMoves.length > 0) {
// // //       nextMove = escapeHazardMoves[0];
// // //       console.log(`[Hazard Escape] Escaping via: ${nextMove}`)
// // //   } else if (pathSpaceEvaluation(path.path) < gameState.you.body.length * 1.2 && scoredMoves.length > 0) {
// // //       nextMove = scoredMoves[0].move;
// // //   }
// // //   if (!filteredMoves.includes(nextMove)) {
// // //       if (scoredMoves.length > 0) {
// // //           nextMove = scoredMoves[0].move;
// // //       }
// // //   }

// // //   if (!nextMove || !isMoveSafe(nextMove, gameState)) {
// // //       const emergencyMoves = allMoves.filter(m => isMoveSafe(m, gameState) && !isHazard(getNextPosition(myHead, m), gameState));
// // //       if (emergencyMoves.length > 0) {
// // //           nextMove = emergencyMoves.reduce((best, move) => {
// // //               const pos = getNextPosition(myHead, move);
// // //               const node = getNodeId(pos, gameState);
// // //               const space = node !== undefined ? bfs(board, node) : 0;
// // //               return space > best.space ? { move, space } : best;
// // //           }, { move: null, space: -1 }).move;
// // //       } else {
// // //           nextMove = 'up';
// // //       }
// // //   }

// // //   for (const enemy of enemySnakes) {
// // //       const tail = enemy.body[enemy.body.length - 1];
// // //       const tailNode = getNodeId(tail, gameState);
// // //       const tailPath = aStar(board, headNode, tailNode);
// // //       if (tailPath.path.length > 0 && bfs(board, tailNode) < 20) {
// // //           nextMove = calculateNextMove(tailPath.path[1], board, headNode);
// // //       }
// // //   }

// // //   for (const enemy of enemySnakes) {
// // //       const enemyHead = enemy.body[0];
// // //       const distance = Math.abs(enemyHead.x - myHead.x) + Math.abs(enemyHead.y - myHead.y);
// // //       if (gameState.you.body.length > enemy.body.length && (is1v1 || gameState.you.health > 40)) {
// // //           if (distance <= 2) {
// // //               const attackMove = allMoves.find(move => {
// // //                   const pos = getNextPosition(myHead, move);
// // //                   return pos.x === enemyHead.x && pos.y === enemyHead.y && isMoveSafe(move, gameState);
// // //               });
// // //               if (attackMove) {
// // //                   nextMove = attackMove;
// // //                   break;
// // //               }
// // //           }
// // //       }
// // //   }
// // //   if (!isMoveSafe(nextMove, gameState)) {
// // //       nextMove = safeMoves[0] || 'up';
// // //   }
// // //   console.log(`MOVE ${gameState.turn}: ${nextMove}`);
// // //   return { move: nextMove };
// // // }

// // // function bfsZoneOwnership(board, startNode, gameState) {
// // //   const visited = new Set();
// // //   const queue = [startNode];
// // //   const enemyHeads = gameState.board.snakes.filter(s => s.id !== gameState.you.id).map(s => s.body[0]);
// // //   let myControl = 0;

// // //   while (queue.length > 0) {
// // //       const node = queue.shift();
// // //       if (!visited.has(node)) {
// // //           visited.add(node);
// // //           const pos = board[node].position;
// // //           const enemyNearby = enemyHeads.some(h => Math.abs(h.x - pos.x) + Math.abs(h.y - pos.y) <= 2);
// // //           if (!enemyNearby) myControl++;

// // //           for (const [neighbor] of board[node].connections) {
// // //               if (!visited.has(neighbor)) queue.push(neighbor);
// // //           }
// // //       }
// // //   }
// // //   return myControl;
// // // }
// // // function boxEnemyInCorner(gameState, board) {
// // //   const corners = [
// // //       { x: 0, y: 0 },
// // //       { x: 0, y: gameState.board.height - 1 },
// // //       { x: gameState.board.width - 1, y: 0 },
// // //       { x: gameState.board.width - 1, y: gameState.board.height - 1 }
// // //   ];
// // //   const enemies = gameState.board.snakes.filter(s => s.id !== gameState.you.id);
// // //   for (const corner of corners) {
// // //       for (const enemy of enemies) {
// // //           const eHead = enemy.body[0];
// // //           if (Math.abs(eHead.x - corner.x) <= 3 && Math.abs(eHead.y - corner.y) <= 3) {
// // //               return getNodeId(corner, gameState);
// // //           }
// // //       }
// // //   }
// // //   return null;
// // // }

// // // function detectLoopTrap(path, board, gameState) {
// // //   if (!path || path.length < 3) return false;

// // //   const snakeLength = gameState.you.body.length;
// // //   const lookahead = Math.min(path.length, 5); // Check first few steps
// // //   for (let i = 1; i < lookahead; i++) {
// // //       const node = path[i];
// // //       const reachable = bfs(board, node);
// // //       if (reachable < snakeLength * 1.1) {
// // //           return true; // Trap detected at mid-path node
// // //       }
// // //   }
// // //   const lastNode = path[path.length - 1];
// // //    const finalReachable = bfs(board, lastNode);
// // //   return finalReachable < snakeLength * 1.1;
// // // }

// // // function isHazard(pos, gameState) {
// // //   return gameState.board.hazards.some(h => h.x === pos.x && h.y === pos.y);
// // // }

// // // function isMoveSafe(move, gameState) {
// // //   const myHead = gameState.you.body[0];
// // //   const newHead = getNextPosition(myHead, move);
// // //   if (
// // //       newHead.x < 0 || newHead.x >= gameState.board.width ||
// // //       newHead.y < 0 || newHead.y >= gameState.board.height
// // //   ) {
// // //       return false;
// // //   }
// // //   for (const snake of gameState.board.snakes) {
// // //       for (const segment of snake.body.slice(0, -1)) {
// // //           if (segment.x === newHead.x && segment.y === newHead.y) {
// // //               return false;
// // //           }
// // //       }
// // //   }
// // //   // avoid hazards based on health
// // //   if (isHazard(newHead, gameState) && gameState.you.health < 75) {
// // //       return false;
// // //   }
// // //       return true;
// // // }


// // // function isHeadOnRisk(move, gameState) {
// // //   const myHead = gameState.you.body[0];
// // //   const newHead = getNextPosition(myHead, move);
// // //   for (const snake of gameState.board.snakes) {
// // //       if (snake.id === gameState.you.id) continue;
// // //       const enemyHead = snake.body[0];
// // //       if (snake.body.length >= gameState.you.body.length) {
// // //           if (beside(newHead, enemyHead)) {
// // //               return true;
// // //           }
// // //       }
// // //   }
// // //   return false;
// // // }

// // // function getNextPosition(pos, move) {
// // //   const delta = { up: [0, 1], down: [0, -1], left: [-1, 0], right: [1, 0] };
// // //   return {
// // //       x: pos.x + delta[move][0],
// // //       y: pos.y + delta[move][1]
// // //   };
// // // }
// // // function connectNodes(gameState, board) {
// // //   const snakeBodies = [];
// // //   const snakeHeads = [];
// // //   const food = [];
// // //   const tailNode = getNodeId(gameState.you.body[gameState.you.body.length - 1], gameState);

// // //   for (const snake of gameState.board.snakes) {
// // //       if (snake.id !== gameState.you.id) {
// // //           for (let i = 0; i < snake.body.length - 1; i++) {
// // //               snakeBodies.push(getNodeId(snake.body[i], gameState));
// // //           }
// // //           const head = snake.body[0];
// // //           if (snake.body.length >= gameState.you.body.length) {
// // //               [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
// // //                   snakeHeads.push(getNodeId({ x: head.x + dx, y: head.y + dy }, gameState));
// // //               });
// // //           }
// // //       }
// // //   }

// // //   for (const segment of gameState.you.body) {
// // //       const id = getNodeId(segment, gameState);
// // //       if (id !== tailNode || (gameState.you.health === 100 && beside(gameState.you.body[0], gameState.you.body[gameState.you.body.length - 1]))) {
// // //           snakeBodies.push(id);
// // //       }
// // //   }

// // //   for (const f of gameState.board.food) {
// // //       food.push(getNodeId(f, gameState));
// // //   }

// // //   for (const i in board) {
// // //       for (const j in board) {
// // //           const a = board[i].position;
// // //           const b = board[j].position;
// // //           if (beside(a, b) && !snakeBodies.includes(Number(j))) {
// // //               const pos = board[j].position;
// // //               if (snakeHeads.includes(Number(j))) board[i].connections.push([Number(j), 100]);
// // //               else if (food.includes(Number(j))) board[i].connections.push([Number(j), 5]);
// // //               else if (isHazard(pos, gameState)) board[i].connections.push([Number(j), 2]);
// // //               else board[i].connections.push([Number(j), 1]);
// // //           }
// // //       }
// // //   }
// // //   return board;
// // // }
// // // function aStar(graph, start, target) {
// // //   const open = [{ node: start, f: 0, path: [start] }];
// // //   const gScores = { [start]: 0 };

// // //   while (open.length > 0) {
// // //       open.sort((a, b) => a.f - b.f);
// // //       const current = open.shift();
// // //       if (current.node === target) return { path: current.path, cost: gScores[target] };

// // //       for (const [neighbor, cost] of graph[current.node].connections) {
// // //           const g = gScores[current.node] + cost;
// // //           if (!(neighbor in gScores) || g < gScores[neighbor]) {
// // //               gScores[neighbor] = g;
// // //               const f = g + heuristic(neighbor, target, graph);
// // //               open.push({ node: neighbor, f, path: [...current.path, neighbor] });
// // //           }
// // //       }
// // //   }
// // //   return { path: [], cost: Infinity };
// // // }

// // // function heuristic(a, b, graph) {
// // //   return Math.abs(graph[a].position.x - graph[b].position.x) + Math.abs(graph[a].position.y - graph[b].position.y);
// // // }

// // // function getNodeId(pos, gameState) {
// // //   if (pos.y >= 0 && pos.y < gameState.board.height && pos.x >= 0 && pos.x < gameState.board.width) {
// // //       return pos.y * gameState.board.width + pos.x;
// // //   }
// // //   return undefined;
// // // }

// // // function nearestFood(gameState, board, myHead, start) {
// // //   const foodNodes = gameState.board.food.map(f => getNodeId(f, gameState));
// // //   const safeFood = bfs(board, getNodeId(start, gameState), gameState, foodNodes);
// // //   let best = { dist: Infinity, node: null };
// // //   for (const node of safeFood) {
// // //       const p = aStar(board, getNodeId(myHead, gameState), node);
// // //       if (p.path.length < best.dist && p.cost <= 70) {
// // //           best = { dist: p.path.length, node };
// // //       }
// // //   }
// // //   return best.node || getNodeId(gameState.you.body[gameState.you.body.length - 1], gameState);
// // // }

// // // function predictEnemyZones(gameState, depth = 2) {
// // //   const zones = new Set();
// // //   for (const snake of gameState.board.snakes) {
// // //     if (snake.id === gameState.you.id) continue;
// // //       let currentHeads = [snake.body[0]];
// // //       for (let d = 0; d < depth; d++) {
// // //           const nextHeads = [];
// // //           for (const head of currentHeads) {
// // //             for (const move of ['up', 'down', 'left', 'right']) {
// // //               const next = getNextPosition(head, move);
// // //               if (
// // //                 next.x >= 0 && next.x < gameState.board.width &&
// // //                 next.y >= 0 && next.y < gameState.board.height
// // //               ) {
// // //                 zones.add(`${next.x},${next.y}`);
// // //                 nextHeads.push(next);
// // //                   }
// // //               }
// // //           }
// // //           currentHeads = nextHeads;
// // //         }
// // //       }
// // //       return zones;
// // // }
// // // function checkEnclosure(board, headNode, gameState) {
// // //   const directions = [[0, 1], [0, -1], [-1, 0], [1, 0]];
// // //   return directions.every(([dx, dy]) => {
// // //       const neighbor = getNodeId({ x: board[headNode].position.x + dx, y: board[headNode].position.y + dy }, gameState);
// // //       return neighbor && bfs(board, neighbor) < gameState.you.body.length;
// // //   });
// // // }
// // // function findClosestOpening(gameState, board, headNode) {
// // //   const tailIdx = gameState.you.body.length - 1;
// // //   for (let turn = 0; turn <= tailIdx; turn++) {
// // //       const futureTail = gameState.you.body[tailIdx - turn];
// // //       const node = getNodeId(futureTail, gameState);
// // //       if (aStar(board, headNode, node).path.length > 0) return { opening: node, turns: turn };
// // //   }
// // //   return null;
// // // }
// // // function bfs(graph, start, gameState = undefined, targets = undefined) {
// // //   const visited = new Set();
// // //   const queue = [start];
// // //   let count = 0;
// // //   const foundTargets = [];
// // //   while (queue.length > 0) {
// // //       const node = queue.shift();
// // //       if (!visited.has(node)) {
// // //           visited.add(node);
// // //           count++;
// // //           if (targets && targets.includes(node)) foundTargets.push(node);
// // //           for (const [neighbor] of graph[node].connections) {
// // //               if (!visited.has(neighbor)) queue.push(neighbor);
// // //           }
// // //       }
// // //   }
// // //   return targets ? foundTargets : count;
// // // }
// // // function beside(a, b) {
// // //   return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y)) === 1;
// // // }
// // // function calculateNextMove(target, board, head) {
// // //   const dx = board[target].position.x - board[head].position.x;
// // //   const dy = board[target].position.y - board[head].position.y;
// // //   if (dx === 1) return 'right';
// // //   if (dx === -1) return 'left';
// // //   if (dy === 1) return 'up';
// // //   if (dy === -1) return 'down';
// // // } 

// // // function isTileEmpty(pos, gameState) {
// // //   for (const snake of gameState.board.snakes) {
// // //       for (const segment of snake.body) {
// // //           if (segment.x === pos.x && segment.y === pos.y) return false;
// // //       }
// // //   }
// // //   return true;
// // // }

// // const rand = max=>Math.floor(Math.random()*max);
// // /*
// //     *************************
// //     ***** MAIN FUNCTION *****
// //     *************************
// // */
// // export default function move(gameState){
// //     const you = gameState.you
// //     const turn = gameState.turn;
// //     const longestEnemySnake = () => {
// //         if (!board || !board.snakes || board.snakes.length === 0) {
// //             return you;
// //         }
    
// //         let longest = null;
// //         for (let i = 0; i < board.snakes.length; i++) {
// //             const snake = board.snakes[i];
// //             if (snake.id !== you.id) {
// //                 if (!longest || snake.length > longest.length) {
// //                     longest = snake;
// //                 }
// //             }
// //         }
    
// //         return longest || you;
// //     }; 
// //     const isInHazard = (target) => {
// //         const hazards = gameState.board.hazards;
// //         return hazards.some(hazard => hazard.x === target.x && hazard.y === target.y);
// //     };   
// //     const board = gameState.board
// //     const food = board.food;
// //     // const food = board.food.filter(pos => !(pos.x === (board.width-1)/2 && pos.y === (board.height-1)/2)); //removes middle food
// //     let moveOnTurn = [];
// //     let method;

// //     const enemyLongest = longestEnemySnake();
// //     const isLongest = !enemyLongest || you.length > enemyLongest.length+2;
// //     const isLongestMoreAggressive = !enemyLongest || you.length > enemyLongest.length;

// //     let headToHeadFilter = ["up","down","left","right"];
// //     //flood fill
// //     headToHeadFilter = handleFill(headToHeadFilter, you.head, board);
// //     //avoid head to heads
// //     headToHeadFilter = checkHeadToHead(headToHeadFilter, you.head, board, you);
    
// //     if (food.length > 0 && (!isLongestMoreAggressive || you.health < 30) && moveOnTurn.length==0) {
// //         moveOnTurn = foodMethod(food, you.head, board, headToHeadFilter, you);
// //         method = "Food";
// //     }
// //     if (isInHazard(you.head)==true && moveOnTurn.length==0) {
// //         moveOnTurn = midMethod(you.head, board, headToHeadFilter);
// //         method = "Huzz";
// //     }
// //     if (isLongest && gameState.game.map == "standard") {
// //         moveOnTurn = chaseMethod(you.head, board, headToHeadFilter, enemyLongest.head);
// //         method = "Hunt";
// //     }
// //     if (moveOnTurn.length==0 && !isInHazard(you.body[you.body.length - 1]) && gameState.game.map!="snail_mode") {
// //         moveOnTurn = tailMethod(you.head, board, headToHeadFilter, you);
// //         method = "Tail";
// //     }
// //     if (moveOnTurn.length==0) {
// //         moveOnTurn = midMethod(you.head, board, headToHeadFilter); //hazard and this do the same thing rn
// //         method = "Midd"
// //     }
// //     if (moveOnTurn.length==0) {
// //         moveOnTurn = randomMethod(you.head, board, headToHeadFilter, you);
// //         method = "Rand";
// //     }
// //     // send to server
// //     let chosenMove = moveOnTurn[rand(moveOnTurn.length)];
// //     console.log(
// //         '\x1b[91m%s\x1b[0m \x1b[34m%s\x1b[0m \x1b[32m%s\x1b[0m \x1b[33m%s\x1b[0m',
// //         `${turn}:`,  // Red
// //         `${method}`,  // Blue
// //         `[${moveOnTurn}]`,  // Green
// //         `${chosenMove}`  // Yellow
// //     );
    
// //     return {move: chosenMove};
// // }
// // /*
// //     *******************
// //     ***** METHODS *****
// //     *******************
// // */
// // function foodMethod(food, head, board, headToHeadFilter, you) {
// //     const closestFood = (foodList, selectedHead = head) => {
// //         if (foodList.length === 0) return undefined;

// //         let foodDis = foodList.map((element) => {
// //             return Math.abs(element.x - selectedHead.x) + Math.abs(element.y - selectedHead.y);
// //         });

// //         let minIndex = foodDis.indexOf(Math.min(...foodDis));
// //         if (minIndex === -1) return undefined;

// //         return foodList[minIndex];
// //     };

// //     // 1. Filter out food closer to other snakes
// //     let filteredFood = [...food];
// //     for (const snake of board.snakes) {
// //         if (snake.id !== you.id) {
// //             let closest = closestFood(filteredFood, snake.head);
// //             if (closest) {
// //                 let snakeDistance = getDistance(snake.head, closest) - 1;
// //                 let youDistance = getDistance(you.head, closest);

// //                 if (youDistance >= snakeDistance) {
// //                     filteredFood = filteredFood.filter(pos => pos.x !== closest.x || pos.y !== closest.y);
// //                 }
// //             }
// //         }
// //     }

// //     // 2. Filter out hazards, keep both safe and full sets
// //     const hazards = board.hazards;
// //     const safeFood = filteredFood.filter(food => !hazards.some(h => h.x === food.x && h.y === food.y));

// //     // 3. If no safe food, fallback to hazard food if health permits
// //     if (safeFood.length === 0) {
// //         const fallback = closestFood(filteredFood);
// //         if (fallback) {
// //             const distanceToFood = getDistance(you.head, fallback);
// //             const canSurviveHazard = distanceToFood <= Math.floor(you.health / 15);
// //             if (canSurviveHazard) {
// //                 return getDirection(fallback, head, board, headToHeadFilter);
// //             }
// //         }
// //         // 4. No food options
// //         return [];
// //     }

// //     // Use closest safe food
// //     const target = closestFood(safeFood);
// //     return getDirection(target, head, board, headToHeadFilter);
// // }

// // function randomMethod(head, board, headToHeadFilter, you) {
// //     let randMoves = [];
// //     const isHazard = dir=> {
// //         let newPos = nextMove(dir, head);
// //         if (board.hazards.some(haz => haz.x === newPos.x && haz.y === newPos.y)) {
// //             return false;
// //         }
// //         return true;
// //     }
// //     if (getSafe({x:head.x-1, y:head.y}, board) && headToHeadFilter.includes("left") && isHazard("left")) {
// //         randMoves.push("left")
// //     }
// //     if (getSafe({x:head.x+1, y:head.y}, board) && headToHeadFilter.includes("right") && isHazard("right")) {
// //         randMoves.push("right");
// //     }
// //     if (getSafe({x:head.x, y:head.y-1}, board) && headToHeadFilter.includes("down") && isHazard("down")) {
// //         randMoves.push("down");
// //     }
// //     if (getSafe({x:head.x, y:head.y+1}, board) && headToHeadFilter.includes("up") && isHazard("up")) {
// //         randMoves.push("up");
// //     }
// //     if (randMoves.length==0) {
// //         if (getSafe({x:head.x-1, y:head.y}, board) && headToHeadFilter.includes("left")) {
// //             randMoves.push("left")
// //         }
// //         if (getSafe({x:head.x+1, y:head.y}, board) && headToHeadFilter.includes("right")) {
// //             randMoves.push("right");
// //         }
// //         if (getSafe({x:head.x, y:head.y-1}, board) && headToHeadFilter.includes("down")) {
// //             randMoves.push("down");
// //         }
// //         if (getSafe({x:head.x, y:head.y+1}, board) && headToHeadFilter.includes("up")) {
// //             randMoves.push("up");
// //         }
// //     }
// //     return randMoves;
// // }
// // function tailMethod(head, board, headToHeadFilter, you) {
// //     const tail = you.body[you.length-1];
// //     return getDirection(tail, head, board, headToHeadFilter);
// // }
// // function chaseMethod(head, board, headToHeadFilter, longestSnakeHead) {
// //     const target = longestSnakeHead;
// //     return getDirection(target, head, board, headToHeadFilter);
// // }
// // function midMethod(head, board, headToHeadFilter) {
// //     let posArr = [];
// //     for (const dir of headToHeadFilter) {
// //         const pos = nextMove(dir, head);
// //         if (!board.hazards.some(h => h.x === pos.x && h.y === pos.y)) {
// //             posArr.push(dir)
// //         }
// //     }
// //     if (posArr.length>0) {
// //         return posArr;
// //     } else {
// //         const target = {x:(board.width+1)/2, y:(board.height+1)/2};
// //         return getDirection(target, head, board, headToHeadFilter);
// //     }
// // }
// // /*
// //     ***************************
// //     ***** OTHER FUNCTIONS *****
// //     ***************************
// // */
// // function getDirection(pos, head, board, headToHeadFilter) { //get 
// //     let arr = [];
// //     if (pos.x < head.x && getSafe({x:head.x-1, y:head.y}, board) && headToHeadFilter.includes("left")) {
// //         arr.push("left");
// //     }
// //     if (pos.x > head.x && getSafe({x:head.x+1, y:head.y}, board) && headToHeadFilter.includes("right")) {
// //         arr.push("right");
// //     }
// //     if (pos.y < head.y && getSafe({x:head.x, y:head.y-1}, board) && headToHeadFilter.includes("down")) {
// //         arr.push("down");
// //     }
// //     if (pos.y > head.y && getSafe({x:head.x, y:head.y+1}, board) && headToHeadFilter.includes("up")) {
// //         arr.push("up");
// //     }
// //     return arr;
// // }
// // function getSafe(pos, board) {
// //     const { x, y } = pos;

// //     if (x < 0 || x >= board.width || y < 0 || y >= board.height) {
// //         return false;
// //     }

// //     for (let i = 0; i < board.snakes.length; i++) {
// //         const snake = board.snakes[i];
// //         const headX = snake.head.x;
// //         const headY = snake.head.y;

// //         // Check if the snake's head is adjacent to any food
// //         const adjacentToHead = [
// //             { x: headX, y: headY + 1 },
// //             { x: headX, y: headY - 1 },
// //             { x: headX + 1, y: headY },
// //             { x: headX - 1, y: headY },
// //         ];

// //         for (const dir of adjacentToHead) {
// //             if (board.food.some(f => f.x === dir.x && f.y === dir.y)) {
// //                 // If head is adjacent to food, the tail cannot be considered safe
// //                 const tail = snake.body[snake.body.length - 1];
// //                 if (pos.x === tail.x && pos.y === tail.y) {
// //                     return false;
// //                 }
// //             }
// //         }

// //         // Check if position overlaps any snake body part (excluding tails)
// //         for (let j = 0; j < snake.body.length - 1; j++) {
// //             const part = snake.body[j];
// //             if (part.x === x && part.y === y) {
// //                 return false;
// //             }
// //         }
// //     }

// //     return true;
// // }
// // function checkHeadToHead(moveOnTurn, head, board, you) {
// //     let movesToFilter = {
// //         safe: [],
// //         danger: []
// //     };

// //     const snakeHeads = () => {
// //         let arr = [];
// //         for (const snake of board.snakes) {
// //             if (snake.id !== you.id) {
// //                 arr.push({pos:snake.head, length:snake.length});
// //             }
// //         }
// //         return arr;
// //     };

// //     for (let i = 0; i < moveOnTurn.length; i++) {
// //         const pos = nextMove(moveOnTurn[i], head);
// //         const { x, y } = pos;

// //         const adjacent = [
// //             { x, y: y + 1 },
// //             { x, y: y - 1 },
// //             { x: x + 1, y },
// //             { x: x - 1, y },
// //         ];

// //         let isDanger = adjacent.some(adj =>
// //             snakeHeads().some(snake => 
// //                 snake.pos.x === adj.x && 
// //                 snake.pos.y === adj.y && 
// //                 snake.length >= you.length //only be danger if snake is equal or longer in length
// //             )
// //         );
// //         if (isDanger || !getSafe(pos, board)) {
// //             if (!movesToFilter.danger.includes(moveOnTurn[i])) {
// //                 movesToFilter.danger.push(moveOnTurn[i]);
// //             }
// //         } else {
// //             if (!movesToFilter.safe.includes(moveOnTurn[i])) {
// //                 movesToFilter.safe.push(moveOnTurn[i]);
// //             }
// //         }
// //     }

// //     if (movesToFilter.safe.length > 0) {
// //         moveOnTurn = movesToFilter.safe;
// //     }

// //     // console.log(movesToFilter);
// //     // console.log(moveOnTurn);
// //     return moveOnTurn;
// // }
// // function nextMove(moveOnTurn, head) {
// //     let {x,y} = head;
// //     if (moveOnTurn=="up") {
// //         return {x:x, y:y+1};
// //     } else if (moveOnTurn=="down") {
// //         return {x:x, y:y-1};
// //     } else if (moveOnTurn=="right") {
// //         return {x:x+1, y:y};
// //     } else if (moveOnTurn=="left") {
// //         return {x:x-1, y:y};
// //     }
// // }
// // function handleFill(filter, head, board) {
// //     let fills = [];
// //     for (let i=0;i<filter.length;i++) {
// //         let boardVisit = [];
// //         let pos = nextMove(filter[i], head);
// //         fills.push(floodFill(pos, board));
// //         function floodFill(pos, board) {
// //             if (boardVisit.some(obj => obj.x === pos.x && obj.y === pos.y) || !getSafe(pos, board)) {
// //                 return 0;
// //             } else {
// //                 boardVisit.push({ x: pos.x, y: pos.y });
// //                 let count = 1;
// //                 const directions = [
// //                     { x: 0, y: -1 },
// //                     { x: 0, y: 1 },
// //                     { x: -1, y: 0 },
// //                     { x: 1, y: 0 }
// //                 ];

// //                 for (let dir of directions) {
// //                     const newPos = { x: pos.x + dir.x, y: pos.y + dir.y };
// //                     count += floodFill(newPos, board, boardVisit);
// //                 }
    
// //                 return count;
// //             }
// //         }
// //     }
// //     let newMoves = [];
// //     let bigger = Math.max(...fills);
// //     for (let j=0;j<filter.length;j++) {
// //         if (fills[j]==bigger) {
// //             newMoves.push(filter[j]);
// //         }
// //     }
// //     return newMoves;
// // }
// // function getDistance(snake, target) {
// //     return Math.abs(snake.x-target.x)+Math.abs(snake.y-target.y);
// // }

// export default function move(gameState) {
//     gameState.board.snakes.forEach((snake) => console.log(snake.name));
//     let moveSafety = {
//       up: true,
//       down: true,
//       left: true,
//       right: true,
//     };
//     let priorityMoves = {
//       up: false,
//       down: false,
//       left: false,
//       right: false,
//     };
//     let riskyMoves = {
//       up: false,
//       down: false,
//       left: false,
//       right: false,
//     };
//     let spaceScores = { up: 0, down: 0, left: 0, right: 0 };
  
//     let myHead = gameState.you.body[0];
//     let myNeck = gameState.you.body[1];
  
//     let healthLimit = 100;
  
//     function safeBack() {
//       moveSafety.left = myNeck.x < myHead.x ? false : moveSafety.left;
//       moveSafety.right = myNeck.x > myHead.x ? false : moveSafety.right;
//       moveSafety.down = myNeck.y < myHead.y ? false : moveSafety.down;
//       moveSafety.up = myNeck.y > myHead.y ? false : moveSafety.up;
//     }
//     safeBack();
  
//     function bounds() {
//       moveSafety.left = myHead.x == 0 ? false : moveSafety.left;
//       moveSafety.right =
//         myHead.x == gameState.board.width - 1 ? false : moveSafety.right;
//       moveSafety.down = myHead.y == 0 ? false : moveSafety.down;
//       moveSafety.up =
//         myHead.y == gameState.board.height - 1 ? false : moveSafety.up;
//     }
//     bounds();
  
//     let myBody = gameState.you.body;
  
//     function selfPreservation() {
//       let ate = 1;
//       if (gameState.you.health == 100) {
//         ate = 0;
//       }
//       for (let i = 1; i < myBody.length - ate; i++) {
//         moveSafety.right =
//           myHead.x + 1 == myBody[i].x && myHead.y == myBody[i].y
//             ? false
//             : moveSafety.right;
//         moveSafety.left =
//           myHead.x - 1 == myBody[i].x && myHead.y == myBody[i].y
//             ? false
//             : moveSafety.left;
//         moveSafety.up =
//           myHead.x == myBody[i].x && myHead.y + 1 == myBody[i].y
//             ? false
//             : moveSafety.up;
//         moveSafety.down =
//           myHead.x == myBody[i].x && myHead.y - 1 == myBody[i].y
//             ? false
//             : moveSafety.down;
  
//         riskyMoves.right =
//           myHead.x + 1 == myBody[i].x && myHead.y == myBody[i].y
//             ? false
//             : riskyMoves.right;
//         riskyMoves.left =
//           myHead.x - 1 == myBody[i].x && myHead.y == myBody[i].y
//             ? false
//             : riskyMoves.left;
//         riskyMoves.up =
//           myHead.x == myBody[i].x && myHead.y + 1 == myBody[i].y
//             ? false
//             : riskyMoves.up;
//         riskyMoves.down =
//           myHead.x == myBody[i].x && myHead.y - 1 == myBody[i].y
//             ? false
//             : riskyMoves.down;
//       }
//     }
  
//     function riskyPres() {
//       let ate = 1;
//       if (gameState.you.health == 100) {
//         ate = 0;
//       }
//       for (let i = 1; i < myBody.length - ate; i++) {
//         riskyMoves.right =
//           myHead.x + 1 == myBody[i].x && myHead.y == myBody[i].y
//             ? false
//             : riskyMoves.right;
//         riskyMoves.left =
//           myHead.x - 1 == myBody[i].x && myHead.y == myBody[i].y
//             ? false
//             : riskyMoves.left;
//         riskyMoves.up =
//           myHead.x == myBody[i].x && myHead.y + 1 == myBody[i].y
//             ? false
//             : riskyMoves.up;
//         riskyMoves.down =
//           myHead.x == myBody[i].x && myHead.y - 1 == myBody[i].y
//             ? false
//             : riskyMoves.down;
//       }
//     }
  
//     selfPreservation();
//     riskyPres();
  
//     // Add a new function to detect positions right behind enemy heads
//     function detectEnemyNecks() {
//       let enemyNecks = [];
  
//       for (let snake of gameState.board.snakes) {
//         if (snake.id == gameState.you.id) continue;
//         let enemyNeck = snake.body[1];
//         enemyNecks.push({ x: enemyNeck.x, y: enemyNeck.y });
//       }
//       return enemyNecks;
//     }
  
//     for (let j = 0; j < gameState.board.snakes.length; j++) {
//       let enemySnake = gameState.board.snakes[j];
//       if (enemySnake.id == gameState.you.id) continue;
  
//       function enemyDodging() {
//         let enemyNecks = detectEnemyNecks();
//         let h = 1;
//         if (enemySnake.health == 100) {
//           h = 0;
//         }
  
//         for (let i = 0; i < enemySnake.body.length - h; i++) {
//           let enemyBody = enemySnake.body[i];
//           moveSafety.right =
//             myHead.x + 1 == enemyBody.x && myHead.y == enemyBody.y
//               ? false
//               : moveSafety.right;
//           moveSafety.left =
//             myHead.x - 1 == enemyBody.x && myHead.y == enemyBody.y
//               ? false
//               : moveSafety.left;
//           moveSafety.up =
//             myHead.x == enemyBody.x && myHead.y + 1 == enemyBody.y
//               ? false
//               : moveSafety.up;
//           moveSafety.down =
//             myHead.x == enemyBody.x && myHead.y - 1 == enemyBody.y
//               ? false
//               : moveSafety.down;
//         }
  
//         for (let neck of enemyNecks) {
//           moveSafety.right =
//             myHead.x + 1 == neck.x && myHead.y == neck.y
//               ? false
//               : moveSafety.right;
//           moveSafety.left =
//             myHead.x - 1 == neck.x && myHead.y == neck.y
//               ? false
//               : moveSafety.left;
//           moveSafety.up =
//             myHead.x == neck.x && myHead.y + 1 == neck.y ? false : moveSafety.up;
//           moveSafety.down =
//             myHead.x == neck.x && myHead.y - 1 == neck.y
//               ? false
//               : moveSafety.down;
//           riskyMoves.right =
//             myHead.x + 1 == neck.x && myHead.y == neck.y
//               ? false
//               : riskyMoves.right;
//           riskyMoves.left =
//             myHead.x - 1 == neck.x && myHead.y == neck.y
//               ? false
//               : riskyMoves.left;
//           riskyMoves.up =
//             myHead.x == neck.x && myHead.y + 1 == neck.y ? false : riskyMoves.up;
//           riskyMoves.down =
//             myHead.x == neck.x && myHead.y - 1 == neck.y
//               ? false
//               : riskyMoves.down;
//         }
//       }
//       enemyDodging();
  
//       let enemyHead = enemySnake.body[0];
//       let myLength = gameState.you.body.length;
//       let enemyLength = enemySnake.body.length;
  
//       if (enemyLength >= myLength) {
//         let enemyMoves = [
//           { x: enemyHead.x + 1, y: enemyHead.y },
//           { x: enemyHead.x - 1, y: enemyHead.y },
//           { x: enemyHead.x, y: enemyHead.y + 1 },
//           { x: enemyHead.x, y: enemyHead.y - 1 },
//         ];
//         for (let move of enemyMoves) {
//           if (myHead.x + 1 == move.x && myHead.y == move.y) {
//             moveSafety.right = false;
//             riskyMoves.right = true;
//           }
//           if (myHead.x - 1 == move.x && myHead.y == move.y) {
//             moveSafety.left = false;
//             riskyMoves.left = true;
//           }
//           if (myHead.x == move.x && myHead.y + 1 == move.y) {
//             moveSafety.up = false;
//             riskyMoves.up = true;
//           }
//           if (myHead.x == move.x && myHead.y - 1 == move.y) {
//             moveSafety.down = false;
//             riskyMoves.down = true;
//           }
//         }
//         enemyDodging();
//         selfPreservation();
//         riskyPres();
//       }
  
//       if (enemyLength < myLength) {
//         let enemyMoves = [
//           { x: enemyHead.x + 1, y: enemyHead.y },
//           { x: enemyHead.x - 1, y: enemyHead.y },
//           { x: enemyHead.x, y: enemyHead.y + 1 },
//           { x: enemyHead.x, y: enemyHead.y - 1 },
//         ];
//         for (let move of enemyMoves) {
//           priorityMoves.right =
//             myHead.x + 1 == move.x && myHead.y == move.y
//               ? true
//               : priorityMoves.right;
//           priorityMoves.left =
//             myHead.x - 1 == move.x && myHead.y == move.y
//               ? true
//               : priorityMoves.left;
//           priorityMoves.up =
//             myHead.x == move.x && myHead.y + 1 == move.y
//               ? true
//               : priorityMoves.up;
//           priorityMoves.down =
//             myHead.x == move.x && myHead.y - 1 == move.y
//               ? true
//               : priorityMoves.down;
//         }
//         enemyDodging();
//         selfPreservation();
//         riskyPres();
//       }
//     }
//     function getNextPosition(pos, dir) {
//       let newPos = { x: pos.x, y: pos.y };
  
//       if (dir == "up") {
//         newPos.y += 1;
//       } else if (dir == "down") {
//         newPos.y -= 1;
//       } else if (dir == "left") {
//         newPos.x -= 1;
//       } else if (dir == "right") {
//         newPos.x += 1;
//       }
  
//       return newPos;
//     }
//     // Updated evaluateSpace function with proper parameters
//     function evaluateSpace() {
//       let visited = new Set();
//       Object.keys(moveSafety).forEach((dir) => {
//         if (!moveSafety[dir]) {
//           spaceScores[dir] = 0;
//           return;
//         }
//         let nextPos = getNextPosition(myHead, dir);
//         let space = floodFill(nextPos, 0, new Set(visited));
//         let exitAnalysis = countExits(nextPos);
  
//         spaceScores[dir] =
//           space * 4 +
//           exitAnalysis.scores.up +
//           exitAnalysis.scores.down +
//           exitAnalysis.scores.left +
//           exitAnalysis.scores.right +
//           exitAnalysis.count * 50; // Bonus for multiple good exits
//       });
//     }
//     evaluateSpace();
  
//     for (let haz of gameState.board.hazards) {
//       if (myHead.x - 1 === haz.x && myHead.y === haz.y) {
//         riskyMoves.left = true;
//         moveSafety.left = false;
//       }
//       if (myHead.x + 1 === haz.x && myHead.y === haz.y) {
//         riskyMoves.right = true;
//         moveSafety.right = false;
//       }
//       if (myHead.y - 1 === haz.y && myHead.x === haz.x) {
//         riskyMoves.down = true;
//         moveSafety.down = false;
//       }
//       if (myHead.y + 1 === haz.y && myHead.x === haz.x) {
//         riskyMoves.up = true;
//         moveSafety.up = false;
//       }
  
//       if (myHead.x === haz.x && myHead.y === haz.y) {
//         priorityMoves = { up: false, down: false, left: false, right: false };
  
//         const safeDirections = [];
  
//         if (
//           !isCoordinateHazard(myHead.x, myHead.y + 1, gameState.board.hazards)
//         ) {
//           safeDirections.push("up");
//         }
//         if (
//           !isCoordinateHazard(myHead.x, myHead.y - 1, gameState.board.hazards)
//         ) {
//           safeDirections.push("down");
//         }
//         if (
//           !isCoordinateHazard(myHead.x + 1, myHead.y, gameState.board.hazards)
//         ) {
//           safeDirections.push("right");
//         }
//         if (
//           !isCoordinateHazard(myHead.x - 1, myHead.y, gameState.board.hazards)
//         ) {
//           safeDirections.push("left");
//         }
  
//         if (safeDirections.length > 0) {
//           for (let dir of safeDirections) {
//             priorityMoves[dir] = true;
//           }
//         } else {
//           if (
//             !isCoordinateHazard(myHead.x, myHead.y + 2, gameState.board.hazards)
//           ) {
//             priorityMoves.up = true;
//           }
//           if (
//             !isCoordinateHazard(myHead.x, myHead.y - 2, gameState.board.hazards)
//           ) {
//             priorityMoves.down = true;
//           }
//           if (
//             !isCoordinateHazard(myHead.x + 2, myHead.y, gameState.board.hazards)
//           ) {
//             priorityMoves.right = true;
//           }
//           if (
//             !isCoordinateHazard(myHead.x - 2, myHead.y, gameState.board.hazards)
//           ) {
//             priorityMoves.left = true;
//           }
//         }
//       }
//     }
//     function isCoordinateHazard(x, y, hazards) {
//       return hazards.some((haz) => haz.x === x && haz.y === y);
//     }
  
//     let myLength = gameState.you.body.length;
//     let myHealth = gameState.you.health;
  
//     let longestSnake = 0;
//     for (const snake of gameState.board.snakes) {
//       if (snake.id == gameState.you.id) continue;
//       if (snake.body.length > longestSnake) {
//         longestSnake = snake.body.length;
//       }
//     }
  
//     if (myHealth < 100) {
//       priorityMoves = { up: false, down: false, left: false, right: false };
//       let bestFood = findBestFood(myHead, gameState.board.food, gameState);
//       if (bestFood) {
//         priorityMoves.right = bestFood.x > myHead.x;
//         priorityMoves.left = bestFood.x < myHead.x;
//         priorityMoves.up = bestFood.y > myHead.y;
//         priorityMoves.down = bestFood.y < myHead.y;
//       }
//     }
  
//     let safeMoves = Object.keys(moveSafety).filter(
//       (direction) => moveSafety[direction]
//     );
//     let riskyOptions = Object.keys(riskyMoves).filter(
//       (direction) => riskyMoves[direction]
//     );
//     let futureSafeMoves = safeMoves.filter((move) =>
//       futureSense(move, gameState, 16)
//     );
//     let moveScores = {};
//     futureSafeMoves = futureSafeMoves.filter((move) =>
//       isValidMove(gameState, move)
//     );
//     futureSafeMoves.forEach((move) => {
//       moveScores[move] = 0;
//       moveScores[move] += spaceScores[move] * 2.5;
//       let lowLimit = 30;
//       for (let haz in gameState.board.hazards) {
//         if (move.x == haz.x) {
//           lowLimit = 50;
//         }
//         if (move.y == haz.y) {
//           lowLimit = 50;
//         }
//       }
  
//       if (myHealth < healthLimit || gameState.turn < 150) {
//         if (gameState.turn < 200) {
//           moveScores[move] += priorityMoves[move] ? 180 : 0;
//         } else {
//           moveScores[move] += priorityMoves[move] ? 200 : 0;
//         }
  
//         if (myHealth < lowLimit) {
//           moveScores[move] += priorityMoves[move] ? 30000 : 0;
//         }
//         if (myHealth < lowLimit / 2) {
//           moveScores[move] += priorityMoves[move] ? 50000 : 0;
//         }
//       }
  
//       let nextPos = getNextPosition(myHead, move);
//       let centerX = Math.floor(gameState.board.width / 2);
//       let centerY = Math.floor(gameState.board.height / 2);
//       let distanceToCenter =
//         Math.abs(nextPos.x - centerX) + Math.abs(nextPos.y - centerY);
  
//       if (gameState.turn < 150) {
//         moveScores[move] += distanceToCenter * 10;
//       }
  
//       moveScores[move] = penalizeHeadProximity(
//         moveScores[move],
//         myHead,
//         gameState
//       );
  
//       let isCorner =
//         (move.x == 0 || move.x == gameState.board.width - 1) &&
//         (move.y == 0 || move.y == gameState.board.height - 1);
  
//       if (isCorner) moveScores[move] -= 500;
  
//       if (gameState.you.health > 40) {
//         let nextMoves = countExits(nextPos, gameState.you.body.length).count;
//         moveScores[move] += nextMoves * 5;
//       }
  
//       if (gameState.turn < 100 || myLength < longestSnake) {
//         let bestFood = findBestFood(myHead, gameState.board.food, gameState);
//         if (bestFood) {
//           priorityMoves.right = bestFood.x > myHead.x;
//           priorityMoves.left = bestFood.x < myHead.x;
//           priorityMoves.up = bestFood.y > myHead.y;
//           priorityMoves.down = bestFood.y < myHead.y;
  
//           for (let dir in priorityMoves) {
//             if (priorityMoves[dir]) {
//               moveScores[dir] = moveScores[dir] || 0;
//               moveScores[dir] += 600;
//             }
//           }
//         }
//         healthLimit = 20 * gameState.board.snakes.length;
//       } else {
//         if (myLength + 1 <= longestSnake) {
//           healthLimit = 15 * gameState.board.snakes.length;
//         } else {
//           healthLimit = 10 * gameState.board.snakes.length;
//         }
//       }
  
//       moveScores = centerControlStrategy(gameState, myHead, moveScores);
  
//       moveScores = huntSmallerSnakes(
//         gameState,
//         myHead,
//         myLength,
//         myHealth,
//         moveScores
//       );
  
//       moveScores = avoidTailsAboutToEat(gameState, myHead, moveScores);
  
//       moveScores = enemyTrapped(gameState, moveScores);
  
//       let myTail = myBody[myBody.length - 1];
//       let secondLast = myBody[myBody.length - 2]; // To detect if tail is moving
//       let tailWillMove = !gameState.board.food.some(
//         (f) => f.x === myHead.x && f.y === myHead.y
//       ); // If not eating, tail moves
  
//       let tailPriorityMoves = [];
  
//       // Directions towards tail
//       if (myHead.x < myTail.x && moveSafety.right) {
//         if (
//           !(myTail.x === secondLast.x && myTail.y === secondLast.y) ||
//           tailWillMove
//         ) {
//           tailPriorityMoves.push("right");
//         }
//       }
//       if (myHead.x > myTail.x && moveSafety.left) {
//         if (
//           !(myTail.x === secondLast.x && myTail.y === secondLast.y) ||
//           tailWillMove
//         ) {
//           tailPriorityMoves.push("left");
//         }
//       }
//       if (myHead.y < myTail.y && moveSafety.up) {
//         if (
//           !(myTail.x === secondLast.x && myTail.y === secondLast.y) ||
//           tailWillMove
//         ) {
//           tailPriorityMoves.push("up");
//         }
//       }
//       if (myHead.y > myTail.y && moveSafety.down) {
//         if (
//           !(myTail.x === secondLast.x && myTail.y === secondLast.y) ||
//           tailWillMove
//         ) {
//           tailPriorityMoves.push("down");
//         }
//       }
  
//       const tailBias = Math.max(0, myBody.length - 4);
//       for (const move of tailPriorityMoves) {
//         if (moveScores[move] !== undefined) {
//           moveScores[move] += tailBias * 10;
//         }
//       }
//       if (gameState.you.health > 50) {
//         for (let snake of gameState.board.snakes) {
//           if (snake.id == gameState.you.id) continue;
  
//           if (snake.body.length < gameState.you.body.length) {
//             let enemyHead = snake.body[0];
//             let currentDistance =
//               Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
//             let newDistance =
//               Math.abs(nextPos.x - enemyHead.x) +
//               Math.abs(nextPos.y - enemyHead.y);
//             if (newDistance < currentDistance) {
//               moveScores[move] += 100;
//             }
//           }
//         }
//       }
  
//       if (gameState.you.health < 100) {
//         for (let snake of gameState.board.snakes) {
//           if (snake.id == gameState.you.id) continue;
  
//           if (snake.body.length > gameState.you.body.length) {
//             let enemyHead = snake.body[0];
//             let currentDistance =
//               Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
//             let newDistance =
//               Math.abs(nextPos.x - enemyHead.x) +
//               Math.abs(nextPos.y - enemyHead.y);
//             if (newDistance < currentDistance) {
//               moveScores[move] -= 300 / gameState.board.snakes.length;
//             }
//           }
//         }
//       }
//     });
//     let bestMove = null;
//     let bestScore = -100000;
//     let futureSafeMovesFinal = safeMoves.filter((move) =>
//       futureSense(move, gameState, 12)
//     );
//     if (futureSafeMovesFinal.length > 0) {
//       futureSafeMovesFinal = futureSafeMovesFinal.filter(
//         (move) => isValidMove(gameState, move) && moveSafety[move]
//       );
//       for (let move of futureSafeMovesFinal) {
//         if (moveScores[move] > bestScore) {
//           bestScore = moveScores[move];
//           bestMove = move;
//         }
//       }
//       if (bestMove && moveSafety[bestMove]) {
//         console.log(
//           `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Choosing best future-safe move: ${bestMove} (score: ${moveScores[bestMove]})`
//         );
//         return { move: bestMove };
//       }
//     }
//     for (let depth of [10, 9, 8, gameState.you.body.length]) {
//       let bestMoveAtDepth = null;
//       let bestScoreAtDepth = -100000;
//       let validMovesAtDepth = [];
//       for (let move of safeMoves) {
//         if (moveSafety[move] && futureSense(move, gameState, depth)) {
//           validMovesAtDepth.push(move);
//         }
//       }
//       if (validMovesAtDepth.length > 0) {
//         let depthMoveScores = {};
//         for (let move of validMovesAtDepth) {
//           depthMoveScores[move] = 0;
//           depthMoveScores[move] += spaceScores[move] * 2.6;
//           if (myHealth < 20) {
//             depthMoveScores[move] += priorityMoves[move] ? 400 : 0;
//           } else {
//             depthMoveScores[move] += priorityMoves[move] ? 20 : 0;
//           }
//           if (depthMoveScores[move] > bestScoreAtDepth) {
//             bestScoreAtDepth = depthMoveScores[move];
//             bestMoveAtDepth = move;
//           }
//         }
//         if (bestMoveAtDepth) {
//           console.log(
//             `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Choosing best-scored safe move with ${depth} future-sense: ${bestMoveAtDepth} (score: ${bestScoreAtDepth})`
//           );
//           return { move: bestMoveAtDepth };
//         }
//       }
//     }
//     if (riskyOptions.length > 0) {
//       let riskyMoveScores = {};
//       let riskyMoveSurvival = {}; // Track how many future moves each risky option allows
  
//       riskyOptions.forEach((move) => {
//         riskyMoveScores[move] = 0;
//         riskyMoveSurvival[move] = 0;
  
//         // Calculate how many future moves this risky option allows
//         for (let depth = 5; depth >= 1; depth--) {
//           if (futureSense(move, gameState, depth)) {
//             riskyMoveSurvival[move] = depth;
//             riskyMoveScores[move] += depth * 10;
//             break;
//           }
//         }
  
//         riskyMoveScores[move] += spaceScores[move] * 2;
  
//         for (let snake of gameState.board.snakes) {
//           if (snake.id == gameState.you.id) continue;
//           if (
//             snake.body[snake.length - 1].x == move.x &&
//             snake.body[snake.length - 1].y == move.y
//           ) {
//             riskyMoveScores[move] -= 40;
//           }
//         }
  
//         let bestFood = findBestFood(myHead, gameState.board.food, gameState);
//         if (bestFood) {
//           priorityMoves.right = bestFood.x > myHead.x;
//           priorityMoves.left = bestFood.x < myHead.x;
//           priorityMoves.up = bestFood.y > myHead.y;
//           priorityMoves.down = bestFood.y < myHead.y;
//         }
  
//         if (priorityMoves[move]) {
//           riskyMoveScores[move] += 500;
//         }
  
//         let nextPos = getNextPosition(myHead, move);
//         let exitAnalysis = countExits(nextPos);
//         riskyMoveScores[move] += exitAnalysis.count * 50;
//       });
  
//       let bestRiskyScore = -Infinity;
//       let bestRiskyMove = null;
  
//       let viableRiskyOptions = riskyOptions.filter(
//         (move) => riskyMoveSurvival[move] > myLength / 5
//       );
//       if (viableRiskyOptions.length > 0) {
//         for (let move of viableRiskyOptions) {
//           if (riskyMoveScores[move] > bestRiskyScore) {
//             bestRiskyScore = riskyMoveScores[move];
//             bestRiskyMove = move;
//           }
//         }
  
//         bestMove = bestRiskyMove || viableRiskyOptions[0];
//         console.log(
//           `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Using fallback (1) risky move: ${bestMove} ` +
//             `(score: ${bestRiskyScore}, future survival: ${riskyMoveSurvival[bestMove]})`
//         );
//         return { move: bestMove };
//       } else {
//         console.log(
//           `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - No risky moves allow sufficient future survival`
//         );
//       }
//     }
//     if (safeMoves.length > 0) {
//       let bestSafeScore = -10000000;
//       let bestSafeMove = null;
//       for (let move of safeMoves) {
//         let score = 0;
//         let nextPos = getNextPosition(myHead, move);
//         score += spaceScores[move] * 3;
//         for (let depth = 10; depth >= 1; depth -= 1) {
//           if (futureSense(move, gameState, depth)) {
//             score += depth * 10;
//             break;
//           }
//         }
//         let myTail = myBody[myBody.length - 1];
//         if (
//           (myHead.x < myTail.x && move == "right") ||
//           (myHead.x > myTail.x && move == "left") ||
//           (myHead.y < myTail.y && move == "up") ||
//           (myHead.y > myTail.y && move == "down")
//         ) {
//           score += 500;
//         }
//         let exitCount = countExits(nextPos).count;
//         score += exitCount * 18;
//         let floodSpace = floodFill(nextPos, 0, new Set());
//         score += floodSpace * 4;
//         if (score > bestSafeScore) {
//           bestSafeScore = score;
//           bestSafeMove = move;
//         }
//       }
  
//       console.log(
//         `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Choosing best safe move: ${bestSafeMove} (score: ${bestSafeScore})`
//       );
//       return { move: bestSafeMove || safeMoves[0] };
//     } else {
//       if (riskyOptions.length > 0) {
//         let bestRiskyScore = -10000000;
//         let bestRiskyMove = null;
  
//         for (let move of riskyOptions) {
//           let score = 0;
//           let nextPos = getNextPosition(myHead, move);
  
//           // Factor in space around move (if available)
//           score += (spaceScores[move] || 0) * 2;
  
//           // Look ahead for potential survivability
//           for (let depth = 10; depth >= 1; depth--) {
//             if (futureSense(move, gameState, depth)) {
//               score += depth * 6;
//               break;
//             }
//           }
  
//           // Tail bias (escape routes)
//           let myTail = myBody[myBody.length - 1];
//           if (
//             (myHead.x < myTail.x && move == "right") ||
//             (myHead.x > myTail.x && move == "left") ||
//             (myHead.y < myTail.y && move == "up") ||
//             (myHead.y > myTail.y && move == "down")
//           ) {
//             score += 300;
//           }
  
//           // Exit count (escape options from that tile)
//           let exitCount = countExits(nextPos).count;
//           score += exitCount * 12;
  
//           // Flood fill (how much space after move)
//           let floodSpace = floodFill(nextPos, 0, new Set());
//           score += floodSpace * 2; // risky = more lenient
  
//           if (score > bestRiskyScore) {
//             bestRiskyScore = score;
//             bestRiskyMove = move;
//           }
//         }
  
//         console.log(
//           `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Using fallback (2) risky move: ${bestRiskyMove} (score: ${bestRiskyScore})`
//         );
//         return { move: bestRiskyMove || riskyOptions[0] };
//       }
//       const allDirections = ["up", "down", "left", "right"];
//       for (let dir of allDirections) {
//         let nextPos = getNextPosition(myHead, dir);
//         if (
//           nextPos.x >= 0 &&
//           nextPos.x < gameState.board.width &&
//           nextPos.y >= 0 &&
//           nextPos.y < gameState.board.height
//         ) {
//           let hitSelf = false;
//           for (let i = 0; i < myBody.length - 1; i++) {
//             if (nextPos.x == myBody[i].x && nextPos.y == myBody[i].y) {
//               hitSelf = true;
//               break;
//             }
//           }
//           if (!hitSelf) {
//             console.log(
//               `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Last resort move: ${dir}`
//             );
//             return { move: dir };
//           }
//         }
//       }
//       const randomDir =
//         allDirections[Math.floor(Math.random() * allDirections.length)];
//       console.log(
//         `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - No valid moves, using random direction: ${randomDir}`
//       );
//       return { move: randomDir };
//     }
  
//     //  floodFill and countExits functions
//     function floodFill(pos, depth, visited, limit = 30) {
//       const key = `${pos.x},${pos.y}`;
//       if (visited.has(key) || depth > limit) return 0;
//       visited.add(key);
  
//       // Out of bounds
//       if (
//         pos.x < 0 ||
//         pos.x >= gameState.board.width ||
//         pos.y < 0 ||
//         pos.y >= gameState.board.height
//       )
//         return 0;
  
//       // Check if the tile is occupied by any body
//       for (let snake of gameState.board.snakes) {
//         for (let i = 0; i < snake.body.length; i++) {
//           const segment = snake.body[i];
//           if (segment.x == pos.x && segment.y == pos.y) return 0;
//         }
//       }
  
//       // Avoid tiles enemy heads might move into
//       const dangerousTiles = getEnemyHeadNextMoves();
//       for (let danger of dangerousTiles) {
//         if (danger.x == pos.x && danger.y == pos.y) return 0;
//       }
  
//       let space = 1;
//       for (let dx of [-1, 1]) {
//         space += floodFill(
//           { x: pos.x + dx, y: pos.y },
//           depth + 1,
//           visited,
//           limit
//         );
//       }
//       for (let dy of [-1, 1]) {
//         space += floodFill(
//           { x: pos.x, y: pos.y + dy },
//           depth + 1,
//           visited,
//           limit
//         );
//       }
//       return space;
//     }
  
//     function countExits(pos, myLength) {
//       const directions = {
//         up: { x: pos.x, y: pos.y + 1 },
//         down: { x: pos.x, y: pos.y - 1 },
//         left: { x: pos.x - 1, y: pos.y },
//         right: { x: pos.x + 1, y: pos.y },
//       };
  
//       const enemyHeadMoves = getEnemyHeadNextMoves(myLength);
//       let scores = {};
//       let count = 0;
  
//       for (let dir in directions) {
//         const p = directions[dir];
//         let isSafe = true;
  
//         // Check board boundaries
//         if (
//           p.x < 0 ||
//           p.x > gameState.board.width - 1 ||
//           p.y < 0 ||
//           p.y > gameState.board.height - 1
//         ) {
//           isSafe = false;
//         }
  
//         // Check bodies
//         if (isSafe) {
//           for (let snake of gameState.board.snakes) {
//             for (let segment of snake.body) {
//               if (segment.x == p.x && segment.y == p.y) {
//                 isSafe = false;
//                 break;
//               }
//             }
//             if (!isSafe) break;
//           }
//         }
  
//         // Check if an enemy might move there next
//         if (isSafe) {
//           for (let danger of enemyHeadMoves) {
//             if (danger.x == p.x && danger.y == p.y) {
//               isSafe = false;
//               break;
//             }
//           }
//         }
  
//         scores[dir] = isSafe ? 1 : 0;
//         if (isSafe) count += 1;
//       }
  
//       return { scores, count };
//     }
  
//     function getEnemyHeadNextMoves(myLength = 0) {
//       const dangerTiles = [];
  
//       for (let snake of gameState.board.snakes) {
//         if (snake.id == gameState.you.id) continue; // Skip yourself
  
//         // Mark snakes of equal or greater length as dangerous
//         const isDangerous = snake.body.length >= myLength;
//         if (!isDangerous) continue;
  
//         const head = snake.body[0];
//         const possibleMoves = [
//           { x: head.x + 1, y: head.y },
//           { x: head.x - 1, y: head.y },
//           { x: head.x, y: head.y + 1 },
//           { x: head.x, y: head.y - 1 },
//         ];
  
//         for (let move of possibleMoves) {
//           // Ignore out-of-bounds
//           if (
//             move.x >= 0 &&
//             move.x < gameState.board.width &&
//             move.y >= 0 &&
//             move.y < gameState.board.height
//           ) {
//             dangerTiles.push(move);
//           }
//         }
//       }
  
//       return dangerTiles;
//     }
//   }
  
//   // checking for dead ends and enemy movement
//   function futureSense(move, gameState, depth) {
//     if (depth <= 0) {
//       // base case
//       return true;
//     }
  
//     let newGameState = JSON.parse(JSON.stringify(gameState));
//     let mySnake = newGameState.you;
//     let myBody = mySnake.body;
  
//     let newHead = { ...myBody[0] }; // clone so it can't be changed
//     if (move == "up") {
//       newHead.y += 1;
//     } else if (move == "down") {
//       newHead.y -= 1;
//     } else if (move == "left") {
//       newHead.x -= 1;
//     } else if (move == "right") {
//       newHead.x += 1;
//     }
  
//     myBody.unshift(newHead);
//     if (
//       newHead.x < 0 ||
//       newHead.x > newGameState.board.width - 1 ||
//       newHead.y < 0 ||
//       newHead.y > newGameState.board.height - 1
//     ) {
//       return false;
//     }
//     mySnake.health -= 1;
//     for (let i = 1; i < myBody.length - 1; i++) {
//       if (newHead.x == myBody[i].x && newHead.y == myBody[i].y) {
//         return false;
//       }
//     }
  
//     for (let snake of newGameState.board.snakes) {
//       if (snake.id == mySnake.id) continue;
  
//       let enemyHead = snake.body[0];
//       let possibleEnemyMoves = [];
  
//       let directions = [
//         { move: "up", x: enemyHead.x, y: enemyHead.y + 1 },
//         { move: "down", x: enemyHead.x, y: enemyHead.y - 1 },
//         { move: "left", x: enemyHead.x - 1, y: enemyHead.y },
//         { move: "right", x: enemyHead.x + 1, y: enemyHead.y },
//       ];
  
//       for (let dir of directions) {
//         if (
//           dir.x < 0 ||
//           dir.x > newGameState.board.width ||
//           dir.y < 0 ||
//           dir.y > newGameState.board.height
//         ) {
//           continue;
//         }
//         let hitBody = false;
//         for (let i = 0; i < snake.body.length - 1; i++) {
//           if (dir.x == snake.body[i].x && dir.y == snake.body[i].y) {
//             hitBody = true;
//             break;
//           }
//         }
//         if (!hitBody) {
//           possibleEnemyMoves.push(dir);
//         }
//       }
//       if (possibleEnemyMoves.length == 0) continue;
  
//       let randomMove =
//         possibleEnemyMoves[Math.floor(Math.random() * possibleEnemyMoves.length)];
  
//       snake.body.unshift({ x: randomMove.x, y: randomMove.y });
//       if (snake.health != 100) {
//         snake.body.pop();
//       }
//     }
  
//     for (let snake of newGameState.board.snakes) {
//       if (snake.id == mySnake.id) continue;
  
//       if (snake.body.length > 0) {
//         let enemyHead = snake.body[0];
//         if (newHead.x == enemyHead.x && newHead.y == enemyHead.y) {
//           if (myBody.length <= snake.body.length) {
//             return false;
//           }
//         }
//       }
//       for (let i = 0; i < snake.body.length - 1; i++) {
//         if (newHead.x == snake.body[i].x && newHead.y == snake.body[i].y) {
//           return false;
//         }
//       }
//     }
//     let nextMoves = ["up", "down", "left", "right"];
//     for (let nextMove of nextMoves) {
//       if (futureSense(nextMove, newGameState, depth - 1)) {
//         return true;
//       }
//     }
//     return false;
//   }
  
//   function isValidMove(gameState, move) {
//     const head = gameState.you.head;
//     const boardWidth = gameState.board.width;
//     const boardHeight = gameState.board.height;
  
//     let newPos = { x: head.x, y: head.y };
  
//     if (move == "up") {
//       newPos.y += 1;
//     } else if (move == "down") {
//       newPos.y -= 1;
//     } else if (move == "left") {
//       newPos.x -= 1;
//     } else if (move == "right") {
//       newPos.x += 1;
//     }
//     if (
//       newPos.x < 0 ||
//       newPos.x >= boardWidth ||
//       newPos.y < 0 ||
//       newPos.y >= boardHeight
//     ) {
//       return false;
//     }
  
//     return true;
//   }
  
//   function penalizeHeadProximity(moveScores, myHead, gameState) {
//     const myLength = gameState.you.body.length;
  
//     for (const move in moveScores) {
//       let nextPos = getNextPosition(myHead, move);
//       for (const snake of gameState.board.snakes) {
//         if (snake.id == gameState.you.id) continue;
  
//         const enemyHead = snake.body[0];
//         const enemyLength = snake.body.length;
//         const distance =
//           Math.abs(nextPos.x - enemyHead.x) + Math.abs(nextPos.y - enemyHead.y);
//         let sizePenalty = 1;
//         if (enemyLength >= myLength) {
//           sizePenalty = 2.5;
//         } else {
//           sizePenalty = 0.5;
//         }
//         // Determine penalty based on distance
//         if (distance <= 1) {
//           moveScores[move] -= 500 * sizePenalty;
//         } else if (distance == 2) {
//           moveScores[move] -= 300 * sizePenalty;
//         } else if (distance == 3) {
//           moveScores[move] -= 100 * sizePenalty;
//         } else if (distance <= 5) {
//           moveScores[move] -= 70 * sizePenalty;
//         }
//       }
//     }
  
//     return moveScores;
//   }
  
//   function huntSmallerSnakes(gameState, myHead, myLength, myHealth, moveScores) {
//     if (myLength < 5 || myHealth < 50) return moveScores;
  
//     for (let snake of gameState.board.snakes) {
//       if (snake.id == gameState.you.id) continue;
  
//       const enemyHead = snake.body[0];
//       const enemyLength = snake.body.length;
  
//       if (myLength > enemyLength) {
//         const distance =
//           Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
  
//         const sizeDiff = myLength - enemyLength;
//         const huntBonus = Math.min(sizeDiff * 10, 50);
  
//         if (distance <= 5) {
//           moveScores.right =
//             enemyHead.x > myHead.x
//               ? moveScores.right + 400 + huntBonus
//               : moveScores.right;
//           moveScores.left =
//             enemyHead.x < myHead.x
//               ? moveScores.left + 400 + huntBonus
//               : moveScores.left;
//           moveScores.up =
//             enemyHead.y > myHead.y
//               ? moveScores.up + 400 + huntBonus
//               : moveScores.up;
//           moveScores.down =
//             enemyHead.y < myHead.y
//               ? moveScores.down + 400 + huntBonus
//               : moveScores.down;
//         } else if (distance <= 8) {
//           moveScores.right =
//             enemyHead.x > myHead.x
//               ? moveScores.right + 200 + huntBonus
//               : moveScores.right;
//           moveScores.left =
//             enemyHead.x < myHead.x
//               ? moveScores.left + 200 + huntBonus
//               : moveScores.left;
//           moveScores.up =
//             enemyHead.y > myHead.y
//               ? moveScores.up + 200 + huntBonus
//               : moveScores.up;
//           moveScores.down =
//             enemyHead.y < myHead.y
//               ? moveScores.down + 200 + huntBonus
//               : moveScores.down;
//         } else if (distance <= 10 && sizeDiff > 2) {
//           moveScores.right =
//             enemyHead.x > myHead.x ? moveScores.right + 50 : moveScores.right;
//           moveScores.left =
//             enemyHead.x < myHead.x ? moveScores.left + 50 : moveScores.left;
//           moveScores.up =
//             enemyHead.y > myHead.y ? moveScores.up + 50 : moveScores.up;
//           moveScores.down =
//             enemyHead.y < myHead.y ? moveScores.down + 50 : moveScores.down;
//         }
//       }
//     }
  
//     return moveScores;
//   }
  
//   function centerControlStrategy(gameState, myHead, moveScores) {
//     if (gameState.turn > 100) return moveScores;
  
//     const centerX = Math.floor(gameState.board.width / 2);
//     const centerY = Math.floor(gameState.board.height / 2);
  
//     const distanceToCenter =
//       Math.abs(myHead.x - centerX) + Math.abs(myHead.y - centerY);
  
//     if (distanceToCenter <= 2) return moveScores;
  
//     const moveTowardsCenter = {
//       right: myHead.x < centerX,
//       left: myHead.x > centerX,
//       up: myHead.y < centerY,
//       down: myHead.y > centerY,
//     };
  
//     for (let dir in moveTowardsCenter) {
//       if (moveTowardsCenter[dir]) {
//         moveScores[dir] = moveScores[dir] || 0;
//         moveScores[dir] += 500;
//       }
//     }
  
//     return moveScores;
//   }
  
//   function findBestFood(snakeHead, foodLocations, gameState) {
//     let foodScores = [];
//     const myLength = gameState.you.body.length;
//     const myHealth = gameState.you.health;
//     const isStarving = myHealth < 31; // threshold
  
//     // Check if we're currently in a hazard
//     const inHazard = gameState.board.hazards.some(
//       (haz) => haz.x === snakeHead.x && haz.y === snakeHead.y
//     );
  
//     if (!foodLocations || foodLocations.length == 0) return null;
  
//     // First pass: find all reachable food
//     for (let food of foodLocations) {
//       const pathLength = bfsPathLength(snakeHead, food, gameState);
//       if (pathLength === -1) continue;
  
//       let isInHazard = gameState.board.hazards.some(
//         (haz) => food.x === haz.x && food.y === haz.y
//       );
  
//       if (isInHazard && !isStarving && !inHazard) continue;
  
//       let score = 100 - pathLength * 5;
  
//       const myDistance =
//         Math.abs(snakeHead.x - food.x) + Math.abs(snakeHead.y - food.y);
  
//       for (let snake of gameState.board.snakes) {
//         if (snake.id == gameState.you.id) continue;
  
//         const enemyHead = snake.body[0];
//         const enemyDistance =
//           Math.abs(enemyHead.x - food.x) + Math.abs(enemyHead.y - food.y);
  
//         if (enemyDistance < myDistance) {
//           if (snake.body.length > myLength) {
//             score -= 200;
//           }
//         }
//       }
  
//       foodScores.push({ food, score, isInHazard, pathLength });
//     }
  
//     // If we're in hazard and can't reach safe area in 2 moves, prioritize closest food
//     if (inHazard) {
//       let canReachSafeIn2Moves = canReachSafeAreaInMoves(snakeHead, gameState, 2);
//       if (gameState.you.health < 31) {
//         canReachSafeIn2Moves = canReachSafeAreaInMoves(snakeHead, gameState, 1);
//       }
//       if (!canReachSafeIn2Moves && foodScores.length > 0) {
//         foodScores.sort((a, b) => a.pathLength - b.pathLength);
//         return foodScores[0].food;
//       }
//     }
  
//     if (foodScores.length == 0) {
//       if (isStarving) {
//         for (let food of foodLocations) {
//           const pathLength = bfsPathLength(snakeHead, food, gameState);
//           if (pathLength === -1) continue;
  
//           let isInHazard = gameState.board.hazards.some(
//             (haz) => food.x === haz.x && food.y === haz.y
//           );
  
//           if (isInHazard) {
//             let score = 100 - pathLength * 5 - 50;
//             foodScores.push({ food, score, isInHazard, pathLength });
//           }
//         }
//       }
//       if (foodScores.length === 0) return null;
//     }
  
//     foodScores.sort((a, b) => {
//       if (a.isInHazard && !b.isInHazard) return 1;
//       if (!a.isInHazard && b.isInHazard) return -1;
//       return b.score - a.score;
//     });
  
//     return foodScores[0].food;
//   }
  
//   // Helper function to check if we can reach a safe area within some moves
//   function canReachSafeAreaInMoves(start, gameState, maxMoves) {
//     const { width, height } = gameState.board;
//     const visited = new Set();
//     const queue = [{ pos: start, dist: 0 }];
  
//     const key = (x, y) => `${x},${y}`;
  
//     const isSafe = (x, y) => {
//       if (x < 0 || x >= width || y < 0 || y >= height) return false;
  
//       const isHazardFree = !gameState.board.hazards.some(
//         (haz) => haz.x === x && haz.y === y
//       );
  
//       const isSnakeFree = !gameState.board.snakes.some((snake) =>
//         snake.body.some((segment) => segment.x === x && segment.y === y)
//       );
  
//       return isHazardFree && isSnakeFree;
//     };
  
//     while (queue.length > 0) {
//       const { pos, dist } = queue.shift();
//       const k = key(pos.x, pos.y);
//       if (visited.has(k)) continue;
//       visited.add(k);
  
//       if (dist <= maxMoves) {
//         const isCurrentHazard = gameState.board.hazards.some(
//           (haz) => haz.x === pos.x && haz.y === pos.y
//         );
//         if (!isCurrentHazard) {
//           return true;
//         }
//       } else {
//         return false;
//       }
  
//       for (const [dx, dy] of [
//         [0, 1],
//         [1, 0],
//         [-1, 0],
//         [0, -1],
//       ]) {
//         const nx = pos.x + dx;
//         const ny = pos.y + dy;
//         if (isSafe(nx, ny)) {
//           queue.push({ pos: { x: nx, y: ny }, dist: dist + 1 });
//         }
//       }
//     }
  
//     return false;
//   }
  
//   function bfsPathLength(start, goal, gameState) {
//     const { width, height } = gameState.board;
//     const visited = new Set();
//     const queue = [{ pos: start, dist: 0 }];
  
//     const key = (x, y) => `${x},${y}`;
  
//     const isSafe = (x, y) => {
//       if (x < 0 || x >= width || y < 0 || y >= height) return false;
  
//       for (const snake of gameState.board.snakes) {
//         for (const segment of snake.body) {
//           if (segment.x === x && segment.y === y) {
//             if (segment.x === goal.x && segment.y === goal.y) continue; // allow goal
//             return false;
//           }
//         }
//       }
//       return true;
//     };
  
//     while (queue.length > 0) {
//       const { pos, dist } = queue.shift();
//       const k = key(pos.x, pos.y);
//       if (visited.has(k)) continue;
//       visited.add(k);
  
//       if (pos.x === goal.x && pos.y === goal.y) return dist;
  
//       for (const [dx, dy] of [
//         [0, 1],
//         [1, 0],
//         [-1, 0],
//         [0, -1],
//       ]) {
//         const nx = pos.x + dx;
//         const ny = pos.y + dy;
//         if (isSafe(nx, ny)) {
//           queue.push({ pos: { x: nx, y: ny }, dist: dist + 1 });
//         }
//       }
//     }
  
//     return -1; // unreachable
//   }
  
//   function avoidTailsAboutToEat(gameState, myHead, moveScores) {
//     const myNextPositions = {
//       up: { x: myHead.x, y: myHead.y + 1 },
//       down: { x: myHead.x, y: myHead.y - 1 },
//       left: { x: myHead.x - 1, y: myHead.y },
//       right: { x: myHead.x + 1, y: myHead.y },
//     };
  
//     for (const snake of gameState.board.snakes) {
//       if (snake.id == gameState.you.id) continue;
//       const enemyHead = snake.body[0];
//       const enemyTail = snake.body[snake.body.length - 1];
//       let aboutToEat = false;
//       const enemyNextMoves = [
//         { x: enemyHead.x + 1, y: enemyHead.y },
//         { x: enemyHead.x - 1, y: enemyHead.y },
//         { x: enemyHead.x, y: enemyHead.y + 1 },
//         { x: enemyHead.x, y: enemyHead.y - 1 },
//       ];
//       for (const food of gameState.board.food) {
//         for (const nextMove of enemyNextMoves) {
//           if (nextMove.x == food.x && nextMove.y == food.y) {
//             aboutToEat = true;
//             break;
//           }
//         }
//         if (aboutToEat) break;
//       }
//       if (aboutToEat) {
//         for (const [direction, nextPos] of Object.entries(myNextPositions)) {
//           if (nextPos.x == enemyTail.x && nextPos.y == enemyTail.y) {
//             moveScores[direction] -= 300;
//             console.log(
//               `Snake ID: ${gameState.you.id} Turn: ${gameState.turn} - Avoiding move ${direction} - enemy about to eat, tail won't move!`
//             );
//           }
//         }
//       }
//     }
  
//     return moveScores;
//   }
  
//   function enemyTrapped(gameState, moveScores) {
//     const myHead = gameState.you.body[0];
//     const myLength = gameState.you.body.length;
//     const board = gameState.board;
  
//     const directions = [
//       { name: "up", dx: 0, dy: -1 },
//       { name: "down", dx: 0, dy: 1 },
//       { name: "left", dx: -1, dy: 0 },
//       { name: "right", dx: 1, dy: 0 },
//     ];
  
//     const isOccupied = (x, y) => {
//       for (const snake of board.snakes) {
//         for (const segment of snake.body) {
//           if (segment.x === x && segment.y === y) return true;
//         }
//       }
//       return false;
//     };
  
//     const inBounds = (x, y) =>
//       x >= 0 && x < board.width && y >= 0 && y < board.height;
  
//     for (const enemy of board.snakes) {
//       if (enemy.id === gameState.you.id) continue;
//       const head = enemy.body[0];
//       const nearWall =
//         head.x === 0 ||
//         head.x === board.width - 1 ||
//         head.y === 0 ||
//         head.y === board.height - 1;
  
//       if (!nearWall) continue;
  
//       let escapeRoutes = 0;
//       let lastOpenDir = null;
  
//       for (const dir of directions) {
//         const nx = head.x + dir.dx;
//         const ny = head.y + dir.dy;
  
//         if (!inBounds(nx, ny)) continue;
//         if (!isOccupied(nx, ny)) {
//           escapeRoutes++;
//           lastOpenDir = dir;
//         }
//       }
  
//       if (escapeRoutes === 1 && lastOpenDir) {
//         // Check if your head is pushing into that single tile
//         const yourNextToThatTile =
//           myHead.x === head.x + lastOpenDir.dx &&
//           myHead.y === head.y + lastOpenDir.dy;
  
//         if (yourNextToThatTile) {
//           moveScores[lastOpenDir.name] =
//             (moveScores[lastOpenDir.name] || 0) + 1500;
//         }
//       }
//     }
  
//     return moveScores;
//   }



export default function move(game){
  const gameState = game;
  const myHead = gameState.you.body[0];
  const headNode = getNodeId(myHead, gameState);
  let board = {};
  let hazards = [];

  if(gameState.board.hazards){
      for(let i = 0; i < gameState.board.hazards.length; i++){
          hazards.push(getNodeId(gameState.board.hazards[i], gameState));
      }
  }

  //console.log(gameState.board.snakes);

  //INIT BOARD
  let c = 0;
  for(let i=0; i<gameState.board.height; i++){
      for(let j=0; j<gameState.board.width; j++){
          board[c] = {position:{x:j, y:i}, connections:[], id:c};
          c++;
      }
  }
  board = connectNodes(gameState, board);

  let state;
  let pathfindTo;

  let longestLength = 0;
  for(let i = 0; i < gameState.board.snakes.length; i++){
      if(gameState.board.snakes[i].id != gameState.you.id){
          if (gameState.board.snakes[i].length > longestLength){
              longestLength = gameState.board.snakes[i].length
          }
      }
  }

  pathfindTo = nearestFood(gameState, board, myHead, gameState.you.body[0]);

  if((gameState.you.health > 40 && gameState.you.body.length > longestLength + 1) && !(hazards.length > 0)){
      console.log("Hunting")
      pathfindTo = huntSnake(gameState, board, headNode);
  }

  if(gameState.you.health > 40 && gameState.you.body.length >= 20){
      pathfindTo = huntSnake(gameState, board, getNodeId(gameState.you.body[gameState.you.body.length-1], gameState));
  }

  pathfindTo = flood(pathfindTo, headNode, board, gameState, myHead);

  if(checkEnclosure(board, headNode, gameState).turns == 0){
      pathfindTo = findClosestOpening(gameState, board, headNode).path;
  }

  if(checkEnclosure(board, headNode, gameState) && !aStar(board, headNode, pathfindTo).path[1]){
      console.log("Enclosed, Closest Opening:");
      console.log(findClosestOpening(gameState, board, headNode));
      let pathToNearest = findClosestOpening(gameState, board, headNode).path[1]


      pathfindTo = pathToNearest;
  }

  let path = aStar(board, headNode, pathfindTo);

  console.log("Path: " + path.path + " Cost: " + path.cost);
  
  
  if(path.cost > 19){
      console.log("Unsafe, checking moves: " + board[headNode].connections.length);
      let lowestCost = {path: [], cost: Infinity};
      for(let i = 0; i < board[headNode].connections.length; i++){
          let newPath = aStar(board, headNode, board[headNode].connections[i][0]);
          console.log(newPath)
          if(newPath.cost < lowestCost.cost){
              //console.log("through balls")
              lowestCost.path = newPath;
              lowestCost.cost = newPath.cost;
          }
      }
      if(path.cost > lowestCost.cost){
          path = lowestCost.path;
      }
  }
  
  if(path.cost == Infinity){
      console.log("No Path, Closest Opening:")
      console.log(findClosestOpening(gameState, board, headNode));
      let path1 = aStar(board, headNode, board[findClosestOpening(gameState, board, headNode).path[1]].connections[0][0]);
      let path2 = aStar(board, headNode, board[findClosestOpening(gameState, board, headNode).path[1]].connections[1][0]);


      path = path1.path[1] ? path1 : path2;
  }
  
  let nextMove = calculateNextMove(path.path[1], board, headNode);
  
  console.log(`MOVE ${gameState.turn}: ${nextMove}`)
  return { move: nextMove };
}

//BUILD GRAPH
//
//
function connectNodes(gameState, board){
  let snakeBodies = [];
  let snakeHeads = [];
  let hazards = [];
  let edges = [];
  let food = [];
  const tailNode = getNodeId(gameState.you.body[gameState.you.body.length-1], gameState);

  for(let i = 0; i < gameState.board.snakes.length; i++){
      if(gameState.board.snakes[i].id != gameState.you.id){
          for(let j = 0; j < gameState.board.snakes[i].body.length-1; j++){
              snakeBodies.push(getNodeId(gameState.board.snakes[i].body[j], gameState))
          }
          let headPoint = gameState.board.snakes[i].body[0];
          if(gameState.board.snakes[i].body.length >= gameState.you.body.length){
              snakeHeads.push(getNodeId({x: headPoint.x+1, y: headPoint.y}, gameState));
              snakeHeads.push(getNodeId({x: headPoint.x-1, y: headPoint.y}, gameState));
              snakeHeads.push(getNodeId({x: headPoint.x, y: headPoint.y+1}, gameState));
              snakeHeads.push(getNodeId({x: headPoint.x, y: headPoint.y-1}, gameState));
          }
      }
  }
  let c = 0;
  for(let i = 0; i < gameState.board.height; i++){
      edges.push(getNodeId({x: 0, y: 0 + c}, gameState));
      edges.push(getNodeId({x: gameState.board.width - 1, y: 0 + c}, gameState));
  }
  for(let i = 0; i < gameState.board.width; i++){
      edges.push(getNodeId({x: 0 + c, y: 0}, gameState));
      edges.push(getNodeId({x: 0 + c, y: gameState.board.height - 1}, gameState));
  }
  if(gameState.board.hazards){
      for(let i = 0; i < gameState.board.hazards.length; i++){
          hazards.push(getNodeId(gameState.board.hazards[i], gameState));
      }
  }
  for(let i = 0; i < gameState.you.body.length; i++){
      const bodyNode = getNodeId(gameState.you.body[i], gameState);
      if(bodyNode != tailNode || (gameState.you.health == 100 && beside(gameState.you.body[0], gameState.you.body[gameState.you.body.length-1]))){
          snakeBodies.push(bodyNode);
      }
  }
  for(let i = 0; i < gameState.board.food.length; i++){
      food.push(getNodeId(gameState.board.food[i], gameState));
  }

  for(let i = 0; i < (gameState.board.width * gameState.board.height); i++){
      for(let j = 0; j < (gameState.board.width * gameState.board.height); j++)   
      {
          if(((board[j].position.x == board[i].position.x-1 && board[j].position.y == board[i].position.y) || 
          (board[j].position.x == board[i].position.x+1 && board[j].position.y == board[i].position.y) || 
          (board[j].position.y == board[i].position.y-1 && board[j].position.x == board[i].position.x) || 
          (board[j].position.y == board[i].position.y+1 && board[j].position.x == board[i].position.x)) &&
          (!snakeBodies.includes(j))){
              if (snakeHeads.includes(j) && food.includes(j)){
                  board[i].connections.push([j, 110]);
              } else if(snakeHeads.includes(j)){
                  board[i].connections.push([j, 100]);
              } else if(hazards.includes(j) || edges.includes(j)){
                  board[i].connections.push([j, 20]);
              }else if(food.includes(j)){
                  board[i].connections.push([j, 5]);
              } else {
                  board[i].connections.push([j, 1]);
              }
          };
      }
  }

  for(let i = 0; i < board.length; i++){
      if(board[i].connections.length == 1 || board[i].connections.length == 2){
          board[i].connections[0][1] = 100;
          board[i].connections[1][1] = 100;
      }
  }

  return board;
}
//
// END BUILD GRAPH

// A-STAR APTHFINDING
//
//
function aStar(graph, start, target, from = undefined){
  let openSet = [{ node: start, f: 0, path: [start] }];
  let gScores = { [start]: 0 };

  while (openSet.length > 0) {

      openSet.sort((a, b) => a.f - b.f);
      let current = openSet.shift();
      if(from == 'flood'){
          console.log(current.path);
      }

      if (current.node === target) {
          return { path: current.path, cost: gScores[target] };
      };
      
      for (let [neighbor, cost] of graph[current.node].connections) {
          let tentativeG = gScores[current.node] + cost;

          
          if (!(neighbor in gScores) || tentativeG < gScores[neighbor]) {
              gScores[neighbor] = tentativeG;
              let fScore = tentativeG + heuristic(neighbor, target, graph);
              openSet.push({ node: neighbor, f: fScore, path: [...current.path, neighbor] });
          };
      };
  };
  
  return { path: [], cost: Infinity };
};

function heuristic(start, target, nodes){
  if(start != null && target != null){
      return (Math.abs(nodes[start].position.x - nodes[target].position.x) + Math.abs(nodes[start].position.y - nodes[target].position.y));
  } else {
      return Infinity;
  };
};

function findLongestPath(board, start, end) {
  let maxPath = [];
  let maxWeight = -Infinity;

  function dfs(current, path, weight, visited) {
      if (current === end) {
          if (weight > maxWeight) {
              maxWeight = weight;
              maxPath = [...path];
          }
          return;
      }

      for (const [neighbor, cost] of board[current].connections || []) {
          if (!visited.has(neighbor) && cost != 100) {
              visited.add(neighbor);
              path.push(neighbor);
              dfs(neighbor, path, weight + cost, visited);
              path.pop();
              visited.delete(neighbor);
          }
      }
  }

  dfs(start, [start], 0, new Set([start]));

  return { path: maxPath, cost: maxWeight };
}

//
// END A-STAR

// NEAREST/FARTHEST
//
//

function nearestFood(gameState, board, myHead, start){
  
  let foodNodes = [];
  
  for(let i = 0; i < gameState.board.food.length; i++){
      foodNodes.push(getNodeId(gameState.board.food[i], gameState));
  }
  let safeFood = bfs(board, getNodeId(start, gameState), gameState, foodNodes);
  
  let nearest = {path: Infinity, food: undefined};
  let possible = {path:Infinity, food: undefined};
  for(let i = 0; i < safeFood.length; i++){
      let pathToFood = aStar(board, getNodeId(myHead, gameState), safeFood[i])
      if(pathToFood.cost > 19){
          continue;
      }
      let dist = pathToFood.path.length;
      if(dist < nearest.path && (board[safeFood[i]].connections.length >= 3 || (board[safeFood[i]].connections.length >= 1 && beside(myHead, board[safeFood[i]].position)))){
          nearest.path = dist;
          nearest.food = i;
      }
      if(dist < possible.path && board[safeFood[i]].connections.length == 2){
          possible.path = dist;
          possible.food = i;
      }
  }
  if(nearest.food != undefined){
      return safeFood[nearest.food];
  } else if(possible.food != undefined){
      return safeFood[possible.food];
  } else {
      console.log("No Food, Moving to Tail");
      return aStar(board, getNodeId(myHead, gameState), getNodeId(gameState.you.body[gameState.you.body.length-1], gameState)).path[1];
  }
  
}

function huntSnake(gameState, board, headNode){
  let snakeIndicesByLength = [];
  for(let i = 0; i < gameState.board.snakes.length; i++){
      if(gameState.board.snakes[i].id != gameState.you.id){
          snakeIndicesByLength.push(i);
      }
  }

  snakeIndicesByLength.sort((a, b) => gameState.board.snakes[b].body.length-gameState.board.snakes[a].body.length);

  for(let i = 0; i < snakeIndicesByLength.length; i++){
      let connectionsArr = besideArr(gameState.board.snakes[i].body[0], gameState);
      for(let i = 0; i < connectionsArr.length; i++){
          let pathToConnection = aStar(board, headNode, connectionsArr[i]);
          if(pathToConnection.path[1]){
              return pathToConnection.path[1];
          }
      }
  }
}

function checkEnclosure(board, headNode, gameState){
  let up = bfs(board, getNodeId({x:board[headNode].position.x, y:board[headNode].position.y + 1}, gameState) ?? headNode);
  let down = bfs(board, getNodeId({x:board[headNode].position.x, y:board[headNode].position.y - 1}, gameState) ?? headNode);
  let left = bfs(board, getNodeId({x:board[headNode].position.x - 1, y:board[headNode].position.y}, gameState) ?? headNode);
  let right = bfs(board, getNodeId({x:board[headNode].position.x + 1, y:board[headNode].position.y}, gameState) ?? headNode);

  let arr = [up, down, left, right];
  arr = arr.filter((dir) => dir != undefined);
  arr = arr.sort((a, b) => a - b);
  return arr[arr.length-1] < gameState.you.body.length;
}

function besideArr(point, gameState){
  let connectionUp = getNodeId({x: point.x, y: point.y + 1}, gameState);
  let connectionDown = getNodeId({x: point.x, y: point.y - 1}, gameState);
  let connectionLeft = getNodeId({x: point.x - 1, y: point.y}, gameState);
  let connectionRight = getNodeId({x: point.x + 1, y: point.y}, gameState);

  let connectionsArr = [connectionUp, connectionDown, connectionLeft, connectionRight];
  connectionsArr = connectionsArr.filter((node) => node != undefined);
  connectionsArr = connectionsArr.filter((node) => !isOccupied(node, gameState));

  return connectionsArr;
}

function findClosestOpening(gameState, board, headNode) {
  const snakeBody = gameState.you.body;
  const tailIndex = snakeBody.length - 1;

  const pathToTail = aStar(board, headNode, getNodeId(snakeBody[tailIndex], gameState));
  if(pathToTail.path[1]){
      return {path: pathToTail.path, turns: 0};
  }

  for (let turn = 1; turn <= tailIndex; turn++) {
      
      const futureTail = snakeBody[tailIndex - turn]; 
      const futureTailNode = getNodeId(futureTail, gameState);

      let connectionsArr = besideArr(futureTail, gameState);

      if(findLongestPath(board, headNode, connectionsArr[0]).path[1]) {
          //console.log("1st path + " + { path: aStar(board, headNode, connectionsArr[0]).path, turns: turn }.path);
          console.log("Taking path 1");
          return { path: findLongestPath(board, headNode, connectionsArr[0]).path, turns: turn }; 
      } else if(findLongestPath(board, headNode, connectionsArr[1]).path[1]){
          //console.log("2nd path + " + { path: aStar(board, headNode, connectionsArr[0]).path, turns: turn }.path);
          console.log("Taking path 2");
          return { path: findLongestPath(board, headNode, connectionsArr[1]).path, turns: turn }; 
      }
  }


  return null;
}

//
//
// NEAREST/FARTHEST

// TOOLS
//
//

// IS OCCUPIED
function isOccupied(node, gameState) {
  let snakeBodies = gameState.board.snakes.flatMap(snake => snake.body);
  snakeBodies = snakeBodies.map((part) => getNodeId(part, gameState));
  //console.log(snakeBodies);
  return snakeBodies.includes(node);
}

// GET NODE ID
function getNodeId(pos, gameState){
  if(pos.y < gameState.board.height && pos.x < gameState.board.width && pos.y >= 0 && pos.x >= 0){
      return pos.y*gameState.board.width + pos.x;
  } else {
      return undefined;
  }
}

// FLOOD MAP TO CHOOSE BEST DIRECTION
function flood(prevPath, headNode, board, gameState, myHead){
  let paths = [];
  for(let i = 0; i < board[headNode].connections.length; i++){
      paths.push({connection: i, space: bfs(board, board[headNode].connections[i][0])})
  };
  
  paths.sort((a, b) => b.space - a.space);

  let equal = true;
  for(let i = 0; i < paths.length-1; i++){
      if(paths[i+1]){
          if(paths[i].space != paths[i+1].space){
              equal = false;
          }
      }
  }

  let findTail = aStar(board, headNode, getNodeId(gameState.you.body[gameState.you.body.length-1], gameState));
  //console.log(findTail);

  if(findTail.path[1] && (!aStar(board, board[headNode].connections[paths[0].connection][0], board[headNode].connections[paths[paths.length-1].connection][0]).path[1] || board[headNode].connections[paths[0].connection][0] == board[headNode].connections[paths[paths.length-1].connection][0])){
      //console.log("finding tail side " + findTail.path);
      return findTail.path[1];
  }
  
  if(beside(gameState.you.body[0], gameState.you.body[gameState.you.body.length-1]) && gameState.you.health < 100 && gameState.you.health > 50 && checkEnclosure(board, headNode, gameState)){
      return getNodeId(gameState.you.body[gameState.you.body.length-1], gameState);
  }
  if(!equal){
      if(paths[1]){
          if(paths[1].space == paths[0].space && board[getNodeId(myHead, gameState)].connections[paths[1].connection][0] == prevPath){
              return prevPath
          }
      }
      return board[headNode].connections[paths[0].connection][0];
  }

  return prevPath;
}

// BREADTH FIRST SEARCH FOR COUNTING SQUARES OR SEARCHING FOR TARGETS
function bfs(graph, start, gameState = undefined, targets = undefined) {
  const visited = new Set();
  const queue = [start];
  let avaliableTargets = [];
  let c = 0;

  while (queue.length > 0) {
    const node = queue.shift();
    
      if (!visited.has(node)) {
          c++;
          visited.add(node);
          if(targets){
              if(targets.includes(node)){
                  avaliableTargets.push(node);
              }
          }
          for (const [neighbor, cost] of graph[node].connections) {
              if (!visited.has(neighbor)) {
                  queue.push(neighbor); 
              }
          }
      }
  }
  if(targets){
      return avaliableTargets;
  }
  return c;
}

// BESIDE T/F
function beside(posA, posB){
  if((Math.abs(posA.x - posB.x) < 2 && posA.y == posB.y) || (Math.abs(posA.y - posB.y) < 2 && posA.x == posB.x)){
      return true;
  } else {
      return false;
  }
}

//FIND MOVE
function calculateNextMove(path, board, headNode){
  if(board[path].position.x == board[headNode].position.x-1){
      return "left"
  }
  if(board[path].position.x == board[headNode].position.x+1){
      return "right"
  }
  if(board[path].position.y == board[headNode].position.y-1){
      return "down"
  }
  if(board[path].position.y == board[headNode].position.y+1){
      return "up"
  }
}

//
//
// END TOOLS
