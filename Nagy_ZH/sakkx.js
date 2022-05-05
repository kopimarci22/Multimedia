let nyolc = 8;
let game_area;
let tile_sz = 88;

let margin = 0;
let border = 0;

let worm_pos = [0,0];

function createWorm(){
    let worm = $('<img src = "worm.png" id = "worm">');

    worm.css({
        top:0,
        left:0,
        height: tile_sz,
        width: tile_sz
    });

    return worm;
}

function createTile(row, col){
    let tile;

    tile = $('<div class = "tile"></div>');

    tile.css("margin", margin.toString() + "px");
    tile.css("border", border.toString() + "px");
    tile.attr('row', row);
    tile.attr('col', col);

    tile.css( {
        top: row * (tile_sz + 2 * (border + margin) ),
        left: col * (tile_sz + 2 * (border + margin) ),
        height: tile_sz,
        width: tile_sz,
    } );

    return tile;

}

function createCoverTile(row, col) {
    let cover;

    cover = $('<div class = "tile_cover"></div>>');

    cover.attr('row', row);
    cover.attr('col', col);

    cover.css( {
        top: row * (tile_sz + 2 * (border + margin) ),
        left: col * (tile_sz + 2 * (border + margin) ),
        height: tile_sz,
        width: tile_sz,
    } );

    return cover;
}

function createTable() {
    for(let row = 0; row < nyolc; row++) {
        for(let col = 0; col < nyolc; col++) {
            let tile = createTile(row, col);


            if((col+row) % 2 === 1) {
                tile.css("background-color", "white");
            } else {
                tile.css("background-color", "black");
            }
            let cover = createCoverTile(row, col);
            game_area.append(tile);
            //game_area.append(cover);
        }
    }
}

function createGameArea(){

    game_area = $('#gameArea');

    game_area.css( {
        height: 705,
        width: 705
    } );
}

function selectTileAt(position){
    return $(".tile[row=" + position[0].toString() + "][col=" + position[1].toString() + "]");
}

function onClickEvents(){
    game_area.find('.tile').on('click', clickUpdate);
}

function clickUpdate(){
    console.log($(".tile[row]"));
}

$(document).ready(function() {
    createGameArea();
    createTable();

    worm_pos[0] = 2;
    worm_pos[1] = 1;
    selectTileAt(worm_pos).append(createWorm());

    onClickEvents();

});