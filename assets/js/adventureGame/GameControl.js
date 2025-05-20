// GameControl.js with improved level transition handling
import GameLevel from "./GameLevel.js";

class GameControl {
    /**
     * GameControl class to manage the game levels and transitions
     * @param {*} game - The game instance containing path, container, and canvas
     * @param {*} levelClasses - An array of classes for each game level
     */
    constructor(game, levelClasses) {
        // Ensure levelClasses is a valid array
        if (!Array.isArray(levelClasses) || levelClasses.length === 0) {
            throw new Error("GameControl initialization failed: levelClasses must be a non-empty array.");
        }

        this.game = game;
        this.path = game.path;
        this.gameContainer = game.gameContainer;
        this.gameCanvas = game.gameCanvas;
        this.levelClasses = levelClasses;

        this.currentLevel = null;
        this.currentLevelIndex = 0;
        this.gameLoopCounter = 0;
        this.isPaused = false;
        this.exitKeyListener = this.handleExitKey.bind(this);
        this.gameOver = null;
        this.savedCanvasState = [];

        this.globalInteractionHandlers = new Set();
    }

    start() {
        this.addExitKeyListener();
        this.transitionToLevel();
    }

    registerInteractionHandler(handler) {
        if (handler) {
            this.globalInteractionHandlers.add(handler);
        }
    }

    unregisterInteractionHandler(handler) {
        if (handler) {
            this.globalInteractionHandlers.delete(handler);
        }
    }

    cleanupInteractionHandlers() {
        this.globalInteractionHandlers.forEach(handler => {
            if (handler.removeInteractKeyListeners) {
                handler.removeInteractKeyListeners();
            }
        });
        this.globalInteractionHandlers.clear();
    }

    transitionToLevel() {
        this.cleanupInteractionHandlers();

        // Safety checks
        if (!this.levelClasses || this.levelClasses.length === 0) {
            console.error("No levels defined.");
            alert("Game cannot start: no levels defined.");
            return;
        }

        if (this.currentLevelIndex >= this.levelClasses.length) {
            console.warn("No more levels to load.");
            alert("All levels completed.");
            return;
        }

        const GameLevelClass = this.levelClasses[this.currentLevelIndex];
        if (!GameLevelClass) {
            console.error(`Level class at index ${this.currentLevelIndex} is undefined.`);
            return;
        }

        this.currentLevel = new GameLevel(this);
        this.currentLevel.create(GameLevelClass);
        this.gameLoop();
    }

    gameLoop() {
        if (!this.currentLevel || !this.currentLevel.continue) {
            this.handleLevelEnd();
            return;
        }

        if (this.isPaused) {
            return;
        }

        this.currentLevel.update();
        this.handleInLevelLogic();

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    handleInLevelLogic() {
        if (this.currentLevelIndex === 0 && this.gameLoopCounter === 0) {
            console.log("Start Level.");
        }

        this.gameLoopCounter++;
    }

    handleLevelEnd() {
        if (this.currentLevelIndex < this.levelClasses.length - 1) {
            alert("Level ended.");
        } else {
            alert("All levels completed.");
        }

        this.cleanupInteractionHandlers();

        if (this.currentLevel) {
            this.currentLevel.destroy();
        }

        if (this.gameOver) {
            this.gameOver();
        } else {
            this.currentLevelIndex++;
            this.transitionToLevel();
        }
    }

    handleExitKey(event) {
        if (event.key === 'Escape') {
            if (this.currentLevel) {
                this.currentLevel.continue = false;
            }
        }
    }

    addExitKeyListener() {
        document.addEventListener('keydown', this.exitKeyListener);
    }

    removeExitKeyListener() {
        document.removeEventListener('keydown', this.exitKeyListener);
    }

    saveCanvasState() {
        const gameContainer = document.getElementById('gameContainer');
        const canvasElements = gameContainer.querySelectorAll('canvas');
        this.savedCanvasState = Array.from(canvasElements).map(canvas => {
            return {
                id: canvas.id,
                imageData: canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
            };
        });
    }

    hideCanvasState() {
        const gameContainer = document.getElementById('gameContainer');
        const canvasElements = gameContainer.querySelectorAll('canvas');
        canvasElements.forEach(canvas => {
            if (canvas.id !== 'gameCanvas') {
                canvas.style.display = 'none';
            }
        });
    }

    showCanvasState() {
        this.savedCanvasState.forEach(hidden_canvas => {
            const canvas = document.getElementById(hidden_canvas.id);
            if (canvas) {
                canvas.style.display = 'block';
                canvas.getContext('2d').putImageData(hidden_canvas.imageData, 0, 0);
            }
        });
    }

    pause() {
        this.isPaused = true;
        this.removeExitKeyListener();
        this.saveCanvasState();
        this.hideCanvasState();
        this.cleanupInteractionHandlers();
    }

    resume() {
        this.isPaused = false;
        this.addExitKeyListener();
        this.showCanvasState();
        this.gameLoop();
    }
}

export default GameControl;
