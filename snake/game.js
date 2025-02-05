const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20;
let snake = [{x: 5, y: 5}];
let direction = "RIGHT";
let food = {x: 8, y: 8};
let gameInterval;
let isTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Set up the controls for keyboard and touch
function setControls() {
    if (isTouchScreen) {
        document.getElementById('upBtn').addEventListener('click', () => setDirection("UP"));
        document.getElementById('downBtn').addEventListener('click', () => setDirection("DOWN"));
        document.getElementById('leftBtn').addEventListener('click', () => setDirection("LEFT"));
        document.getElementById('rightBtn').addEventListener('click', () => setDirection("RIGHT"));
    } else {
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp") setDirection("UP");
            if (e.key === "ArrowDown") setDirection("DOWN");
            if (e.key === "ArrowLeft") setDirection("LEFT");
            if (e.key === "ArrowRight") setDirection("RIGHT");
        });
    }
}

// Change snake direction
function setDirection(newDirection) {
    if (newDirection === "UP" && direction !== "DOWN") direction = "UP";
    if (newDirection === "DOWN" && direction !== "UP") direction = "DOWN";
    if (newDirection === "LEFT" && direction !== "RIGHT") direction = "LEFT";
    if (newDirection === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
}

// Draw the game board
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "blue";
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

    // Move snake
    let head = Object.assign({}, snake[0]);

    if (direction === "UP") head.y--;
    if (direction === "DOWN") head.y++;
    if (direction === "LEFT") head.x--;
    if (direction === "RIGHT") head.x++;

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = {x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)}; // New food
    } else {
        snake.pop();
    }

    // Check for collisions with walls or self
    if (head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 || head.y >= canvas.height / tileSize || snake.some((segment, idx) => idx !== 0 && segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameInterval);
        alert("Game Over!");
    }
}

function startGame() {
    gameInterval = setInterval(draw, 100);
}

setControls();
startGame();
