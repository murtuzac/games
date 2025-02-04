const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;

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

function checkCollision() {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft > 40 && obstacleLeft < 80 && dinoTop <= 20) {
        alert("Game Over! Your Score: " + score);
        score = 0;
    } else {
        score++;
        scoreDisplay.innerText = "Score: " + score;
    }
}

setInterval(checkCollision, 100);
