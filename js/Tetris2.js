var remainder = 0;
var DaObject = createObject();
var lastPrint = [0, 0];
var lastShape = DaObject.type[DaObject.imgNr];
var sqW = 24;
var currentScore = 0;
var ShiftDown = false;
var newCordinateArray = new Array();
var gameOn = false;
var c=document.getElementById("canvas");
var ctx=c.getContext("2d");

function startGame(){    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newCordinateArray = new Array();
    currentScore = 0;
    gameOn =true;
}
setInterval(()=>{
    
    if(gameOn)
    gameState();
    
    }, 25);

    
    function gameState(){                                                                    //GAMESTATE
        /********************GAMESTATE *******************/

        if(gravity(DaObject)){
            if(DaObject.yPos<sqW*2){
                gameOn = false;
                alert("Round Over!");
                }
        var temparray = CheckTypeX2(DaObject, DaObject.xPos, DaObject.yPos);
        temparray.forEach(function(element){
        newCordinateArray.push(element);
        });

        DaObject = createObject();
        lastPrint = [0,0];
        lastShape = DaObject.type[DaObject.imgNr];

        }

        if(ShiftDown)
        MoveDown(DaObject);

        drawTetris(DaObject.xPos, DaObject.yPos, DaObject.img);
/*
if(CheckCollision(CheckTypeX2(DaObject, DaObject.xPos, DaObject.yPos),newCordinateArray)){
    
var temparray = CheckTypeX2(DaObject, DaObject.xPos, DaObject.yPos);
temparray.forEach(function(element){
newCordinateArray.push(element);
});

DaObject = createObject();
lastPrint = [0,0];
lastShape = DaObject.type[DaObject.imgNr];

}*/
newCordinateArray = Score(newCordinateArray);

}


function createObject(){
    var tetro_j= ['tetro_j.png', 'tetro_j1.png', 'tetro_j2.png', 'tetro_j3.png'];
    var tetro_i = ['tetro_i.png', 'tetro_i1.png'];
    var tetro_l = ["tetro_l.png", "tetro_l1.png", "tetro_l2.png", "tetro_l3.png"]
    var tetro_o = ["tetro_o.png"];
    var tetro_s = ["tetro_s.png", "tetro_s1.png"];
    var tetro_t = ["tetro_t.png", "tetro_t1.png", "tetro_t2.png", "tetro_t3.png"];
    var tetro_z = ["tetro_z.png", "tetro_z1.png"];
    var types =[tetro_j, tetro_i, tetro_l, tetro_o, tetro_s, tetro_t, tetro_z];
    var pickOne = Math.floor(Math.random()*7);
    
    var img = new Image();   // Create new img element
    var type = types[pickOne];
    img.src = type[0];
    var newObject = {
        xPos: canvas.width/2,
        yPos: 0,
        img: img,
        imgNr:0,
        imgRotations: types[pickOne].length,
        type: types[pickOne]
    }
    return newObject;
    }

function clear(x, y){
    var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");
    ctx.fillStyle="#FFFFFF";
    var Drray = CheckTypeX(lastShape, x, y);
    for(var i = 0; i<Drray.length; i++){
        ctx.fillRect(Drray[i][0], Drray[i][1], sqW, sqW);
    }
}
function drawTetris(x, y, img){

    var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");

    clear(lastPrint[0], lastPrint[1]);
    ctx.drawImage(img,x,y);
    lastPrint[0] = x;
    lastPrint[1] = y;
    lastShape = DaObject.type[DaObject.imgNr];
}

function gravity(object){
    if(object.yPos+object.img.height<canvas.height && !CheckCollision(CheckTypeX2(DaObject, DaObject.xPos, DaObject.yPos),newCordinateArray)){
        object.yPos+=3;
        if(object.yPos+object.img.height>canvas.height)
        remainder = object.yPos+object.img.height % canvas.height;

        object.Ypos =  object.yPos-remainder;
        return false;
        }else{
        return true;
        }
}

function storeKey(e){
    rotate(DaObject,e.keyCode);
}

