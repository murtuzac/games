const game = document.getElementById("game");
const paddleLeft = document.getElementById("paddleLeft");
const paddleRight = document.getElementById("paddleRight");
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");

let ballX = 290, ballY = 190;
let ballSpeedX = 3, ballSpeedY = 3;
let paddleLeftY = 160, paddleRightY = 160;
let leftScore = 0, rightScore = 0;
let speedMultiplier = 1; // Ball speed multiplier

// Move paddles with keys
document.addEventListener("keydown", (event) => {
    if (event.key === "w" && paddleLeftY > 10) {
        paddleLeftY -= 20;
    } else if (event.key === "s" && paddleLeftY < 310) {
        paddleLeftY += 20;
    }

    if (event.key === "ArrowUp" && paddleRightY > 10) {
        paddleRightY -= 20;
    } else if (event.key === "ArrowDown" && paddleRightY < 310) {
        paddleRightY += 20;
    }

    paddleLeft.style.top = paddleLeftY + "px";
    paddleRight.style.top = paddleRightY + "px";
});

// Ball movement logic
function updateBall() {
    ballX += ballSpeedX * speedMultiplier;
    ballY += ballSpeedY * speedMultiplier;

    // Ball bouncing off top and bottom walls
    if (ballY <= 0 || ballY >= 385) ballSpeedY *= -1;

    // Ball bouncing off paddles
    if (ballX <= 20 && ballY > paddleLeftY && ballY < paddleLeftY + 80) {
        ballSpeedX *= -1;
    }

    if (ballX >= 565 && ballY > paddleRightY && ballY < paddleRightY + 80) {
        ballSpeedX *= -1;
    }

    // Scoring logic
    if (ballX < 0) {
        rightScore++;
        resetBall();
    }

    if (ballX > 590) {
        leftScore++;
        resetBall();
    }

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    scoreDisplay.innerText = `Player 1: ${leftScore} | Player 2: ${rightScore}`;

    // Increase ball speed by 3% every 5 points, max 20% increase
    if ((leftScore + rightScore) % 5 === 0 && (leftScore + rightScore) !== 0) {
        if (speedMultiplier < 1.2) {
            speedMultiplier += 0.03; // Increase speed by 3%
        }
    }
}

// Reset ball to center after scoring
function resetBall() {
    ballX = 290;
    ballY = 190;
    ballSpeedX = Math.random() > 0.5 ? 3 : -3;
    ballSpeedY = Math.random() > 0.5 ? 3 : -3;
}

// Start game loop
setInterval(updateBall, 20);
