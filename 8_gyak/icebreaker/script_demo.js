/**
 * Változók létrehozása.
 * N: tábla mérete (10x10);
 * blockSize: egy elem mérete;
 * shipPos: hajó pozíciója, (0,0)-ból indul;
 * gameArea: jQuery elem a járéktér tárolására
 * ship: jQuery elem a hajó tárolására
 */
let N = 10;
let blockSize = 500 / N;
let shipPos = {x: 0, y: 0};
let gameArea;
let ship;

//Nyílbillentyűk
let KEYLEFT = 37;
let KEYUP = 38;
let KEYRIGHT = 39;
let KEYDOWN = 40;

/**
 * Jég generálása.
 */
function randomizeIce() {

}

/**
 * A hajót létrehozó, kirajzoló fv.
 * HTML image objektum.
 * Mérete megfelel egy mező méretének,
 * hozzáfűzzűk a játéktérhez.
 */
function addShip() {
    ship = $('<img src="icebreaker.png" id="ship" />');
    ship.css({
        width: blockSize,
        height: blockSize,
    });

    ship.appendTo(gameArea);
}

/**
 *  Eseménykezelő, amely a billentyű lenyomásakor
 *  zajlik le.
 *  Input paraméter az event objektum.
 */
function moveShip(e) {
    let key = e.key; //lekérjük a lenyomott billentyűt
    /*A lenyomott bill. alapján beállítjuk a hajó
      új pozícióját, és az animációval odamegyünk.
     */
    switch (key) {
        case KEYDOWN:
            shipPos.y++;
            break;
        case KEYUP:
            shipPos.y--;
            break;
        case KEYRIGHT:
            shipPos.x++;
            break;
        case KEYLEFT:
            shipPos.x--;
            break;
    }

    //Tartományok ellenőrzése
    if (shipPos.x < 0) {
        shipPos.x = 0;
    } else if (shipPos.x > N - 1) {
        shipPos.x = N - 1;
    } else if (shipPos.y < 0) {
        shipPos.y = 0;
    } else if (shipPos.y > N - 1) {
        shipPos.y = N - 1;
    } else {
        animateShip();
    }
}

/**
 * Animációért felelős függvény
 * */
function animateShip() {

}

/**
 * Ez fut le akkor, amikor az oldal betöltődött.
 * A gameArea-t helyezi el a body-ba az appendTo
 * fv. segítségével.
 * Ezután a hajót és a jeget rajzoljuk ki,
 * és definiálunk egy eseménykezelőt a bill.
 * lenyomásának figyelésére.
 */
$(function () {
    gameArea = $('<div></div>');
    gameArea.appendTo('body');
    gameArea.attr('id', 'gamearea');

    addShip();
    randomizeIce();
    $(window).on('keydown', moveShip);
});

