// // export default function move(gameState) {
// //     const myHead = gameState.you.body[0];
// //     const myNeck = gameState.you.body[1];
// //     const myTail = gameState.you.body[gameState.you.body.length - 1];
// //     const center = {
// //         x: Math.floor(gameState.board.width - 1) / 2,
// //         y: Math.floor(gameState.board.height - 1) / 2
// //     }
// //     const nearMid = myHead.x > 1 && myHead.x < gameState.board.width - 2 && myHead.y > 1 && myHead.y < gameState.board.height - 2;
// //     let targetMoves = {
// //         up: false,
// //         down: false,
// //         left: false,
// //         right: false
// //     }
// //     let moveSafety = {
// //         up: true,
// //         down: true,
// //         left: true,
// //         right: true
// //     };
// //     let pathSafety = {
// //         up: true,
// //         down: true,
// //         left: true,
// //         right: true
// //     };
// //     if (myNeck.x < myHead.x || 0 == myHead.x) { moveSafety.left = false; }
// //     if (myNeck.x > myHead.x || gameState.board.width == myHead.x + 1) { moveSafety.right = false; }
// //     if (myNeck.y < myHead.y || 0 == myHead.y) { moveSafety.down = false; }
// //     if (myNeck.y > myHead.y || gameState.board.height == myHead.y + 1) { moveSafety.up = false; }
// //     for (let s = 0; s < gameState.board.snakes.length; s++) {
// //         for (let i = 0; i < gameState.board.snakes[s].body.length - 1; i++) {
// //             let body = gameState.board.snakes[s].body[i];
// //                       if (isHazard({ x: myHead.x - 1, y: myHead.y })) moveSafety.left = false;
// //               if (isHazard({ x: myHead.x + 1, y: myHead.y })) moveSafety.right = false;
// //               if (isHazard({ x: myHead.x, y: myHead.y + 1 })) moveSafety.up = false;
// //               if (isHazard({ x: myHead.x, y: myHead.y - 1 })) moveSafety.down = false;
// //   if (body.x == myHead.x - 1 && body.y == myHead.y) {
// //                 moveSafety.left = false;
// //             } else if (body.x == myHead.x + 1 && body.y == myHead.y) {
// //                 moveSafety.right = false;
// //             } else if (body.y == myHead.y - 1 && body.x == myHead.x) {
// //                 moveSafety.down = false;
// //             } else if (body.y == myHead.y + 1 && body.x == myHead.x) {
// //                 moveSafety.up = false;
// //             }
// //         }
// //         //deal with head on collisions
// //         if (gameState.board.snakes[s].id != gameState.you.id && gameState.board.snakes[s].body.length >= gameState.you.body.length) {
// //             let head = gameState.board.snakes[s].body[0];
// //             let adjacent = {
// //                 left: { x: myHead.x - 1, y: myHead.y },
// //                 right: { x: myHead.x + 1, y: myHead.y },
// //                 up: { x: myHead.x, y: myHead.y + 1 },
// //                 down: { x: myHead.x, y: myHead.y - 1 }
// //             };
// //             for (let direction in adjacent) {
// //                 let square = adjacent[direction];
// //                 if ((head.x == square.x - 1 && head.y == square.y) ||
// //                     (head.x == square.x + 1 && head.y == square.y) ||
// //                     (head.x == square.x && head.y == square.y - 1) ||
// //                     (head.x == square.x && head.y == square.y + 1)) {
// //                     pathSafety[direction] = false;
// //                 }
// //             }
// //         }
// //     }
  
// //     function moveTo(pos) {
// //         let xDis = pos.x - myHead.x;
// //         let yDis = pos.y - myHead.y;
// //         if (xDis < 0) { targetMoves.left = true; } else if (xDis > 0) { targetMoves.right = true; }
// //         if (yDis < 0) { targetMoves.down = true; } else if (yDis > 0) { targetMoves.up = true; }
// //     }
  
// //     let isHungry = gameState.you.health < 20 || gameState.you.body.length % 2 != 0 || gameState.board.snakes.some(s => s.id !== gameState.you.id && s.body.length >= gameState.you.body.length - 2);
// //     //if (nearMid == false && gameState.you.health > 8 && gameState.you.body.length > 4) { isHungry = false; };
// //     if (isHungry && gameState.board.food.length > 0) {
// //         let closestFood = gameState.board.food[0];
  
