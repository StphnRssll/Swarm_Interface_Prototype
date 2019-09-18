
function drawMagnet(){
    var magnet = document.getElementById("magnet");
    magnet.style.position = "absolute"; //css
    // calculate rotation angle of magnet
    var angle = Math.atan2(puckPos.y - mousePos.y, puckPos.x - mousePos.x );
    angle = angle * (180/Math.PI);
    // draw magnet
    magnet.style.left = mousePos.x  + 15 + "px";
    magnet.style.top = mousePos.y + 50 + "px";
    magnet.style.transform = "rotate(" + angle  + "deg)";
}

function drawPuck(){
    var puck = document.getElementById("puck");
    puck.style.position = "absolute";
    // distance from center to puck
    var centerDistX = puckPos.x - midX; 
    var centerDistY = puckPos.y - midY;
    var centerDistScal = Math.sqrt(centerDistX**2 + centerDistY**2);
    // distance from mouse to puck
    var mouseDistX = mousePos.x - puckPos.x; 
    var mouseDistY = mousePos.y - puckPos.y;

    //  iteratively change puck position based on centerDist and mouseDist
    if(centerDistScal<shapeRadius){ // if puck is in-bounds
        puckPos.x += mouseDistX/puckDrag; // puck moves towards mouse
        puckPos.y += mouseDistY/puckDrag;
    } else { // if puck is out of bounds
        puckPos.x -= centerDistX/puckDrag; // puckPos.x - miX returns the distance between the position and the middle
        puckPos.y -= centerDistY/puckDrag;
    }

    // draw puck - 10 and 25 are offsets to properly center the image on the mouse
    puck.style.left = puckPos.x - 10 + "px";
    puck.style.top = puckPos.y + 25 + "px";   
}