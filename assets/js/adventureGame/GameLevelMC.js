// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';
import Creeper from './Creeper.js'; // Import the Creeper class
import GameLevelForest from './GameLevelForest.js';
import Platfromer from './Platformer.js'
import DialogueSystem from './DialogueSystem.js';

class GameLevelMC {
  constructor(gameEnv) {
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    const image_src_main = path + "/images/gamify/maine_RPG.png";
    const image_data_main = {
      name: 'main',
      greeting: "Welcome to the main hub of Overwold.",
      src: image_src_main,
      pixels: { height: 320, width: 480 }
    };

    const sprite_src_player = path + "/images/gamify/steve.png";
    const PLAYER_SCALE_FACTOR = 5;
    const sprite_data_player = {
      id: 'Player',
      greeting: "I am Steve.",
      src: sprite_src_player,
      SCALE_FACTOR: PLAYER_SCALE_FACTOR,
      STEP_FACTOR: 150,
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: 0, y: height - (height / PLAYER_SCALE_FACTOR) },
      pixels: { height: 1500, width: 600 },
      orientation: { rows: 4, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      downRight: { row: 2, start: 0, columns: 3, rotate: Math.PI / 16 },
      downLeft: { row: 1, start: 0, columns: 3, rotate: -Math.PI / 16 },
      left: { row: 1, start: 0, columns: 3 },
      right: { row: 2, start: 0, columns: 3 },
      up: { row: 3, start: 0, columns: 3 },
      upLeft: { row: 1, start: 0, columns: 3, rotate: Math.PI / 16 },
      upRight: { row: 2, start: 0, columns: 3, rotate: -Math.PI / 16 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    const sprite_src_creeper = path + "/images/gamify/creepa.png";
    const sprite_greet_creeper = "KABOOM!!";
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
      speed: 10,
      direction: { x: 1, y: 1 },

      sound: new Audio(path + "/audio/creeper.mp3"),

      updatePosition: function () {
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

        const spriteElement = document.getElementById(this.id);
        if (spriteElement) {
          spriteElement.style.transform = this.direction.x === -1 ? "scaleX(-1)" : "scaleX(1)";
          spriteElement.style.left = this.INIT_POSITION.x + 'px';
          spriteElement.style.top = this.INIT_POSITION.y + 'px';
        }
      },
      isAnimating: false,
      playAnimation: function () {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const spriteElement = document.getElementById(this.id);
        if (!spriteElement) return;

        this.sound.play();

        spriteElement.style.transition = 'filter 1s ease-in-out';
        spriteElement.style.filter = 'brightness(3) saturate(0)';

        setTimeout(() => {
          spriteElement.style.filter = 'none';
          setTimeout(() => {
            spriteElement.style.transition = '';
            this.isAnimating = false;
          }, 1000);
        }, 1000);
      }
    };

    setInterval(() => {
      sprite_data_creeper.updatePosition();
    }, 100);

    setInterval(() => {
      sprite_data_creeper.playAnimation();
    }, 5000);

    const sprite_src_villager = path + "/images/gamify/villager.png";
const sprite_greet_villager = "Aur aur aur";

const sprite_data_villager = {
  id: 'Villager',
  greeting: sprite_greet_villager,
  src: sprite_src_villager,
  SCALE_FACTOR: 6,
  ANIMATION_RATE: 100,
  pixels: { width: 700, height: 1400 },
  INIT_POSITION: { x: (width * 10 / 11), y: (height * 1 / 40) },
  orientation: { rows: 1, columns: 1 },
  down: { row: 0, start: 0, columns: 1 },
  hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
dialogues: [
              "Expolore the new terrain?",
              "I love villager life!",
              "Roblox is not better than Minecraft!",
          ],
          reaction: function() {
              // Don't show any reaction dialogue - this prevents the first alert
              // The interact function will handle all dialogue instead
          },
          interact: function() {
              // Clear any existing dialogue first to prevent duplicates
              if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) {
                  this.dialogueSystem.closeDialogue();
              }
              
              // Create a new dialogue system if needed
              if (!this.dialogueSystem) {
                  this.dialogueSystem = new DialogueSystem();
              }
              
              // Show portal dialogue with buttons
              this.dialogueSystem.showDialogue(
                  "Do you wish to explore the plains?",
                  "Plains Biome?",
                  this.spriteData.src
              );
              
              // Add buttons directly to the dialogue
              this.dialogueSystem.addButtons([
                  {
                      text: "Mountainous Plains",
                      primary: true,
                      action: () => {
                          this.dialogueSystem.closeDialogue();
                          
                          // Clean up the current game state
                          if (gameEnv && gameEnv.gameControl) {
                              // Store reference to the current game control
                              const gameControl = gameEnv.gameControl;
                              
                              // Create fade overlay for transition
                              const fadeOverlay = document.createElement('div');
                              Object.assign(fadeOverlay.style, {
                                  position: 'fixed',
                                  top: '0',
                                  left: '0',
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: '#000',
                                  opacity: '0',
                                  transition: 'opacity 1s ease-in-out',
                                  zIndex: '9999'
                              });
                              document.body.appendChild(fadeOverlay);
                              
                              console.log("Starting New level transition...");
                              
                              // Fade in
                              requestAnimationFrame(() => {
                                  fadeOverlay.style.opacity = '1';
                                  
                                  // After fade in, transition to End level
                                  setTimeout(() => {
                                      // Clean up current level properly
                                      if (gameControl.currentLevel) {
                                          // Properly destroy the current level
                                          console.log("Destroying current level...");
                                          gameControl.currentLevel.destroy();
                                          
                                          // Force cleanup of any remaining canvases
                                          const gameContainer = document.getElementById('gameContainer');
                                          const oldCanvases = gameContainer.querySelectorAll('canvas:not(#gameCanvas)');
                                          oldCanvases.forEach(canvas => {
                                              console.log("Removing old canvas:", canvas.id);
                                              canvas.parentNode.removeChild(canvas);
                                          });
                                      }
                                      
                                      console.log("Setting up Platformer...");
                                      
                                      // IMPORTANT: Store the original level classes for return journey
                                      gameControl._originalLevelClasses = gameControl.levelClasses;
                                      
                                      // Change the level classes to GameLevelEnd
                                      gameControl.levelClasses = [Platfromer];
                                      gameControl.currentLevelIndex = 0;
                                      
                                      // Make sure game is not paused
                                      gameControl.isPaused = false;
                                      
                                      // Start the End level with the same control
                                      console.log("Transitioning to Platformer...");
                                      gameControl.transitionToLevel();
                                      
                                      // Fade out overlay
                                      setTimeout(() => {
                                          fadeOverlay.style.opacity = '0';
                                          setTimeout(() => {
                                              document.body.removeChild(fadeOverlay);
                                          }, 1000);
                                      }, 500);
                                  }, 1000);
                              });
                          }
                      }
                  },
                  {
                      text: "Not Ready",
                      action: () => {
                          this.dialogueSystem.closeDialogue();
                      }
                  }
              ]);
          }
      }


    this.classes = [
      { class: Background, data: image_data_main },
      { class: Player, data: sprite_data_player },
      { class: Npc, data: sprite_data_villager },
      { class: Creeper, data: sprite_data_creeper },
    ];
  }
}

export default GameLevelMC;
