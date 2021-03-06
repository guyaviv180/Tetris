const length = 25; // length of block in pixels
const fps = 60;
class Game{
    constructor(gameContext, nextContext, storeContext, scoreContext, timerContext, rightKey, leftKey, turnKey, dropKey, storeKey, hardDropKey){
        //multiplayer data
        this.receivedLines = 0;
        this.canReciveLines = false;

        //keys
        this.rightKey = rightKey; //move right key
        this.leftKey = leftKey; // move left key
        this.turnKey = turnKey; //turn piece key
        this.dropKey = dropKey; //move down key
        this.storeKey = storeKey; // store piece key
        this.hardDropKey = hardDropKey; // hard drop key

        //game data
        this.level = 1;
        this.delay = 1000 / this.level; //current delay time
        this.pause = true; // game pause state
        this.waiting = false; // is piece waiting to stop
        this.place = false; // did game final place piece
        this.swap = true; // did player swap piece
        this.time = 0; // game time in miliseconds
        
        //board data
        this.gameContext = gameContext; // game board context
        this.nextContext = nextContext; // next pieces board context
        this.storeContext = storeContext; // stored piece context
        this.scoreContext = scoreContext; // score board context
        this.timerContext = timerContext; // timer board context

        //piece data
        this.nextArr = this.shuffle([new I, new T, new J, new L, new S, new Z, new O]); // array of next pieces
        this.arr = []; // current pieces
        this.count = 0; //piece count
        this.score = 0; // game score
        this.lines = 0; // lines cleared
        this.piece; // current piece
        this.sidePiece; // current stored piece
        this.field = [
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
        this.bubs = "adi";
        this.baleep = this.bubs;
    }
    
    game() {
        this.pause = false;
        this.getPiece();
        this.draw();
        setInterval(this.timer.bind(this), 10)
    
        setInterval(this.update.bind(this), 1000 / fps)
        
        setInterval(this.drop.bind(this), 1000 / this.level);
        
        addEventListener("keydown", this.onKeyDown.bind(this));
    }
    
    update() {
        if (this.checkStop(this.piece) && !this.waiting) {
            if(!this.place){
                this.waiting = true;
                this.wait();
            }
            else{
                this.count++;
                this.swap = true;
                this.canReciveLines = true;
                this.changeField();
                this.checkClear();
                if(this.canReciveLines){
                    this.recieveLines(); 
                }
                this.getPiece();
                this.place = false;
            }
        }
        this.draw();
    }
    
    recieveLines(){
        for (var i = this.receivedLines; i < 20; i++) {
            for (var j = 0; j < 10; j++) {
                this.field[i - this.receivedLines][j] = this.field[i][j];
            }
        }
        for (var i = 19; i > (19 - this.receivedLines); i--) {
            for (var j = 0; j < 10; j++) {
                this.field[i][j] = 8;
            }
        }
        this.receivedLines = 0;
    }

    pauseGame() {
        if(this.pause){
            paused.style.display = "none";
            this.pause = false;
        }
        else{
            paused.style.display = "block";
            this.pause = true; 
        }
        this.update();
    }
    
    wait() {
        setTimeout(
            this.dumb.bind(this), 
            this.delay);
    }

    dumb(){
        this.waiting = false
        this.place = true;
    }
    
    drop() {
        if(!this.checkStop(this.piece) && !this.waiting){
            this.movePiece("down");
        }
        this.update();
    }
    
    hardDrop() {
        this.delay = 0;
        while (!this.checkStop(this.piece)) {
            this.movePiece("down");
        }
        this.update();
        this.delay = 1000 / this.level;
    }
    
    store() {
        if (this.swap == false){
            this.draw();
            return;
        } 
        else if (this.sidePiece == null) {
            var temp1 = new this.piece.constructor;
            this.sidePiece = temp1;
            this.count++;
            this.place = false;
            this.swap = false;
            this.getPiece();
        }
        else {
            var temp1 = new this.piece.constructor;
            var temp2 = new this.sidePiece.constructor;
            this.arr[this.count % 7] = temp2;
            this.piece = this.arr[this.count % 7];
            this.sidePiece = temp1;
            this.place = false;
            this.swap = false;
        }
        this.draw();
    }
    
    getPiece() {
        if (this.count % 7 == 0) {
            this.arr = this.nextArr;
            this.nextArr = this.shuffle([new I, new T, new J, new L, new S, new Z, new O])
        }
        this.piece = this.arr[this.count % 7];
    }
    
    shuffle(list) {
        let index = list.length;
        let rnd;
        while (index > 0) {
            index--;
            rnd = getRandomNumber(0, index);
            [list[index], list[rnd]] = [list[rnd], list[index]];
        }
        return list
    }
    
    movePiece(direction) {
        var pos = new this.piece.constructor;
        pos.clone(this.piece);
        switch (direction) {
            case "right":
                pos.move("right");
                if (this.checkPosition(pos)) {
                    this.piece.move("right");
                }
                break;
            case "left":
                pos.move("left");
                if (this.checkPosition(pos)) {
                    this.piece.move("left");
                }
                break;
            case "down":
                pos.move("down");
                if (this.checkPosition(pos)) {
                    this.piece.move("down");
                }
                break;
        }
        this.update();
    }
    
    turnPiece() {
        var pos = new this.piece.constructor;
        pos.clone(this.piece);
        pos.turn();
        if (this.checkPosition(pos)) {
            this.piece.turn();
        }
        this.update();
    }
    
    clearLine(line) {
        for (var t = 0; t < 10; t++) {
            this.field[line][t] = 0;
        }
        for (var i = line; i > 0; i--) {
            for (var j = 0; j < 10; j++) {
                this.field[i][j] = this.field[i - 1][j];
            }
        }
        this.lines++;
        this.canReciveLines = false;
    }
    
    changeField() {
        let indexX;
        let indexY;
        if (this.checkStop(this.piece)) {
            for (var i = 0; i < 4; i++) {
                indexX = (this.piece.Block[i].x / length);
                indexY = (this.piece.Block[i].y / length);
                this.field[indexY][indexX] = this.piece.index;
            }
        }
    }
    
    getColor(num) {
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
            case 8:
                return "grey"
        }
    }
    