function checkLeft(object){
    var Coords = CheckTypeX(object, DaObject.xPos, DaObject.yPos);

    for(var i = 0; i<newCordinateArray.length; i++){
     for(var k = 0; k<Coords.length; k++){
            if(newCordinateArray[i][0] == Coords[k][0]-sqW && newCordinateArray[i][1] >= Coords[k][1]-sqW && newCordinateArray[i][1] <= Coords[k][1]+sqW){
            return false;
            }
     }
    }
    return true;
}
function checkRight(object){
    var Coords = CheckTypeX(object, DaObject.xPos, DaObject.yPos);

    for(var i = 0; i<newCordinateArray.length; i++){
     for(var k = 0; k<Coords.length; k++){
            if(newCordinateArray[i][0] == Coords[k][0]+sqW && newCordinateArray[i][1] >= Coords[k][1]-sqW && newCordinateArray[i][1] <= Coords[k][1]+sqW){
            return false;
            }
     }
    }
    return true;
}


function checkRotate(object){
    var Coords = CheckTypeX(object, DaObject.xPos, DaObject.yPos);
    for(var i = 0; i<newCordinateArray.length; i++){
     for(var k = 0; k<Coords.length; k++){
            if(newCordinateArray[i][0] == Coords[k][0] && newCordinateArray[i][1] <= Coords[k][1]+sqW){
            return false;
            }
     }
    }
    return true;
}

function rotate(object, keyCode){
    var imgEn = new Image();   // Create new img element
    imgEn.src = object.type[(object.imgNr+1) % object.imgRotations];
    var imgEn2 = new Image();   // Create new img element
    var stringer;
    if(object.imgNr == 0){
        stringer = object.type[object.imgRotations-1];
    imgEn2.src = object.type[object.imgRotations-1];
    }else{
    imgEn2.src = object.type[object.imgNr-1];
    stringer = object.type[object.imgNr-1];
    }
    event.preventDefault()
    if(keyCode=='38' && object.xPos+imgEn.width<=canvas.width && object.yPos+imgEn.height<=canvas.height && checkRotate(object.type[(object.imgNr+1) % object.imgRotations]))
    object.imgNr =  (object.imgNr+1) % object.imgRotations;
    if(keyCode=='40' && object.xPos+imgEn2.width<=canvas.width && object.yPos+imgEn2.height<=canvas.height && checkRotate(stringer)){
        object.imgNr--;
        if(object.imgNr<0)
        object.imgNr = object.imgRotations-1;
    }
    if(keyCode=='37' && checkLeft(object.type[object.imgNr]))
        if(object.xPos>0){
        object.xPos-=24;
        }
    if(keyCode=='39'&& checkRight(object.type[object.imgNr]))
       if(object.xPos+object.img.width<canvas.width){
       object.xPos+=24;
       }
       if(keyCode == '65'){
       
       }
       if(keyCode == '32'){
        ShiftDown = true;
       }

    object.img.src = object.type[object.imgNr];
}


function CheckCollision(First, Second){

    for(var i= 0; i<First.length; i++){
        for(var k= 0; k<Second.length; k++){
            if(First[i][0] == Second[k][0] && First[i][1]+sqW == Second[k][1])
            return true;
        }
    }

}

function Score(placed){
    var counter = 0;
    var place = placed;
    
    for(var i= 0; i<place.length; i++){
        counter = 0;
        var temparray = new Array();
        for(var k= 0; k<place.length; k++){
            if(i!=k){
                if(place[i][1]==place[k][1]){
                counter++;
                
                temparray.push(k);
        if(counter==17){
            place = ContinueingHEEEH(place, temparray, place[i][1]);
            return place;
                  }
                }
            }
        }     
}
    return place;

}
function ContinueingHEEEH(placed, temparray, y){
    
    var place = placed;
    for(var i= temparray.length-1; i>=0; i--){
                    place.splice(temparray[i], 1);
        }

        moveCanvas(y);
        currentScore+=100;
        var scoretag =document.getElementById('score');
        scoretag.innerHTML = currentScore.toString();
           
    return moveCoords(place, y);

}

function moveCoords(Coord, Y){

    var Coords = Coord;
    for(var i = 0; i<Coords.length; i++){
        if(Coords[i][1]<=Y)
        Coords[i][1]+= sqW;
    }
    return Coords;
}

