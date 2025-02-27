let titleScene = new Phaser.Scene('Title');

titleScene.preload = function() {
    this.load.image('title-bg', 'assets/title-background.png');
}

titleScene.create = function() {
    this.add.sprite(0, 0, 'title-bg').setOrigin(0, 0);

    this.add.text(100, 100, 'Welcome to My Game');

    this.input.on('pointerup', function(pointer) {
        this.scene.start('Game');
    }, this);
}

// create a new scene
let gameScene = new Phaser.Scene('Game');

// initiate scene parameters
gameScene.init = function() {
  // player speed
  this.playerSpeed = 5;

  // enemy speed
  this.enemyMinSpeed = 2;
  this.enemyMaxSpeed = 5;

  // boundaries
  this.enemyMinY = 80;
  this.enemyMaxY = 280;

  // we are not terminating
  this.isTerminating = false;
}

// Load assets
gameScene.preload = function(){
  
  // Load images
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('enemy', 'assets/dragon.png');
  this.load.image('goal', 'assets/treasure.png');
};

// called once after the preload ends
gameScene.create = function(){
  
  // create bg sprite
  this.bg = this.add.sprite(0, 0, 'background');

  // change the origin to the top-left corner
  this.bg.setOrigin(0, 0);

  // create player
  this.player = this.add.sprite(40, this.sys.game.config.height/2, 'player');
  
  this.player.setScale(0.5);

  // goal
  this.goal = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'goal');
  this.goal.setScale(0.6);

  // enemy
  this.enemies = this.add.group({
    key: 'enemy',
    repeat: 5,
    setXY: {
      x: 90,
      y: 100,
      stepX: 75,
      stepY: 20
    }
  });

  // this.enemy = this.add.sprite(100, this.sys.game.config.height/2, 'enemy');
  // this.enemy.flipX = true;

  // this.enemies.add(this.enemy);
  
  // setting scale to all group elements
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4);

  // set flipX and speed
  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
    // flip enemy
    enemy.flipX = true;

    // set speed
    let dir = Math.random() < 0.5 ? 1: -1;
    let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
    enemy.speed = dir * speed;
  }, this);

};

gameScene.update = function() {
  // don't exec if we are terminating
  if (this.isTerminating) return;

  // check for active input
  if (this.input.activePointer.isDown) {
    // player walks
    this.player.x += this.playerSpeed;
  }

  // treasure overlap check
  let playerRect = this.player.getBounds();
  let treasureRect = this.goal.getBounds();

  if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
    console.log('reach goal!');

    // restart the scene
    return this.gameOver();
  }

  // get enemies
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;

  for (let i = 0;  i < numEnemies; i++) {
    // enemy movement
    enemies[i].y += enemies[i].speed;
  
    // check we haven't passed min Y
    let conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
    let conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;
    
    // if we passed the upper or lower liit, reverse
    if (conditionUp || conditionDown) {
      enemies[i].speed *= -1;
    }

    //  enemy overlap check
    let enemyRect = enemies[i].getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
      console.log('Game Over!');

      // restart the scene
      return this.gameOver();
    }
  }


};

gameScene.gameOver = function() {

  // initiated game over sequence
  this.isTerminating = true;

  // shake camera
  this.cameras.main.shake(500);
  
  // listen for event completion
  this.cameras.main.on('camerashakecomplete', function(camera) {
    
    // fade out
    this.cameras.main.fade(500);
  }, this);
  
  this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {

    this.scene.restart();
  }, this);

};

// set the configuration of the game
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: [titleScene, gameScene]
};

// create a new game, pass the config
let game = new Phaser.Game(config);