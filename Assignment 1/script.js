var imageNumber = 5;

var slider = document.getElementById('slider');
slider.style.position = 'absolute';

var images = document.getElementsByClassName('image');


var width = images[0].width;
var widthCount = 0;
var left = images[0].width/500;
var totalWidth = 0;



var interval = setInterval(slide ,4);

function slide() {
  if (widthCount == 0) {
    slider.style.left = - left + 'px';
    widthCount = left;
  }
  else {
    if (widthCount<900) {
      slider.style.left = - (left + widthCount) + 'px';
      widthCount = (left + widthCount);
    } else {
      totalWidth=widthCount;
      clearInterval(interval);

      
    }
  }
}







