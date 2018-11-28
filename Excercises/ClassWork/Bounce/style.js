var boundary = {
  x:300,
  y:300
};

var ballDimensions = {
  y :0,
  width:50,
  height:50
}

var container = document.getElementById('container');

container.style.width = boundary.x + 'px';
container.style.height = boundary.y + 'px';

var ball = document.createElement('div');
ball.style.width = ballDimensions.width + 'px';
ball.style.height = ballDimensions.height + 'px';
ball.style.background = '#49c';
ball.style.borderRadius = 30 + 'px'
ball.style.position = 'absolute';

container.appendChild(ball);

function movement() {
  ballDimensions.
}




