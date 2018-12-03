// function Game() {
//     var gameInterval;

//     this.init = function () {
//       var containerDiv = document.getElementById('container');

//         bird.createBird();
//         bird.styleBird();
//       }


//       gameInterval = setInterval(this.move, 30);
//     }

// function Bird() {


//     this.createBird = function () {

//     }
// }


//Function constructor - It creates a template that you can create objects from.

function Bird(x, y, w, h) {
    // Physical properties
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fallSpeed = 0;
    this.ySpeed = 0;

    // Flag variable that will make sure the player is not scoring many times at once
    this.scored = false;
    this.frame = 0; // This will be either 0 or 1, based on this the sprite will be animated
}

// Methods of the object

// Draw method
Bird.prototype.draw = function() {
    // The image will be cropped from y = 80 and y = 150 giving us a nice two frame animation
    ctx.drawImage(sprites, 360, 81 + (this.frame * 70), 80, 70, this.x, this.y, this.w, this.h);
}

// Update method - Logic and objects physics will be handled here
Bird.prototype.update = function() {
    // Handle the gravity
    this.fallSpeed += 0.1; // This speed grows every time this function is called
    this.y += this.fallSpeed + this.ySpeed; // Gravity effect is achieved!

    // Check if the player dies first

    // Basic AABB Collision
    // Check if the player touches a pipe on the x axis first
    if (this.x + this.w >= pipeTop.x && this.x <= pipeTop.x + pipeTop.w) { // Then check if it touches any of the pipes on the y axis if (this.y + this.h >= pipeBottom.y || this.y <= pipeTop.y + pipeTop.h) { isGameOver = true; } else { if (!this.scored) { score++; this.scored = true; } } } // Die when hit the ground if (this.y >= 600) {
        isGameOver = true;
    }

    // Player can score again now that the pipe is resetted itself
    if (pipeTop.x >= 360) {
        this.scored = false;
    }

    // Handle the animation based on going up or down
    if (this.fallSpeed <= 1) {
        this.frame = 1;
    } else {
        this.frame = 0;
    }
}

// Reset the gravity and move the player up to give the jumping effect
Bird.prototype.moveUp = function(speed) {
    this.fallSpeed = 0;
    this.ySpeed = -speed;
}

function Pipe(x, y, w, h, speed) {
    // Physical properties
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
}

// Draw call
Pipe.prototype.draw = function() {
    ctx.drawImage(sprites, 360, 0, 80, 80, this.x, this.y, this.w, this.h);
}

// Update call
Pipe.prototype.update = function() {
    // Make it move to the left with a constant speed
    this.x -= this.speed;

    // Check if the pipe is out of the screen
    if (this.x + this.w <= 0) {
        this.x = 360; // Make it jump to the right side of the screen

        // If the pipe is the top one
        if (this.y <= 320) {
            this.y = -(Math.random() * (150 - 50) + 50); // Math.random() * (max - min) + min
            // If the pipe is the bottom one
        } else {
            this.y = 320 + (Math.random() * (150 - 50) + 50);
        }
    }
}

function Background(x, y, w, h, speed) {
    // Physical properties
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
}

// Draw call
Background.prototype.draw = function() {
    ctx.drawImage(sprites, 0, 0, 360, 640, this.x, this.y, this.w, this.h);
}

// Update call
Background.prototype.update = function() {
    // Make it move to left with a constant speed
    this.x -= this.speed;

    // If it gets out from the screen, make it jump to the starting position so it seamlessly keeps scrolling endlessly
    if (this.x <= -360) {
        this.x = 360;
    }
}


// GLOBALS

// Establish the screen
var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
ctx.font = 'bold 56px Comic Sans MS';
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.lineWidth = 2;
ctx.strokeStyle = 'black';

// Load sprites into a global variable
var sprites = document.getElementById('sprites');

// Custom function for writing a stroked text
function drawText(text, x, y) {
    ctx.fillStyle = 'white';
    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
}

// Custom function for drawing a tint on the screen
function drawTint(x, y, w, h) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x, y, w, h);
}

// Variables
var score = 0; // Will hold the global score
var pressed = false; // Flag variable, determines if a key is pressed
var isPaused = true; // Flag variable, determines if the game is paused or unpaused
var isGameOver = false; // Flag variable, determines if the game is over or not

// Objects
var player = new Bird(32, 240, 80, 70);
var pipeTop = new Pipe(360, 0, 80, 300, 2);
var pipeBottom = new Pipe(360, 480, 80, 300, 2);
var background1 = new Background(0, 0, 360, 640, 2);
var background2 = new Background(360, 0, 360, 640, 2);

// INPUTS

// Handle keyboard inputs - Based on JavaScript's event listener loop.
document.addEventListener('keydown', function(event) {
    // Up arrow button: Player control
    if (event.keyCode === 38 && pressed === false) {
        player.moveUp(2); // Call the necessary player action
        pressed = true; // Mark this true so the player can not keep the button pressed
    }

    // Enter button: Start/unpause the game
    if (event.keyCode === 13) {
        // If the game is in a game over state, refresh the page to restart the game
        if (isGameOver) {
            window.location.reload();
        }

        // If the game is paused, unpause it
        if (isPaused) {
            isPaused = false;
        }
    }

    // ESC button: Pause the game
    if (event.keyCode === 27 && !isPaused && !isGameOver) {
        isPaused = true;
    }
}, false);

document.addEventListener('keyup', function(event) {
    pressed = false;
}, false);

// MAIN LOOP
function gameLoop() {

    // UPDATE CALLS

    // If the game is not paused and is not over, keep executing the physics and the logic
    if (!isPaused && !isGameOver) {
        player.update();
        pipeTop.update();
        pipeBottom.update();
        background1.update();
        background2.update();
    }

    // DRAW CALLS

    // Clear the screen first
    ctx.clearRect(0, 0, 360, 640);

    // Draw the backgrounds first
    background1.draw();
    background2.draw();

    // Then draw the foreground objects
    player.draw();
    pipeTop.draw();
    pipeBottom.draw();

    // Show the informational text on top of everything
    if (isPaused) {
        // If the game is paused, show the necessary information
        drawTint(0, 0, 360, 640);
        drawText('Hit "Enter"', 180, 310);
        drawText('to play!', 180, 380);
        if (score > 0) {
            drawText(score, 180, 52);
        }
    } else if (isGameOver) {
        // If the game is over, show the necessary message
        drawTint(0, 0, 360, 640);
        drawText('Game Over', 180, 310);
        drawText('Score: ' + score, 180, 380);
    } else {
        // If neither is true, just show the score
        drawTint(0, 0, 360, 64);
        drawText(score, 180, 52);
    }

    // Recursive loop - Calls itself
    window.requestAnimationFrame(gameLoop);
}

// ENTRY POINT
gameLoop(); // Call it once and start the game!