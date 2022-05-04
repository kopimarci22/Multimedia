var c = document.getElementById("feladat");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.strokeRect(300,450,10,200);
ctx.stroke;


for (i = 0;i<2;i++){
    ctx.beginPath();
    if (i==0){
        c.fillStyle = "#ff0000";
    } else {
        c.fillStyle = "#ffffff";
    }
    ctx.arc(300,400,50-i*10,0,Math.PI*2);
    ctx.strokeStyle = "#000000";
    ctx.stroke;
    ctx.fill();
}