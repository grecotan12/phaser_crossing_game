// create a new scene
let gameScene = new Phaser.Scene('Game');

// Load assets
gameScene.preload = function(){
  
  // Load images
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('enemy', 'assets/dragon.png');
};

// called once after the preload ends
gameScene.create = function(){
  
  // create bg sprite
  this.bg = this.add.sprite(0, 0, 'background');

  // change the origin to the top-left corner
  this.bg.setOrigin(0, 0);

  // place the sprite in the center
  // bg.setPosition(640/2, 360/2);

  //let gameW = this.sys.game.config.width;
  //let gameH = this.sys.game.config.height;
  
  // console.log(gameW, gameH);
  // console.log(bg);
  // console.log(this);

  // create player
  this.player = this.add.sprite(70, 180, 'player');
  //player.depth = 1;
  //console.log(player);
  // player.x = 10;
  // player.y = 10;
  
  // player.setScale(0.5, 0.5);
  this.player.setScale(0.5);

  // create an enemy
  this.enemy1 = this.add.sprite(250, 180, 'enemy');
  this.enemy1.setScale(3);
  console.log(this.enemy1);
  
  //enemy1.angle = 45;
  //enemy1.setAngle(-45);

  this.enemy1.rotation = Math.PI / 4;
  this.enemy1.setRotation(Math.PI / 4);

  // enemy1.scaleX = 2;
  // enemy1.scaleY = 2;

  // create an second enemy
  //let enemy2 = this.add.sprite(450, 180, 'enemy');
  //enemy2.displayWidth = 300;

  // flip 
  // enemy1.flipX = true;
  // enemy1.flipY = true; 
  
};

gameScene.update = function() {
  //this.enemy1.x += 0.1;

  this.enemy1.angle += 1;

  if (this.player.scaleX < 2) {
    this.player.scaleX += 0.01;
    this.player.scaleY += 0.01;
  } 
} 

// set the configuration of the game
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

// create a new game, pass the config
let game = new Phaser.Game(config);