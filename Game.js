//game data
const fps = 64;
var level = 1;
var delay = 1000 / level; //current delay time
var pause = true; // game pause state
var waiting = false; // is piece waiting to stop
var place = false; // did game final place piece
var swap = true; // did player swap piece
var time = 0; // game time in miliseconds

//piece data
const length = 25; // length of block in pixels
var nextArr = shuffle([new I, new T, new J, new L, new S, new Z, new O]); // array of next pieces
var arr = []; // current pieces
var count = 0; //piece count
var score = 0; // game score
var lines = 0; // lines cleared
var piece; // current piece
var sidePiece; // current stored piece
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
]; // game field

//sound data
var bubs = "adi";
var baleep = bubs;

window.onload = function () {
    play = document.getElementById("play");

    paused = document.getElementById("paused");
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
    setInterval(function () { 
        if(!pause){ timer(); }
    }, 10)

    setInterval(function () {
        if(!pause){ update(); }
    }, 1000 / fps)

    setInterval(function () { 
        if(!pause){ drop(); }
    }, 1000 / level);

    addEventListener("keydown", onKeyDown);
}

function update() {
    if (checkStop(piece) && !waiting) {
        if(!place){
            waiting = true;
            wait();
        }
        if(place){
            count++; swap = true; changeField(); checkClear(); getPiece(); place = false;
        }
    }
    draw();
}

function handleExceptions() {
    var command = new {i: 0, d: ""};
}

function checkPosition(pos) {
    for (var i = 0; i < 4; i++) {
        if (pos.Block[i].y > (19 * length) ||
            pos.Block[i].y < 0 ||
            pos.Block[i].x > (9 * length) ||
            pos.Block[i].x < 0) {
            return false;
        }
        if ((field[((pos.Block[i].y) / length)][((pos.Block[i].x) / length)]) > 0) {
            return false;
        }
    }
    return true;
}

function pauseGame(){
    if(pause){
        paused.style.display = "none";
        pause = false;
    }
    else{
        paused.style.display = "block";
        pause = true; 
    }
    update();
}

function wait(){
    setTimeout(function(){
        waiting = false
        place = true;
    }, delay);
}

function drop(){
    if(!checkStop(piece) && !waiting){
        movePiece("down");
    }
    update();
}

function hardDrop(){
    delay = 0;
    while (!checkStop(piece)) {
        movePiece("down");
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
        place = false;
        swap = false;
        getPiece();
    }
    else {
        var temp1 = new piece.constructor;
        var temp2 = new sidePiece.constructor;
        arr[count % 7] = temp2;
        piece = arr[count % 7];
        sidePiece = temp1;
        place = false;
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
    if(keyCode == 27){
        pauseGame();
    }
    if(pause){
        return;
    }
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
            break;
    }
}