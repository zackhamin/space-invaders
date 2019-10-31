var myGamePiece;
var tieFighter;

function startGame() {
    myGamePiece = new component(80, 80, "mfalcon.png", 450, 420, "image");
    tieFighter = new component (70, 70, "tiefighter.png", 450, 20, "image");
    myGameArea.start();
}


// This variable and function is for the size of the game play area.
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 15);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}

// This function relates to the ship size, image and height.
function component (width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
}


// This function sets the boundaries the ship cannot pass. 1st one is the left boundary, 
// 2nd one is the right boundary, 3rd one is the bottom boundary.
var rightBorder = canvas.width - myGamePiece.width;

function playerBounds() {
    if (myGamePiece.x < 0) {
        myGamePiece.x = 0;
    }
    if (myGamePiece.x > 930) {
        myGamePiece.x = 930;
    }
    if (myGamePiece.y > 430) {
        myGamePiece.y = 430;
    }
}
var rightBorder = canvas.width - tieFighter.width;

function tieBounds() {
    if (tieFighter.x < 0) {
        tieFighter.x = 0;
    }
    if (tieFighter.x > 930) {
        tieFighter.x = 930;
    }
    if (tieFighter.y > 430) {
        tieFighter.y = 430;
    }
}

    // function fireRocket(x, y, velocity) {
    //     this.x = x;
    //     this.y = y;
    //     this.velocity = velocity;
    // }
 


    // These functions are for the ship movement and speed.
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0; 
    tieFighter.speedX = 0;
    tieFighter.speedY = 0;  

    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -4; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 4; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -4; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 4; }
      
    if (myGameArea.key && myGameArea.key == 65) {tieFighter.speedX = -4; }
    if (myGameArea.key && myGameArea.key == 68) {tieFighter.speedX = 4; }
    if (myGameArea.key && myGameArea.key == 87) {tieFighter.speedY = -4; }
    if (myGameArea.key && myGameArea.key == 83) {tieFighter.speedY = 4; }
    if (myGameArea.key && myGameArea.key == 32) {this.fireRocket()}

    
    myGamePiece.newPos();    
    myGamePiece.update();
    playerBounds();

    tieFighter.newPos();    
    tieFighter.update();
    tieBounds()
}


    
