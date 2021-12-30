const length = 25;
var arr = [];
var nextArr = [];
var count = 0;
var piece;
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
var stop = false;
window.onload = function () {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    pieceCanvas = document.getElementById("pieceBoard");
    ctx = pieceCanvas.getContext("2d");
    getPiece();
    draw();
    setInterval(function () { update(); }, 1000)
    addEventListener("keydown", onKeyDown);
}
function update() {
    checkStop(piece);
    if (stop) {
        if (checkStop(piece)) {
            count++; changeField(); checkClear(); getPiece(); draw();
        }
    }
    piece.move("down");
    draw();
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
    checkStop(piece);
    draw();
}

function turnPiece(){
    var pos = new piece.constructor;
    pos.clone(piece);
    pos.turn();
    if (checkPosition(pos)) {
        piece.turn();
    }
    checkStop(piece);
    draw();
}

function checkPosition(pos) {
    for (var i = 0; i < 4; i++) {
        if (pos.Block[i].y > (19 * length) ||
            pos.Block[i].y < 0 ||
            pos.Block[i].x > (9 * length) ||
            pos.Block[i].x < 0) {
            return false;
        }
        if ((field[((pos.Block[i].y) / 25)][((pos.Block[i].x) / 25)]) > 0) {
            return false;
        }
    }
    return true;
}

function checkStop(piece) {
    for (var i = 0; i < 4; i++) {
        if (piece.Block[i].y >= ((20 * length) - length)) {
            stop = true;
            return true;
        }
    }
    for (var i = 0; i < 4; i++) {
        yUnder = ((piece.Block[i].y + length) / length)
        xUnder = ((piece.Block[i].x) / length)
        if (field[yUnder][xUnder] > 0) {
            stop = true;
            return true
        }
    }
    return false;
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

function changeField() {
    if (stop) {
        for (var i = 0; i < 4; i++) {
            indexX = (piece.Block[i].x / length);
            indexY = (piece.Block[i].y / length);
            field[indexY][indexX] = piece.index;
        }
    }
}

function getPiece() {
    piece = getRandom();
    stop = false;
}

function getRandom() {
    if(count % 7 == 0) {
        arr = [new I, new T, new J, new L, new S, new Z, new O];
           
    }
    return arr[count % 7];
}
function shuffle(arr) {
    index = arr.length;
    while (index > 0) {
        index --;
        rnd = getRandomNumber(0, index);
        [arr[index], arr[rnd]] = [arr[rnd], arr[index]];
    }     
}

function draw() {
    //drawBoard();
    drawPieces();
    drawNext();
}

function drawPieces() {
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 10; j++) {
            c = getColor(field[i][j]);
            drawRectangle(context, j * length, i * length, length, length, c, 0.5, "grey");
        }
    }
    for (var t = 0; t < 4; t++) {
        drawRectangle(context, piece.Block[t].x, piece.Block[t].y, length, length, piece.color, 1, "white");
    }
}

function drawBoard() {
    drawRectangle(0, 0, 250, 500, "white", 10, "black");
    for (var i = 1; i < 10; i++) {
        drawLine((length * i), 0, (length * i), (length * 20), 1, "grey");
    }
    for (var i = 1; i < 20; i++) {
        drawLine(0, (length * i), (length * 10), (length * i), 1, "grey");
    }
}

function drawNext(){
    drawRectangle(ctx, 0, 0, length * 4, length * 4, "white")
    for (var i = 0; i < 4; i++){
        drawRectangle(ctx, arr[(count % 7) + 1].Block[i].x - 75, arr[(count % 7) + 1].Block[i].y, length, length, arr[(count % 7) + 1].color, 1, "white");
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
    }
}