

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

