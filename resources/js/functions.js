
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

    
    //  iteratively change puck position based on centerDist and mouseDist
    var puckDrag = 200; // defines "how slow" the puck follows the mouse 
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