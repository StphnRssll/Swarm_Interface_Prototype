var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();

// setup canvas
canvas.display= 'block';
canvas.height = 512;
canvas.width = 512;

// initialize things for shape drawing
var shapeRadius = 150;
var midX = (canvas.width/2); // get coordinates of middle of the canvas
var midY = (canvas.height/2);
var mousePos = {x: midX, y: midY};
var puckPos = {x: midX, y: midY};

// vars for each function allow us to use clearInterval(var) to stop the function
var puckLineInterval;
var puckInterval;
var countDownInterval;

// var url = window.location.href.split("/")
// var mouseID = url.pop()
// var sidesCount = url.pop()
var sidesCount = 6


driver(canvas,context)