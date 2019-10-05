
function drawMagnet(){
    var magnet = document.getElementById("magnet");
    magnet.style.position = "absolute";
    var angle = Math.atan2(puckPos.y - mousePos.y, puckPos.x - mousePos.x ); // calculate rotation angle of magnet
    angle = angle * (180/Math.PI);
    magnet.style.left = mousePos.x  + 15 + "px"; // draw magnet
    magnet.style.top = mousePos.y + 50 + "px";
    magnet.style.transform = "rotate(" + angle  + "deg)";
}

function drawPuck(){
    var puck = document.getElementById("puck");
    puck.style.position = "absolute";
    var centerDistX = puckPos.x - midX; // distance from center to puck
    var centerDistY = puckPos.y - midY;
    var centerDistScal = Math.sqrt(centerDistX**2 + centerDistY**2); 
    var mouseDistX = mousePos.x - puckPos.x; // distance from mouse to puck
    var mouseDistY = mousePos.y - puckPos.y;

    // iteratively change puck position based on centerDist and mouseDist
    var puckDrag = 100; // defines "how slow" the puck follows the mouse 
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

function drawPuckLine(){
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

function driver(canvas,context){

        // when a menu option is selected
        // document.getElementById('gen-button').addEventListener("click", function(){ 
            // var sidesCount = document.getElementById('sidesmenu').value; // get menu selection
            PolyGen(sidesCount, document.querySelector("canvas"), 0, shapeRadius, 5, "#222", 0, 0);
            // clearInterval(countDown);
            // countDown();
            // setInterval(drawMagnet,20);
            drawMagnet()

            fb.database().ref("/").on('child_changed', (snapshot) => {
                mousePos = snapshot.val()   
                drawMagnet()
            })
            context.clearRect(midX-30, midY-250,60,85);
            if(sidesCount != 2){
                clearInterval(puckLineInterval);
                puckInterval = setInterval(drawPuck,20); // draw puck every 10 ms
                // draw game circle
                context.arc(midX, midY, shapeRadius, 0, 2 * Math.PI, false); 
                context.lineWidth = 1;
                context.stroke();
            } else { puckLineInterval = setInterval(drawPuckLine,20); }
            document.getElementById('magnet').style.visibility = 'visible';
            document.getElementById('puck').style.visibility = 'visible';
        // });

        // every time 'mousemove' event occurs, call getMousePos
        var counter = 0;
        canvas.addEventListener('mousemove', function(evt) {
            // mousePos = getMousePos(canvas, evt);
            var moveUpdate = getMousePos(canvas, evt)
            fb.database().ref("/").child("position").update(moveUpdate)
            // counter++
            // if(counter%100 == 0){
            //     console.log(mousePos);
            // }
        }, false);
}

function getMousePos(canvas, evt) {
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top }
}