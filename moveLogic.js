// export default function move(gameState) {
//     const myHead = gameState.you.body[0];
//     const myNeck = gameState.you.body[1];
//     const myTail = gameState.you.body[gameState.you.body.length - 1];
//     const center = {
//         x: Math.floor(gameState.board.width - 1) / 2,
//         y: Math.floor(gameState.board.height - 1) / 2
//     }
//     const nearMid = myHead.x > 1 && myHead.x < gameState.board.width - 2 && myHead.y > 1 && myHead.y < gameState.board.height - 2;
//     let targetMoves = {
//         up: false,
//         down: false,
//         left: false,
//         right: false
//     }
//     let moveSafety = {
//         up: true,
//         down: true,
//         left: true,
//         right: true
//     };
//     let pathSafety = {
//         up: true,
//         down: true,
//         left: true,
//         right: true
//     };
//     if (myNeck.x < myHead.x || 0 == myHead.x) { moveSafety.left = false; }
//     if (myNeck.x > myHead.x || gameState.board.width == myHead.x + 1) { moveSafety.right = false; }
//     if (myNeck.y < myHead.y || 0 == myHead.y) { moveSafety.down = false; }
//     if (myNeck.y > myHead.y || gameState.board.height == myHead.y + 1) { moveSafety.up = false; }
//     for (let s = 0; s < gameState.board.snakes.length; s++) {
//         for (let i = 0; i < gameState.board.snakes[s].body.length - 1; i++) {
//             let body = gameState.board.snakes[s].body[i];
//                       if (isHazard({ x: myHead.x - 1, y: myHead.y })) moveSafety.left = false;
//               if (isHazard({ x: myHead.x + 1, y: myHead.y })) moveSafety.right = false;
//               if (isHazard({ x: myHead.x, y: myHead.y + 1 })) moveSafety.up = false;
//               if (isHazard({ x: myHead.x, y: myHead.y - 1 })) moveSafety.down = false;
//   if (body.x == myHead.x - 1 && body.y == myHead.y) {
//                 moveSafety.left = false;
//             } else if (body.x == myHead.x + 1 && body.y == myHead.y) {
//                 moveSafety.right = false;
//             } else if (body.y == myHead.y - 1 && body.x == myHead.x) {
//                 moveSafety.down = false;
//             } else if (body.y == myHead.y + 1 && body.x == myHead.x) {
//                 moveSafety.up = false;
//             }
//         }
//         //deal with head on collisions
//         if (gameState.board.snakes[s].id != gameState.you.id && gameState.board.snakes[s].body.length >= gameState.you.body.length) {
//             let head = gameState.board.snakes[s].body[0];
//             let adjacent = {
//                 left: { x: myHead.x - 1, y: myHead.y },
//                 right: { x: myHead.x + 1, y: myHead.y },
//                 up: { x: myHead.x, y: myHead.y + 1 },
//                 down: { x: myHead.x, y: myHead.y - 1 }
//             };
//             for (let direction in adjacent) {
//                 let square = adjacent[direction];
//                 if ((head.x == square.x - 1 && head.y == square.y) ||
//                     (head.x == square.x + 1 && head.y == square.y) ||
//                     (head.x == square.x && head.y == square.y - 1) ||
//                     (head.x == square.x && head.y == square.y + 1)) {
//                     pathSafety[direction] = false;
//                 }
//             }
//         }
//     }
  
//     function moveTo(pos) {
//         let xDis = pos.x - myHead.x;
//         let yDis = pos.y - myHead.y;
//         if (xDis < 0) { targetMoves.left = true; } else if (xDis > 0) { targetMoves.right = true; }
//         if (yDis < 0) { targetMoves.down = true; } else if (yDis > 0) { targetMoves.up = true; }
//     }
  
