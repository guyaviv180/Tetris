window.onload = function () {
    paused = document.getElementById("paused");
    
    gameCanvas = document.getElementById("gameBoard");
    gameContext = gameCanvas.getContext("2d");

    nextCanvas = document.getElementById("nextBoard");
    nextContext = nextCanvas.getContext("2d");
    
    storeCanvas = document.getElementById("storeBoard");
    storeContext = storeCanvas.getContext("2d");
    
    scoreCanvas = document.getElementById("scoreBoard");
    scoreContext = scoreCanvas.getContext("2d");
    
    timerCanvas = document.getElementById("timerBoard");
    timerContext = timerCanvas.getContext("2d");

    var game1 = new Game(gameContext, nextContext, storeContext, scoreContext, timerContext, 39, 37, 38, 40, 67, 32);
    game1.game();
}

