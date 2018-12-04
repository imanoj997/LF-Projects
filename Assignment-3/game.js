var wrapper = document.getElementById('wrapper');

var wrapperWidth = 1350;
var wrapperHeight = 756;

var pressed = false;
var pipeCounter = 0;
var score = 0;
var highScore = 0;


var pipeHeight = Math.ceil(Math.random() * (wrapperHeight - 100));

wrapper.style.width = wrapperWidth + 'px';
wrapper.style.height = wrapperHeight + 'px';

function Game() {
    var bird = new Bird();
    bird.draw()
    bird.move();

    pipeArray = new PipeList();

    var pipe = new Pipe();

    var initializeGame = setInterval(function() {

        var collision = bird.checkCollision(pipeArray.getAll());
        if (collision) {

            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
            }

            var gameOver = document.createElement('div');
            gameOver.style.height = '300px';
            gameOver.style.width = '600px';
            gameOver.style.position - 'absolute';
            gameOver.style.top = '50%';
            gameOver.style.margin = 'auto';
            gameOver.style.padding = '20px 0 20px 20px';
            gameOver.style.textAlign = 'center';
            gameOver.style.fontSize = '30px';
            gameOver.style.background = 'yellow';
            gameOver.style.opacity = '0.5';

            var Heading = document.createElement('h1');
            Heading.textContent = '!!! GAME OVER !!!';

            var scoreHeading = document.createElement('h2');
            scoreHeading.textContent = "Your Score: " + score;

            var highScoreHeading = document.createElement('h3');
            highScoreHeading.textContent = "High Score: " + localStorage.getItem('highScore');

            gameOver.appendChild(Heading);
            gameOver.appendChild(scoreHeading);
            gameOver.appendChild(highScoreHeading);

            wrapper.appendChild(gameOver);
            clearInterval(initializeGame);
        } else {

            bird.move();

            pipeHeight = Math.ceil(Math.random() * (wrapperHeight - 100));
            if (pipeCounter % 500 == 0) {
                var pipe = new Pipe(pipeHeight, true);
                pipe.draw();
                pipeArray.add(pipe);

                var pipe2 = new Pipe(wrapperHeight - (pipeHeight + 100), false);
                pipe2.draw();
                pipeArray.add(pipe2);
            }


            for (var i = 0; i < pipeArray.getAll().length; i++) {
                pipeArray.getAll()[i].move();
                if (i % 2 == 1) {
                    if (pipeArray.getAll()[i].startPoint + pipeArray.getAll()[i].width == bird.x) {
                        score++;
                        welcome.textContent = 'score:' + score;
                        console.log('score:' + score);
                    }
                }

                if (pipeArray.getAll()[i].startPoint == 0) {
                    pipeArray.remove();

                }
            }


            document.addEventListener('keydown', function() {
                pressed = true;
            });

            document.addEventListener('keyup', function() {
                pressed = false;
            });

            if (pressed == true) {
                bird.changeDirection(-bird.dy);
            } else {
                bird.changeDirection(bird.dy * 3);
            }

            pipeCounter++;

        }
    }, 1000);


}

function Bird(d) {
    var that = this;
    this.x = 350;
    this.y = 300;
    this.dy = 1;
    this.height = 30;
    this.width = 30;
    var bird = document.createElement('div');

    this.draw = function() {

        bird.style.width = this.width + 'px';
        bird.style.height = this.height + 'px';
        bird.style.background = "url('images/bird.png') no-repeat";
        bird.style.backgroundSize = '100%';
        bird.style.position = 'absolute';
        bird.style.top = this.y + 'px';
        bird.style.left = this.x + 'px';

        wrapper.appendChild(bird);
    }

    this.move = function() {

        bird.style.top = that.y + 'px';
    }

    this.changeDirection = function(dy) {

        that.y += dy;
    }

    this.checkCollision = function(pipeList) {

        for (var i = 0; i < pipeList.length; i++) {

            var pipeX = pipeList[i].startPoint;
            var pipeY = 0;
            if (!pipeList[i].appearFromTop) {
                pipeY = wrapperHeight - pipeList[i].height;
            }
            var pipeWidth = pipeList[i].width;
            var pipeHeight = pipeList[i].height;

            var birdX = that.x;
            var birdY = that.y;
            var birdWIdth = that.width;
            var birdHeight = that.height;

            if (birdX < pipeX + pipeWidth && birdX + birdWIdth > pipeX &&
                birdY < pipeY + pipeHeight && birdY + birdHeight > pipeY) {
                return true;
            }
        }

        if (birdY < 0 || birdY + birdHeight > wrapperHeight) {
            return true;
        }

        return false;
    }
}




function Pipe(height, appearFromTop) {
    this.startPoint = parseInt(wrapper.style.width);

    this.x = this.startPoint;
    this.width = 50;
    this.height = height;
    this.appearFromTop = appearFromTop;

    var pipe = document.createElement('div');




    this.draw = function() {

        pipe.style.width = this.width + 'px';
        pipe.style.height = this.height + 'px';
        pipe.style.background = '#86c656';
        pipe.style.position = 'absolute';
        pipe.style.left = this.startPoint;
        if (this.appearFromTop == true) {
            pipe.style.top = '0px';
            pipe.style.borderBottom = '5px solid black';
        } else {

            pipe.style.bottom = '0px';
            pipe.style.borderTop = '5px solid black';

        }



        wrapper.appendChild(pipe);
    }

    this.move = function() {
        pipe.style.left = this.startPoint + 'px';
        this.startPoint -= 1;
    }

    this.getElement = function() {
        return pipe;
    }


}




function PipeList() {
    this.pipeArray = [];

    this.add = function(pipe) {
        this.pipeArray.push(pipe);
    }

    this.remove = function() {
        for (var i = 0; i < 2; i++) {
            wrapper.removeChild(this.pipeArray[0].getElement());
            this.pipeArray.splice(0, 1);
        }
    }

    this.getAll = function() {
        return this.pipeArray;
    }
}



window.onload = Game();