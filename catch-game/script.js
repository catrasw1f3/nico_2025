const player = document.getElementById("player");
const fallingObject = document.getElementById("fallingObject");
const scoreDisplay = document.getElementById("score");

let score = 0;
let playerX = 170;
let objectY = 0;
let objectX = Math.random() * 380;

function movePlayer(event) {
  if (event.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  } else if (event.key === "ArrowRight" && playerX < 340) {
    playerX += 20;
  }
  player.style.left = `${playerX}px`;
}

function resetObject() {
  objectY = 0;
  objectX = Math.random() * 380;
  fallingObject.style.left = `${objectX}px`;
}

function gameLoop() {
  objectY += 4;
  fallingObject.style.top = `${objectY}px`;

  const objectBottom = objectY + 20;
  const playerTop = 480;
  const playerBottom = 500;

  if (
    objectBottom >= playerTop &&
    objectY <= playerBottom &&
    objectX + 20 >= playerX &&
    objectX <= playerX + 60
  ) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    resetObject();
  }

  if (objectY > 500) {
    resetObject();
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", movePlayer);
resetObject();
gameLoop();