//     let isHungry = gameState.you.health < 20 || gameState.you.body.length % 2 != 0 || gameState.board.snakes.some(s => s.id !== gameState.you.id && s.body.length >= gameState.you.body.length - 2);
//     //if (nearMid == false && gameState.you.health > 8 && gameState.you.body.length > 4) { isHungry = false; };
//     if (isHungry && gameState.board.food.length > 0) {
//         let closestFood = gameState.board.food[0];
  
//       // Filter food that is accessible or near enough hazard (calculated risk)
//       const viableFood = gameState.board.food.filter(food => {
//           const dist = Math.abs(food.x - myHead.x) + Math.abs(food.y - myHead.y);
//           const hazard = isHazard(food);
//           if (!hazard) return true;
//           return dist <= 2 && gameState.you.health > 25; // permit short hazard reach if not too risky
//       });
//       if (viableFood.length > 0) gameState.board.food = viableFood;
  
//         let targetFood = {
//             distanceTotal: Math.abs(closestFood.x - myHead.x) + Math.abs(closestFood.y - myHead.y),
//             distanceX: closestFood.x - myHead.x,
//             distanceY: closestFood.y - myHead.y
//         }
//         for (let i = 1; i < gameState.board.food.length; i++) {
//             let food = gameState.board.food[i];
//             let d = Math.abs(food.x - myHead.x) + Math.abs(food.y - myHead.y);
//             if (d < targetFood.distanceTotal) {
//                 closestFood = food;
//                 targetFood = {
//                     distanceTotal: d,
//                     distanceX: food.x - myHead.x,
//                     distanceY: food.y - myHead.y,
//                 }
//             }
//         }
//         moveTo(closestFood);
//     } else if (nearMid) {
//         moveTo(myTail);
//         //moveTo(center);
//     } else {
//         //moveTo(center);
//         moveTo(myTail)
//     }
    
//   function isHazard(pos) {
//       return gameState.board.hazards?.some(hz => hz.x === pos.x && hz.y === pos.y) || false;
//   }
//   function hazardPenalty(pos) {
//       if (!isHazard(pos)) return 0;
  
//       const distanceToCenter = Math.abs(pos.x - Math.floor(gameState.board.width / 2)) + Math.abs(pos.y - Math.floor(gameState.board.height / 2));
//       const trappedNearEdge = pos.x === 0 || pos.y === 0 || pos.x === gameState.board.width - 1 || pos.y === gameState.board.height - 1;
  
//       let penalty = 8; // base penalty
//       if (gameState.you.health < 30) penalty += 10;
//       if (trappedNearEdge) penalty += 5;
//       if (distanceToCenter > 4) penalty += 3;
  
//       return penalty;
//   }
  
//   // Queue-based flood fill
//     function floodpath(x, y) {
//         const directions = [
//             { x: 0, y: 1 },  // up
//             { x: 0, y: -1 }, // down
//             { x: -1, y: 0 }, // left
//             { x: 1, y: 0 }   // right
//         ];
    
//         let visited = new Set();
//         let queue = [{ x: x, y: y, risk: 0 }];
//         let path = [];
    
//         visited.add(`${x},${y}`);
    
//         function bottleNeck(x, y) {
//             let risk = 0;
//             for (let snake of gameState.board.snakes) {
//                 if (snake.id !== gameState.you.id) {
//                     for (let i = 0; i < snake.body.length; i++) {
//                         let bodyPart = snake.body[i];
//                         if (
//                             (bodyPart.x === x - 1 && bodyPart.y === y) ||
//                             (bodyPart.x === x + 1 && bodyPart.y === y) ||
//                             (bodyPart.x === x && bodyPart.y === y - 1) ||
//                             (bodyPart.x === x && bodyPart.y === y + 1) 
//                         ) {
//                             risk++;
//                         }
//                     }
//                     if (
//                         ((snake.body.some(part => part.x === x - 1 && part.y === y) && snake.body.some(part => part.x === x + 1 && part.y === y)) || 
//                          (snake.body.some(part => part.x === x && part.y === y - 1) && snake.body.some(part => part.x === x && part.y === y + 1)))
//                     ) {
//                         risk += 2;
//                     }}}
//             return risk;
//         }        
    
