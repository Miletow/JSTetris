<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="utf-8">
        <title>JS Tetris by MB</title>
        <link rel="stylesheet" type="text/css" href="css/js_tetris.css">
    </head>
    
    <body onkeydown="storeKey(event)">

    <div id="screen">
        <div id="game_box">
            <div id="game_screen">
                <h2>JavaScript Tetris</h2>
                    <canvas id="canvas"
                            width="432"
                            height="528"
                            style="border:1px solid #000000;">
                    </canvas>
            </div>
        </div>
        
        <div id="instructions">
            <h2>Instructions</h2>
            <ul>
                <li><b>UP ARROW</b> = Rotate Tetrominoe</li></br>
                <li><b>LEFT ARROW</b> = Tetrominoe Left</li></br>
                <li><b>RIGHT ARROW</b> = Tetrominoe Right</li></br>
                <li><b>DOWN ARROW</b> = Tetrominoe down one spot</li></br>
                <li><b>SPACE BAR</b> = Send Tetrominoe to the bottom</li></br></br>
                <li ><b>SCORE: <span id="score"> 0</span></b></li>
            </ul>
        </div>
    </div>
    

    <script src="js/Tetris2.js"></script>
    <button id="startButton" onclick="startGame()">Start Game</button>
    </body>
    
</html>