// //       // Filter food that is accessible or near enough hazard (calculated risk)
// //       const viableFood = gameState.board.food.filter(food => {
// //           const dist = Math.abs(food.x - myHead.x) + Math.abs(food.y - myHead.y);
// //           const hazard = isHazard(food);
// //           if (!hazard) return true;
// //           return dist <= 2 && gameState.you.health > 25; // permit short hazard reach if not too risky
// //       });
// //       if (viableFood.length > 0) gameState.board.food = viableFood;
  
// //         let targetFood = {
// //             distanceTotal: Math.abs(closestFood.x - myHead.x) + Math.abs(closestFood.y - myHead.y),
// //             distanceX: closestFood.x - myHead.x,
// //             distanceY: closestFood.y - myHead.y
// //         }
// //         for (let i = 1; i < gameState.board.food.length; i++) {
// //             let food = gameState.board.food[i];
// //             let d = Math.abs(food.x - myHead.x) + Math.abs(food.y - myHead.y);
// //             if (d < targetFood.distanceTotal) {
// //                 closestFood = food;
// //                 targetFood = {
// //                     distanceTotal: d,
// //                     distanceX: food.x - myHead.x,
// //                     distanceY: food.y - myHead.y,
// //                 }
// //             }
// //         }
// //         moveTo(closestFood);
// //     } else if (nearMid) {
// //         moveTo(myTail);
// //         //moveTo(center);
// //     } else {
// //         //moveTo(center);
// //         moveTo(myTail)
// //     }
    
// //   function isHazard(pos) {
// //       return gameState.board.hazards?.some(hz => hz.x === pos.x && hz.y === pos.y) || false;
// //   }
// //   function hazardPenalty(pos) {
// //       if (!isHazard(pos)) return 0;
  
// //       const distanceToCenter = Math.abs(pos.x - Math.floor(gameState.board.width / 2)) + Math.abs(pos.y - Math.floor(gameState.board.height / 2));
// //       const trappedNearEdge = pos.x === 0 || pos.y === 0 || pos.x === gameState.board.width - 1 || pos.y === gameState.board.height - 1;
  
// //       let penalty = 8; // base penalty
// //       if (gameState.you.health < 30) penalty += 10;
// //       if (trappedNearEdge) penalty += 5;
// //       if (distanceToCenter > 4) penalty += 3;
  
// //       return penalty;
// //   }
  
// //   // Queue-based flood fill
// //     function floodpath(x, y) {
// //         const directions = [
// //             { x: 0, y: 1 },  // up
// //             { x: 0, y: -1 }, // down
// //             { x: -1, y: 0 }, // left
// //             { x: 1, y: 0 }   // right
// //         ];
    
// //         let visited = new Set();
// //         let queue = [{ x: x, y: y, risk: 0 }];
// //         let path = [];
    
// //         visited.add(`${x},${y}`);
    
// //         function bottleNeck(x, y) {
// //             let risk = 0;
// //             for (let snake of gameState.board.snakes) {
// //                 if (snake.id !== gameState.you.id) {
// //                     for (let i = 0; i < snake.body.length; i++) {
// //                         let bodyPart = snake.body[i];
// //                         if (
// //                             (bodyPart.x === x - 1 && bodyPart.y === y) ||
// //                             (bodyPart.x === x + 1 && bodyPart.y === y) ||
// //                             (bodyPart.x === x && bodyPart.y === y - 1) ||
// //                             (bodyPart.x === x && bodyPart.y === y + 1) 
// //                         ) {
// //                             risk++;
// //                         }
// //                     }
// //                     if (
// //                         ((snake.body.some(part => part.x === x - 1 && part.y === y) && snake.body.some(part => part.x === x + 1 && part.y === y)) || 
// //                          (snake.body.some(part => part.x === x && part.y === y - 1) && snake.body.some(part => part.x === x && part.y === y + 1)))
// //                     ) {
// //                         risk += 2;
// //                     }}}
// //             return risk;
// //         }        
    