//         while (queue.length > 0) {
//             let { x, y, risk = 0 } = queue.shift();
//             path.push({ x, y, risk });
        
//             for (let { x: dx, y: dy } of directions) {
//                 let newX = x + dx;
//                 let newY = y + dy;
//                 const key = `${newX},${newY}`;
        
//                 if (newX >= 0 && newX < gameState.board.width &&
//                     newY >= 0 && newY < gameState.board.height &&
//                     !visited.has(key)) {
        
//                     let isBlocked = false;
//                     for (let s = 0; s < gameState.board.snakes.length; s++) {
//                         for (let i = 0; i < gameState.board.snakes[s].body.length - 1; i++) {
//                             let body = gameState.board.snakes[s].body[i];
//                             if (body.x == newX && body.y == newY) {
//                                 isBlocked = true;
//                                 break;
//                             }
//                         }
//                         if (isBlocked) break;
//                     }
        
//                     if (!isBlocked) {
//                         visited.add(key);
//                         const risk = bottleNeck(newX, newY);
//                         queue.push({ x: newX, y: newY, risk });
//                     }
//                 }
//             }
//         }        
    
//         return path;
//     }
//   // Function to check if the tail is adjacent to the filled space
//   function checkTailAdjacencyToFilledSpace(path, tail) {
//     return path.some(space => 
//         (space.x === tail.x - 1 && space.y === tail.y) ||
//         (space.x === tail.x + 1 && space.y === tail.y) ||
//         (space.x === tail.x && space.y === tail.y - 1) ||
//         (space.x === tail.x && space.y === tail.y + 1)
//     );
//   }
//   function totalRisk(path) {
//     return path.reduce((sum, step) => sum + (step.risk || 0), 0);
//   }
//   let rightPath = floodpath(myHead.x + 1, myHead.y);
//   let leftPath = floodpath(myHead.x - 1, myHead.y);
//   let upPath = floodpath(myHead.x, myHead.y + 1);
//   let downPath = floodpath(myHead.x, myHead.y - 1);
  
//   if (rightPath.length > gameState.you.body.length || leftPath.length > gameState.you.body.length || upPath.length > gameState.you.body.length || downPath.length > gameState.you.body.length) {
//     if (rightPath.length <= gameState.you.body.length) { pathSafety.right = false; console.log("dead end detected right on turn " + gameState.turn); }
//     if (leftPath.length <= gameState.you.body.length) { pathSafety.left = false; console.log("dead end detected left on turn " + gameState.turn); }
//     if (upPath.length <= gameState.you.body.length) { pathSafety.up = false; console.log("dead end detected up on turn " + gameState.turn); }
//     if (downPath.length <= gameState.you.body.length) { pathSafety.down = false; console.log("dead end detected down on turn " + gameState.turn); }
//   } else {
//     console.log("all dead end detected on turn " + gameState.turn);
//     if (checkTailAdjacencyToFilledSpace(rightPath, myTail)&&moveSafety.right) {
//         pathSafety.right = true;pathSafety.left = false; pathSafety.up = false; pathSafety.down = false;
//         console.log("Tail is adjacent to filled space right on turn " + gameState.turn);
//     }else if (checkTailAdjacencyToFilledSpace(leftPath, myTail)&&moveSafety.left) {
//         pathSafety.right = false;pathSafety.left = true; pathSafety.up = false; pathSafety.down = false;
//         console.log("Tail is adjacent to filled space left on turn " + gameState.turn);
//     }else if (checkTailAdjacencyToFilledSpace(upPath, myTail)&&moveSafety.up) {
//         pathSafety.right = false;pathSafety.left = false; pathSafety.up = true; pathSafety.down = false;
//         console.log("Tail is adjacent to filled space up on turn " + gameState.turn);
//     }else if (checkTailAdjacencyToFilledSpace(downPath, myTail)&&moveSafety.right) {
//         pathSafety.right = false;pathSafety.left = false; pathSafety.up = false; pathSafety.down = true;
//         console.log("Tail is adjacent to filled space down on turn " + gameState.turn);
//     } else {
//         // Find the direction with the biggest flood fill area
//         let directionAreas = {
//             right: moveSafety.right ? rightPath.length : 0,
//             left: moveSafety.left ? leftPath.length : 0,
//             up: moveSafety.up ? upPath.length : 0,
//             down: moveSafety.down ? downPath.length : 0
//         };
//         let bestDirection = Object.keys(directionAreas).reduce((a, b) => directionAreas[a] > directionAreas[b] ? a : b);
//         // Set that direction as the only safe one
//         pathSafety.right = false;
//         pathSafety.left = false;
//         pathSafety.up = false;
//         pathSafety.down = false;
//         pathSafety[bestDirection] = true;
//         console.log("Choosing largest flood fill area: " + bestDirection + " on turn " + gameState.turn);
//     }
//   }
  
