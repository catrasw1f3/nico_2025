import Background from './Background.js';
import Npc from './Npc.js';
import Player from './Player.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';

class GameLevelForest {
  /**
   * Properties and methods to define a game level
   * @param {*} gameEnv - The active game environment
   */
  constructor(gameEnv) {
    // Dependencies to support game level creation
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_forest = path + "/images/gamify/forest.png";
    const image_data_forest = {
        id: 'Forest',
        src: image_src_forest,
        pixels: {height: 597, width: 340}
    };

    // Player data for Main Character
    const sprite_src_degen = path + "/images/gamify/degen.png"; // be sure to include the path
    const DEGEN_SCALE_FACTOR = 7;
    const sprite_data_degen = {
        id: 'Degen',
        greeting: "Woah, this is the outside... this is different, very different",
        src: sprite_src_degen,
        SCALE_FACTOR: DEGEN_SCALE_FACTOR,  // Adjust this based on your scaling needs
        STEP_FACTOR: 250,
        ANIMATION_RATE: 20,
        INIT_POSITION: { x: 0, y: height - (height/DEGEN_SCALE_FACTOR) }, 
        pixels: {height: 600, width: 520},
        orientation: {rows: 4, columns: 4 },
        down: {row: 0, start: 0, columns: 4 },
        downRight: {row: 1, start: 0, columns: 4, rotate: Math.PI/16 },
        downLeft: {row: 2, start: 0, columns: 4, rotate: -Math.PI/16 },
        left: {row: 2, start: 0, columns: 4 },
        right: {row: 1, start: 0, columns: 4 },
        up: {row: 3, start: 0, columns: 4 },
        upLeft: {row: 2, start: 0, columns: 4, rotate: Math.PI/16 },
        upRight: {row: 1, start: 0, columns: 4, rotate: -Math.PI/16 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

    // NPC data for Unc
    const sprite_src_unc = path + "/images/gamify/Unc.png"; // Ensure the correct path
    const sprite_greet_unc = "Welcome to the outside world, Degen. Thank you for playing the game and escaping the basement.";
    const sprite_data_unc = {
      id: 'Unc',
      greeting: sprite_greet_unc,
      src: sprite_src_unc,
      SCALE_FACTOR: 6,  // Adjust scaling as needed
      ANIMATION_RATE: 50,
      pixels: { height: 192, width: 96 },  // Fixed sprite sheet dimensions
      INIT_POSITION: { x: (width / 2), y: (height / 1.7) },
      orientation: { rows: 4, columns: 3 }, // Defines the sprite sheet layout
      down: { row: 0, start: 0, columns: 3 },  // Uses the first row for idle animation
      frameSize: { width: 32, height: 48 }, // Each frame's actual size
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        /* Interact function
        *  This function is called when the player interacts with the NPC
        *  It pauses the main game, creates a new GameControl instance with the StarWars level,
        */
        interact: function() {
          // Set a primary game reference from the game environment
          let primaryGame = gameEnv.gameControl;
          // Define the game in game level
          let levelArray = [GameLevelStarWars];
          // Define a new GameControl instance with the StarWars level
          let gameInGame = new GameControl(path,levelArray);
          // Pause the primary game 
          primaryGame.pause();
          // Start the game in game
          gameInGame.start();
          // Setup "callback" function to allow transition from game in gaame to the underlying game
          gameInGame.gameOver = function() {
            // Call .resume on primary game
            primaryGame.resume();
          }
        }
      };

    // List of classes and supporting definitions to create the game level
    this.classes = [
      { class: Background, data: image_data_forest },
      { class: Player, data: sprite_data_degen },
      { class: Npc, data: sprite_data_unc },
    ];
  }
}

export default GameLevelForest;