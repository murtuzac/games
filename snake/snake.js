const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT"; // Default direction to make the snake move initially
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let gameStarted = false;
let gameInterval = null;
let gameOver = false;

// Wait for the page to fully load before starting the game
window.onload = function () {
    draw();
};

// Listen for keypresses
document.addEventListener("keydown", startGame);

function startGame(event) {
    if (!gameStarted) {
        gameStarted = true;
        gameInterval = setInterval(draw, 150); // Slowed down initial speed
    }
    changeDirection(event);
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    if (key === 38 && direction !== "DOWN") direction = "UP";
    if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    if (key === 40 && direction !== "UP") direction = "DOWN";
}

function draw() {
    if (gameOver) return; // Stop drawing if game is over

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box);
    });

    if (direction) {
        let newX = snake[0].x;
        let newY = snake[0].y;

        if (direction === "LEFT") newX -= box;
        if (direction === "UP") newY -= box;
        if (direction === "RIGHT") newX += box;
        if (direction === "DOWN") newY += box;

        // Check collision with food
        if (newX === food.x && newY === food.y) {
            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box
            };
        } else {
            snake.pop();
        }

        // Check collision with walls or itself
        if (
            newX < 0 || newY < 0 || newX >= canvas.width || newY >= canvas.height ||
            snake.some(segment => segment.x === newX && segment.y === newY)
        ) {
            clearInterval(gameInterval);
            gameOver = true;
            showGameOver();
            return;
        }

        // Add new head
        snake.unshift({ x: newX, y: newY });
    }
}

function showGameOver() {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
}