    onKeyDown(event) {
        var keyCode = event.keyCode;
        if(keyCode == 27){
            this.pauseGame();
        }
        if(this.pause){
            return;
        }
        switch (keyCode) {
            case this.rightKey:
                this.movePiece("right");
                break;
            case this.leftKey:
                this.movePiece("left");
                break;
            case this.turnKey:
                this.turnPiece();
                break;
            case this.dropKey:
                this.movePiece("down");
                break;
            case this.storeKey:
                this.store();
                break;
            case this.hardDropKey:
                this.hardDrop();
                break;
        }
    }
    
    //----------------------------------------------------------------
    checkPosition(pos) {
        for (var i = 0; i < 4; i++) {
            if (pos.Block[i].y > (19 * length) ||
                pos.Block[i].y < 0 ||
                pos.Block[i].x > (9 * length) ||
                pos.Block[i].x < 0) {
                return false;
            }
            if ((this.field[((pos.Block[i].y) / length)][((pos.Block[i].x) / length)]) > 0) {
                return false;
            }
        }
        return true;
    }
    
    checkStop(p) {
        let yUnder;
        let x;
        for (var i = 0; i < 4; i++) {
            if (p.Block[i].y >= 19 * length) {
                return true;
            }
        }
        for (var i = 0; i < 4; i++) {
            yUnder = (p.Block[i].y + length) / length
            x = p.Block[i].x / length
            if (this.field[yUnder][x] > 0) {
                return true;
            }
        }
        return false;
    }
    
    checkClear() {
        var full = true;
        for (var i = 0; i < 20; i++) {
            full = true;
            for (var j = 0; j < 10; j++) {
                if (this.field[i][j] == 0 || this.field[i][j] == 8) {
                    full = false;
                }
            }
            if (full) { this.clearLine(i); }
        }
    }
    
