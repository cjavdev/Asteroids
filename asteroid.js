var canvasMaxX = 400;
var canvasMaxY = 400;

$(document).ready(function(){
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext("2d");
	var g = new Game(context);
	g.draw();


});




function MovingObject(position){
	this.x = position.x;
	this.y = position.y;
}

function Asteroid(position){
	MovingObject.apply(this, arguments);
}

Asteroid.prototype = new MovingObject({x: 0, y: 0});

Asteroid.randomAsteroid = function () {
	var position = {
		x: Math.floor(Math.random() * canvasMaxX + 1),
		y: Math.floor(Math.random() * canvasMaxX + 1),
	};
	return new Asteroid(position);
}

Asteroid.prototype.draw = function (ctx) {
	// ctx.beginPath();
	ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
	ctx.fillStyle = "black";
	ctx.fill();
}

MovingObject.prototype.update = function(velocity){
	this.x += velocity.x;
	this.y += velocity.y;
};

MovingObject.prototype.offScreen = function () {
	return this.x > canvasMaxX || this.y > canvasMaxY;
};


function Game(context){
	this.context = context;
	this.asteroids = [];
	for(var i = 0; i < 10; i++) {
		this.asteroids.push(Asteroid.randomAsteroid());
	}
}

Game.prototype.draw = function () {
	for(var i = 0; i < this.asteroids.length; i ++){
		this.asteroids[i].draw(this.context);
	}
}













var as = new Asteroid({x: 20, y: 40});
console.log(as.x);
console.log(as.offScreen);