function CompareArray(First,Second){
   
    var Coordinates = new Array();
    
    for(var i= 0; i<First.length; i++){
        for(var k= 0; k<Second.length; k++){
            if(First[i][0]==Second[k][0]&& First[i][1]==Second[k][1]){
                var Coordinate = [First[i][0], First[i][1]];
                Coordinates.push(Coordinate);
                if(First[i][0]>DaObject.xPos)
                moveRight= false;
                if(First[i][0]<=DaObject.xPos)
                moveLeft= false;
                
            }
        }
    }

    for(var i = 0; i<Coordinates.length; i++){
        for(var k = 0; k<Coordinates.length; k++){
            if(i!=k){
        if(Coordinates[i][1] == Coordinates[k][1])
        return true;
            }
        }
    }   
return false;
}

function MoveDown(object){

    var temporary = 0;
    var distance = 0;
    var Finaldistance = canvas.height;    
    var Coords = CheckTypeX2(DaObject, DaObject.xPos, DaObject.yPos);

    for(var i = 0; i<Coords.length; i++){
        
        temporary = findYLVL(Coords[i][0]);
        distance = temporary-Coords[i][1]-24;
        if(distance<Finaldistance){
            Finaldistance = distance;
        }
    }

    if(Finaldistance==canvas.height)
    DaObject.yPos = canvas.height-DaObject.img.height;
    else
    DaObject.yPos += Finaldistance;
    ShiftDown = false;

}

function findYLVL(X){

    var Thecord = canvas.height;
    var ResultCoord;
    for(var i = 0; i<newCordinateArray.length; i++){
        if( X == newCordinateArray[i][0] && newCordinateArray[i][1]<Thecord){
            Thecord = newCordinateArray[i][1];
            ResultCoord = newCordinateArray[i][1];
        }

    }
    return ResultCoord;
}

function moveCanvas(Level){
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var imgData = ctx.getImageData(0, 0, canvas.width, Level);
    ctx.putImageData(imgData, 0, 24);
}


    function CheckTypeX(One, x, y){
        var array;
            if(One =="tetro_j.png")
            array = Xtetroj(x, y);
            if(One=="tetro_j1.png")
            array = Xtetroj1(x, y);
            if(One=="tetro_j2.png")
            array = Xtetroj2(x, y);
            if(One=="tetro_j3.png")    
            array = Xtetroj3(x, y);
        
            if(One=="tetro_i.png")
            array = Xtetroi(x, y);
            if(One=="tetro_i1.png")
            array = Xtetroi1(x, y);
            
            if(One=="tetro_l.png")
            array = Xtetrol(x, y);
            if(One=="tetro_l1.png")
            array = Xtetrol1(x, y);
            if(One=="tetro_l2.png")
            array = Xtetrol2(x, y);
            if(One=="tetro_l3.png")
            array = Xtetrol3(x, y);
            
            if(One=="tetro_o.png")
            array = Xtetroo(x, y);
            
            if(One=="tetro_s.png")
            array = Xtetros(x, y);
            if(One=="tetro_s1.png")
            array = Xtetros1(x, y);
        
            if(One=="tetro_t.png")
            array = Xtetrot(x, y);
            if(One=="tetro_t1.png")
            array = Xtetrot1(x, y);
            if(One=="tetro_t2.png")
            array = Xtetrot2(x, y);
            if(One=="tetro_t3.png")
            array = Xtetrot3(x, y);
        
            if(One=="tetro_z.png")
            array = Xtetroz(x, y);
            if(One=="tetro_z1.png")
            array = Xtetroz1(x, y);
            return array;    
        }


function Xtetroi(x,y){
    var Spaces = [[x, y], [x, y+sqW], [x, y+sqW*2], [x, y+sqW*3]];
    return Spaces;}
function Xtetroi1(x,y){
    var Spaces = [[x, y], [x+sqW, y], [x+sqW*2, y], [x+sqW*3, y]];
    return Spaces;}
function Xtetroj(x,y){
    var Spaces = [[x,y],[x,y+sqW], [x+sqW, y+sqW], [x+sqW*2, y+sqW]];
    return Spaces;}
