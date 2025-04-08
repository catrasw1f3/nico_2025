// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';
import GameLevelMCPlat from './GameLevelMCPlat.js';
class GameLevelMC {
  constructor(gameEnv) {
    // Values dependent on this.gameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;
    // Background data
    const image_src_main = path + "/images/gamify/maine_RPG.png"; // be sure to include the path
    const image_data_main = {
        name: 'main',
        greeting: "Welcome to the main hub of Overwold.",
        src: image_src_main,
        pixels: {height: 320, width: 480}
    };
    // Player data for Player
    const sprite_src_player = path + "/images/gamify/steve.png"; // be sure to include the path
    const PLAYER_SCALE_FACTOR = 5;
    const sprite_data_player = {
        id: 'Player',
        greeting: "I am Steve.",
        src: sprite_src_player,
        SCALE_FACTOR: PLAYER_SCALE_FACTOR,
        STEP_FACTOR: 800,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/PLAYER_SCALE_FACTOR) },
        pixels: {height: 1500, width: 600},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },
        downRight: {row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
        downLeft: {row: 1, start: 0, columns: 3, rotate: -Math.PI/16 },
        left: {row: 1, start: 0, columns: 3 },
        right: {row: 2, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
        upLeft: {row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
        upRight: {row: 2, start: 0, columns: 3, rotate: -Math.PI/16 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };
    // NPC data for creeper
// NPC data for creeper
const sprite_src_creeper = path + "/images/gamify/creepa.png"; // Normal Creeper
const sprite_src_explosion = path + "/images/gamify/explosion.png"; // Explosion Sprite
const sprite_greet_creeper = "Creepa.";

const sprite_data_creeper = {
    id: 'Creeper',
    greeting: sprite_greet_creeper,
    src: sprite_src_creeper,
    SCALE_FACTOR: 4,
    ANIMATION_RATE: 25,
    pixels: { height: 1200, width: 1600 },
    INIT_POSITION: { x: 100, y: 100 },
    orientation: { rows: 1, columns: 2 },
    down: { row: 0, start: 0, columns: 2 },
    right: { row: 0, start: 0, columns: 2 },
    left: { row: 0, start: 0, columns: 2 },
    up: { row: 0, start: 0, columns: 2 },
    hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
    walkingArea: {
        xMin: width / 10,
        xMax: (width * 5 / 7),
        yMin: height / 4,
        yMax: (height * 8 / 15)
    },
    speed: 5,
    direction: { x: 1, y: 1 },
    exploded: false,

    updatePosition: function () {
        if (this.exploded) return; // Stop movement if exploded

        this.INIT_POSITION.x += this.direction.x * this.speed;
        this.INIT_POSITION.y += this.direction.y * this.speed;

        if (this.INIT_POSITION.x <= this.walkingArea.xMin) {
            this.INIT_POSITION.x = this.walkingArea.xMin;
            this.direction.x = 1;
        }
        if (this.INIT_POSITION.x >= this.walkingArea.xMax) {
            this.INIT_POSITION.x = this.walkingArea.xMax;
            this.direction.x = -1;
        }
        if (this.INIT_POSITION.y <= this.walkingArea.yMin) {
            this.INIT_POSITION.y = this.walkingArea.yMin;
            this.direction.y = 1;
        }
        if (this.INIT_POSITION.y >= this.walkingArea.yMax) {
            this.INIT_POSITION.y = this.walkingArea.yMax;
            this.direction.y = -1;
        }

        // Check for collision with the player
        if (this.checkCollision(player)) {
            this.explode();
        }
    },

    checkCollision: function (player) {
        return (
            player.x < this.INIT_POSITION.x + this.pixels.width / this.SCALE_FACTOR &&
            player.x + player.width > this.INIT_POSITION.x &&
            player.y < this.INIT_POSITION.y + this.pixels.height / this.SCALE_FACTOR &&
            player.y + player.height > this.INIT_POSITION.y
        );
    },

    explode: function () {
        if (this.exploded) return;
        this.exploded = true;

        // Display explosion message
        this.showExplosionMessage();

        console.log("Creepa");
        this.src = sprite_src_explosion; // Switch to explosion sprite

        // Play explosion animation before removing creeper
        this.playDeathAnimation();
    },

    showExplosionMessage: function () {
        const explosionMessage = document.createElement("div");
        explosionMessage.innerText = "Creepa!";
        explosionMessage.style.position = "fixed";
        explosionMessage.style.top = "50%";
        explosionMessage.style.left = "50%";
        explosionMessage.style.transform = "translate(-50%, -50%)";
        explosionMessage.style.backgroundColor = "black";
        explosionMessage.style.color = "white";
        explosionMessage.style.padding = "20px";
        explosionMessage.style.fontSize = "24px";
        explosionMessage.style.border = "2px solid white";
        explosionMessage.style.zIndex = "1000";
        document.body.appendChild(explosionMessage);

        setTimeout(() => {
            document.body.removeChild(explosionMessage);
        }, 1000); // Remove message after 1 second
    },

    playDeathAnimation: function () {
        let frame = 0;
        const explosionFrames = 5; // Number of frames for explosion animation
        const animationInterval = setInterval(() => {
            frame++;
            console.log(`Explosion animation frame: ${frame}`);

            if (frame >= explosionFrames) {
                clearInterval(animationInterval);
                this.remove(); // Remove creeper after animation ends
            }
        }, 100); // Each frame lasts 100ms
    },

    remove: function () {
        console.log("Creeper removed from game.");
        // Remove from game objects list if necessary
    },

    reaction: function () {
        alert(sprite_greet_creeper);
    }
};

// Start moving Creeper
let creeperInterval = setInterval(() => {
    sprite_data_creeper.updatePosition();
}, 100);

      setInterval(() => {
        sprite_data_creeper.updatePosition();
      }, 100); // update position every 100 milliseconds
    // NPC Data for villager
    const sprite_src_villager = path + "/images/gamify/villager.png"; // be sure to include the path
    const sprite_greet_villager = "Aur aur aur";
    const sprite_data_villager = {
      id: 'Villager',
      greeting: sprite_greet_villager,
      src: sprite_src_villager,
      SCALE_FACTOR: 6,  // Adjust this based on your scaling needs
      ANIMATION_RATE: 100,
      pixels: {width: 700, height: 1400},
      INIT_POSITION: { x: (width * 10/11 ), y: (height * 1/40)}, // Adjusted position
      orientation: {rows: 1, columns: 1 },
      down: {row: 0, start: 0, columns: 1 },  // This is the stationary npc, down is default
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function() {
        alert(sprite_greet_villager);
      },
      interact: function() {
        let primaryGame = gameEnv.gameControl;
        let levelArray = [GameLevelMCPlat];
        let gameInGame = new GameControl(gameEnv.game, levelArray);
        primaryGame.pause();
        gameInGame.start();
        gameInGame.gameOver = function() {
          primaryGame.resume();
        }
      }
    };
    // List of objects defnitions for this level
    this.classes = [
      { class: Background, data: image_data_main },
      { class: Player, data: sprite_data_player },
      { class: Npc, data: sprite_data_villager },
      { class: Npc, data: sprite_data_creeper },
    ];
  }
}
export default GameLevelMC;