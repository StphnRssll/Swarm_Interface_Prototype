/* PolyGen v3.1 | MIT License | git.io/fjq8z */
// For usage and more info go to:
// https://www.cssscript.com/easy-polygon-generator-based-javascript-canvas-polygen/
// or https://github.com/cameronsamuels/polygen


// Parameters: c = number of sides, a = canvas, m = canvas context,
// e = shape radius, r = shape border thickness, o = shape border color
// n = shape x position , s = shape y position

function PolyGen(sides,canvas,m,radius,thickness,o,n,s) {
	sides = sides; // sides
	if (!canvas && !m) return; // canvas
	if (!m) m = canvas.getContext("2d"); // context
	if (!radius) radius = (Math.min(canvas.width, canvas.height)/2); // radius
	m.lineWidth = thickness; // thickness
	m.strokeStyle = o; // color
	if (!n) n =  canvas.width / 2; // x
	if (!s) s = canvas.height / 2; // y
	
	// draw poltgon
	m.beginPath();
	m.moveTo(n +  radius * Math.cos(0), s +  radius *  Math.sin(0));          
	for (i = 1; i <= sides + 1; i++){
		xPos = n + radius * Math.cos(i * 2 * Math.PI / sides);
		yPos = s + radius * Math.sin(i * 2 * Math.PI / sides);
		m.lineTo(xPos,yPos);
		m.fill();
	}
	m.fillStyle = "#415269";
	m.fill();
	m.stroke();
	

	// draw circles at verticies
	for (i = 1; i <= sides + 1; i++){
		xPos = n + radius * Math.cos(i * 2 * Math.PI / sides);
		yPos = s + radius * Math.sin(i * 2 * Math.PI / sides);
		m.lineTo(xPos,yPos);
		m.fillStyle = "#824E2F";
		m.beginPath();
		m.arc(xPos, yPos, 10, 0, 2 * Math.PI, false);
		m.fill();
		m.moveTo(xPos,yPos);
		}
	}
