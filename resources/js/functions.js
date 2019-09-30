
function drawMagnet(){
    var magnet = document.getElementById("magnet");
    magnet.style.position = "absolute";
    var angle = Math.atan2(puckPos.y - mousePos.y, puckPos.x - mousePos.x ); // calculate rotation angle of magnet
    angle = angle * (180/Math.PI);
    magnet.style.left = mousePos.x  + 15 + "px"; // draw magnet
    magnet.style.top = mousePos.y + 50 + "px";
    magnet.style.transform = "rotate(" + angle  + "deg)";
}

function drawPuck(shapeRadius){
    var puck = document.getElementById("puck");
    puck.style.position = "absolute";
    var centerDistX = puckPos.x - midX; // distance from center to puck
    var centerDistY = puckPos.y - midY;
    var centerDistScal = Math.sqrt(centerDistX**2 + centerDistY**2); 
    var mouseDistX = mousePos.x - puckPos.x; // distance from mouse to puck
    var mouseDistY = mousePos.y - puckPos.y;

    // iteratively change puck position based on centerDist and mouseDist
    var puckDrag = 300; // defines "how slow" the puck follows the mouse 
    if(centerDistScal<shapeRadius){ // if puck is in-bounds
        puckPos.x += mouseDistX/puckDrag; // puck moves towards mouse
        puckPos.y += mouseDistY/puckDrag;
    } else { // if puck is out of bounds
        puckPos.x -= centerDistX/puckDrag; // puck moves towards the center
        puckPos.y -= centerDistY/puckDrag; 
        // centerDist is used because its sign (+/-) indicates which direction the puck should move
    }

    // draw puck - 10 and 25 are offsets to properly center the image on the mouse
    puck.style.left = puckPos.x - 10 + "px";
    puck.style.top = puckPos.y + 25 + "px";   
}

function drawPuckLine(shapeRadius){
    var puck = document.getElementById("puck");
    puck.style.position = "absolute";
    var centerDistX = puckPos.x - midX; 
    var mouseDistX = mousePos.x - puckPos.x; 

    var puckDrag = 150;
    puckPos.y = midY;
    if(Math.abs(centerDistX)<shapeRadius){ 
        puckPos.x += mouseDistX/puckDrag; 
    } else { // if puck is out of bounds
        puckPos.x -= centerDistX/puckDrag; // puck moves towards the center
        // centerDist is used because its sign (+/-) indicates which direction the puck should move
    }

    // draw puck - 10 and 25 are offsets to properly center the image on the mouse
    puck.style.left = puckPos.x - 10 + "px";
    puck.style.top = puckPos.y + 25 + "px";   
}

function countDown(){
    var context = canvas.getContext('2d');
    var seconds = 4;
    context.font = '110px arial';
    context.fillStyle = "#ffffff"; // text color
    context.fillText(seconds, midX-30, midY-170);
    var countdown = setInterval(function() {
        seconds--;
        context.clearRect(midX-30, midY-250,60,85);
        context.fillText(seconds, midX-30, midY-170);
        if (seconds <= 0){
            clearInterval(countdown);
            context.clearRect(midX-30, midY-250,60,85);
        }
    }, 1000);
    context.clearRect(midX-30, midY-250,60,85);
}

function generateGame(){
    // setup canvas
    var canvas = document.getElementById('canvas');
    canvas.style.display= 'block';
    canvas.style.height = 512;
    canvas.style.width = 512;
    var context = canvas.getContext('2d');
    

    // initialize things for shape drawing
    var shapeRadius = 150;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    // vars for each function allow us to use clearInterval(var) to stop the function
    var puckLineInterval; //??
    var puckInterval; //??
    //var countDown;


    // when a menu option is selected
    document.getElementById('gen-button').addEventListener("click", function(){ 
        sidesCount = document.getElementById('sidesmenu').value;
        PolyGen(sidesCount, document.querySelector("canvas"), 0, shapeRadius, 5, "#222", 0, 0);
        puckPos.x = midX;
        puckPos.y = midY;
        //clearInterval(countDown); //??
        clearInterval(puckLineInterval);//??
        clearInterval(puckInterval);
        drawPuck(shapeRadius);

        if(sidesCount != 2){
            // draw game circle
            context.arc(centerX, centerY, shapeRadius, 0, 2 * Math.PI, false); 
            context.lineWidth = 1;
            context.stroke();
        }

        ///////////////////////////////////// countdown
        var seconds = 4;
        context.font = '110px arial';
        context.fillStyle = "#ffffff"; // text color
        context.fillText(seconds, midX-30, midY-170);
        var countdown = setInterval(function() {
            seconds--;
            context.clearRect(midX-30, midY-250,60,85);
            context.fillText(seconds, midX-30, midY-170);
            if (seconds <= 0){
                clearInterval(countdown);
                context.clearRect(midX-30, midY-250,60,85);

                //////////////////stuff
                setInterval(drawMagnet,10);
                context.clearRect(midX-30, midY-250,60,85);//??
                if(sidesCount != 2){
                    clearInterval(puckLineInterval);
                    puckInterval = setInterval(function(){drawPuck(shapeRadius)},10); // draw puck every 10 ms
                } else { puckLineInterval = setInterval(function(){drawPuckLine(shapeRadius)},10); }
                document.getElementById('magnet').style.visibility = 'visible';
                document.getElementById('puck').style.visibility = 'visible';
                //////////////////
            }
        }, 1000);
        context.clearRect(midX-30, midY-250,60,85);
        /////////////////////////////////////
        //countDown(); //??
        ///clearInterval(puckLineInterval);//??
        //clearInterval(puckInterval);//??
    });
}