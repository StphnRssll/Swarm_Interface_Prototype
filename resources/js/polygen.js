/* PolyGen v3.1 | MIT License | git.io/fjq8z */
// For usage and more info go to:
// https://www.cssscript.com/easy-polygon-generator-based-javascript-canvas-polygen/
// or https://github.com/cameronsamuels/polygen


// Parameters: c = number of sides, a = canvas, m(ctx) = canvas context,
// e(r) = shape radius, r(thk) = shape border thickness, o(c) = shape border color
// n(x) = shape x position , s(y) = shape y position

function PolyGen(sides,canvas,ctx,r,thk,c,x,y) {
	sides = sides; // sides
	if (!canvas && !ctx) return; // canvas
	if (!ctx) ctx = canvas.getContext("2d"); // context
	ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
	if (!r) r = (Math.min(canvas.width, canvas.height)/2); // radius
	ctx.lineWidth = thk; // thickness
	ctx.strokeStyle = c; // color
	if (!x) x =  canvas.width / 2; // x
	if (!y) y = canvas.height / 2; // y
	
	// draw polygon
	ctx.beginPath();
	ctx.moveTo(x +  r * Math.cos(0), y +  r *  Math.sin(0));          
	for (i = 1; i <= sides + 1; i++){
		xPos = x + r * Math.cos(i * 2 * Math.PI / sides);
		yPos = y + r * Math.sin(i * 2 * Math.PI / sides);
		ctx.lineTo(xPos,yPos);
		ctx.fill(); 
	}
	ctx.fillStyle = "#bac5d4"; // colorhexa.com - monochromatic base: #415269
	ctx.fill(); // fill polygon color
	ctx.stroke();
	

	// draw circles at verticies
	for (i = 1; i <= sides + 1; i++){
		xPos = x + r * Math.cos(i * 2 * Math.PI / sides);
		yPos = y + r * Math.sin(i * 2 * Math.PI / sides);
		ctx.lineTo(xPos,yPos);
		ctx.fillStyle = "#444444"; // fill circles at vertices
		ctx.beginPath();
		ctx.arc(xPos, yPos, 8, 0, 2 * Math.PI, false);
		ctx.stroke();
		ctx.fill();
		ctx.moveTo(xPos,yPos);
		}
	}