// //         while (queue.length > 0) {
// //             let { x, y, risk = 0 } = queue.shift();
// //             path.push({ x, y, risk });
        
// //             for (let { x: dx, y: dy } of directions) {
// //                 let newX = x + dx;
// //                 let newY = y + dy;
// //                 const key = `${newX},${newY}`;
        
// //                 if (newX >= 0 && newX < gameState.board.width &&
// //                     newY >= 0 && newY < gameState.board.height &&
// //                     !visited.has(key)) {
        
// //                     let isBlocked = false;
// //                     for (let s = 0; s < gameState.board.snakes.length; s++) {
// //                         for (let i = 0; i < gameState.board.snakes[s].body.length - 1; i++) {
// //                             let body = gameState.board.snakes[s].body[i];
// //                             if (body.x == newX && body.y == newY) {
// //                                 isBlocked = true;
// //                                 break;
// //                             }
// //                         }
// //                         if (isBlocked) break;
// //                     }
        
// //                     if (!isBlocked) {
// //                         visited.add(key);
// //                         const risk = bottleNeck(newX, newY);
// //                         queue.push({ x: newX, y: newY, risk });
// //                     }
// //                 }
// //             }
// //         }        
    
// //         return path;
// //     }
// //   // Function to check if the tail is adjacent to the filled space
// //   function checkTailAdjacencyToFilledSpace(path, tail) {
// //     return path.some(space => 
// //         (space.x === tail.x - 1 && space.y === tail.y) ||
// //         (space.x === tail.x + 1 && space.y === tail.y) ||
// //         (space.x === tail.x && space.y === tail.y - 1) ||
// //         (space.x === tail.x && space.y === tail.y + 1)
// //     );
// //   }
// //   function totalRisk(path) {
// //     return path.reduce((sum, step) => sum + (step.risk || 0), 0);
// //   }
// //   let rightPath = floodpath(myHead.x + 1, myHead.y);
// //   let leftPath = floodpath(myHead.x - 1, myHead.y);
// //   let upPath = floodpath(myHead.x, myHead.y + 1);
// //   let downPath = floodpath(myHead.x, myHead.y - 1);
  
// //   if (rightPath.length > gameState.you.body.length || leftPath.length > gameState.you.body.length || upPath.length > gameState.you.body.length || downPath.length > gameState.you.body.length) {
// //     if (rightPath.length <= gameState.you.body.length) { pathSafety.right = false; console.log("dead end detected right on turn " + gameState.turn); }
// //     if (leftPath.length <= gameState.you.body.length) { pathSafety.left = false; console.log("dead end detected left on turn " + gameState.turn); }
// //     if (upPath.length <= gameState.you.body.length) { pathSafety.up = false; console.log("dead end detected up on turn " + gameState.turn); }
// //     if (downPath.length <= gameState.you.body.length) { pathSafety.down = false; console.log("dead end detected down on turn " + gameState.turn); }
// //   } else {
// //     console.log("all dead end detected on turn " + gameState.turn);
// //     if (checkTailAdjacencyToFilledSpace(rightPath, myTail)&&moveSafety.right) {
// //         pathSafety.right = true;pathSafety.left = false; pathSafety.up = false; pathSafety.down = false;
// //         console.log("Tail is adjacent to filled space right on turn " + gameState.turn);
// //     }else if (checkTailAdjacencyToFilledSpace(leftPath, myTail)&&moveSafety.left) {
// //         pathSafety.right = false;pathSafety.left = true; pathSafety.up = false; pathSafety.down = false;
// //         console.log("Tail is adjacent to filled space left on turn " + gameState.turn);
// //     }else if (checkTailAdjacencyToFilledSpace(upPath, myTail)&&moveSafety.up) {
// //         pathSafety.right = false;pathSafety.left = false; pathSafety.up = true; pathSafety.down = false;
// //         console.log("Tail is adjacent to filled space up on turn " + gameState.turn);
// //     }else if (checkTailAdjacencyToFilledSpace(downPath, myTail)&&moveSafety.right) {
// //         pathSafety.right = false;pathSafety.left = false; pathSafety.up = false; pathSafety.down = true;
// //         console.log("Tail is adjacent to filled space down on turn " + gameState.turn);
// //     } else {
// //         // Find the direction with the biggest flood fill area
// //         let directionAreas = {
// //             right: moveSafety.right ? rightPath.length : 0,
// //             left: moveSafety.left ? leftPath.length : 0,
// //             up: moveSafety.up ? upPath.length : 0,
// //             down: moveSafety.down ? downPath.length : 0
// //         };
// //         let bestDirection = Object.keys(directionAreas).reduce((a, b) => directionAreas[a] > directionAreas[b] ? a : b);
// //         // Set that direction as the only safe one
// //         pathSafety.right = false;
// //         pathSafety.left = false;
// //         pathSafety.up = false;
// //         pathSafety.down = false;
// //         pathSafety[bestDirection] = true;
// //         console.log("Choosing largest flood fill area: " + bestDirection + " on turn " + gameState.turn);
// //     }
// //   }
  