function Xtetroj1(x, y){
    var Spaces = [[x+sqW, y], [x+sqW, y+sqW], [x+sqW, y+sqW*2], [x, y+sqW*2]];
    return Spaces;}
function Xtetroj2(x,y){
    var Spaces = [[x,y],[x+sqW, y],[x+sqW*2, y],[x+sqW*2, y+sqW]];
    return Spaces;}
function Xtetroj3(x,y){
    var Spaces = [[x,y], [x+sqW, y], [x,y+sqW], [x,y+sqW*2]];
    return Spaces;}
function Xtetrol(x,y){
    var Spaces = [[x+sqW*2, y], [x, y+sqW],[x+sqW, y+sqW],[x+sqW*2, y+sqW]];
    return Spaces;}
function Xtetrol1(x,y){
    var Spaces = [[x,y],[x+sqW,y],[x+sqW,y+sqW],[x+sqW,y+sqW*2]];
    return Spaces;}
function Xtetrol2(x,y){
    var Spaces = [[x,y],[x+sqW,y], [x+sqW*2,y], [x,y+sqW]];
    return Spaces;}
function Xtetrol3(x,y){
    var Spaces = [[x,y],[x,y+sqW],[x,y+sqW*2],[x+sqW,y+sqW*2]];
    return Spaces;}
function Xtetroo(x,y){
    var Spaces = [[x,y],[x+sqW,y],[x,y+sqW],[x+sqW,y+sqW]];
    return Spaces;}
function Xtetros(x,y){
    var Spaces = [[x+sqW, y],[x+sqW*2, y],[x, y+sqW],[x+sqW, y+sqW]];
    return Spaces;}
function Xtetros1(x,y){
    var Spaces = [[x,y],[x,y+sqW],[x+sqW,y+sqW],[x+sqW,y+sqW*2]];
    return Spaces;}
function Xtetrot(x,y){
    var Spaces = [[x+sqW, y],[x, y+sqW],[x+sqW, y+sqW],[x+sqW*2, y+sqW]];
    return Spaces;}
function Xtetrot1(x,y){
    var Spaces = [[x+sqW,y],[x+sqW,y+sqW],[x+sqW,y+sqW*2],[x,y+sqW]];
    return Spaces;}
function Xtetrot2(x,y){
    var Spaces = [[x,y],[x+sqW,y],[x+sqW*2,y],[x+sqW,y+sqW]];
    return Spaces;}
function Xtetrot3(x,y){
    var Spaces = [[x,y],[x,y+sqW],[x,y+sqW*2],[x+sqW,y+sqW]];
    return Spaces;}
function Xtetroz(x,y){
    var Spaces = [[x,y], [x+sqW,y], [x+sqW,y+sqW], [x+sqW*2,y+sqW]];
    return Spaces;}
function Xtetroz1(x,y){
    var Spaces = [[x+sqW, y], [x+sqW, y+sqW], [x, y+sqW], [x, y+sqW*2]];
    return Spaces;}



function CheckTypeX2(One, x, y){
    var array;
        if(One.type[One.imgNr]=="tetro_j.png")
        array = Xtetroj(x, y);
        if(One.type[One.imgNr]=="tetro_j1.png")
        array = Xtetroj1(x, y);
        if(One.type[One.imgNr]=="tetro_j2.png")
        array = Xtetroj2(x, y);
        if(One.type[One.imgNr]=="tetro_j3.png")    
        array = Xtetroj3(x, y);
    
        if(One.type[One.imgNr]=="tetro_i.png")
        array = Xtetroi(x, y);
        if(One.type[One.imgNr]=="tetro_i1.png")
        array = Xtetroi1(x, y);
        
        if(One.type[One.imgNr]=="tetro_l.png")
        array = Xtetrol(x, y);
        if(One.type[One.imgNr]=="tetro_l1.png")
        array = Xtetrol1(x, y);
        if(One.type[One.imgNr]=="tetro_l2.png")
        array = Xtetrol2(x, y);
        if(One.type[One.imgNr]=="tetro_l3.png")
        array = Xtetrol3(x, y);
        
        if(One.type[One.imgNr]=="tetro_o.png")
        array = Xtetroo(x, y);
        
        if(One.type[One.imgNr]=="tetro_s.png")
        array = Xtetros(x, y);
        if(One.type[One.imgNr]=="tetro_s1.png")
        array = Xtetros1(x, y);
    
        if(One.type[One.imgNr]=="tetro_t.png")
        array = Xtetrot(x, y);
        if(One.type[One.imgNr]=="tetro_t1.png")
        array = Xtetrot1(x, y);
        if(One.type[One.imgNr]=="tetro_t2.png")
        array = Xtetrot2(x, y);
        if(One.type[One.imgNr]=="tetro_t3.png")
        array = Xtetrot3(x, y);
    
        if(One.type[One.imgNr]=="tetro_z.png")
        array = Xtetroz(x, y);
        if(One.type[One.imgNr]=="tetro_z1.png")
        array = Xtetroz1(x, y);
        return array;    
    }
