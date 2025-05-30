import Background from './Background.js';
import Npc from './Npc.js';
import Player from './Player.js';
import enemy from './Enemy.js';
import GameControl from './GameControl.js';
import GameLevelMC from './GameLevelMC.js';
import GameLevelWater from './GameLevelWater.js';

class GameLevelForest {
  constructor(gameEnv, gameControlInstance) {
    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;
    const path = gameEnv.path;

    const image_src_forest = path + "/images/gamify/forest.png";
    const image_data_forest = {
      id: 'Forest',
      src: image_src_forest,
      pixels: { height: 597, width: 340 }
    };

    const sprite_src_degen = path + "/images/gamify/degen.png";
    const DEGEN_SCALE_FACTOR = 7;

    const sprite_data_degen = {
      id: 'Degen',
      greeting: "I don't remember my name..but I remember a lot of people around me used to call me degen. I guess that's what I'll be called for now.",
      src: sprite_src_degen,
      SCALE_FACTOR: DEGEN_SCALE_FACTOR,
      STEP_FACTOR: 250,
      ANIMATION_RATE: 20,
      INIT_POSITION: { x: 0, y: height - (height / DEGEN_SCALE_FACTOR) },
      pixels: { height: 600, width: 520 },
      orientation: { rows: 4, columns: 4 },
      down: { row: 0, start: 0, columns: 4 },
      downRight: { row: 1, start: 0, columns: 4, rotate: Math.PI / 16 },
      downLeft: { row: 2, start: 0, columns: 4, rotate: -Math.PI / 16 },
      left: { row: 2, start: 0, columns: 4 },
      right: { row: 1, start: 0, columns: 4 },
      up: { row: 3, start: 0, columns: 4 },
      upLeft: { row: 2, start: 0, columns: 4, rotate: Math.PI / 16 },
      upRight: { row: 1, start: 0, columns: 4, rotate: -Math.PI / 16 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 },

      checkCollisionWithNpc(npc) {
        const playerX = this.INIT_POSITION.x;
        const playerY = this.INIT_POSITION.y;
        const playerRect = {
          x: playerX,
          y: playerY,
          width: this.pixels.width * this.hitbox.widthPercentage,
          height: this.pixels.height * this.hitbox.heightPercentage
        };

        const npcRect = {
          x: npc.INIT_POSITION.x,
          y: npc.INIT_POSITION.y,
          width: npc.pixels.width * npc.hitbox.widthPercentage,
          height: npc.pixels.height * npc.hitbox.heightPercentage
        };

        return (
          playerRect.x < npcRect.x + npcRect.width &&
          playerRect.x + playerRect.width > npcRect.x &&
          playerRect.y < npcRect.y + npcRect.height &&
          playerRect.y + playerRect.height > npcRect.y
        );
      },

      handleNpcInteraction(npc) {
        if (npc.id === 'Unc' && this.checkCollisionWithNpc(npc)) {
          npc.interact();
        }
      }
    };

    const sprite_src_unc = path + "/images/gamify/Unc.png";
    const sprite_greet_unc = "Welcome to the outside world, Degen. Thank you for playing the game and escaping the basement.";
    const sprite_data_unc = {
      id: 'Unc',
      greeting: sprite_greet_unc,
      src: sprite_src_unc,
      SCALE_FACTOR: 6,
      ANIMATION_RATE: 50,
      pixels: { height: 192, width: 96 },
      INIT_POSITION: { x: width / 2, y: height / 1.7 },
      orientation: { rows: 4, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      frameSize: { width: 32, height: 48 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      interact() {
        showNpcPopup("/Nico_2025/platformer");
      }
    };
      
    this.classes = [
      { class: Background, data: image_data_forest },
      { class: Player, data: sprite_data_degen },
      { class: Npc, data: sprite_data_unc }
    ];

    setInterval(() => {
      sprite_data_degen.handleNpcInteraction(sprite_data_unc);
    }, 100);
  }
}

export default GameLevelForest;
