/* PolyGen v3.1 | MIT License | git.io/fjq8z */
// For usage and more info go to:
// https://www.cssscript.com/easy-polygon-generator-based-javascript-canvas-polygen/
// or https://github.com/cameronsamuels/polygen


// Parameters: c = number of sides, a = canvas, m = canvas context,
// e = shape radius, r = shape border thickness, o = shape border color
// n = shape x position , s = shape y position

function PolyGen(sides,canvas,m,radius,thickness,o,n,s) {
	sides = sides || 3; // sides
	if (!canvas && !m) return; // canvas
	if (!m) m = canvas.getContext("2d"); // context
	if (!radius) radius = (Math.min(canvas.width, canvas.height)/2); // radius
	m.lineWidth = thickness || 8; // thickness
	m.strokeStyle = o || "#000"; // color
	if (!n) n =  canvas.width / 2; // x
	if (!s) s = canvas.height / 2; // y
	
	// all commented code in this file is used to draw coordinates beside each point of shape
	// var xPos;
	// var yPos;
	// context.fillStyle = "#014421";
	// context.font = "bold 25px Arial";
	m.beginPath();
	m.moveTo(n +  radius * Math.cos(0), s +  radius *  Math.sin(0));          
	for (i = 1; i <= sides + 1; i++){
		xPos = n + radius * Math.cos(i * 2 * Math.PI / sides);
		yPos = s + radius * Math.sin(i * 2 * Math.PI / sides);
		m.lineTo(xPos,yPos);
		xPos = Math.round(xPos * 10) / 10;
		yPos = (Math.round(yPos * 10) / 10);
		// context.fillText("(" + xPos + "," + Math.round((canvas.height-yPos) * 10) / 10 + ")", xPos, ((yPos**1.25)/4.8));
	}
	m.stroke();
}
