window.onload = function () {
    paused = document.getElementById("paused");
    
    gameCanvas = document.getElementById("gameBoard_left");
    gameContext_left = gameCanvas.getContext("2d");

    nextCanvas = document.getElementById("nextBoard_left");
    nextContext_left = nextCanvas.getContext("2d");
    
    storeCanvas = document.getElementById("storeBoard_left");
    storeContext_left = storeCanvas.getContext("2d");
    
    scoreCanvas = document.getElementById("scoreBoard_left");
    scoreContext_left = scoreCanvas.getContext("2d");
    
    timerCanvas = document.getElementById("timerBoard_left");
    timerContext_left = timerCanvas.getContext("2d");

    var game1 = new Game(gameContext_left, nextContext_left, storeContext_left, scoreContext_left, timerContext_left, 39, 37, 38, 40, 190, 191);

    
    gameCanvas = document.getElementById("gameBoard_right");
    gameContext_right = gameCanvas.getContext("2d");

    nextCanvas = document.getElementById("nextBoard_right");
    nextContext_right = nextCanvas.getContext("2d");
    
    storeCanvas = document.getElementById("storeBoard_right");
    storeContext_right = storeCanvas.getContext("2d");
    
    scoreCanvas = document.getElementById("scoreBoard_right");
    scoreContext_right = scoreCanvas.getContext("2d");
    
    timerCanvas = document.getElementById("timerBoard_right");
    timerContext_right = timerCanvas.getContext("2d");
    var game2 = new Game(gameContext_right, nextContext_right, storeContext_right, scoreContext_right, timerContext_right, 68, 65, 87, 83, 71, 72);

    game1.game();
    game2.game();
    setInterval(
        function(){ findDifference(game1, game2); }, 5000
    )
}

let game1LastLines = 0;
let game2LastLines = 0;

    
//functions
const findDifference = (game1, game2) =>{
    linesSent = (game1.lines - game1LastLines) - (game2.lines - game2LastLines);
    if(linesSent == 0){
        return;
    }
    else if(linesSent > 0){
        game2.receivedLines = linesSent;
    }
    else{
        game1.receivedLines = linesSent;
    }
    game1LastLines = game1.lines;
    game2LastLines = game2.lines;
}