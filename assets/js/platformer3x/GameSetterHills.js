// GameSetHills.js Key objective is to define objects for a GameLevel
//import GameSet from './GameSet.js';
// To build GameLevels, each contains GameObjects from below imports
import BackgroundParallax from './BackgroundParallax.js';
import BackgroundTransitions from './BackgroundTransitions.js';
import Platform from './Platform.js';
import JumpPlatform from './PlatformJump.js';
import PlayerHills from './PlayerHills.js';
import Goomba from './EnemyGoomba.js';
import FlyingGoomba from './FlyingGoomba.js';
import MovingPlatform from './PlatformMoving.js'
import Mushroom from './Mushroom.js';
import Coin from './Coin.js';
import FinishLine from './FinishLine.js';
import BlockPlatform from './BlockPlatform.js';
import Chicken from './Chicken.js';

// Define the GameSetup object literal
const assets = {  
    obstacles: {
      /**tube: { src: "/images/platformer/obstacles/tube.png",
      hitbox: { widthPercentage: 0.5, heightPercentage: 0.5},
      width: 300,
      height: 300,
      scaleSize: 100,
      },
      coin: { src: "/images/platformer/obstacles/coin.png" }, */
    },
    platforms: {
      grass: { src: "/images/gamify/grassblock.png" },
      bricks: { src: "/images/gamify/grassblock.png" },
      block: { src: "/images/gamify/grassblock.png" }, 
      /** itemBlock: {
        src: "/images/platformer/platforms/mario_block_spritesheet_v2.png",
        sizeRatio: 83.2,
        widthRatio: 0.5,
        heightRatio: 1.0,
        width: 204,
        height: 204,
        scaleSize: 80,
        speedRatio: 0.7,
        hitbox: { widthPercentage: 0.4, heightPercentage: -0.2 }
      } */
    },
    backgrounds: {
      hills: { src: "/images/gamify/hills.png", parallaxSpeed: 0.4, moveOnKeyAction: true },
      mountains: { src: "/images/gamify/mountains.jpg", parallaxSpeed: 0.1, moveOnKeyAction: true },
      clouds: { src: "/images/gamify/clouds.png", parallaxSpeed: 0.5 },
    },
    transitions: {
      loading: { src: "/images/gamify/blackscreen.png" },
    },
    players: {
      steve: {
        src: "/images/gamify/steve.png",
        width: 600,
        height: 1500,
        scaleSize: 80,
        speedRatio: 0.7,
        idle: {
          left: { row: 2, frames: 3 },
          right: { row: 3, frames: 3 },
        },
        walk: {
          left: { row: 2, frames: 3 },
          right: { row: 3, frames: 3 },
        },
        run: {
          left: { row: 2, frames: 3 },
          right: { row: 3, frames: 3 },
        },
        jump: {
          left: { row: 2, frames: 3 },
          right: { row: 3, frames: 3 },
        },
        hitbox: { widthPercentage: 0.3, heightPercentage: 0.8 }
      },
    },
    enemies: {
      chicken: {
        src: "/images/gamify/chicken.png",
        width: 448,
        height: 452,
        scaleSize: 60,
        speedRatio: 0.7,
        xPercentage: 0.6,
        hitbox: { widthPercentage: 0.0, heightPercentage: 0.2 }
      }, /*
      flyingGoomba: {
        src: "/images/platformer/sprites/flying-goomba.png",
        width: 448,
        height: 452,
        scaleSize: 60,
        speedRatio: 0.7,
      },
      mushroom: {
        src: "/images/platformer/platforms/mushroom.png",
        width: 200,
        height: 180,
        hitbox: { widthPercentage: 0.0, heightPercentage: 0.2 }
      }, */
    }
  };

  // Hills Game Level defintion...
  const objects = [
    { name: 'mountains', id: 'background', class: BackgroundParallax, data: assets.backgrounds.mountains },
    { name: 'clouds', id: 'background', class: BackgroundParallax, data: assets.backgrounds.clouds },
    { name: 'hills', id: 'background', class: BackgroundParallax, data: assets.backgrounds.hills },
    { name: 'grass', id: 'floor', class: Platform, data: assets.platforms.grass },
    { name: 'blocks', id: 'jumpPlatform', class: BlockPlatform, data: assets.platforms.block, xPercentage: 0.2, yPercentage: 0.85 },
    { name: 'blocks', id: 'jumpPlatform', class: BlockPlatform, data: assets.platforms.block, xPercentage: 0.2368, yPercentage: 0.85 },
    { name: 'blocks', id: 'jumpPlatform', class: BlockPlatform, data: assets.platforms.block, xPercentage: 0.2736, yPercentage: 0.85 },
    { name: 'blocks', id: 'wall', class: BlockPlatform, data: assets.platforms.block, xPercentage: 0.6, yPercentage: 1 },
    { name: 'itemBlock', id: 'jumpPlatform', class: JumpPlatform, data: assets.platforms.itemBlock, xPercentage: 0.4, yPercentage: 0.65 }, //item block is a platform
    { name: 'chicken', id: 'chicken', class: Chicken, data: assets.enemies.chicken, xPercentage: 0.5, yPercentage: 1, minPosition: 0.05 },
    { name: 'chicken', id: 'chicken', class: Chicken, data: assets.enemies.chicken, xPercentage: 0.4, yPercentage: 1, minPosition: 0.05, difficulties: ["normal", "hard", "impossible"] },
    { name: 'chicken', id: 'chicken', class: Chicken, data: assets.enemies.chicken, xPercentage: 0.3, yPercentage: 1, minPosition: 0.05, difficulties: ["normal", "hard", "impossible"] },
    { name: 'chicken', id: 'chicken', class: Chicken, data: assets.enemies.chicken, xPercentage: 0.2, yPercentage: 1, minPosition: 0.05, difficulties: ["hard", "impossible"] },
    { name: 'chicken', id: 'chicken', class: Chicken, data: assets.enemies.chicken, xPercentage: 0.1, yPercentage: 1, minPosition: 0.05, difficulties: ["impossible"] },
    /** 
    { name: 'goombaSpecial', id: 'goomba', class: Goomba, data: assets.enemies.goomba, xPercentage: 0.75, yPercentage: 1, minPosition: 0.5 }, // special name is used for random event 2 to make sure that only one of the Goombas ends the random event
    { name: 'goombaSpecial', id: 'goomba', class: Goomba, data: assets.enemies.goomba, xPercentage: 0.95, yPercentage: 1, minPosition: 0.5, difficulties: ["hard", "impossible"] }, //this special name is used for random event 2 to make sure that only one of the Goombas ends the random event
    { name: 'flyingGoomba', id: 'flyingGoomba', class: FlyingGoomba, data: assets.enemies.flyingGoomba, xPercentage: 0.9, minPosition: 0.5, difficulties: ["normal", "hard", "impossible"] },
    { name: 'flyingGoomba', id: 'flyingGoomba', class: FlyingGoomba, data: assets.enemies.flyingGoomba, xPercentage: 0.9, minPosition: 0.5, difficulties: ["hard", "impossible"] },
    { name: 'flyingGoomba', id: 'flyingGoomba', class: FlyingGoomba, data: assets.enemies.flyingGoomba, xPercentage: 0.9, minPosition: 0.5, difficulties: ["impossible"] },
    { name: 'mushroom', id: 'mushroom', class: Mushroom, data: assets.enemies.mushroom, xPercentage: 0.49 },
    { name: 'coin', id: 'coin', class: Coin, data: assets.obstacles.coin, xPercentage: 0.1908, yPercentage: 0.75 },
    { name: 'coin', id: 'coin', class: Coin, data: assets.obstacles.coin, xPercentage: 0.2242, yPercentage: 0.75 },
    { name: 'coin', id: 'coin', class: Coin, data: assets.obstacles.coin, xPercentage: 0.2575, yPercentage: 0.75 },
    { name: 'coin', id: 'coin', class: Coin, data: assets.obstacles.coin, xPercentage: 0.5898, yPercentage: 0.900 },
    */
    { name: 'steve', id: 'player', class: PlayerHills, data: assets.players.steve },
    //{ name: 'tube', id: 'finishline', class: FinishLine, data: assets.obstacles.tube, xPercentage: 0.85, yPercentage: 0.855 },
    { name: 'loading', id: 'background', class: BackgroundTransitions, data: assets.transitions.loading },
  ];

  const GameSetHills = {
    tag: 'Hills',
    assets: assets,
    objects: objects,
    main(environment) {
      // Your game initialization logic here
      console.log("GameSetHills main called with environment:", environment);
      // For example, you might want to initialize your game engine here
      // GameEngine.init(this, environment);
    }
  };

export default GameSetHills;