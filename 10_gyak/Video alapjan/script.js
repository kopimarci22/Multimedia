let game_area;
let frog;

let game_area_w = 450, game_area_h =400;

$(document).ready(function () {
    game_area = $('#gamearea');
    init();
});

function init() {
    //addRoad();
    addFrog();
}

function addFrog() {
    frog = $('<img src="frogger.png">');
    frog.css({
        left: 200,
        top: 350,
        position:'absolute'
    })
    game_area.append(frog);
}
function addRoads() {

}