//   let directionInfo = {
//     right: { path: rightPath, risk: totalRisk(rightPath), length: rightPath.length, safe: moveSafety.right && pathSafety.right },
//     left: { path: leftPath, risk: totalRisk(leftPath), length: leftPath.length, safe: moveSafety.left && pathSafety.left },
//     up: { path: upPath, risk: totalRisk(upPath), length: upPath.length, safe: moveSafety.up && pathSafety.up },
//     down: { path: downPath, risk: totalRisk(downPath), length: downPath.length, safe: moveSafety.down && pathSafety.down },
//   };
  
//   let safeDirections = Object.keys(directionInfo).filter(dir => directionInfo[dir].safe);
  
//   if (safeDirections.length === 0) {
//     safeDirections = Object.keys(moveSafety).filter(dir => moveSafety[dir]);
//   }
  
//   let prioritized = Object.keys(targetMoves).filter(dir => targetMoves[dir] && safeDirections.includes(dir));
  
//   let bestMove;
  
//   if (prioritized.length > 0) {
//     // Among prioritized directions, pick lowest-risk one with decent space
//     bestMove = prioritized.reduce((best, current) => {
//         if (!best) return current;
//         const b = directionInfo[best];
//         const c = directionInfo[current];
//         if (c.length >= gameState.you.body.length && c.risk < b.risk) return current;
//         if (c.length > b.length) return current;
//         return best;
//     }, null);
//   } else {
//     // Pick the safest overall direction by low risk and big path
//     bestMove = safeDirections.reduce((best, current) => {
//         if (!best) return current;
//         const b = directionInfo[best];
//         const c = directionInfo[current];
//         if (c.length >= gameState.you.body.length && c.risk < b.risk) return current;
//         if (c.length > b.length) return current;
//         return best;
//     }, null);
//   }
  
//   const nextMove = bestMove || safeDirections[Math.floor(Math.random() * safeDirections.length)];
//   return { move: nextMove };
//   }
  
