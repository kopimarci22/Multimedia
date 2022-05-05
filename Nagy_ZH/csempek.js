const max_clicks = 3;

const table_sz = 8;
const tile_sz = 100;
const border_w = 0;
const margin_w = 0;

const animation_length = 1600;

let game_area;
let worm_pos = [0, 0];

function createTile(row, col){
    let tile;

    tile = $('<div class = "tile d"></div>');
    tile.attr('clicks', 0);
    tile.attr('row', row);
    tile.attr('col', col);
    tile.css( {
        top: row * (tile_sz + 2 * (border_w + margin_w) ),
        left: col * (tile_sz + 2 * (border_w + margin_w) ),
        height: tile_sz,
        width: tile_sz,
    } );
    return tile;
}
function createTileCover() {

}
// function createFly() {
//     let fly = $('<img src="fly.png" id=""fly>');
//     fly.css({
//         width: tile_sz,
//         height: tile_sz
//     })
//
// }

function createTable(){
    for (let row = 0; row < table_sz; ++row){
        for (let col = 0; col < table_sz; ++col) {
            let tile = createTile(row, col);
            if ((col+row) % 2 === 1) {
                tile.css("background-color", "white")
            } else {
                tile.css("background-color", "black")
            }
            if (row == 2 && col == 1) {
                let fly = $('<img src="fly.png" id=""fly>');
                fly.css({
                    width: tile_sz,
                    height: tile_sz
                })
                tile.append(fly);
            }

            game_area.append(tile);
        }
    }
}

function createGameArea(){
    game_area = $('#gameArea');
    game_area.css( {
        height: 800,
        width: 800
    } );
}

function createWorm(){
    let worm = $( '<img src = "worm.png" id ="worm">');
    worm.css( {
        top: 0,
        left: 0,
        height: tile_sz,
        width: tile_sz
    } );
    return worm;
}

function addClickEvents(){
    game_area.find('.tile').on('click', update);
}

function clearClickEvents(){
    game_area.find('.tile').off('click');
}

function selectWorm(){
    return $("#worm");
}

function selectTileAt(position){
    return $(".tile[row=" + position[0].toString() + "][col=" + position[1].toString() + "]");
}

function update(){
    console.log("clicked");
    let clicked_tile = $(this);
    clearClickEvents();
    let num_of_clicks = parseInt(clicked_tile.attr('clicks') );
    if(max_clicks > num_of_clicks){
        worm_pos = [parseInt(clicked_tile.attr('row') ), parseInt(clicked_tile.attr('col') )];
        incrementClicks(clicked_tile);
        if(max_clicks - 1 === num_of_clicks){
            incrementAnimation(clicked_tile, function(){
                clicked_tile.css("border-color", "red");
                moveWorm(clicked_tile, worm_pos);
                addClickEvents();
             } );
        }
        else{
            incrementAnimation(clicked_tile, function(){
                moveWorm(clicked_tile, worm_pos);
                addClickEvents();
            });
        }
    }
    else{
        addClickEvents();
    }
}

function incrementClicks(tile){
    let is_max = false;
    let num_of_clicks = parseInt(tile.attr('clicks') );
    if (max_clicks > num_of_clicks){
        num_of_clicks += 1;
        tile.attr('clicks', num_of_clicks.toString() );
    }
    else{
        is_max = true;
    }
    console.log(num_of_clicks);
    return is_max;
}

function incrementAnimation(clicked_tile, afterAnimate){
    clicked_tile.animate( {
        opacity: 0,}, duration = animation_length).animate( {
        opacity: 1,}, duration = animation_length, callback = afterAnimate);
}

function moveWorm(tile, next_pos){
    let worm = selectWorm();
    worm.remove();
    tile.append(worm);
    worm_pos = next_pos;
}
$(document).ready(function(){
    createGameArea();
    createTable();
    worm_pos[0] = 5;
    worm_pos[1] = 2;
    selectTileAt(worm_pos).append(createWorm() );
    addClickEvents();
} );