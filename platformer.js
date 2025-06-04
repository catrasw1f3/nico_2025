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

const PLAYER_SCALE_FACTOR = 5;

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
  hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
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

// Key tracking
const keys = {};

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

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
}

// Start the game
update();
