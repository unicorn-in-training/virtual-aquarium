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

    var randomNumber = function () {
        var number = Math.round(Math.random() * 70);
        return number;
    };

    var iterationCounter = 0;

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
        var interval = setInterval(frame, 40);
        var sineCalc = 0;
        var x = 0;
        var y = 0;
        var offset = h - 0.7 * h;
        var switchDirection = 0;
        var amplitude = randomNumber();
        var imgWidth = '';
        var imgHeight = '';
        var img=new Image();
        if (direction == "R") {
            img.src = '"images/' + imageName + '-r.png"';
            imgWidth = img.width;
            imgHeight = img.height;
        } else if (direction == "L") {
            img.src = '"images/' + imageName + '-l.png"';
            imgWidth = img.width;
            imgHeight = img.height;
            x = w - imgWidth;
        }
        elem.innerHTML = '<img src="'+img.src+'" id="' + imageName+'>';

        function frame() {
            if (y > offset - 3 && y < offset + 3) {
                amplitude = randomNumber();
            }
            if (debug) {
                debugOutput = debugOutput + "x: " + x + "px, ";
                debugText.innerHTML = debugOutput;
            }
            if (direction == "R") {
                switchDirection = x + imgWidth >= w;
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
                swimmingFish(newDirection);
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
        // call the notify_complete function when the image has loaded
        happyfishL.onload = swimmingFish('R','happy-fish');
        // load the image
        angelfishR.src = 'images/angelfish-r.png';
        clownfishR.src = 'images/clown-fish-r.png';
        goofyfishR.src = 'images/goofy-fish-r.png';
        happyfishR.src = 'images/happy-fish-r.png';
        angelfishL.src = 'images/angelfish-l.png';
        clownfishL.src = 'images/clown-fish-l.png';
        goofyfishL.src = 'images/goofy-fish-l.png';
        happyfishL.src = 'images/happy-fish-l.png';
    }
};