// //   let directionInfo = {
// //     right: { path: rightPath, risk: totalRisk(rightPath), length: rightPath.length, safe: moveSafety.right && pathSafety.right },
// //     left: { path: leftPath, risk: totalRisk(leftPath), length: leftPath.length, safe: moveSafety.left && pathSafety.left },
// //     up: { path: upPath, risk: totalRisk(upPath), length: upPath.length, safe: moveSafety.up && pathSafety.up },
// //     down: { path: downPath, risk: totalRisk(downPath), length: downPath.length, safe: moveSafety.down && pathSafety.down },
// //   };
  
// //   let safeDirections = Object.keys(directionInfo).filter(dir => directionInfo[dir].safe);
  
// //   if (safeDirections.length === 0) {
// //     safeDirections = Object.keys(moveSafety).filter(dir => moveSafety[dir]);
// //   }
  
// //   let prioritized = Object.keys(targetMoves).filter(dir => targetMoves[dir] && safeDirections.includes(dir));
  
// //   let bestMove;
  
// //   if (prioritized.length > 0) {
// //     // Among prioritized directions, pick lowest-risk one with decent space
// //     bestMove = prioritized.reduce((best, current) => {
// //         if (!best) return current;
// //         const b = directionInfo[best];
// //         const c = directionInfo[current];
// //         if (c.length >= gameState.you.body.length && c.risk < b.risk) return current;
// //         if (c.length > b.length) return current;
// //         return best;
// //     }, null);
// //   } else {
// //     // Pick the safest overall direction by low risk and big path
// //     bestMove = safeDirections.reduce((best, current) => {
// //         if (!best) return current;
// //         const b = directionInfo[best];
// //         const c = directionInfo[current];
// //         if (c.length >= gameState.you.body.length && c.risk < b.risk) return current;
// //         if (c.length > b.length) return current;
// //         return best;
// //     }, null);
// //   }
  
// //   const nextMove = bestMove || safeDirections[Math.floor(Math.random() * safeDirections.length)];
// //   return { move: nextMove };
// //   }
  
// const rand = max=>Math.floor(Math.random()*max);
// /*
//     *************************
//     ***** MAIN FUNCTION *****
//     *************************
// */
// export default function move(gameState){
//     const you = gameState.you
//     const turn = gameState.turn;
//     const removeTail = (board)=>{
//         for (let i=0; i<board.snakes.length;i++) {
//             const snake = board.snakes[i];
//             if (snake.id==you.id) {
//                 board.snakes[i].body.pop();
//             }
//         }
//         return board;
//     }
//     const longestEnemySnake = () => {
//         if (!board || !board.snakes || board.snakes.length === 0) {
//             return you;
//         }
    
//         let longest = null;
//         for (let i = 0; i < board.snakes.length; i++) {
//             const snake = board.snakes[i];
//             if (snake.id !== you.id) {
//                 if (!longest || snake.length > longest.length) {
//                     longest = snake;
//                 }
//             }
//         }
    
//         return longest || you;
//     }; 
//     const isInHazard = (target) => {
//         const hazards = gameState.board.hazards;
//         return hazards.some(hazard => hazard.x === target.x && hazard.y === target.y);
//     };   
//     const board = removeTail(gameState.board);
//     const food = board.food;
//     // const food = board.food.filter(pos => !(pos.x === (board.width-1)/2 && pos.y === (board.height-1)/2)); //removes middle food
//     let moveOnTurn = [];
//     let method;