/*
function CheckType(One){
    var array;
        if(One.type[One.imgNr]=="tetro_j.png")
        array = tetroj(One.xPos, One.Ypos);
        if(One.type[One.imgNr]=="tetro_j1.png")
        array = tetroj1(One.xPos, One.Ypos);
        if(One.type[One.imgNr]=="tetro_j2.png")
        array = tetroj2(One.xPos, One.Ypos);
        if(One.type[One.imgNr]=="tetro_j3.png")    
        array = tetroj3(One.xPos, One.Ypos);
    
        if(One.type[One.imgNr]=="tetro_i.png")
        array = tetroi(One.xPos, One.Ypos);
        if(One.type[One.imgNr]=="tetro_i1.png")
        array = tetroi1(One.xPos, One.Ypos);
        
        if(One.type[One.imgNr]=="tetro_l.png")
        array = tetrol(One.xPos, One.Ypos);
        if(One.type[One.imgNr]=="tetro_l1.png")
        array = tetrol1(One.xPos, One.Ypos);
        if(One.type[One.imgNr]=="tetro_l2.png")
        array = tetrol2(One.xPos, One.Ypos);
        if(One.type[One.imgNr]=="tetro_l3.png")
        array = tetrol3(One.xPos, One.Ypos);
        
        if(One.type[One.imgNr]=="tetro_o.png")
        array = tetroo(One.xPos, One.Ypos);
        
        if(One.type[One.imgNr]=="tetro_s.png")
        array = tetros(One.xPos, One.Ypos);
        if(One.type[One.imgNr]=="tetro_s1.png")
        array = tetros1(One.xPos, One.Ypos);
    
        if(One.type[One.imgNr]=="tetro_t.png")
        array = tetrot(One.xPos, One.Ypos);
        if(One.type[One.imgNr]=="tetro_t1.png")
        array = tetrot1(One.xPos, One.Ypos);
        if(One.type[One.imgNr]=="tetro_t2.png")
        array = tetrot2(One.xPos, One.Ypos);
        if(One.type[One.imgNr]=="tetro_t3.png")
        array = tetrot3(One.xPos, One.Ypos);
    
        if(One.type[One.imgNr]=="tetro_z.png")
        array = tetroz(One.xPos, One.Ypos);
        if(One.type[One.imgNr]=="tetro_z1.png")
        array = tetroz1(One.xPos, One.Ypos);
        return array;    
}
function tetroj(x,y){
    var Spaces = [[x,y],[x+24, y],[x, y+24],[x+24, y+24], [x, y+24*2], [x+24, y+24*2], [x+24*2, y+24], [x+24*2, y+24*2], [x+24*3, y+24], [x+24*3, y+24*2]];
    return Spaces;
}

function tetroj1(x, y){
    var Spaces = [[x+24,y],[x+24*2, y],[x+24, y+24],[x+24*2, y+24], [x+24, y+24*2], [x+24*2, y+24*2], [x+24, y+24*3], [x+24*2, y+24*3], [x, y+24*2], [x, y+24*3] ];
    return Spaces;
}

function tetroj2(x, y){
    var Spaces = [[x,y],[x, y+24],[x+24, y],[x+24, y+24], [x+24*2, y], [x+24*2, y+24], [x+24*3, y], [x+24*3, y+24], [x+24*2, y+24*2], [x+24*3, y+24*2]];
    return Spaces;
}

function tetroj3(x, y){
    var Spaces = [[x,y],[x+24, y],[x+24*2, y],[x, y+24], [x+24, y+24], [x+24*2, y+24], [x, y+24*2], [x+24, y+24*2], [x, y+24*3], [x+24, y+24*3]];
    return Spaces;
}

function tetroi(x,y){
    var Spaces = [[x,y],[x+24,y],[x,y+24],[x+24,y+24],[x,y+24*2],[x+24,y*2],[x,y+24*3],[x+24,y+24*3],[x,y+24*4],[x+24,y+24*4]];
    return Spaces;
}

function tetroi1(x,y){
    var Spaces = [[x,y],[x+24,y],[x+24*2,y],[x+24*3,y],[x+24*4,y],[x,y+24],[x+24,y+24],[x+24*2,y+24],[x+24*3,y+24],[x+24*3,y+24]];
    return Spaces;
}

function tetrol(x,y){
    var Spaces = [[x+24*2, y],[x+24*3, y],[x+24*2, y+24],[x+24*3, y+24],[x+24*2, y+24*2],[x+24*3, y+24*2],[x+24, y+24],[x+24, y+24*2], [x, y+24],[x, y+24*2]];
    return Spaces;
}

function tetrol1(x,y){
    var Spaces = [[x,y],[x+24,y],[x+24*2,y],[x,y+24],[x+24,y+24],[x+24*2,y+24],[x+24,y+24*2],[x+24*2,y+24*2],[x+24,y+24*3],[x+24*2,y+24*3]];
    return Spaces;    
}

function tetrol2(x,y){
    var Spaces = [[x,y],[x+24,y],[x+24*2,y],[x+24*3,y],[x,y+24],[x+24,y+24],[x+24*2,y+24],[x+24*3,y+24],[x,y+24*2],[x+24,y+24*2]];
    return Spaces;
}
function tetrol3(x,y){
    var Spaces = [[x,y],[x+24,y],[x,y+24],[x+24,y+24],[x,y+24*2],[x+24,y+24*2],[x,y+24*3],[x+24,y+24*3],[x+24*2,y+24*2],[x+24*2,y+24*3]];
    return Spaces;
}

function tetroo(x,y){
    var Spaces = [[x,y],[x+24,y],[x+24*2,y],[x,y+24],[x+24,y+24],[x+24*2,y+24],[x,y+24*2],[x+24,y+24*2],[x+24*2,y+24*2]];
    return Spaces;
}

function tetros(x,y){
    var Spaces = [[x+24,y],[x+24*2,y],[x+24*3,y],[x+24,y+24],[x+24*2,y+24],[x+24*3,y+24], [x,y+24], [x,y+24*2],[x+24,y+24*2],[x+24*2,y+24*2]];
    return Spaces;
}

function tetros1(x,y){
    var Spaces = [[x, y], [x+24,y], [x, y+24], [x+24,y+24], [x, y+24*2], [x+24,y+24*2], [x+24*2, y+24],[x+24*2, y+24*2],[x+24*2, y+24*3], [x+24, y+24*3]];
    return Spaces;
}

function tetrot(x,y){
    var Spaces = [[x+24,y], [x+24*2,y], [x+24,y+24], [x+24*2,y+24],[x, y+24], [x+24*3,y+24], [x,y+24*2], [x+24,y+24*2], [x+24*2,y+24*2], [x+24*3,y+24*2]];
    return Spaces;
}

function tetrot1(x,y){
    var Spaces = [[x+24,y], [x+24*2,y], [x+24,y+24], [x+24*2,y+24], [x+24,y+24*2], [x+24*2,y+24*2], [x+24,y+24*3], [x+24*2,y+24*3], [x, y+24], [x, y+24*2]];
    return Spaces;
}

function tetrot2(x,y){
    var Spaces = [[x,y],[x+24,y],[x+24*2,y], [x+24*3,y], [x,y+24],[x+24,y+24],[x+24*2,y+24], [x+24*3,y+24], [x+24, y+24*2], [x+24*2, y+24*2]];
    return Spaces;
}

function tetrot3(x,y){
    var Spaces = [[x,y], [x+24,y], [x,y+24], [x+24,y+24],[x,y+24*2], [x+24,y+24*2], [x,y+24*3], [x+24,y+24*3],[x+24*2,y+24], [x+24*2,y+24*2]];
    return Spaces;
}

function tetroz(x,y){
    var Spaces = [[x,y],[x+24,y], [x+24*2,y], [x,y+24],[x+24,y+24], [x+24*2,y+24], [x+24*3,y+24], [x+24, y+24*2], [x+24*2, y+24*2], [x+24*3, y+24*2]];
    return Spaces;
}

function tetroz1(x,y){
    var Spaces = [[x+24,y], [x+24*2,y], [x+24,y+24], [x+24*2,y+24], [x+24,y+24*2], [x+24*2,y+24*2],[x, y+24], [x, y+24*2], [x, y+24*3], [x+24, y+24*3]];
    return Spaces;
}
*/


