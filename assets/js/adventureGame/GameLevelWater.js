// To build GameLevels, each contains GameObjects from below imports
import GameEnv from './GameEnv.js';
import Background from './Background.js';
import PlayerOne from './PlayerOne.js';
import PlayerTwo from './PlayerTwo.js';



class GameLevelWater {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Values dependent on GameEnv.create()
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_forest = path + "/images/gamify/forest.png";
    const image_data_forest = {
        name: 'forest',
        src: image_src_forest,
        pixels: {height: 580, width: 1038}
    };

    // Player 1 sprite data (miku)
    const MIKU_SCALE_FACTOR = 10;
    const sprite_src_miku = path + "/images/gamify/miku.png";
    const sprite_data_miku = {
        name: 'miku',
        src: sprite_src_miku,
        SCALE_FACTOR: MIKU_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/MIKU_SCALE_FACTOR) }, 
        pixels: {height: 280, width: 256},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },
        left: {row: 1, start: 0, columns: 3 },
        right: {row: 2, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
    };

    // Player 2 sprite data (asaka)
    const sprite_src_asaka = path + "/images/gamify/asaka.png";
    const sprite_data_asaka = {
        name: 'asaka',
        src: sprite_src_asaka,
        SCALE_FACTOR: 16,
        STEP_FACTOR: 400,
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 384},
        INIT_POSITION: { x: 0, y: 0 },
        orientation: {rows: 8, columns: 12 },
        down: {row: 0, start: 0, columns: 3 },  // 1st row
        left: {row: 1, start: 0, columns: 3 },  // 2nd row
        right: {row: 2, start: 0, columns: 3 }, // 3rd row
        up: {row: 3, start: 0, columns: 3 },    // 4th row
    };

    
    // List of objects defnitions for this level
    this.objects = [
      { class: Background, data: image_data_forest },
      { class: PlayerOne, data: sprite_data_miku },
      { class: PlayerTwo, data: sprite_data_asaka },
    ];
  }

}

export default GameLevelWater;