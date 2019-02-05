var DaObject = createObject();
var lastPrint = [0, 0];
var lastShape = DaObject.type[DaObject.imgNr];
var sqW = 24;
var currentScore = 0;
var ShiftDown = false;
var CordinateArray = new Array();
var gameOn = false;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var movingDistance = 3;
var ObjectCoords = CheckTypeX2(DaObject, DaObject.xPos, DaObject.yPos);
var lastCoords = new Array();


function startGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    CordinateArray = new Array();
    currentScore = 0;
    gameOn = true;
    var scoretag = document.getElementById('score');
    scoretag.innerHTML = currentScore.toString();
}
setInterval(() => {

    if (gameOn)
        gameState();

}, 25);


function gameState() {                                                                   
    gravity()

    if(ShiftDown)
    MoveTetriDown();

    drawTetris();
    Score(CordinateArray);

}

function StoreObjectCoordinates() {
    ObjectCoords.forEach(function (element) {
        CordinateArray.push(element);
    });
    DaObject = createObject();
    lastPrint = [0, 0];
    lastShape = DaObject.type[DaObject.imgNr];
    
    ObjectCoords =  CheckTypeX2(DaObject, DaObject.xPos, DaObject.yPos);
    lastCoords = ObjectCoords;

}

function createObject() {
    var tetro_j = ['tetro_j.png', 'tetro_j3.png', 'tetro_j2.png', 'tetro_j1.png'];
    var tetro_i = ['tetro_i.png', 'tetro_i1.png'];
    var tetro_l = ["tetro_l.png", "tetro_l3.png", "tetro_l2.png", "tetro_l1.png"]
    var tetro_o = ["tetro_o.png"];
    var tetro_s = ["tetro_s.png", "tetro_s1.png"];
    var tetro_t = ["tetro_t.png", "tetro_t3.png", "tetro_t2.png", "tetro_t1.png"];
    var tetro_z = ["tetro_z.png", "tetro_z1.png"];
    var types = [tetro_j, tetro_i, tetro_l, tetro_o, tetro_s, tetro_t, tetro_z];
    var pickOne = Math.floor(Math.random() * 7);

    var img = new Image();   // Create new img element
    var type = types[pickOne];
    img.src = type[0];
    var newObject = {
        xPos: canvas.width / 2,
        yPos: 0,
        img: img,
        imgNr: 0,
        imgRotations: types[pickOne].length,
        type: types[pickOne]
    }
    return newObject;
}

function clear(Coords) {
    ctx.fillStyle = "#FFFFFF";
    for (var i = 0; i < Coords.length; i++) {
        ctx.fillRect(Coords[i][0], Coords[i][1], sqW, sqW);
    }
}
function drawTetris() {

    x = DaObject.xPos;
    y = DaObject.yPos;
    img = DaObject.img;

    clear(lastCoords);
    ctx.drawImage(img, x, y);
    lastPrint = [x, y];
    lastShape = DaObject.type[DaObject.imgNr];
    lastCoords = JSON.parse(JSON.stringify(ObjectCoords));
}

function gravity() {

    if(Collide()){
        if (DaObject.yPos < sqW * 2) {
            gameOn = false;
            alert("Round Over!");
        }
        StoreObjectCoordinates(DaObject);
       
    }else{
        DaObject.yPos += movingDistance;
        Dagravity(ObjectCoords, 3);
        
    }
}
function Dagravity(Coords, value){

    for(let i = 0; i<Coords.length; i++){
        Coords[i][1] += value;
    }
    return Coords;
}
function DaSideway(Coords, value){

    for(let i = 0; i<Coords.length; i++){
        Coords[i][0] += value;
    }
    return Coords;
}

function Collide(){
    var Coords = ObjectCoords;
    if(DaObject.yPos + DaObject.img.height >= canvas.height || DaObject.xPos + DaObject.img.width > canvas.width || DaObject.xPos < 0)
    return true;

    for (var i = 0; i < CordinateArray.length; i++) {
        for (var k = 0; k < Coords.length; k++) {
            if(CordinateArray[i][0] == Coords[k][0] && CordinateArray[i][1] >= Coords[k][1]-sqW && CordinateArray[i][1] <= Coords[k][1] +sqW){
                return true;
            }
        }
    }
    return false;
}


function storeKey(e) {
    event.preventDefault()
    
    if(e.keyCode == '38' || e.keyCode == '40')
    rotate(e.keyCode);

    if(e.keyCode == '37' || e.keyCode == '39')
    moveSideways(e.keyCode)

    if (e.keyCode == '32')
        moveDown();
}
var BeforeRotate = new Array();
function rotate(keyCode) {

    if (keyCode == '38'){
    BeforeRotate = JSON.parse(JSON.stringify(ObjectCoords));
        RotateTetri(ObjectCoords);
        DaObject.imgNr = (DaObject.imgNr + 1) % DaObject.imgRotations;
        if(Collide()){
        DaObject.imgNr==0 ? DaObject.imgNr = DaObject.imgRotations - 1 : DaObject.imgNr--;    
        ObjectCoords = BeforeRotate;
    }
    }
    
  /*  if (keyCode == '40') {
        DaObject.imgNr==0 ? DaObject.imgNr = DaObject.imgRotations - 1 : DaObject.imgNr--;
        if(Collide())
        DaObject.imgNr==DaObject.imgRotations - 1 ? 0 : DaObject.imgNr++;        
    }*/

    DaObject.img.src = DaObject.type[DaObject.imgNr];
}

