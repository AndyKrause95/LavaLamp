// SETTINGS
var numberBubbles = 10;
var bubbleVel = 1;
var bubbleVelMax = 1.5;
var bubbleVelMin = 0.5;
var bubbleSizeMin = 30;
var bubbleSizeMax = 80;

// Set up the canvas
var canvas = document.getElementById('myCanvas');
canvas.width = 200;
canvas.height = 800;

// Get the drawing context
var ctx = canvas.getContext('2d');
ctx.canvas.width = canvas.offsetWidth;
ctx.canvas.height = canvas.offsetHeight;

// Define the Bubble class
function Bubble() {
	this.radius = Math.random() *(bubbleSizeMax - bubbleSizeMin) + bubbleSizeMin;
	this.x = Math.random() * canvas.width;
	this.y = canvas.height - this.radius;
	this.y = Math.random() * canvas.height;

	this.color = "rgb(" + Math.floor(Math.random() * 256) + ","
		+ Math.floor(Math.random() * 256) + ","
		+ Math.floor(Math.random() * 256) + ")";

	this.color = "red";

	this.velocity = {
		x: Math.random() * (1 - -1) + -1,
		y: Math.random() * (bubbleVelMax - -bubbleVelMax) + -bubbleVelMax
	};
}

// Draw the bubble
Bubble.prototype.draw = function() {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	ctx.fillStyle = this.color;
	ctx.fill();

	// Shadow / blur
	ctx.shadowColor = this.color;
	ctx.shadowBlur = 30;
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;

	ctx.closePath();
};

// Update the bubble's position
Bubble.prototype.update = function() {
	this.x += this.velocity.x;
	this.y += this.velocity.y;

	// Detect right edge border
	if (this.x + this.radius > canvas.width) {
		if (this.velocity.x > 0)
			this.velocity.x *= -1;
	}

	// Detect left edge border
	if (this.x - this.radius < 0) {
		if (this.velocity.x < 0)
			this.velocity.x *= -1;
	}

	// Detect bottom edge border
	if (this.y + this.radius > canvas.height) {
		this.y = canvas.height - this.radius;
		//if (this.velocity.y > 0)
		//	this.velocity.y *= -1;
	}

	// Detect top edge border
	if (this.y - this.radius <= 0) {
		this.y = 0 + this.radius;
		//if (this.velocity.y > 0)
		//this.velocity.y *= -1;
	}

	// Change Velocity based on distance to bottom
	this.distancePercent = Math.round((this.y * 100) / canvas.height);

	// Log Messages
	logMessage("Percent: " + bubbles[0].distancePercent + "%" + " X: "
		+ Math.round(bubbles[0].x)
		+ " Y: " + Math.round(bubbles[0].y)
		+ " VelX: " + Math.round(bubbles[0].velocity.x * 100) / 100
		+ " VelY: " + Math.round(bubbles[0].velocity.y * 100) / 100);

	// Update Velocity
	newRange = ((((this.distancePercent / 100) - 0) * (1 - -1)) / (1 - 0)) + -1;

	if (this.y < (canvas.height * 0.15)) {
		this.velocity.y += 0.005;
	} else if(this.y > (canvas.height * 0.85)) {
		this.velocity.y -= 0.005
	} else {
		this.velocity.y *= 1.005;
	}

	if (this.distancePercent < 50) {
		//this.velocity.y += (0.001 * (1 + ((100 - this.distancePercent)) / 100));
		//this.velocity.y += (0.05);
	} else {
		//this.velocity.y -= 0.001;
		//this.velocity.y -= (0.05);
	}

	// Keep velocity within constraints	
	if (this.velocity.x > bubbleVelMax)
		this.velocity.x = bubbleVelMax;

	if (this.velocity.x < -bubbleVelMax)
		this.velocity.x = -bubbleVelMax;

	if (this.velocity.y > bubbleVelMax)
		this.velocity.y = bubbleVelMax;

	if (this.velocity.y < -bubbleVelMax)
		this.velocity.y = -bubbleVelMax;

};

// Draw the bubbles and animate them
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].draw();
		bubbles[i].update();
	}
	requestAnimationFrame(animate);
}

// Create the bubbles
var bubbles = [];
for (var i = 0; i < numberBubbles; i++) {
	bubbles.push(new Bubble());
}

// Start
console.log(bubbles);
animate();

function logMessage(message) {
	document.getElementById('logWindow').innerHTML = message;
}