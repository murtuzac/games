const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("scoreDisplay");
const foodImage = new Image();
foodImage.src = "rasb.png"; // Make sure the file is in the same directory as your script

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let score = 0;
let gameStarted = false;
let gameInterval = null;
let gameOver = false;
let highscore = 0;

// Start the game on key press
document.addEventListener("keydown", (event) => {
    startGame();
    handleDirection(event.keyCode);
});

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        gameInterval = setInterval(draw, 250);
    }
}

function changeDirection(dir) {
    if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
    if (dir === "UP" && direction !== "DOWN") direction = "UP";
    if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
    if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
}

function handleDirection(keyCode) {
    if (keyCode === 37) changeDirection("LEFT");
    if (keyCode === 38) changeDirection("UP");
    if (keyCode === 39) changeDirection("RIGHT");
    if (keyCode === 40) changeDirection("DOWN");
}

function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scoreDisplay.innerText = `Score: ${score}`;
    hscoreDisplay.innerText = `High Score: ${highscore}`;

    // Draw food
    /*ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box); */
    ctx.drawImage(foodImage, food.x, food.y, box, box);

    // Draw snake
    snake.forEach((segment, index) => {
        /*ctx.fillStyle = index === 0 ? "black" : "green";*/
        ctx.fillStyle = index === 0 ? "#00cc00" : "#33ff33"; // Bright green shades
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box);

        if (index === 0) {
            ctx.fillStyle = "green";
            ctx.beginPath();
            ctx.arc(segment.x + 6, segment.y + 6, 3, 0, Math.PI * 2);
            ctx.arc(segment.x + 14, segment.y + 6, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    let newX = snake[0].x;
    let newY = snake[0].y;

    if (direction === "LEFT") newX -= box;
    if (direction === "UP") newY -= box;
    if (direction === "RIGHT") newX += box;
    if (direction === "DOWN") newY += box;

    if (newX === food.x && newY === food.y) {
        score += 1;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    if (
        newX < 0 || newY < 0 || newX >= canvas.width || newY >= canvas.height ||
        snake.some(segment => segment.x === newX && segment.y === newY)
    ) {
        clearInterval(gameInterval);
        gameOver = true;
        showGameOver();
        return;
    }

    snake.unshift({ x: newX, y: newY });
}

function showGameOver() {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
    document.getElementById("retryBtn").style.display = "inline-block";
    if (highscore < score)
    {
        highscore = score;
    }
    
}

function restartGame() {
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = "RIGHT";
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
    score = 0;
    gameStarted = false;
    gameOver = false;
    document.getElementById("retryBtn").style.display = "none";
    clearInterval(gameInterval);
    draw();
}

window.onload = function () {
    draw();
};