function moveSideways(keyCode){

    if (keyCode == '37'){
        DaObject.xPos -= 24;
        DaSideway(ObjectCoords, -24);
        if(Collide()){
        DaSideway(ObjectCoords, +24);
        DaObject.xPos += 24;
        }
    }

if (keyCode == '39'){
        DaObject.xPos += 24;
        DaSideway(ObjectCoords, 24);
        if(Collide()){
        DaObject.xPos -= 24;
        DaSideway(ObjectCoords, -24);
        }
    }
}

function moveDown(){
    ShiftDown = true;
}


function Score(place) {
    var counter = 0;

    for (var i = 0; i < place.length; i++) {
        counter = 0;
        var temparray = new Array();
        for (var k = 0; k < place.length; k++) {
            if (i != k) {
                if (place[i][1] == place[k][1]) {
                    counter++;

                    temparray.push(k);
                    if (counter == 17) {
                        CordinateArray = RemoveLine(place, temparray, place[i][1]);

                    }
                }
            }
        }
    }
}

function RemoveLine(place, temparray, y) {

    for (var i = temparray.length - 1; i >= 0; i--) {
        place.splice(temparray[i], 1);
    }

    moveCanvas(y);
    currentScore += 100;
    var scoretag = document.getElementById('score');
    scoretag.innerHTML = currentScore.toString();

    return moveCoords(place, y);

}

function moveCoords(Coords, Y) {

    for (var i = 0; i < Coords.length; i++) {
        if (Coords[i][1] <= Y)
            Coords[i][1] += sqW;
    }
    return Coords;
}

function MoveTetriDown() {

    var temporary = 0;
    var distance = 0;
    var Finaldistance = canvas.height;
    var Coords = ObjectCoords;

    for (var i = 0; i < Coords.length; i++) {

        temporary = findYLVL(Coords[i][0]);
        distance = temporary - Coords[i][1] - 24;
        if (distance < Finaldistance) {
            Finaldistance = distance;
        }
    }

    if (Finaldistance == canvas.height){
        DaObject.yPos = canvas.height - DaObject.img.height;
        Dagravity(ObjectCoords, Finaldistance-DaObject.yPos);
    }
    else{
        DaObject.yPos += Finaldistance;
        Dagravity(ObjectCoords, Finaldistance);
    }
    ShiftDown = false;

}

function findYLVL(X) {

    var ResultCoord = canvas.height;
    for (var i = 0; i < CordinateArray.length; i++) {
        if (X == CordinateArray[i][0] && CordinateArray[i][1] < ResultCoord && CordinateArray[i][1]>DaObject.yPos) {
            ResultCoord = CordinateArray[i][1];
        }

    }
    return ResultCoord;
}

function moveCanvas(Level) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var imgData = ctx.getImageData(0, 0, canvas.width, Level);
    ctx.putImageData(imgData, 0, 24);
}

function RotateTetri(Coords){
    let temp;
        for(let i = 0; i<Coords.length; i++){
            temp = Coords[i][0];
            Coords[i][0] = DaObject.xPos+(Coords[i][1]- DaObject.yPos);
            Coords[i][1] = DaObject.yPos+(temp-DaObject.xPos);
        }
        for(let i = 0; i<Coords.length; i++){
            let differ = DaObject.img.height-(Coords[i][0]-DaObject.xPos+sqW);
            Coords[i][0] = DaObject.xPos+differ;
        }
        return Coords;
    }

    
function CheckTypeX2(One, x, y) {
    var array;

    if (One.type[One.imgNr] == "tetro_j.png")
        array = Xtetroj(x, y);
    if (One.type[One.imgNr] == "tetro_i.png")
        array = Xtetroi(x, y);
    if (One.type[One.imgNr] == "tetro_l.png")
        array = Xtetrol(x, y);
    if (One.type[One.imgNr] == "tetro_s.png")
        array = Xtetros(x, y);  
    if (One.type[One.imgNr] == "tetro_o.png")
    array = Xtetroo(x, y);
    if (One.type[One.imgNr] == "tetro_t.png")
        array = Xtetrot(x, y);
    if (One.type[One.imgNr] == "tetro_z.png")
        array = Xtetroz(x, y);

        return array;

}

function Xtetroi(x, y) {
    var Spaces = [[x, y], [x, y + sqW], [x, y + sqW * 2], [x, y + sqW * 3]];
    return Spaces;
}
function Xtetroj(x, y) {
    var Spaces = [[x, y], [x, y + sqW], [x + sqW, y + sqW], [x + sqW * 2, y + sqW]];
    return Spaces;
 }
function Xtetrol(x, y) {
    var Spaces = [[x + sqW * 2, y], [x, y + sqW], [x + sqW, y + sqW], [x + sqW * 2, y + sqW]];
    return Spaces;
 }
function Xtetroo(x, y) {
    var Spaces = [[x, y], [x + sqW, y], [x, y + sqW], [x + sqW, y + sqW]];
    return Spaces;
}
function Xtetros(x, y) {
    var Spaces = [[x + sqW, y], [x + sqW * 2, y], [x, y + sqW], [x + sqW, y + sqW]];
    return Spaces;
 }
function Xtetrot(x, y) {
    var Spaces = [[x + sqW, y], [x, y + sqW], [x + sqW, y + sqW], [x + sqW * 2, y + sqW]];
    return Spaces;
 }
function Xtetroz(x, y) {
    var Spaces = [[x, y], [x + sqW, y], [x + sqW, y + sqW], [x + sqW * 2, y + sqW]];
    return Spaces;
 }