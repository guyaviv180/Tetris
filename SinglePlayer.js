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
    game();
}

function game(){
    pause = false;
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
    else if (sidePiece == null) {
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

//----------------------------------------------------------------
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

function checkStop(piece) {
    for (var i = 0; i < 4; i++) {
        if (piece.Block[i].y >= 19 * length) {
            return true;
        }
    }
    for (var i = 0; i < 4; i++) {
        yUnder = (piece.Block[i].y + length) / length
        x = piece.Block[i].x / length
        if (field[yUnder][x] > 0) {
            return true;
        }
    }
    return false;
}

function checkClear() {
    var full = true;
    for (var i = 0; i < 20; i++) {
        full = true;
        for (var j = 0; j < 10; j++) {
            if (field[i][j] == 0) {
                full = false;
            }
        }
        if (full) { clearLine(i); }
    }
}

//----------------------------------------------------------------
function draw() {
    drawBoard();
    drawNext();
    if(sidePiece != null){
        drawStore();
    }
    drawScore();
    drawFinal();
    drawPieces();
}

function drawBoard() {
    drawRectangle(context, 0, 0, 250, 500, "white", 0.5, "grey");
    for (var i = 1; i < 10; i++) {
        drawLine(context, (length * i), 0, (length * i), (length * 20), 1, "grey");
    }
    for (var i = 1; i < 20; i++) {
        drawLine(context, 0, (length * i), (length * 10), (length * i), 1, "grey");
    }
}

function drawPieces() {
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 10; j++) {
            c = getColor(field[i][j]);
            if (c != "white") {
                drawRectangle(context, j * length, i * length, length, length, c, 0.5, "grey");
            }
        }
    }
    for (var t = 0; t < 4; t++) {
        drawRectangle(context, piece.Block[t].x, piece.Block[t].y, length, length, piece.color, 1, "white");
    }
}

function drawFinal() {
    var pos = new piece.constructor;
    pos.clone(piece);
    while (!checkStop(pos)) {
        pos.move("down");
    }
    for (var i = 0; i < 4; i++) {
        drawRectangle(context, pos.Block[i].x, pos.Block[i].y, length, length, "DarkGray", 1, "white");
    }
}

function drawNext() {
    drawRectangle(nextContext, 0, 0, length * 4, length * 4, "white", 0.5, "grey")
    if (count > 0 && count % 7 != 0 && ((count % 7) % 6) == 0) {
        for (var i = 0; i < 4; i++) {
            drawRectangle(nextContext, nextArr[0].Block[i].x - 75, nextArr[0].Block[i].y, length, length, nextArr[0].color, 1, "white");
        }
    }
    else {
        for (var i = 0; i < 4; i++) {
            drawRectangle(nextContext, arr[(count % 7) + 1].Block[i].x - 75, arr[(count % 7) + 1].Block[i].y, length, length, arr[(count % 7) + 1].color, 1, "white");
        }
    }

}

function drawStore(){
    drawRectangle(storeContext, 0, 0, length * 4, length * 4, "white", 0.5, "grey")
    for (var i = 0; i < 4; i++) {
        drawRectangle(storeContext, sidePiece.Block[i].x - 75, sidePiece.Block[i].y, length, length, sidePiece.color, 1, "white");
    }
}

function drawScore(){
    drawRectangle(scoreContext, 0, 0, length * 4, length * 12, "white", 0.5, "grey")
    drawText(scoreContext, 5, 50, "18px Arial", "black", "lines: " + lines.toString());
    drawText(scoreContext, 5, 70, "18px Arial", "black", "pieces: " + count.toString());

}

function timer(){
    drawRectangle(timerContext, 0, 0, length * 4, length * 2, "white", 0.5, "grey")
    var miliseconds = ((Math.floor(time / 10)) % 100);
    var seconds = (Math.floor(time / 1000)) % 60;
    var minutes = (Math.floor(time / 60000)) % 100;
    
    
    drawText(timerContext, 5, 20, "18px Arial", "black", "time:")
    drawText(timerContext, 5, 40, "18px Arial", "black", 
    (('0' + minutes).slice(-2)).toString() + ":" + 
    (('0' + seconds).slice(-2)).toString() + ":" + 
    (('0' + miliseconds).slice(-2)).toString()
    )
    time += 10;
}