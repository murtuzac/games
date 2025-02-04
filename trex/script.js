const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 150, width: 20, height: 20, velocityY: 0, isJumping: false };
let gravity = 0.5;
let obstacles = [];
let gameSpeed = 3;

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dino Jump Logic
    if (dino.isJumping) dino.velocityY += gravity;
    dino.y += dino.velocityY;

    if (dino.y >= 150) { dino.y = 150; dino.isJumping = false; }

    ctx.fillStyle = "black";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    requestAnimationFrame(update);
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !dino.isJumping) {
        dino.isJumping = true;
        dino.velocityY = -10;
    }
});

update();
