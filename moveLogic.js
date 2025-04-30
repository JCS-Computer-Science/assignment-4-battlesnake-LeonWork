export default function move(gameState) {
    const myHead = gameState.you.body[0];
    const myNeck = gameState.you.body[1];
    const myTail = gameState.you.body[gameState.you.body.length - 1];

    const board = initializeBoard(gameState);
    const headNode = getNodeId(myHead, gameState);

    const moveSafety = initializeMoveSafety(myHead, myNeck, gameState);
    const pathSafety = { ...moveSafety };

    const isHungry = shouldSeekFood(gameState);
    const targetMoves = initializeTargetMoves();

    let pathfindTo;

    if (isHungry && gameState.board.food.length > 0) {
        pathfindTo = nearestFood(gameState, board, myHead, myHead);
    } else {
        pathfindTo = findClosestOpening(gameState, board, headNode).path;
    }

    const path = aStar(board, headNode, pathfindTo);

    if (path.cost === Infinity) {
        console.log("No Path Found: Defaulting to Tail Hunt");
        pathfindTo = aStar(board, headNode, getNodeId(myTail, gameState)).path[1];
    }

    const floodPaths = floodFillSafety(gameState, myHead, moveSafety, pathSafety, myTail);

    const nextMove = determineBestMove({
        moveSafety,
        pathSafety,
        targetMoves,
        floodPaths,
        gameState,
        myHead,
        myTail,
    });

    console.log(`MOVE ${gameState.turn}: ${nextMove}`);
    return { move: nextMove };
}

function initializeBoard(gameState) {
    let board = {};
    let c = 0;
    for (let i = 0; i < gameState.board.height; i++) {
        for (let j = 0; j < gameState.board.width; j++) {
            board[c] = { position: { x: j, y: i }, connections: [], id: c };
            c++;
        }
    }
    return connectNodes(gameState, board);
}

function initializeMoveSafety(myHead, myNeck, gameState) {
    let moveSafety = { up: true, down: true, left: true, right: true };

    if (myNeck.x < myHead.x || myHead.x === 0) moveSafety.left = false;
    if (myNeck.x > myHead.x || myHead.x === gameState.board.width - 1) moveSafety.right = false;
    if (myNeck.y < myHead.y || myHead.y === 0) moveSafety.down = false;
    if (myNeck.y > myHead.y || myHead.y === gameState.board.height - 1) moveSafety.up = false;

    for (let snake of gameState.board.snakes) {
        for (let body of snake.body) {
            if (body.x === myHead.x - 1 && body.y === myHead.y) moveSafety.left = false;
            if (body.x === myHead.x + 1 && body.y === myHead.y) moveSafety.right = false;
            if (body.y === myHead.y - 1 && body.x === myHead.x) moveSafety.down = false;
            if (body.y === myHead.y + 1 && body.x === myHead.x) moveSafety.up = false;
        }
    }

    return moveSafety;
}

function shouldSeekFood(gameState) {
    return (
        gameState.you.health < 20 ||
        gameState.you.body.length % 2 !== 0 ||
        gameState.board.snakes.some(
            (s) => s.id !== gameState.you.id && s.body.length >= gameState.you.body.length - 2
        )
    );
}

function initializeTargetMoves() {
    return { up: false, down: false, left: false, right: false };
}

function floodFillSafety(gameState, myHead, moveSafety, pathSafety, myTail) {
    const directions = ["up", "down", "left", "right"];
    const floodPaths = {};

    for (let dir of directions) {
        const nextPos = getNextPosition(myHead, dir);
        if (moveSafety[dir]) {
            const floodPath = bfsFlood(gameState, nextPos);
            floodPaths[dir] = floodPath;

            if (floodPath.length <= gameState.you.body.length) {
                pathSafety[dir] = false;
                console.log(`Dead End Detected ${dir}`);
            } else if (checkTailAdjacencyToPath(floodPath, myTail)) {
                pathSafety[dir] = true;
            }
        }
    }

    return floodPaths;
}

function determineBestMove({
    moveSafety,
    pathSafety,
    targetMoves,
    floodPaths,
    gameState,
    myHead,
    myTail,
}) {
    const safeDirections = Object.keys(moveSafety).filter(
        (dir) => moveSafety[dir] && pathSafety[dir]
    );

    const prioritized = Object.keys(targetMoves).filter(
        (dir) => targetMoves[dir] && safeDirections.includes(dir)
    );

    if (prioritized.length > 0) {
        return prioritized.reduce((best, current) => {
            if (!best) return current;
            const b = floodPaths[best];
            const c = floodPaths[current];
            if (c.length >= gameState.you.body.length && c.risk < b.risk) return current;
            if (c.length > b.length) return current;
            return best;
        }, null);
    }

    return safeDirections[Math.floor(Math.random() * safeDirections.length)];
}

// Helper Functions (integrating from both codes)
function connectNodes(gameState, board) {
    let snakeBodies = [];
    let snakeHeads = [];
    let food = [];
    const tailNode = getNodeId(gameState.you.body[gameState.you.body.length - 1], gameState);

    for (let snake of gameState.board.snakes) {
        if (snake.id !== gameState.you.id) {
            snakeBodies.push(...snake.body.map((part) => getNodeId(part, gameState)));
            if (snake.body.length >= gameState.you.body.length) {
                const head = snake.body[0];
                snakeHeads.push(
                    getNodeId({ x: head.x + 1, y: head.y }, gameState),
                    getNodeId({ x: head.x - 1, y: head.y }, gameState),
                    getNodeId({ x: head.x, y: head.y + 1 }, gameState),
                    getNodeId({ x: head.x, y: head.y - 1 }, gameState)
                );
            }
        }
    }

    for (let i = 0; i < gameState.you.body.length; i++) {
        const bodyNode = getNodeId(gameState.you.body[i], gameState);
        if (bodyNode !== tailNode || gameState.you.health === 100) {
            snakeBodies.push(bodyNode);
        }
    }

    food.push(...gameState.board.food.map((item) => getNodeId(item, gameState)));

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (
                isAdjacent(board[i].position, board[j].position) &&
                !snakeBodies.includes(j)
            ) {
                if (snakeHeads.includes(j)) {
                    board[i].connections.push([j, 100]);
                } else if (food.includes(j)) {
                    board[i].connections.push([j, 5]);
                } else {
                    board[i].connections.push([j, 1]);
                }
            }
        }
    }

    return board;
}

// Additional helper functions from both codes should be added here.