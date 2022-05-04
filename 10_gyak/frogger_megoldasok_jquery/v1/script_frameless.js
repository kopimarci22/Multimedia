
var KEYLEFT = 37;
var KEYUP = 38;
var KEYRIGHT = 39;
var KEYDOWN = 40;

var gameArea;
var frog;
var road;
var cars = [];
var intIdx;
var label;

var sizeY = 488;
var sizeX = 490;
var frogSizeX = 61;
var frogSizeY = 70;

var frame = 0;

var frogPos = {
    x: 0,
    y: sizeY - frogSizeY
};

function addRoad() {
    for (var i = 1; i < 4; i++) {
        road = $('<div></div>');
        road.addClass('road' + i);
        road.css({
            top: 2 * frogSizeY * i - frogSizeY,
            width: sizeX,
            height: frogSizeY,
            position: "absolute",
            'background-image': 'url("road.jpg")',
        });
        road.appendTo(gameArea);
    }
}

function addFrog() {
    frog = $('<img/>').attr("src", "frogger.png").attr("id","frog").css({
        position: "absolute",
        top: frogPos.y,
        left: frogPos.x,
        width: frogSizeX,
        height: frogSizeY
    }).appendTo(gameArea);

}


function addCars() {
        cars.push({
            x: -frogSizeX,
            y: frogSizeY,
            finish: sizeX,
            speed: 2000,
            intensity : 40,
            img: "car1Right.png",
            imgObj: $('<img src="car1Right.png" height="' + frogSizeY + '"/>')
        });
        cars.push({
            x: sizeX+frogSizeX,
            y: 3 * frogSizeY,
            finish: 0 - frogSizeX,
            speed: 3000,
            intensity : 70,
            img: "car2Left.png",
            imgObj: $('<img src="car2Left.png" height="' + frogSizeY + '"/>')
        });
        cars.push({
            x: -frogSizeX,
            y: 5 * frogSizeY,
            finish: sizeX,
            speed: 4500,
            intensity : 100,
            img: "car3Left.png",
            imgObj: $('<img src="car3Left.png" height="' + frogSizeY + '"/>')
        });

}

function startCars() {
    for (var c in cars) {
        var car = cars[c];

        drawCar(car);
    }
}

function drawCar(car) {
    var carImg = car.imgObj.clone();

    carImg.addClass('auto').css({
        position: 'absolute',
        left: car.x,
        top: car.y
    }).appendTo(gameArea).animate(
        {
            left: car.finish
        },
        {
            duration: car.speed,
            easing: "linear",
            complete: function () {
                $(this).remove();
            },
            step: function () {
                testCollision(carImg)
            }
    });

    setTimeout(function () {
        drawCar(car)
    }, car.intensity * 30)

}

function testCollision(car) {
    var fPos = frog.position();
    var cPos = car.position();

    if (distanceTo({x: fPos.left, y: fPos.top}, {x: cPos.left, y: cPos.top}) < 50) {
        // clearInterval(intIdx);
        label.text('GAME OVER');
        $(window).off('keydown');
        // gameArea.find('.auto').remove();
    }
}

function distanceTo(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

$(window).on('keydown', function (e) {
    var key = e.which;
    var pos = frog.position();
    frogPos.x = pos.left;
    frogPos.y = pos.top;
    if (frog.is(':animated')) {
        return;
    } else {
        if (key == KEYLEFT) {
            frogPos.x -= frogSizeX;
        } else if (key == KEYUP) {
            frogPos.y -= frogSizeY;
        } else if (key == KEYRIGHT) {
            frogPos.x += frogSizeX;
        } else if (key == KEYDOWN) {
            frogPos.y += frogSizeY;
        }

        if ( ( frogPos.x > -frogSizeX ) &&
             ( frogPos.x < sizeX - frogSizeX ) &&
             ( frogPos.y > -frogSizeY ) &&
             ( frogPos.y < sizeY ) ) {
            moveFrog();
        }

        //win check
        if (frogPos.y <= 0 ) {
            label.text('WIN');
            $(window).off('keydown');
            //gameArea.find('.auto').remove();
        }
    }
});

function moveFrog() {
    frog.animate({
        left: frogPos.x,
        top: frogPos.y
    }, 100);
}


$(document).ready(function(){
    gameArea = $('<div></div>').attr('id', 'gameArea').css({
        width: sizeX,
        height: sizeY,
        border: '1px solid black',
        margin: '0 auto',
        "background-image": 'url("grass.jpg")',
        position: 'relative',
        overflow: 'hidden'
    }).appendTo('body');

    label = $('<p></p>').css({
        width: '100%',
        height: '100%',
        color: 'white',
        'font-size': '50px',
        position: 'absolute',
        top: '105px',
        'text-align': 'center'
    }).appendTo(gameArea);

    addRoad();
    addFrog();
    addCars();
    startCars();

});