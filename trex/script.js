const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const gameOverMessage = document.getElementById("gameOverMessage");
const toggleButton = document.getElementById("toggleButton");

let isJumping = false;
let score = 0;
let gameRunning = false;
let gameInterval;

// 🦖 Handle Jumping
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    dino.classList.add("jump");

    setTimeout(() => {
        dino.classList.remove("jump");
        isJumping = false;
    }, 500);
}

// 🎮 Start or Pause the Game
function toggleGame() {
    if (gameRunning) {
        pauseGame();
    } else {
        startGame();
    }
}

// 🎮 Start the Game
function startGame() {
    gameOverMessage.classList.add("hidden"); // Hide game over message
    score = 0;
    scoreDisplay.innerText = "Score: 0";
    gameRunning = true;

    // Reset obstacle animation
    obstacle.style.animation = "moveObstacle 1.5s infinite linear";

    gameInterval = setInterval(checkCollision, 100);

    toggleButton.innerText = "Pause";
}

// ⏸ Pause the Game
function pauseGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    obstacle.style.animation = "none"; // Stop obstacle movement
    toggleButton.innerText = "Start";
}

// 💀 Game Over
function gameOver() {
    gameRunning = false;
    clearInterval(gameInterval);
    obstacle.style.animation = "none"; // Stop obstacle movement
    gameOverMessage.classList.remove("hidden"); // Show Game Over message
    toggleButton.innerText = "Start";
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