    //----------------------------------------------------------------
    draw() {
        this.drawBoard();
        this.drawNext();
        if(this.sidePiece != null){
            this.drawStore();
        }
        this.drawScore();
        this.drawFinal();
        this.drawPieces();
    }
    
    drawBoard() {
        drawRectangle(this.gameContext, 0, 0, 250, 500, "white", 0.5, "grey");
        for (var i = 1; i < 10; i++) {
            drawLine(this.gameContext, (length * i), 0, (length * i), (length * 20), 1, "grey");
        }
        for (var i = 1; i < 20; i++) {
            drawLine(this.gameContext, 0, (length * i), (length * 10), (length * i), 1, "grey");
        }
    }
    
    drawPieces() {
        let c;
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 10; j++) {
                c = this.getColor(this.field[i][j]);
                if (c != "white") {
                    drawRectangle(this.gameContext, j * length, i * length, length, length, c, 0.5, "grey");
                }
            }
        }
        for (var t = 0; t < 4; t++) {
            drawRectangle(this.gameContext, this.piece.Block[t].x, this.piece.Block[t].y, length, length, this.piece.color, 1, "white");
        }
    }
    
    drawFinal() {
        var pos = new this.piece.constructor;
        pos.clone(this.piece);
        while (!this.checkStop(pos)) {
            pos.move("down");
        }
        for (var i = 0; i < 4; i++) {
            drawRectangle(this.gameContext, pos.Block[i].x, pos.Block[i].y, length, length, "DarkGray", 1, "white");
        }
    }
    
    drawNext() {
        drawRectangle(this.nextContext, 0, 0, length * 4, length * 4, "white", 0.5, "grey")
        if (this.count > 0 && this.count % 7 != 0 && ((this.count % 7) % 6) == 0) {
            for (var i = 0; i < 4; i++) {
                drawRectangle(this.nextContext, this.nextArr[0].Block[i].x - 75, this.nextArr[0].Block[i].y, length, length, this.nextArr[0].color, 1, "white");
            }
        }
        else {
            for (var i = 0; i < 4; i++) {
                drawRectangle(this.nextContext, this.arr[(this.count % 7) + 1].Block[i].x - 75, this.arr[(this.count % 7) + 1].Block[i].y, length, length, this.arr[(this.count % 7) + 1].color, 1, "white");
            }
        }
    
    }
    
    drawStore() {
        drawRectangle(this.storeContext, 0, 0, length * 4, length * 4, "white", 0.5, "grey")
        for (var i = 0; i < 4; i++) {
            drawRectangle(this.storeContext, this.sidePiece.Block[i].x - 75, this.sidePiece.Block[i].y, length, length, this.sidePiece.color, 1, "white");
        }
    }
    
    drawScore() {
        drawRectangle(this.scoreContext, 0, 0, length * 4, length * 12, "white", 0.5, "grey")
        drawText(this.scoreContext, 5, 50, "18px Arial", "black", "lines: " + this.lines.toString());
        drawText(this.scoreContext, 5, 70, "18px Arial", "black", "pieces: " + this.count.toString());
    
    }
    
    timer() {
        let miliseconds = 0;
        let seconds = 0;
        let minutes = 0;
        drawRectangle(this.timerContext, 0, 0, length * 4, length * 2, "white", 0.5, "grey")
        miliseconds = ((Math.floor(this.time / 10)) % 100);
        seconds = (Math.floor(this.time / 1000)) % 60;
        minutes = (Math.floor(this.time / 60000)) % 100;
        
        
        drawText(this.timerContext, 5, 20, "18px Arial", "black", "time:")
        drawText(this.timerContext, 5, 40, "18px Arial", "black", 
        (('0' + minutes).slice(-2)).toString() + ":" + 
        (('0' + seconds).slice(-2)).toString() + ":" + 
        (('0' + miliseconds).slice(-2)).toString()
        )
        this.time += 10;
    }
}