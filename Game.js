var pause = true;
const length = 25;
var nextArr = shuffle([new I, new T, new J, new L, new S, new Z, new O]);
var arr = [];
var count = 0;
var lines = 0;
var piece;
var sidePiece;
var waiting = false;
var place = false;
var swap = true;
var time = 0;
var fps = 64;
var level = 1;
var delay = 1000 / level; 
var bubs = "adi";
var baleep = bubs;
var field = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
window.onload = function () {
    play = document.getElementById("play");
    gameCanvas = document.getElementById("gameBoard");
    context = gameCanvas.getContext("2d");
    nextCanvas = document.getElementById("nextBoard");
    nextContext = nextCanvas.getContext("2d");
    storeCanvas = document.getElementById("storeBoard");
    storeContext = storeCanvas.getContext("2d");
    scoreCanvas = document.getElementById("scoreBoard");
    scoreContext = scoreCanvas.getContext("2d");
    timerCanvas = document.getElementById("timerBoard");
    timerContext = timerCanvas.getContext("2d");   
}

function game(){
    pause = false;
    gameCanvas.style.display = "block";
    nextCanvas.style.display = "block";
    storeCanvas.style.display = "block";
    scoreCanvas.style.display = "block";
    timerCanvas.style.display = "block";
    play.style.display = "none";
    getPiece();
    draw();
    if(pause == false){
        setInterval(function () { timer(); }, 10)
        setInterval(function () { update(); }, 1000 / fps)
        setInterval(function () { drop(); }, 1000 / level);
    }
    addEventListener("keydown", onKeyDown);
}

function update() {
    if (checkStop(piece) && waiting == false) {
        if(place == false){
            waiting = true;
            wait();
        }
        if(place == true){
            count++; swap = true; changeField(); checkClear(); getPiece(); place = false;
        }
    }
    draw();
}

function pause(){
    if(pause == true){ pause = false; }
    else{ pause = true; }
    update();
}

function wait(){
    setTimeout(function(){
        waiting = false
        place = true;
    }, delay);
}

function drop(){
    if(!checkStop(piece) && waiting == false){
        piece.move("down");
    }
    update();
}

function hardDrop(){
    delay = 0;
    while (!checkStop(piece)) {
        piece.move("down");
    }
    update();
    delay = 1000 / level;
}

function store() {
    if (swap == false){
        draw();
        return;
    } 
    if (sidePiece == null) {
        var temp1 = new piece.constructor;
        sidePiece = temp1;
        count++;
        swap = false;
        getPiece();
    }
    else {
        var temp1 = new piece.constructor;
        var temp2 = new sidePiece.constructor;
        arr[count % 7] = temp2;
        piece = arr[count % 7];
        sidePiece = temp1;
        swap = false;
    }
    draw();
}

function getPiece() {
    if (count % 7 == 0) {
        arr = nextArr;
        nextArr = shuffle([new I, new T, new J, new L, new S, new Z, new O])
    }
    piece = arr[count % 7];
}

function shuffle(arr) {
    index = arr.length;
    while (index > 0) {
        index--;
        rnd = getRandomNumber(0, index);
        [arr[index], arr[rnd]] = [arr[rnd], arr[index]];
    }
    return arr
}

function movePiece(direction) {
    var pos = new piece.constructor;
    pos.clone(piece);
    switch (direction) {
        case "right":
            pos.move("right");
            if (checkPosition(pos)) {
                piece.move("right");
            }
            break;
        case "left":
            pos.move("left");
            if (checkPosition(pos)) {
                piece.move("left");
            }
            break;
        case "down":
            pos.move("down");
            if (checkPosition(pos)) {
                piece.move("down");
            }
            break;
    }
    update();
}

function turnPiece() {
    var pos = new piece.constructor;
    pos.clone(piece);
    pos.turn();
    if (checkPosition(pos)) {
        piece.turn();
    }
    update();
}

function clearLine(line) {
    for (var t = 0; t < 10; t++) {
        field[line][t] = 0;
    }
    for (var i = line; i > 0; i--) {
        for (var j = 0; j < 10; j++) {
            field[i][j] = field[i - 1][j];
        }
    }
    lines++;
}

function changeField() {
    if (checkStop(piece)) {
        for (var i = 0; i < 4; i++) {
            indexX = (piece.Block[i].x / length);
            indexY = (piece.Block[i].y / length);
            field[indexY][indexX] = piece.index;
        }
    }
}

function getColor(num) {
    switch (num) {
        case 0:
            return "white"
        case 1:
            return "cyan"
        case 2:
            return "purple"
        case 3:
            return "blue"
        case 4:
            return "orange"
        case 5:
            return "lime"
        case 6:
            return "red"
        case 7:
            return "yellow"
    }
}

function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 39:
            movePiece("right");
            break;
        case 37:
            movePiece("left");
            break;
        case 38:
            turnPiece();
            break;
        case 40:
            movePiece("down");
            break;
        case 67:
            store();
            break;
        case 32:
            hardDrop();
        case 27:
            pause(); 
    }
}