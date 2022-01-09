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

function drawNext() {
    drawRectangle(nextContext, 0, 0, length * 4, length * 4, "white")
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
    drawRectangle(storeContext, 0, 0, length * 4, length * 4, "white")
    for (var i = 0; i < 4; i++) {
        drawRectangle(storeContext, sidePiece.Block[i].x - 75, sidePiece.Block[i].y, length, length, sidePiece.color, 1, "white");
    }
}

function drawScore(){
    drawRectangle(scoreContext, 0, 0, length * 4, length * 12, "white")
    drawText(scoreContext, 5, 50, "18px Arial", "black", "lines: " + lines.toString());
    drawText(scoreContext, 5, 70, "18px Arial", "black", "pieces: " + count.toString());

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