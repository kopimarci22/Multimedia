var canvas = document.getElementById("kukac");
var c = canvas.getContext("2d");
console.log(c);
c.fillStyle ="cyan";
c.fillRect(0,0,800,800)

c.fillStyle = "#ffc800";
c.arc(60,800,200,0,Math.PI*2);
c.fill();

c.arc(400,900,250, 0, Math.PI*2);
c.fill();
c.arc(800,850,300,0, Math.PI*2);
c.fill();

var worm = new Image();
worm.onload = function (){
    c.drawImage(worm, 0, 0, 300, 338, 300,650, 60,66);
}
worm.src = "worm.png";

var plane = new Image();
plane.onload = function (){
     c.drawImage(plane,0,0,600,200,0,0,120*2,40*2);
}
 plane.src = "plane.png";

c.fillStyle = 'gray';
for(i = 0; i<10; i++ ) {
    c.beginPath();

    c.fillRect(200 + i * 40, 100 + i * 20, 20, 20);
    c.arc(200+i*40+10, 100 + i * 20 +20, 10, 0, Math.PI);

    c.fill();
}