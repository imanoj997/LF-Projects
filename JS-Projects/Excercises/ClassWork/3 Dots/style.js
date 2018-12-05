var position = [{
  x: 20,
  y: 40
},
{
  x: 40,
  y: 80
},
{
  x: 140,
  y: 120
}];

var dimensions = {
  width: 10,
  height: 10
};

var container = document.getElementById('mainDiv');

for(var i = 0; i < position.length; i++) {
  var point = document.createElement('div');

  container.appendChild(point);

  point.style.width = dimensions.width + 'px';
  point.style.height = dimensions.height + 'px';

  point.style.top = position[i].y + 'px';
  point.style.left = position[i].x + 'px';

  point.style.background = '#49c';
  point.style.position = 'absolute';
}


