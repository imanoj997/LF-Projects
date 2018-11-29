var ul;
var liItems;
var imageWidth;
var imageNumber;
var currentImage=0;


ul = document.getElementById('image_slider');

var prev = document.getElementById("prev");
var next = document.getElementById("next");

init();

function init() {

    liItems = ul.children;
    imageNumber = liItems.length;
    imageWidth = liItems[0].children[0].clientWidth;
    ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
    prev.onclick = function () {
        onClickPrev();
    };
    next.onclick = function () {
        onClickNext();
    };
}

function slideTo(imageToGo) {
    var direction;
    var numOfImageToGo = Math.abs(imageToGo - currentImage);
    direction = currentImage > imageToGo ? 1 : -1;
    currentPosition = -1 * currentImage * imageWidth;
    var opts = {
        duration: 1000,
        delta: function (p) {
            return p;
        },
        step: function (delta) {
            ul.style.left = parseInt(currentPosition + direction * delta * imageWidth * numOfImageToGo) + 'px';
        },
        callback: function () {
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
    if (currentImage == 0) {
        slideTo(imageNumber - 1);
    } else {
        slideTo(currentImage - 1);
    }
}

function onClickNext() {
    if (currentImage == imageNumber - 1) {
        slideTo(0);
    } else {
        slideTo(currentImage + 1);
    }
}

function generatePager(imageNumber) {
    var pageNumber;
    var pagerDiv = document.getElementById('pager');
    for (i = 0; i < imageNumber; i++) {
        var li = document.createElement('li');
        pageNumber = document.createTextNode(parseInt(i + 1));
        li.appendChild(pageNumber);
        pagerDiv.appendChild(li);

        li.onclick = function (i) {
            return function () {
                slideTo(i);
            }
        }(i);
    }

    var computedStyle = document.defaultView.getComputedStyle(li, null);

    var liWidth = li.offsetWidth;

    var liMargin = parseInt(computedStyle.margin.replace('px', ""));

    pagerDiv.style.width = parseInt((liWidth + liMargin * 2) * imageNumber) + 'px';
}




// function animate(optional) {
//     var start = new Date();
//     var id = setInterval(function () {
//         var timePassed = new Date() - start;
//         var progress = timePassed / optional.duration;
//         if (progress > 1) {
//             progress = 1;
//         }
//         var delta = optional.delta(progress);
//         optional.step(delta);
//         if (progress == 1) {
//             clearInterval(id);
//             optional.callback();
//         }
//     }, optional.dalay || 17);
// }


// function slider(ul) {
//     animate({
//         delay: 17,
//         duration: 3000,
//         delta: function (p) {
//             return Math.max(0, -1 + 2 * p);
//         },
//         step: function (delta) {
//             ul.style.left = '-' + parseInt(currentImage * imageWidth + delta * imageWidth) + 'px';
//         },
//         callback: function () {
//             currentImage++;
//             // if it doesn’t slied to the last image, keep sliding
//             if (currentImage < imageNumber - 1) {
//                 slider(ul);
//             }
//             // if current image it’s the last one, it slides back to the first one
//             else {
//                 var leftPosition = (imageNumber - 1) * imageWidth;
//                 // after 2 seconds, call the goBack function to slide to the first image 
//                 setTimeout(function () {
//                     goBack(leftPosition);
//                 }, 3000);
//                 setTimeout(function () {
//                     slider(ul);
//                 }, 4000);
//             }
//         }
//     });
// }




