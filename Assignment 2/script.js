const boxMinSize = 30;
const boxMaxSize = 80;
var radius;
const speed = 1;

const CONTAINER_WIDTH = 700;
const CONTAINER_HEIGHT = 500;

const BALL_CONSTRAINT_X = CONTAINER_WIDTH - boxMaxSize;
const BALL_CONSTRAINT_Y = CONTAINER_HEIGHT - boxMaxSize;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

function generateRandom(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Box(x, y, color, ballDirectionX, ballDirectionY, parent) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.element;
  

  var diameter = getRandomInt(boxMinSize, boxMaxSize);


  this.createBox = function () {
    this.element = document.createElement('div');
    this.element.classList.add('box');
    parent.appendChild(this.element);
  }

  this.styleBox = function () {
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
    this.element.style.width = diameter + 'px';
    this.element.style.height = diameter + 'px';
    this.element.style.borderRadius = 50 + '%';
    this.element.style.backgroundColor = this.color;
  }

  this.update = function () {
    
    if (ballDirectionX === 0 && ballDirectionY === 0) {
      ballDirectionX = 1
      this.x = this.x + speed * ballDirectionX;
      this.y = this.y + speed * ballDirectionY;
    }
    else {
      this.x = this.x + speed * ballDirectionX;
      this.y = this.y + speed * ballDirectionY;
    }
  }
  //console.log(speed, direction);
  this.reverseUpdate = function () {
    if (ballDirectionX === 0 && ballDirectionY === 0) {
      ballDirectionX = 1
      this.x = this.x - speed * ballDirectionX;
      this.y = this.y - speed * ballDirectionY;
    }
    else {
      this.x = this.x - speed * ballDirectionX;
      this.y = this.y - speed * ballDirectionY;
    }
  }
  
}

function Game(boxNum) {
  var boxes = [];
  var gameInterval;

  this.init = function () {
    var containerDiv = document.getElementById('container');

    for (var i = 1; i <= boxNum; i++) {
      var directionX = generateRandom(-1, 1);
      var directionY = generateRandom(-1, 1);
      var randomX = getRandomInt(0, BALL_CONSTRAINT_X);
      var randomY = getRandomInt(0, BALL_CONSTRAINT_Y);
      var randomColor = getRandomColor();
      var box = new Box(randomX, randomY, randomColor, directionX, directionY, containerDiv);
      box.createBox();
      box.styleBox();
      boxes.push(box);
      //console.log(boxes);
      //console.log(box.diameter);
    }


    gameInterval = setInterval(this.move, 100);
  }

  this.move = function () {
    boxes.forEach(function (box) {
      
      if (this.x === 0 || this.x === 700 || this.y === 0 || this.y === 500) {
        box.reverseUpdate();
        box.styleBox();
      } else {
        box.update();
        console.log(this.x)
        box.styleBox();
      }

    });
  }
}

new Game(10).init();