const rand = max=>Math.floor(Math.random()*max);
/*
    *************************
    ***** MAIN FUNCTION *****
    *************************
*/
export default function move(gameState){
    const you = gameState.you
    const turn = gameState.turn;
    const removeTail = (board)=>{
        for (let i=0; i<board.snakes.length;i++) {
            const snake = board.snakes[i];
            if (snake.id==you.id) {
                board.snakes[i].body.pop();
            }
        }
        return board;
    }
    const longestEnemySnake = () => {
        if (!board || !board.snakes || board.snakes.length === 0) {
            return you;
        }
    
        let longest = null;
        for (let i = 0; i < board.snakes.length; i++) {
            const snake = board.snakes[i];
            if (snake.id !== you.id) {
                if (!longest || snake.length > longest.length) {
                    longest = snake;
                }
            }
        }
    
        return longest || you;
    }; 
    const isInHazard = (target) => {
        const hazards = gameState.board.hazards;
        return hazards.some(hazard => hazard.x === target.x && hazard.y === target.y);
    };   
    const board = removeTail(gameState.board);
    const food = board.food;
    // const food = board.food.filter(pos => !(pos.x === (board.width-1)/2 && pos.y === (board.height-1)/2)); //removes middle food
    let moveOnTurn = [];
    let method;

    const enemyLongest = longestEnemySnake();
    const isLongest = !enemyLongest || you.length > enemyLongest.length+2;

    let headToHeadFilter = ["up","down","left","right"];
    //avoid head to heads
    headToHeadFilter = checkHeadToHead(headToHeadFilter, you.head, board, you);
    //flood fill
    headToHeadFilter = handleFill(headToHeadFilter, you.head, board);
    
    if (isInHazard(you.head)==true) {
        moveOnTurn = midMethod(you.head, board, headToHeadFilter);
        method = "Huzz";
    }
    if (isLongest && you.health>30 && moveOnTurn.length==0) {
        moveOnTurn = chaseMethod(you.head, board, headToHeadFilter, enemyLongest.head);
        method = "Hunt";
    }
    if (food.length > 0 && (!isLongest || you.health < 30) && moveOnTurn.length==0) {
        moveOnTurn = foodMethod(food, you.head, board, headToHeadFilter, you);
        method = "Food";
    }
    if (moveOnTurn.length==0 && !isInHazard(you.body[you.length-1])) {
        moveOnTurn = tailMethod(you.head, board, headToHeadFilter, you);
        method = "Tail";
    }
    if (moveOnTurn.length==0) {
        moveOnTurn = midMethod(you.head, board, headToHeadFilter); //hazard and this do the same thing rn
        method = "Midd"
    }
    if (moveOnTurn.length==0) {
        moveOnTurn = randomMethod(you.head, board, headToHeadFilter, you);
        method = "Rand";
    }
    // send to server
    let chosenMove = moveOnTurn[rand(moveOnTurn.length)];
    console.log(
        '\x1b[91m%s\x1b[0m \x1b[34m%s\x1b[0m \x1b[32m%s\x1b[0m \x1b[33m%s\x1b[0m',
        `${turn}:`,  // Red
        `${method}`,  // Blue
        `[${moveOnTurn}]`,  // Green
        `${chosenMove}`  // Yellow
    );
    
    return {move: chosenMove};
}
/*
    *******************
    ***** METHODS *****
    *******************
*/
function foodMethod(food, head, board, headToHeadFilter, you) {
    const closestFood = (selectedHead) => {
        if (!selectedHead) {
            selectedHead = head;
        }
        if (food.length === 0) return undefined;
    
        let foodDis = food.map((element) => {
            return Math.abs(element.x - selectedHead.x) + Math.abs(element.y - selectedHead.y);
        });
    
        let minIndex = foodDis.indexOf(Math.min(...foodDis));
        if (minIndex === -1) return undefined;
    
        return food[minIndex];
    };
    if (you.health < 50 && closestFood() && getDistance(you, closestFood())<=5) {
        let target = closestFood();
        return getDirection(target, head, board, headToHeadFilter);
    }
    const hazards = board.hazards;
    food = food.filter(food => !hazards.some(hazard => hazard.x === food.x && hazard.y === food.y));
    for (const snake of board.snakes) {
        if (snake.id !== you.id) {
            let closest = closestFood(snake.head); // Get the closest food for the opponent
    
            if (closest) {
                let snakeDistance = getDistance(snake.head, closest);
                let youDistance = getDistance(you.head, closest); 
    
                if (youDistance >= snakeDistance) {
                    // remove food if its closer to an opponent
                    food = food.filter(pos => pos.x !== closest.x || pos.y !== closest.y);
                }
            }
        }
    }
    if (food.length === 0) {
        return [];
    }

    let target = closestFood();
    return getDirection(target, head, board, headToHeadFilter);
}

