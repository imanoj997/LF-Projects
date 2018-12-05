var boundary = {
  x: 200,
  y: 200
};

var ballProps = {
  y: 0,
  width: 50,
  height: 50,
}

var ball = document.createElement('div');
ball.style.borderRadius = '50%';
ball.style.width = ballProps.width + 'px';
ball.style.height = ballProps.height + 'px';
ball.style.background = '#49c';

var container = document.getElementById('container');
container.appendChild(ball);

ball.style.position = 'absolute';
ball.style.left = 'calc(50% - ' + ballProps.width / 2 + 'px)';

var speed = 1;
var delta = 1;

function moveBall() {
  ballProps.y += speed * delta;
  
  ball.style.top = ballProps.y + 'px';
  
  if (ballProps.y < 0) {
    delta = 1;
  }
  
  if (ballProps.y + ballProps.height > boundary.y) {
    delta = -1;
  }
}

setInterval(moveBall);