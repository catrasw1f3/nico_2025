// Platformer Game Example
class Platformer {}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game settings
const gravity = 0.5;
const friction = 0.8;

// Load sprite image
const path = "."; // Adjust path if needed
const sprite_src_player = "/Nico_2025/images/gamify/steve.png";
const playerImage = new Image();
playerImage.src = sprite_src_player;

const PLAYER_SCALE_FACTOR = 3;

const sprite_data_player = {
  id: 'Player',
  greeting: "I am Steve.",
  src: sprite_src_player,
  SCALE_FACTOR: PLAYER_SCALE_FACTOR,
  STEP_FACTOR: 800,
  ANIMATION_RATE: 50,
  INIT_POSITION: { x: 0, y: canvas.height - (canvas.height / PLAYER_SCALE_FACTOR) },
  pixels: { height: 1500, width: 600 },
  orientation: { rows: 4, columns: 3 },
  down: { row: 0, start: 0, columns: 3 },
  left: { row: 1, start: 0, columns: 3 },
  right: { row: 2, start: 0, columns: 3 },
  up: { row: 3, start: 0, columns: 3 },
  hitbox: { widthPercentage: 0.65, heightPercentage: 0.3 },
  keypress: { up: 87, left: 65, down: 83, right: 68 }
};

// Player object
const frameWidth = sprite_data_player.pixels.width / sprite_data_player.orientation.columns;
const frameHeight = sprite_data_player.pixels.height / sprite_data_player.orientation.rows;

const player = {
  x: 100,
  y: 0,
  width: frameWidth / PLAYER_SCALE_FACTOR,
  height: frameHeight / PLAYER_SCALE_FACTOR,
  velocityX: 0,
  velocityY: 0,
  speed: 4,
  jumpPower: -12,
  onGround: false,
  frameX: 0,
  frameY: sprite_data_player.down.row,
  frameCounter: 0
};

// Platform data
const platforms = [
  { x: 0, y: 350, width: 800, height: 50 },
  { x: 200, y: 280, width: 100, height: 10 },
  { x: 400, y: 220, width: 150, height: 10 },
  { x: 600, y: 150, width: 100, height: 10 }
];

// Chicken sprite setup
const sprite_src_chicken = "/Nico_2025/images/gamify/chicken.png";
const chickenImage = new Image();
chickenImage.src = sprite_src_chicken;

const CHICKEN_SCALE_FACTOR = 8;
const chickenSpriteData = {
  id: 'Chicken',
  src: sprite_src_chicken,
  SCALE_FACTOR: CHICKEN_SCALE_FACTOR,
  pixels: { width: 448, height: 452 },
  speed: 3,
  direction: { x: Math.random() < 0.5 ? -1 : 1 },
  x: 300,
  y: 300,
  width: 448 / CHICKEN_SCALE_FACTOR,
  height: 452 / CHICKEN_SCALE_FACTOR,
  frameX: 0,
  frameY: 0,
  frameCounter: 0,
  ANIMATION_RATE: 30
};

// Key tracking
const keys = {};
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

// Chicken random motion logic
function updateChickenMotion() {
  chickenSpriteData.x += chickenSpriteData.direction.x * chickenSpriteData.speed;

  // Bounce off canvas edges
  if (chickenSpriteData.x < 0) {
    chickenSpriteData.x = 0;
    chickenSpriteData.direction.x = 1;
  }
  if (chickenSpriteData.x > canvas.width - chickenSpriteData.width) {
    chickenSpriteData.x = canvas.width - chickenSpriteData.width;
    chickenSpriteData.direction.x = -1;
  }

  // Occasionally change direction
  if (Math.random() < 0.03) {
    chickenSpriteData.direction.x *= -1;
  }

  // Animate sprite (if you have multiple frames)
  chickenSpriteData.frameCounter++;
  if (chickenSpriteData.frameCounter >= chickenSpriteData.ANIMATION_RATE) {
    chickenSpriteData.frameX = (chickenSpriteData.frameX + 1) % 1; // Set to number of frames if animated
    chickenSpriteData.frameCounter = 0;
  }
}

// Game loop
function update() {
  // Movement input
  if (keys["ArrowRight"] || keys["KeyD"]) {
    player.velocityX = player.speed;
    player.frameY = sprite_data_player.right.row;
  } else if (keys["ArrowLeft"] || keys["KeyA"]) {
    player.velocityX = -player.speed;
    player.frameY = sprite_data_player.left.row;
  } else {
    player.velocityX *= friction;
  }

  // Jumping
  if ((keys["ArrowUp"] || keys["KeyW"] || keys["Space"]) && player.onGround) {
    player.velocityY = player.jumpPower;
    player.onGround = false;
  }

  // Gravity
  player.velocityY += gravity;

  // Position update
  player.x += player.velocityX;
  player.y += player.velocityY;

  // Platform collision
  player.onGround = false;
  platforms.forEach(platform => {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y < platform.y + platform.height &&
      player.y + player.height > platform.y
    ) {
      if (player.velocityY > 0) {
        player.y = platform.y - player.height;
        player.velocityY = 0;
        player.onGround = true;
      }
    }
  });

  // Stay inside canvas
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

  updateChickenMotion();

  // Animate sprite
  player.frameCounter++;
  if (player.frameCounter >= sprite_data_player.ANIMATION_RATE) {
    player.frameX = (player.frameX + 1) % sprite_data_player.right.columns;
    player.frameCounter = 0;
  }

  draw();
  requestAnimationFrame(update);
}

// Drawing
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player sprite
  ctx.drawImage(
    playerImage,
    player.frameX * frameWidth,
    player.frameY * frameHeight,
    frameWidth,
    frameHeight,
    player.x,
    player.y,
    player.width,
    player.height
  );

  // Draw platforms
  ctx.fillStyle = "green";
  platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));

  // Draw chicken NPC
  ctx.save();
  if (chickenSpriteData.direction.x === 1) { // Flip when moving right
    ctx.translate(chickenSpriteData.x + chickenSpriteData.width, chickenSpriteData.y);
    ctx.scale(-1, 1);
    ctx.drawImage(
      chickenImage,
      0, 0, chickenSpriteData.pixels.width, chickenSpriteData.pixels.height,
      0, 0, chickenSpriteData.width, chickenSpriteData.height
    );
  } else {
    ctx.drawImage(
      chickenImage,
      0, 0, chickenSpriteData.pixels.width, chickenSpriteData.pixels.height,
      chickenSpriteData.x, chickenSpriteData.y, chickenSpriteData.width, chickenSpriteData.height
    );
  }
  ctx.restore();
}

// Start the game
update();

// === ✅ Return to main game button ===
const returnButton = document.createElement('button');
returnButton.textContent = "Return to Main Game";
Object.assign(returnButton.style, {
  position: 'absolute',
  top: '20px',
  right: '20px',
  padding: '10px 15px',
  backgroundColor: '#111',
  color: '#fff',
  border: '2px solid white',
  fontFamily: 'monospace',
  fontSize: '14px',
  cursor: 'pointer',
  zIndex: '10000'
});
returnButton.onclick = () => {
  window.location.href = '/Nico_2025/Nico_2025/gamify/adventureGame'; // ← change this if your main game file is different
};



document.body.appendChild(returnButton);
// === ✅ End of game button ===


// export default Platformer;