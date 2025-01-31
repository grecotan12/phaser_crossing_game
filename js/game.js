// create a new scene
let gameScene = new Phaser.Scene('Game');

// Load assets
gameScene.preload = () => {
  
  // Load images
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  
};

// called once after the preload ends
gameScene.create = () => {
  
  
  // create bg sprite
  this.add.sprite(0, 0, "background");
};

// set the configuration of the game
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

// create a new game, pass the config
let game = new Phaser.Game(config);