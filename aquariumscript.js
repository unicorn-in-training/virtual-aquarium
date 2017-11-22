/*jshint esversion:6, laxbreak:true, expr:true*/
window.onload = function () {
    var angelfishR = new Image(),
        clownfishR = new Image(),
        goofyfishR = new Image(),
        happyfishR = new Image(),
        angelfishL = new Image(),
        clownfishL = new Image(),
        goofyfishL = new Image(),
        happyfishL = new Image();

    var debug = false;
    var addSpeed = 0;
    var addHeight = 0;
    document.addEventListener('keydown', function (event) {
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        switch (key) {
        case 'ArrowRight':
            addSpeed += 5;
            break;
        case 'ArrowLeft':
            addSpeed += -5;
            break;
        case 'ArrowUp':
            addHeight += 5;
            break;
        case 'ArrowDown':
            addHeight += -5;
            break;
        }
    });

    var randomNumber = function () {
        var number = Math.round(Math.random() * 70);
        return number;
    };

    var iterationCounter = 0;
    var interval = '';

    var swimmingFish = function (direction, imageName) {
        direction = direction || "R";
        var elem = document.getElementById("animate");
        var debugText = document.getElementById("debug");
        var debugOutput = "";
        if (debug) {
            debugOutput = debugOutput + "function: swimmingFish(" + direction + ")<br>";
        }
        var w = window.innerWidth;
        var h = window.innerHeight;
        var pos = 0;
        var intervalLength = 40 - addSpeed;
        if (intervalLength <= 1) {
            intervalLength = 1;
            console.log("Can't go any faster! " + intervalLength);
        } else if (intervalLength >= 200) {
            intervalLength = 200;
            console.log("Too slow! " + intervalLength);
        }
        interval = setInterval(frame, intervalLength);
        var sineCalc = 0;
        var x = 0;
        var y = 0;

        var switchDirection = 0;
        var amplitude = randomNumber();
        var imgWidth = 0;
        var imgHeight = 0;
        var img = new Image();
        if (direction == "R") {
            img.src = 'images/' + imageName + '-r.png';
            elem.innerHTML = '<img src="images/' + imageName + '-r.png" id="' + imageName + '">';
            imgWidth = img.width;
            imgHeight = img.height;

        } else if (direction == "L") {
            img.src = 'images/' + imageName + '-l.png';
            x = w - imgWidth;
            elem.innerHTML = '<img src="images/' + imageName + '-l.png" id="' + imageName + '">';
            imgWidth = img.width;
            imgHeight = img.height;
        }
        if (imgWidth == 0) {
            imgWidth = 200;
        }
        if (imgHeight == 0) {
            imgHeight = 200;
        }
        if (debug) {
            console.log(imgWidth);
            console.log(imgHeight);
        }

        function frame() {
            var offset = Math.round(h - 0.7 * h) - addHeight;
            if (offset >= h - 200) {
                offset = h - 200;
                console.log("Too low on page " + offset);
            } else if (offset <= 30) {
                offset = 30;
                console.log("Too high on page " + offset);
            }
            console.log(offset);
            if (y > offset - 3 && y < offset + 3) {
                amplitude = randomNumber();
            }
            if (debug) {
                debugOutput = debugOutput + "x: " + x + "px, ";
                debugText.innerHTML = debugOutput;
            }
            if (direction == "R") {
                switchDirection = x + imgWidth + 10 >= w;
            } else if (direction == "L") {
                switchDirection = x <= 0;
            }

            if (switchDirection) {
                clearInterval(interval);
                // Whale starts swimming from the other side
                if (direction == "R") {
                    newDirection = "L";
                } else if (direction == "L") {
                    newDirection = "R";
                }
                iterationCounter++;
                swimmingFish(newDirection, imageName);
            } else {
                pos++;
                sineCalc = Math.sin(pos * 0.08);
                if (direction == "R") {
                    x = pos * 8;
                } else if (direction == "L") {
                    x = w - imgWidth - pos * 5;
                }
                y = sineCalc * amplitude + offset;
                elem.style.top = y + "px";
                elem.style.left = x + "px";
            }
        }
    };

    function preload() {
        // load the images
        angelfishR.src = 'images/angel-fish-r.png';
        clownfishR.src = 'images/clown-fish-r.png';
        goofyfishR.src = 'images/goofy-fish-r.png';
        happyfishR.src = 'images/happy-fish-r.png';
        angelfishL.src = 'images/angel-fish-l.png';
        clownfishL.src = 'images/clown-fish-l.png';
        goofyfishL.src = 'images/goofy-fish-l.png';
        happyfishL.src = 'images/happy-fish-l.png';
        happyfishL.onload = swimmingFish('R', 'happy-fish');
    }
    preload();

    $(".btn-fish").on('click', function () {
        var fishtype = $(this).text();
        var imageName = '';
        switch (fishtype) {
        case 'Happy Fish':
            imageName = 'happy-fish';
            break;
        case 'Goofy Fish':
            imageName = 'goofy-fish';
            break;
        case 'Angel Fish':
            imageName = 'angel-fish';
            break;
        case 'Clown Fish':
            imageName = 'clown-fish';
            break;
        default:
            imageName = 'happy-fish';
            break;
        }
        clearInterval(interval);
        swimmingFish('R', imageName);
    });
};
