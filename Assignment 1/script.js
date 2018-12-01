var ul;
var liItems;
var imageWidth;
var imageNumber;
var currentImage = 0;
var btnClicked = false;

ul = document.getElementById('image_slider');

var prev = document.getElementById("prev");
var next = document.getElementById("next");

init();

function init() {

    liItems = ul.children;
    imageNumber = liItems.length;
    imageWidth = liItems[0].children[0].clientWidth;
    ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
    slider(ul);
    prev.onclick = function () {
        onClickPrev();
        clearInterval(id);
        // var btnClicked = true;
        // slider = null;
    };
    next.onclick = function () {
        onClickNext();
        //var btnClicked = true;
        //slider = null;
    };
    ;
}

function slideTo(imageToGo) {

    var direction;
    var numOfImageToGo = Math.abs(imageToGo - currentImage);
    direction = currentImage > imageToGo ? 1 : -1;
    currentPosition = -1 * currentImage * imageWidth;
    var opts = {
        duration: 1000,
        delta: function delta(p) {
            return p;
        },
        step: function step(delta) {
            ul.style.left = parseInt(currentPosition + direction * delta * imageWidth * numOfImageToGo) + 'px';
        },
        callback: function callback() {
            currentImage = imageToGo;
        }
    };
    animate(opts);
}

function goBack(leftPosition) {
    currentImage = 0;
    var id = setInterval(function () {
        if (leftPosition >= 0) {
            ul.style.left = '-' + parseInt(leftPosition) + 'px';
            leftPosition -= imageWidth / 10;
        } else {
            clearInterval(id);
        }
    }, 17);
}

function animate(opts) {
    var start = new Date();
    var id = setInterval(function () {
        var timePassed = new Date() - start;
        var progress = timePassed / opts.duration;
        if (progress > 1) {
            progress = 1;
        }
        var delta = opts.delta(progress);
        opts.step(delta);
        if (progress == 1) {
            clearInterval(id);
            opts.callback();
        }
    }, opts.delay || 17);
}

function onClickPrev() {
    slide = null;
    if (currentImage == 0) {
        //btnClicked=false;
        return;
    } else {
        slideTo(currentImage - 1);
        //btnClicked = false;
    }
}

function onClickNext() {
    slide = null;
    if (currentImage == imageNumber - 1) {
        btnClicked = false;
        return;
    } else {
        btnClicked = false;
        slideTo(currentImage + 1);
    }
}

function slider(ul) {
    animate({
        duration: 3000,
        delta: function delta(p) {
            return Math.max(0, -1 + 2 * p);
        },
        step: function step(delta) {
            ul.style.left = '-' + parseInt(currentImage * imageWidth + delta * imageWidth) + 'px';
        },
        callback: function callback() {
            currentImage++;
            if (currentImage < imageNumber - 1) {
                slider(ul);
            } else {
                var leftPosition = (imageNumber - 1) * imageWidth;
                setTimeout(function () {
                    goBack(leftPosition);
                }, 3000);
                setTimeout(function () {
                    slider(ul);
                }, 3000);
            }
        }
    });
}