/*
function checkLeft() {
    var Coords = CheckTypeX2(DaObject, DaObject.xPos, DaObject.yPos);

    for (var i = 0; i < CordinateArray.length; i++) {
        for (var k = 0; k < Coords.length; k++) {
            if (CordinateArray[i][0] == Coords[k][0] - sqW && CordinateArray[i][1] >= Coords[k][1] - sqW && CordinateArray[i][1] <= Coords[k][1] + sqW) {
                return false;
            }
        }
    }
    return true;
}
function checkRight() {
    var Coords = CheckTypeX2(DaObject, DaObject.xPos, DaObject.yPos);

    for (var i = 0; i < CordinateArray.length; i++) {
        for (var k = 0; k < Coords.length; k++) {
            if (CordinateArray[i][0] == Coords[k][0] + sqW && CordinateArray[i][1] >= Coords[k][1] - sqW && CordinateArray[i][1] <= Coords[k][1] + sqW) {
                return false;
            }
        }
    }
    return true;
}


function checkRotate(string) {
    var Coords = CheckTypeX(string, DaObject.xPos, DaObject.yPos);
    for (var i = 0; i < CordinateArray.length; i++) {
        for (var k = 0; k < Coords.length; k++) {
            if (CordinateArray[i][0] == Coords[k][0] && CordinateArray[i][1] <= Coords[k][1] + sqW && CordinateArray[i][1]>DaObject.yPos) {
                return false;
            }
        }
    }
    return true;
}

function CheckDown() {
    First = CheckTypeX2(DaObject, DaObject.xPos, DaObject.yPos);

    for (var i = 0; i < First.length; i++) {
        for (var k = 0; k < CordinateArray.length; k++) {
            if (First[i][0] == CordinateArray[k][0] && First[i][1] + sqW == CordinateArray[k][1])
                return true;
        }
    }

}
    //if (DaObject.yPos + DaObject.img.height < canvas.height && !CheckDown(DaObject)) {

*/
/*
function CheckTypeX(One, x, y) {
    var array;
    if (One == "tetro_j.png")
        array = Xtetroj(x, y);
    if (One == "tetro_j1.png")
        array = Xtetroj1(x, y);
    if (One == "tetro_j2.png")
        array = Xtetroj2(x, y);
    if (One == "tetro_j3.png")
        array = Xtetroj3(x, y);

    if (One == "tetro_i.png")
        array = Xtetroi(x, y);
    if (One == "tetro_i1.png")
        array = Xtetroi1(x, y);

    if (One == "tetro_l.png")
        array = Xtetrol(x, y);
    if (One == "tetro_l1.png")
        array = Xtetrol1(x, y);
    if (One == "tetro_l2.png")
        array = Xtetrol2(x, y);
    if (One == "tetro_l3.png")
        array = Xtetrol3(x, y);

    if (One == "tetro_o.png")
        array = Xtetroo(x, y);

    if (One == "tetro_s.png")
        array = Xtetros(x, y);
    if (One == "tetro_s1.png")
        array = Xtetros1(x, y);

    if (One == "tetro_t.png")
        array = Xtetrot(x, y);
    if (One == "tetro_t1.png")
        array = Xtetrot1(x, y);
    if (One == "tetro_t2.png")
        array = Xtetrot2(x, y);
    if (One == "tetro_t3.png")
        array = Xtetrot3(x, y);

    if (One == "tetro_z.png")
        array = Xtetroz(x, y);
    if (One == "tetro_z1.png")
        array = Xtetroz1(x, y);
    return array;
}



if (One.type[One.imgNr] == "tetro_j1.png")
array = Xtetroj1(x, y);
if (One.type[One.imgNr] == "tetro_j2.png")
array = Xtetroj2(x, y);
if (One.type[One.imgNr] == "tetro_j3.png")
array = Xtetroj3(x, y);

if (One.type[One.imgNr] == "tetro_i1.png")
        array = Xtetroi1(x, y);

        
    if (One.type[One.imgNr] == "tetro_l1.png")
    array = Xtetrol1(x, y);
if (One.type[One.imgNr] == "tetro_l2.png")
    array = Xtetrol2(x, y);
if (One.type[One.imgNr] == "tetro_l3.png")
    array = Xtetrol3(x, y);

    if (One.type[One.imgNr] == "tetro_s1.png")
        array = Xtetros1(x, y);

        
  

    
    if (One.type[One.imgNr] == "tetro_t1.png")
        array = Xtetrot1(x, y);
    if (One.type[One.imgNr] == "tetro_t2.png")
        array = Xtetrot2(x, y);
    if (One.type[One.imgNr] == "tetro_t3.png")
        array = Xtetrot3(x, y);

    if (One.type[One.imgNr] == "tetro_z1.png")
        array = Xtetroz1(x, y);
*/