function randomMethod(head, board, headToHeadFilter, you) {
    let randMoves = [];
    const isHazard = dir=> {
        let newPos = nextMove(dir, head);
        if (board.hazard.some(hazard => hazard.x === newPos.x && hazard.y === newPos.y)) {
            
        }
        
    }
    if (getSafe({x:head.x-1, y:head.y}, board) && headToHeadFilter.includes("left")) {
        randMoves.push("left")
    }
    if (getSafe({x:head.x+1, y:head.y}, board) && headToHeadFilter.includes("right")) {
        randMoves.push("right");
    }
    if (getSafe({x:head.x, y:head.y-1}, board) && headToHeadFilter.includes("down")) {
        randMoves.push("down");
    }
    if (getSafe({x:head.x, y:head.y+1}, board) && headToHeadFilter.includes("up")) {
        randMoves.push("up");
    }
    return randMoves;
}
function tailMethod(head, board, headToHeadFilter, you) {
    const tail = you.body[you.length-1];
    return getDirection(tail, head, board, headToHeadFilter);
}
function chaseMethod(head, board, headToHeadFilter, longestSnakeHead) {
    const target = longestSnakeHead;
    return getDirection(target, head, board, headToHeadFilter);
}
function hazardMethod(head, board, headToHeadFilter) {
    let moveDistances = [];

    for (let i = 0; i < filter.length; i++) {
        const direction = filter[i];
        const startPos = nextMove(direction, head);
        const distance = shortestDistanceToSafe(startPos, board);

        if (distance !== null) {
            moveDistances.push({ direction, distance });
        }
    }

    if (moveDistances.length === 0) return [];

    const minDistance = Math.min(...moveDistances.map(m => m.distance));
    return moveDistances
        .filter(m => m.distance === minDistance)
        .map(m => m.direction);

    function shortestDistanceToSafe(start, board) {
        const visited = new Set();
        const queue = [{ pos: start, dist: 0 }];
        const key = (p) => `${p.x},${p.y}`;

        while (queue.length > 0) {
            const { pos, dist } = queue.shift();
            const k = key(pos);

            if (visited.has(k)) continue;
            visited.add(k);

            if (!getHazard(pos, board)) {
                return dist;
            }

            const directions = [
                { x: 0, y: -1 },
                { x: 0, y: 1 },
                { x: -1, y: 0 },
                { x: 1, y: 0 }
            ];

            for (const dir of directions) {
                const newPos = { x: pos.x + dir.x, y: pos.y + dir.y };
                const nk = key(newPos);

                if (!visited.has(nk) && getSafe(newPos, board)) {
                    queue.push({ pos: newPos, dist: dist + 1 });
                }
            }
        }

        return null; // No safe tile found
    }
}

