const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const gameOverMessage = document.getElementById("gameOverMessage");

let isJumping = false;
let score = 0;
let gameRunning = false;
let gameInterval;

// 🦖 Start Game on Space Key Press or Tap
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        if (!gameRunning) startGame();
        jump();
    }
});

// 📱 Mobile Tap Support
document.addEventListener("touchstart", function() {
    if (!gameRunning) startGame();
    jump();
});

function jump() {
    if (isJumping) return;
    
    isJumping = true;
    dino.classList.add("jump");

    setTimeout(() => {
        dino.classList.remove("jump");
        isJumping = false;
    }, 500);
}

// 🎮 Start the Game
function startGame() {
    gameOverMessage.classList.add("hidden"); // Hide game over message
    score = 0;
    scoreDisplay.innerText = "Score: 0";
    gameRunning = true;

    obstacle.style.animation = "moveObstacle 1.5s infinite linear";

    gameInterval = setInterval(checkCollision, 100);
}

// 💀 Game Over
function gameOver() {
    gameRunning = false;
    clearInterval(gameInterval);
    obstacle.style.animation = "none"; // Stop obstacle movement
    gameOverMessage.classList.remove("hidden"); // Show Game Over message
}

// ⚠ Collision Detection
function checkCollision() {
    if (!gameRunning) return;

    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft > 40 && obstacleLeft < 80 && dinoTop <= 20) {
        gameOver();
    } else {
        score++;
        scoreDisplay.innerText = "Score: " + score;
    }
}
