/* PolyGen v3.1 | MIT License | git.io/fjq8z */
// For usage and more info go to:
// https://www.cssscript.com/easy-polygon-generator-based-javascript-canvas-polygen/
// or https://github.com/cameronsamuels/polygen


// Parameters: c = number of sides, a = canvas, m = canvas context,
// e = shape radius, r = shape border thickness, o = shape border color
// n = shape x position , s = shape y position

function PolyGen(c,a,m,e,r,o,n,s) {
	c = c || 3; // sides
	if (!a && !m) return; // canvas
	if (!m) m = a.getContext("2d"); // context
	if (!e) e = (Math.min(a.width, a.height)/2); // radius
	m.lineWidth = r || 8; // thickness
	m.strokeStyle = o || "#000"; // color
	if (!n) n =  a.width / 2; // x
	if (!s) s = a.height / 2; // y
	
	var xPos;
	var yPos;
	context.fillStyle = "#014421";
	context.font = "bold 25px Arial";
	m.beginPath();
	m.moveTo(n +  e * Math.cos(0), s +  e *  Math.sin(0));          
	for (i = 1; i <= c + 1; i++){
		xPos = n + e * Math.cos(i * 2 * Math.PI / c);
		yPos = s + e * Math.sin(i * 2 * Math.PI / c);
		m.lineTo(xPos,yPos);
		xPos = Math.round(xPos * 10) / 10;
		yPos = (Math.round(yPos * 10) / 10);
		context.fillText("(" + xPos + "," + Math.round((a.height-yPos) * 10) / 10 + ")", xPos, ((yPos**1.25)/4.8));
	}
	m.stroke();
}