//     const enemyLongest = longestEnemySnake();
//     const isLongest = !enemyLongest || you.length > enemyLongest.length+2;

//     let headToHeadFilter = ["up","down","left","right"];
//     //avoid head to heads
//     headToHeadFilter = checkHeadToHead(headToHeadFilter, you.head, board, you);
//     //flood fill
//     headToHeadFilter = handleFill(headToHeadFilter, you.head, board);
    
//     if (isInHazard(you.head)==true) {
//         moveOnTurn = midMethod(you.head, board, headToHeadFilter);
//         method = "Huzz";
//     }
//     if (isLongest && you.health>30 && moveOnTurn.length==0) {
//         moveOnTurn = chaseMethod(you.head, board, headToHeadFilter, enemyLongest.head);
//         method = "Hunt";
//     }
//     if (food.length > 0 && (!isLongest || you.health < 30) && moveOnTurn.length==0) {
//         moveOnTurn = foodMethod(food, you.head, board, headToHeadFilter, you);
//         method = "Food";
//     }
//     if (moveOnTurn.length==0 && !isInHazard(you.body[you.length-1])) {
//         moveOnTurn = tailMethod(you.head, board, headToHeadFilter, you);
//         method = "Tail";
//     }
//     if (moveOnTurn.length==0) {
//         moveOnTurn = midMethod(you.head, board, headToHeadFilter); //hazard and this do the same thing rn
//         method = "Midd"
//     }
//     if (moveOnTurn.length==0) {
//         moveOnTurn = randomMethod(you.head, board, headToHeadFilter, you);
//         method = "Rand";
//     }
//     // send to server
//     let chosenMove = moveOnTurn[rand(moveOnTurn.length)];
//     console.log(
//         '\x1b[91m%s\x1b[0m \x1b[34m%s\x1b[0m \x1b[32m%s\x1b[0m \x1b[33m%s\x1b[0m',
//         `${turn}:`,  // Red
//         `${method}`,  // Blue
//         `[${moveOnTurn}]`,  // Green
//         `${chosenMove}`  // Yellow
//     );
    
//     return {move: chosenMove};
// }
// /*
//     *******************
//     ***** METHODS *****
//     *******************
// */
// function foodMethod(food, head, board, headToHeadFilter, you) {
//     const closestFood = (selectedHead) => {
//         if (!selectedHead) {
//             selectedHead = head;
//         }
//         if (food.length === 0) return undefined;
    
//         let foodDis = food.map((element) => {
//             return Math.abs(element.x - selectedHead.x) + Math.abs(element.y - selectedHead.y);
//         });
    
//         let minIndex = foodDis.indexOf(Math.min(...foodDis));
//         if (minIndex === -1) return undefined;
    
//         return food[minIndex];
//     };
//     if (you.health < 50 && closestFood() && getDistance(you, closestFood())<=5) {
//         let target = closestFood();
//         return getDirection(target, head, board, headToHeadFilter);
//     }
//     const hazards = board.hazards;
//     food = food.filter(food => !hazards.some(hazard => hazard.x === food.x && hazard.y === food.y));
//     for (const snake of board.snakes) {
//         if (snake.id !== you.id) {
//             let closest = closestFood(snake.head); // Get the closest food for the opponent
    
//             if (closest) {
//                 let snakeDistance = getDistance(snake.head, closest);
//                 let youDistance = getDistance(you.head, closest); 
    
//                 if (youDistance >= snakeDistance) {
//                     // remove food if its closer to an opponent
//                     food = food.filter(pos => pos.x !== closest.x || pos.y !== closest.y);
//                 }
//             }
//         }
//     }
//     if (food.length === 0) {
//         return [];
//     }

//     let target = closestFood();
//     return getDirection(target, head, board, headToHeadFilter);
// }

// function randomMethod(head, board, headToHeadFilter, you) {
//     let randMoves = [];
//     const isHazard = dir=> {
//         let newPos = nextMove(dir, head);
//         if (board.hazard.some(hazard => hazard.x === newPos.x && hazard.y === newPos.y)) {
            