// function Xtetroz1(x, y) {
//     var Spaces = [[x + sqW, y], [x + sqW, y + sqW], [x, y + sqW], [x, y + sqW * 2]];
//     return Spaces;
// }
/*
function Xtetroi1(x, y) {
    var Spaces = [[x, y], [x + sqW, y], [x + sqW * 2, y], [x + sqW * 3, y]];
    return Spaces;
}

// function Xtetroj1(x, y) {
//     var Spaces = [[x + sqW, y], [x + sqW, y + sqW], [x + sqW, y + sqW * 2], [x, y + sqW * 2]];
//     return Spaces;
// }
// function Xtetroj2(x, y) {
//     var Spaces = [[x, y], [x + sqW, y], [x + sqW * 2, y], [x + sqW * 2, y + sqW]];
//     return Spaces;
// }
// function Xtetroj3(x, y) {
//     var Spaces = [[x, y], [x + sqW, y], [x, y + sqW], [x, y + sqW * 2]];
//     return Spaces;
// }

// function Xtetrol1(x, y) {
//     var Spaces = [[x, y], [x + sqW, y], [x + sqW, y + sqW], [x + sqW, y + sqW * 2]];
//     return Spaces;
// }
// function Xtetrol2(x, y) {
//     var Spaces = [[x, y], [x + sqW, y], [x + sqW * 2, y], [x, y + sqW]];
//     return Spaces;
// }
// function Xtetrol3(x, y) {
//     var Spaces = [[x, y], [x, y + sqW], [x, y + sqW * 2], [x + sqW, y + sqW * 2]];
//     return Spaces;
// }


// function Xtetros1(x, y) {
//     var Spaces = [[x, y], [x, y + sqW], [x + sqW, y + sqW], [x + sqW, y + sqW * 2]];
//     return Spaces;
// }

// function Xtetrot1(x, y) {
//     var Spaces = [[x + sqW, y], [x + sqW, y + sqW], [x + sqW, y + sqW * 2], [x, y + sqW]];
//     return Spaces;
// }
// function Xtetrot2(x, y) {
//     var Spaces = [[x, y], [x + sqW, y], [x + sqW * 2, y], [x + sqW, y + sqW]];
//     return Spaces;
// }
// function Xtetrot3(x, y) {
//     var Spaces = [[x, y], [x, y + sqW], [x, y + sqW * 2], [x + sqW, y + sqW]];
//     return Spaces;
// }
*/

