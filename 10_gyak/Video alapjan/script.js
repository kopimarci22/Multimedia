let game_area;
let frog;
let road;
let frog_x, frog_y;
let car_left, car_right;
let car_birth, collisionCheck;

let game_area_w = 450, game_area_h =400;

$(document).ready(function () {
    game_area = $('#gamearea');
    init();
    car_left = $('<img src="car2Left.png" class="car">');
    car_right = $('<img src="car1Right.png" class="car">');

    $(window).on('keydown', moveFrog())
});

function init() {
    addRoad();
    addFrog();
    car_birth = setInterval(addCars, 1000);
    collisionCheck = setInterval(check_collision,1);
}

function addFrog() {
    frog = $('<img src="frogger.png">');
    frog.css({
        left: 200,
        top: 350,
        position:'absolute'
    });
    game_area.append(frog);
}
function addRoad() {
    let s_pos = 50;
    let offset = 100;
    for (let i = 0; i <3;i++) {
        road = $('<div><img src="road.jpg"</div>');
        road.css({
            width: 450,
            left:0,
            top: s_pos + i * offset,
            position: 'absolute'
        });
        road.addClass('road'+1);
        game_area.append(road);
    }
}

function moveFrog(e) {
    let key = e.key;
    frog_x = frog.position().left;
    frog_y % frog.position().top;

    if(key === 'arrowLeft') {
        if (frog_x - 50 >=0) {
        frog.animate({
            left: frog_x-50
        },1);
        }
    } else if(key === 'arrowRight') {
        if (frog_x + 50 < game_area_w) {
            frog.animate({
                left: frog_x + 50
            }, 1);
        }
    } else if(key === 'arrowUp') {
        if (frog_y - 50 >= 0) {
            frog.animate({
                left: frog_y - 50
            }, 1);
        }
    } else if(key === 'arrowDown') {
        if (frog_x + 50 <= game_area_h) {
            frog.animate({
                left: frog_x + 50
            }, 1);
        }
    }
}

function addCars() {
    if (Math.random() > 0.35) {
        //car right
        let car = car_right.clone();
        let y_coord;
        if (Math.random() > 0.5) {
            y_coord = 250;
        } else {
            y_coord = 50;
        }
        car.css({
            position: 'absolute',
            left: 0,
            top: y_coord
        })

        game_area.append(car);
        car.addClass('car_r');
        car.animate({
            left: game_area_w - 74
        }, 1000, function () {
            car.remove();
        });
    } else {
        let car = car_left.clone();
        let y_coord = 150;

        car.css({
            position: 'absolute',
            left: game_area_w - 56,
            top: y_coord
        })

        game_area.append(car);
        car.addClass('car_l');
        car.animate({
            left: 0
        }, 1000, function () {
            car.remove();
        });
    }
}

function check_collision() {
    $('.car').each(function (){
        let act_x = $(this).position().left;
        let act_y = $(this).position().top;
        let act_pos = {
            x:act_x,
            y:act_y
        };
        let frog_x = frog.position().left;
        let frog_y = frog.position().top;
        let frog_pos = {
            x: frog_x,
            y: frog_y
        };
        let car_type = this.className.split(' ')[1];
        let hit_tresh;
        if (car_type === 'car_r' && frog_y === act_y) {
            hit_tresh = 74;
        } else {
            hit_tresh = 50
        }
        if (distance(act_pos, frog_pos) <= hit_tresh ) {
            init();
        }
    })
}
function distance(a,b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx*dx + dy*dy);
}
function win() {
    if (frog_y <= 50) {
        clearInterval(car_birth);
        clearInterval(collisionCheck);
        setTimeout(clearContent, 100);
    }
}
function clearContent() {
    game_area.empty();
    game_area.append('<div id="wintext">WIN</div>');
}