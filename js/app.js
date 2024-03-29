"use strict";
const xArray = [-100, -150, -200];
const yArray = [60, 140, 220];
const speedArray = [50, 100, 150, 200, 250];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xArray[Math.floor(Math.random() * 3)];
    this.y = yArray[Math.floor(Math.random() * 3)];
    this.speed = speedArray[Math.floor(Math.random() * 5)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 490){
        this.x = xArray[Math.floor(Math.random() * 3)];
        this.y = yArray[Math.floor(Math.random() * 3)];
        this.speed = speedArray[Math.floor(Math.random() * 5)];
    }
    this.x = this.x + (this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-pink-girl.png';
    this.x = 200;
    this.y = 380;
};

//Check for collisions
Player.prototype.update = function(){
    this.checkCollisions();
};

//Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Move the player left, up, right and down based on keyboard input
Player.prototype.handleInput = function(key){
    switch(key){
        case 'left': if(this.x > 70) this.x -= 100; break;
        case 'up':  if(this.y > 50) this.y -= 80;
                    if(this.y == -20){
                        const that = this;
                        setTimeout(function(){
                            alert('Congrats... You won!!');
                            that.reset();
                        }, 100);
                    }
                    break;
        case 'right': if(this.x < 400) this.x += 100; break;
        case 'down': if(this.y < 380) this.y += 80;
    }
};

//Reset the game. Move the player to starting point.
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
};

//Check for collisions with enemies
Player.prototype.checkCollisions = function(){
    const that = this;
    allEnemies.forEach(function(enemy) {
        if(Math.abs(enemy.x - that.x) <= 45 && enemy.y == that.y)
            that.reset();
    });
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
const enemy5 = new Enemy();
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