//         }
        
//     }
//     if (getSafe({x:head.x-1, y:head.y}, board) && headToHeadFilter.includes("left")) {
//         randMoves.push("left")
//     }
//     if (getSafe({x:head.x+1, y:head.y}, board) && headToHeadFilter.includes("right")) {
//         randMoves.push("right");
//     }
//     if (getSafe({x:head.x, y:head.y-1}, board) && headToHeadFilter.includes("down")) {
//         randMoves.push("down");
//     }
//     if (getSafe({x:head.x, y:head.y+1}, board) && headToHeadFilter.includes("up")) {
//         randMoves.push("up");
//     }
//     return randMoves;
// }
// function tailMethod(head, board, headToHeadFilter, you) {
//     const tail = you.body[you.length-1];
//     return getDirection(tail, head, board, headToHeadFilter);
// }
// function chaseMethod(head, board, headToHeadFilter, longestSnakeHead) {
//     const target = longestSnakeHead;
//     return getDirection(target, head, board, headToHeadFilter);
// }
// function hazardMethod(head, board, headToHeadFilter) {
//     let moveDistances = [];

//     for (let i = 0; i < filter.length; i++) {
//         const direction = filter[i];
//         const startPos = nextMove(direction, head);
//         const distance = shortestDistanceToSafe(startPos, board);

//         if (distance !== null) {
//             moveDistances.push({ direction, distance });
//         }
//     }

//     if (moveDistances.length === 0) return [];

//     const minDistance = Math.min(...moveDistances.map(m => m.distance));
//     return moveDistances
//         .filter(m => m.distance === minDistance)
//         .map(m => m.direction);

//     function shortestDistanceToSafe(start, board) {
//         const visited = new Set();
//         const queue = [{ pos: start, dist: 0 }];
//         const key = (p) => `${p.x},${p.y}`;

//         while (queue.length > 0) {
//             const { pos, dist } = queue.shift();
//             const k = key(pos);

//             if (visited.has(k)) continue;
//             visited.add(k);

//             if (!getHazard(pos, board)) {
//                 return dist;
//             }

//             const directions = [
//                 { x: 0, y: -1 },
//                 { x: 0, y: 1 },
//                 { x: -1, y: 0 },
//                 { x: 1, y: 0 }
//             ];

//             for (const dir of directions) {
//                 const newPos = { x: pos.x + dir.x, y: pos.y + dir.y };
//                 const nk = key(newPos);

//                 if (!visited.has(nk) && getSafe(newPos, board)) {
//                     queue.push({ pos: newPos, dist: dist + 1 });
//                 }
//             }
//         }

//         return null; // No safe tile found
//     }
// }

// function midMethod(head, board, headToHeadFilter) {
//     const target = {x:(board.width+1)/2, y:(board.height+1)/2}
//     return getDirection(target, head, board, headToHeadFilter);
// }
// /*
//     ***************************
//     ***** OTHER FUNCTIONS *****
//     ***************************
// */
// function getDirection(pos, head, board, headToHeadFilter) { //get 
//     let arr = [];
//     if (pos.x < head.x && getSafe({x:head.x-1, y:head.y}, board) && headToHeadFilter.includes("left")) {
//         arr.push("left");
//     }
//     if (pos.x > head.x && getSafe({x:head.x+1, y:head.y}, board) && headToHeadFilter.includes("right")) {
//         arr.push("right");
//     }
//     if (pos.y < head.y && getSafe({x:head.x, y:head.y-1}, board) && headToHeadFilter.includes("down")) {
//         arr.push("down");
//     }
//     if (pos.y > head.y && getSafe({x:head.x, y:head.y+1}, board) && headToHeadFilter.includes("up")) {
//         arr.push("up");
//     }
//     return arr;
// }
// function getSafe(pos, board) {
//     const {x, y} = pos;
//     if (x<0 || x>board.width-1 || y<0 || y>board.height-1) {
//         return false;
//     }
//     for (let i=0;i<board.snakes.length;i++) {
//         const snake = board.snakes[i];
//         for (let j=0; j<snake.body.length; j++) {
//             const part = snake.body[j];
//             if (part["x"]==x && part["y"]==y) {
//                 return false;
//             }
//         }
//     }
//     return true;
// }
// function checkHeadToHead(moveOnTurn, head, board, you) {
//     let movesToFilter = {
//         safe: [],
//         danger: []
//     };

