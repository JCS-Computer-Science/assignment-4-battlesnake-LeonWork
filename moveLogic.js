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


export default function move(game){
    const gameState = game;
    const myHead = gameState.you.body[0];
    const headNode = getNodeId(myHead, gameState);
    let board = {};

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

    if(gameState.you.health > 40 && gameState.you.body.length > longestLength + 2){
        pathfindTo = huntSnake(gameState, board, headNode);
    }

    pathfindTo = flood(pathfindTo, headNode, board, gameState, myHead);

    if(checkEnclosure(board, headNode, gameState).turns == 0){
        pathfindTo = findClosestOpening(gameState, board, headNode).path;
    }

    if(checkEnclosure(board, headNode, gameState) && !aStar(board, headNode, pathfindTo).path[1]){
        console.log("enclosed");
        console.log(findClosestOpening(gameState, board, headNode));
        let pathToNearest = findClosestOpening(gameState, board, headNode).path[1]


        pathfindTo = pathToNearest;
    }

    let path = aStar(board, headNode, pathfindTo);

    //console.log(path);
    
    if(path.cost > 50){
        console.log("looping: " + board[headNode].connections.length);
        for(let i = 0; i < board[headNode].connections.length; i++){
            let newPath = aStar(board, headNode, board[headNode].connections[i][0]);
            console.log(newPath)
            if(newPath.cost < 50){
                //console.log("through")
                path = newPath;
                break;
            }
        }
    }

    if(path.cost == Infinity){
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
                if(snakeHeads.includes(j) && j != tailNode){
                    board[i].connections.push([j, 100]);
                }else if(food.includes(j)){
                    board[i].connections.push([j, 5]);
                } else {
                    board[i].connections.push([j, 1]);
                }
            };
        }
    }

    for(let i = 0; i < board.length; i++){
        if(board[i].connections.length == 1){
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
        if(pathToFood.cost > 50){
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
        let pathToSnake = aStar(board, headNode, besideArr(gameState.board.snakes[i].body[0], gameState));
        if(pathToSnake.path[1]){
            return pathToSnake.path[1];
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
        return {path: pathToTail, turns: 0};
    }

    for (let turn = 1; turn <= tailIndex; turn++) {
        const futureTail = snakeBody[tailIndex - turn]; 
        const futureTailNode = getNodeId(futureTail, gameState);

        let connectionsArr = besideArr(futureTail, gameState);

        //console.log(futureTailNode, connectionsArr);

        if(aStar(board, headNode, connectionsArr[0]).path[1]) {
            //console.log("1st path + " + { path: aStar(board, headNode, connectionsArr[0]).path, turns: turn }.path);
            console.log("taking path 1");
            return { path: aStar(board, headNode, connectionsArr[0]).path, turns: turn }; 
        } else if(aStar(board, headNode, connectionsArr[1]).path[1]){
            //console.log("2nd path + " + { path: aStar(board, headNode, connectionsArr[0]).path, turns: turn }.path);
            console.log("taking path 2");
            return { path: aStar(board, headNode, connectionsArr[1]).path, turns: turn }; 
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














































































