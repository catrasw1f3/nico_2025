import GameEnv from "./GameEnv.js";  // Import GameEnv for game environment setup
import GameLevelForest from './GameLevelForest.js';  // Import the Forest level class

class GameLevel {
    constructor(gameControl) {
        // Initialize game environment
        this.gameEnv = new GameEnv();
        this.gameEnv.path = gameControl.path;
        this.gameEnv.gameControl = gameControl;
    }
    // Create the game level and its objects
    create(GameLevelClass) {
        this.continue = true;
        this.gameEnv.create();  // Setup environment
        this.gameLevel = new GameLevelClass(this.gameEnv);  // Instantiate the level
        this.gameObjectClasses = this.gameLevel.classes;

        // Create and add game objects to the environment
        for (let gameObjectClass of this.gameObjectClasses) {
            if (!gameObjectClass.data) gameObjectClass.data = {};  // Ensure data exists
            let gameObject = new gameObjectClass.class(gameObjectClass.data, this.gameEnv);  // Create each object
            this.gameEnv.gameObjects.push(gameObject);  // Add it to the environment
        }

        // Add event listener for window resizing
        window.addEventListener('resize', this.resize.bind(this));
    }

    // Clean up the game objects and event listeners
    destroy() {
        for (let index = this.gameEnv.gameObjects.length - 1; index >= 0; index--) {
            this.gameEnv.gameObjects[index].destroy();
        }
        window.removeEventListener('resize', this.resize.bind(this));  // Remove resize listener
    }

    // Update the game environment and all objects
    update() {
        this.gameEnv.clear();  // Clear the environment for the next frame
        for (let gameObject of this.gameEnv.gameObjects) {
            gameObject.update();  // Update each game object
        }
    }

    // Resize the game environment and objects when the window is resized
    resize() {
        this.gameEnv.resize();  // Resize environment
        for (let gameObject of this.gameEnv.gameObjects) {
            gameObject.resize();  // Resize each game object
        }
    }
}

// Create the game level with the specific level class (GameLevelForest)
const gameEnv = { innerWidth: window.innerWidth, innerHeight: window.innerHeight, path: '/your/path' };
const gameControl = {};  // Assuming gameControl is an object with necessary properties
const gameLevelInstance = new GameLevel(gameControl);  // Instantiate GameLevel with gameControl

// Call the create method with GameLevelForest to set up the level
gameLevelInstance.create(GameLevelForest);

export default GameLevel;
