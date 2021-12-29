class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.length = 25;
    }
}
class Piece {
    constructor(color, index) {
        this.Block = new Block(4)
        this.color = color;
        this.index = index;
        this.reletiveX = 3 * length;
        this.reletiveY = 0 * length;
        this.state1 = []
        this.state2 = []
        this.state3 = []
        this.state4 = []
        this.state = this.state1;
    }
    build(){
        var count = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if(this.state[i][j] > 0){
                    this.Block[count] = new Block(this.reletiveX + (length * j), this.reletiveY + (length * i));
                    count++;
                }
            }
        }
    }

    same(arr){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++) {
                if(this.state[i][j] != arr[i][j]){
                    return false;
                }
            }
        }
        return true;
    }

    clone(obj) {
        for (var i = 0; i < 4; i++){
            this.Block[i].x = obj.Block[i].x;
            this.Block[i].y = obj.Block[i].y;
        }
        this.reletiveX = obj.reletiveX;
        this.reletiveY = obj.reletiveY;
        this.state = obj.state;
    }

    move(direction){
        switch (direction) {
            case "right":
                for (var i = 0; i < 4; i++) {
                    this.Block[i].x += length;
                }
                this.reletiveX += length;
                return;
            case "left":
                for (var i = 0; i < 4; i++) {
                    this.Block[i].x -= length;
                }
                this.reletiveX -= length;
                return;
            case "down":
                for (var i = 0; i < 4; i++) {
                    this.Block[i].y += length;
                }
                this.reletiveY += length;
                return;
        }
    }

    turn(){
        if(this.same(this.state1)){this.state = this.state2}
        else if(this.same(this.state2)){this.state = this.state3}
        else if(this.same(this.state3)){this.state = this.state4}
        else if(this.same(this.state4)){this.state = this.state1}
        this.build()
    }
}

class I extends Piece {
    constructor() {
        super("cyan", 1);
        this.state1 = [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state2 = [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ]
        this.state3 = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ]
        this.state4 = [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ]
        this.state = this.state1;
        this.build();
    }
}
class T extends Piece {
    constructor() {
        super("purple", 2);
        this.state1 = [
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state2 = [
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state3 = [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state4 = [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state = this.state1;
        this.build();
    }
}
class J extends Piece {
    constructor() {
        super("blue", 3);
        this.state1 = [
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state2 = [
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state3 = [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ]
        this.state4 = [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state = this.state1;
        this.build();
    }
}
class L extends Piece {
    constructor() {
        super("orange", 4);
        this.state1 = [
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state2 = [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
        this.state3 = [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state4 = [
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state = this.state1;
        this.build();
    }
}
class S extends Piece {
    constructor() {
        super("lime", 5);
        this.state1 = [
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state2 = [
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ]
        this.state3 = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state4 = [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state = this.state1;
        this.build();
    }
}
class Z extends Piece {
    constructor() {
        super("red", 6);
        this.state1 = [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state2 = [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state3 = [
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
        this.state4 = [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        this.state = this.state1;
        this.build();
    }
}
class O extends Piece {
    constructor() {
        super("yellow", 7);
        this.state1 = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
        this.state2 = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
        this.state3 = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
        this.state4 = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
        this.state = this.state1;
        this.build();
    }
}