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