//     const snakeHeads = () => {
//         let arr = [];
//         for (const snake of board.snakes) {
//             if (snake.id !== you.id) {
//                 arr.push({pos:snake.head, length:snake.length});
//             }
//         }
//         return arr;
//     };

//     for (let i = 0; i < moveOnTurn.length; i++) {
//         const pos = nextMove(moveOnTurn[i], head);
//         const { x, y } = pos;

//         const adjacent = [
//             { x, y: y + 1 },
//             { x, y: y - 1 },
//             { x: x + 1, y },
//             { x: x - 1, y },
//         ];

//         let isDanger = adjacent.some(adj =>
//             snakeHeads().some(snake => 
//                 snake.pos.x === adj.x && 
//                 snake.pos.y === adj.y && 
//                 snake.length >= you.length //only be danger if snake is equal or longer in length
//             )
//         );
//         if (isDanger || !getSafe(pos, board)) {
//             if (!movesToFilter.danger.includes(moveOnTurn[i])) {
//                 movesToFilter.danger.push(moveOnTurn[i]);
//             }
//         } else {
//             if (!movesToFilter.safe.includes(moveOnTurn[i])) {
//                 movesToFilter.safe.push(moveOnTurn[i]);
//             }
//         }
//     }

//     if (movesToFilter.safe.length > 0) {
//         moveOnTurn = movesToFilter.safe;
//     }

//     // console.log(movesToFilter);
//     // console.log(moveOnTurn);
//     return moveOnTurn;
// }
// function nextMove(moveOnTurn, head) {
//     let {x,y} = head;
//     if (moveOnTurn=="up") {
//         return {x:x, y:y+1};
//     } else if (moveOnTurn=="down") {
//         return {x:x, y:y-1};
//     } else if (moveOnTurn=="right") {
//         return {x:x+1, y:y};
//     } else if (moveOnTurn=="left") {
//         return {x:x-1, y:y};
//     }
// }
// function handleFill(filter, head, board) {
//     let fills = [];
//     for (let i=0;i<filter.length;i++) {
//         let boardVisit = [];
//         let pos = nextMove(filter[i], head);
//         fills.push(floodFill(pos, board));
//         function floodFill(pos, board) {
//             if (boardVisit.some(obj => obj.x === pos.x && obj.y === pos.y) || !getSafe(pos, board)) {
//                 return 0;
//             } else {
//                 boardVisit.push({ x: pos.x, y: pos.y });
//                 let count = 1;
//                 const directions = [
//                     { x: 0, y: -1 },
//                     { x: 0, y: 1 },
//                     { x: -1, y: 0 },
//                     { x: 1, y: 0 }
//                 ];

//                 for (let dir of directions) {
//                     const newPos = { x: pos.x + dir.x, y: pos.y + dir.y };
//                     count += floodFill(newPos, board, boardVisit);
//                 }
    
//                 return count;
//             }
//         }
//     }
//     let newMoves = [];
//     let bigger = Math.max(...fills);
//     for (let j=0;j<filter.length;j++) {
//         if (fills[j]==bigger) {
//             newMoves.push(filter[j]);
//         }
//     }
//     return newMoves;
// }
// function getDistance(snake, target) {
//     return Math.abs(snake.x-target.x)+Math.abs(snake.y-target.y);
// }
// function isSafeDirection(direction, snake, board) {
//     const head = snake.head;
//     let next = { x: head.x, y: head.y };
  
//     // Calculate the next coordinate based on the direction
//     switch (direction) {
//       case "up":
//         next.y -= 1;
//         break;
//       case "down":
//         next.y += 1;
//         break;
//       case "left":
//         next.x -= 1;
//         break;
//       case "right":
//         next.x += 1;
//         break;
//       default:
//         return false; // Invalid direction
//     }
  
//     // Check if the next position is in a hazard
//     for (const hazard of board.hazards) {
//       if (hazard.x === next.x && hazard.y === next.y) {
//         return false;
//       }
//     }
  
//     return true;
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