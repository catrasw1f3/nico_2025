// To build GameLevels, each contains GameObjects from below imports
import GameEnvBackground from './GameEnvBackground.js';
import Background from './Background.js';
import Player from './PlayerOne.js';
import Player2 from './PlayerTwo.js';

// Minimal Definition
class GameLevelSquares {
  constructor(gameEnv) {
    let path = gameEnv.path;
    this.classes = [      
      { class: GameEnvBackground, data: {src:  path + "/images/gamify/forest.png"} }, // zIndex default is 0
      { class: Player, data: {id: "player", zIndex: 1} },
      { class: Player, data: {id: "player2", zIndex: 1} },
    ];
  }
}

export default GameLevelSquares;