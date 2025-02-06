const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }]; // 🟢 Snake starts at (10,10)
let direction = "RIGHT"; // 🟢 Default direction
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let gameStarted = false;
let gameInterval = null;
let gameOver = false;

// 🎯 Start the game when a key is pressed
document.addEventListener("keydown", startGame);

function startGame(event) {
    if (!gameStarted) {
        gameStarted = true;
        gameInterval = setInterval(draw, 150); // 🕒 Set game loop interval
    }
    changeDirection(event);
}

// 🎮 Change direction
function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    if (key === 38 && direction !== "DOWN") direction = "UP";
    if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    if (key === 40 && direction !== "UP") direction = "DOWN";
}

// 🎨 Draw the game
function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // 🍎 Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // 🟢 Draw snake
    ctx.fillStyle = "green";
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box);

    // 🟡 Draw black dot on snake head
        if (index === 0) { 
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(segment.x + box / 2, segment.y + box / 2, box / 5, 0, Math.PI * 2);
            ctx.fill();
        }
        
    });

    // 🏃 Move the snake
    let newX = snake[0].x;
    let newY = snake[0].y;

    if (direction === "LEFT") newX -= box;
    if (direction === "UP") newY -= box;
    if (direction === "RIGHT") newX += box;
    if (direction === "DOWN") newY += box;

    // 🚀 Check collision with food
    if (newX === food.x && newY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop(); // Remove last segment unless eating
    }

    // 🚧 Check collision with walls or itself
    if (
        newX < 0 || newY < 0 || newX >= canvas.width || newY >= canvas.height ||
        snake.some(segment => segment.x === newX && segment.y === newY)
    ) {
        clearInterval(gameInterval);
        gameOver = true;
        showGameOver();
        return;
    }

    // ➕ Add new head
    snake.unshift({ x: newX, y: newY });
}

// 🎭 Show Game Over Message
function showGameOver() {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
}

// 🛠️ Run draw() once to show initial state
window.onload = function () {
    draw();
};