function midMethod(head, board, headToHeadFilter) {
    const target = {x:(board.width+1)/2, y:(board.height+1)/2}
    return getDirection(target, head, board, headToHeadFilter);
}
/*
    ***************************
    ***** OTHER FUNCTIONS *****
    ***************************
*/
function getDirection(pos, head, board, headToHeadFilter) { //get 
    let arr = [];
    if (pos.x < head.x && getSafe({x:head.x-1, y:head.y}, board) && headToHeadFilter.includes("left")) {
        arr.push("left");
    }
    if (pos.x > head.x && getSafe({x:head.x+1, y:head.y}, board) && headToHeadFilter.includes("right")) {
        arr.push("right");
    }
    if (pos.y < head.y && getSafe({x:head.x, y:head.y-1}, board) && headToHeadFilter.includes("down")) {
        arr.push("down");
    }
    if (pos.y > head.y && getSafe({x:head.x, y:head.y+1}, board) && headToHeadFilter.includes("up")) {
        arr.push("up");
    }
    return arr;
}
function getSafe(pos, board) {
    const {x, y} = pos;
    if (x<0 || x>board.width-1 || y<0 || y>board.height-1) {
        return false;
    }
    for (let i=0;i<board.snakes.length;i++) {
        const snake = board.snakes[i];
        for (let j=0; j<snake.body.length; j++) {
            const part = snake.body[j];
            if (part["x"]==x && part["y"]==y) {
                return false;
            }
        }
    }
    return true;
}
function checkHeadToHead(moveOnTurn, head, board, you) {
    let movesToFilter = {
        safe: [],
        danger: []
    };

    const snakeHeads = () => {
        let arr = [];
        for (const snake of board.snakes) {
            if (snake.id !== you.id) {
                arr.push({pos:snake.head, length:snake.length});
            }
        }
        return arr;
    };

    for (let i = 0; i < moveOnTurn.length; i++) {
        const pos = nextMove(moveOnTurn[i], head);
        const { x, y } = pos;

        const adjacent = [
            { x, y: y + 1 },
            { x, y: y - 1 },
            { x: x + 1, y },
            { x: x - 1, y },
        ];

        let isDanger = adjacent.some(adj =>
            snakeHeads().some(snake => 
                snake.pos.x === adj.x && 
                snake.pos.y === adj.y && 
                snake.length >= you.length //only be danger if snake is equal or longer in length
            )
        );
        if (isDanger || !getSafe(pos, board)) {
            if (!movesToFilter.danger.includes(moveOnTurn[i])) {
                movesToFilter.danger.push(moveOnTurn[i]);
            }
        } else {
            if (!movesToFilter.safe.includes(moveOnTurn[i])) {
                movesToFilter.safe.push(moveOnTurn[i]);
            }
        }
    }

    if (movesToFilter.safe.length > 0) {
        moveOnTurn = movesToFilter.safe;
    }

    // console.log(movesToFilter);
    // console.log(moveOnTurn);
    return moveOnTurn;
}
function nextMove(moveOnTurn, head) {
    let {x,y} = head;
    if (moveOnTurn=="up") {
        return {x:x, y:y+1};
    } else if (moveOnTurn=="down") {
        return {x:x, y:y-1};
    } else if (moveOnTurn=="right") {
        return {x:x+1, y:y};
    } else if (moveOnTurn=="left") {
        return {x:x-1, y:y};
    }
}
function handleFill(filter, head, board) {
    let fills = [];
    for (let i=0;i<filter.length;i++) {
        let boardVisit = [];
        let pos = nextMove(filter[i], head);
        fills.push(floodFill(pos, board));
        function floodFill(pos, board) {
            if (boardVisit.some(obj => obj.x === pos.x && obj.y === pos.y) || !getSafe(pos, board)) {
                return 0;
            } else {
                boardVisit.push({ x: pos.x, y: pos.y });
                let count = 1;
                const directions = [
                    { x: 0, y: -1 },
                    { x: 0, y: 1 },
                    { x: -1, y: 0 },
                    { x: 1, y: 0 }
                ];

                for (let dir of directions) {
                    const newPos = { x: pos.x + dir.x, y: pos.y + dir.y };
                    count += floodFill(newPos, board, boardVisit);
                }
    
                return count;
            }
        }
    }
    let newMoves = [];
    let bigger = Math.max(...fills);
    for (let j=0;j<filter.length;j++) {
        if (fills[j]==bigger) {
            newMoves.push(filter[j]);
        }
    }
    return newMoves;
}
function getDistance(snake, target) {
    return Math.abs(snake.x-target.x)+Math.abs(snake.y-target.y);
}
function isSafeDirection(direction, snake, board) {
    const head = snake.head;
    let next = { x: head.x, y: head.y };
  
    // Calculate the next coordinate based on the direction
    switch (direction) {
      case "up":
        next.y -= 1;
        break;
      case "down":
        next.y += 1;
        break;
      case "left":
        next.x -= 1;
        break;
      case "right":
        next.x += 1;
        break;
      default:
        return false; // Invalid direction
    }
  
    // Check if the next position is in a hazard
    for (const hazard of board.hazards) {
      if (hazard.x === next.x && hazard.y === next.y) {
        return false;
      }
    }
  
    return true;
  }