var Asteroids = (function () {
	function MovingObject(position){
		this.x = position.x;
		this.y = position.y;
	}

	function Asteroid(position, radius, direction) {
		this.radius = radius;
		this.direction = direction;

		MovingObject.apply(this, arguments);
	}

	Asteroid.prototype = new MovingObject({x: 0, y: 0});

	Asteroid.randomAsteroid = function () {
		var position = {
			x: Math.floor(Math.random() * canvasMaxX + 1),
			y: Math.floor(Math.random() * canvasMaxX + 1),
		};
		var direction = {x: randomBetween(-10, 10), y: randomBetween(-10,10)}
		return new Asteroid(position, randomBetween(5,25), direction);
	};

	Asteroid.prototype.draw = function (ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = "white";
		ctx.fill();
	};

	Asteroid.prototype.update = function () {
		this.x += this.direction.x;
		this.y += this.direction.y;
	}

	Asteroid.prototype.isHit = function (bullets) {
		for(var i = 1; i < bullets.length; i ++){
			var d = Math.sqrt(Math.pow((bullets[i].x - this.x),2) +
												Math.pow((bullets[i].y - this.y),2));
			if (d < (bullets[i].radius + this.radius)){
				return true;
			}
		}
		return false;
	}

	function Ship(position, height, width){
		this.height = height;
		this.width = width;
		this.velocity = {x: 0, y: 0};

		this.image = new Image();
		this.image.src = "./spaceship.png";
		MovingObject.apply(this, arguments);
	}

	// Ship.inherits(MovingObject);

	Ship.prototype = new MovingObject({x: 0, y: 0});

	Ship.prototype.draw = function (ctx) {
		var that = this
		ctx.beginPath();
		ctx.drawImage(this.image, that.x, that.y, that.height, that.width);
	};

	Ship.prototype.isHit = function (asteroids) {
		for(var i = 1; i < asteroids.length; i ++){
			var d = Math.sqrt(Math.pow((asteroids[i].x - this.center().x),2) +
												Math.pow((asteroids[i].y - this.center().y),2));
			if (d < (asteroids[i].radius + this.height / 2)){
				return true;
			}
		}
		return false;
	}

	Ship.prototype.center = function () {
		return {x: (this.x + this.height / 2), y: (this.y + this.width / 2)};
	}

	//overrides the MovingObject update
	Ship.prototype.update = function() {
		this.x += this.velocity.x;
		this.y += this.velocity.y;

		if(this.velocity.x !== 0) {
		 	this.velocity.x < 0 ? this.velocity.x++ : this.velocity.x--;
		}
		if(this.velocity.y !== 0) {
			this.velocity.y < 0 ? this.velocity.y++ : this.velocity.y--;
		}

	};

	MovingObject.prototype.wrap = function () {
		if(this.x > canvasMaxX){
			this.x = 0;
		}
		else if (this.y > canvasMaxY){
			this.y = 0;
		}
		else if (this.x < 1){
			this.x = canvasMaxX;
		}
		else if (this.y < 1){
			this.y = canvasMaxY;
		}
	};

	Ship.prototype.power = function (dx, dy) {
		if(this.velocity.x + dx >= -10 && this.velocity.x + dx <= 10){
			this.velocity.x += dx;
		}
		if(this.velocity.y + dy >= -10 && this.velocity.y + dy <= 10){
			this.velocity.y += dy;
		}
	}

	Ship.prototype.fireBullet = function (game) {
		var bullet = new Bullet({x: this.center().x, y: this.center().y},
														{x: this.velocity.x, y: this.velocity.y}, 3, 2, game);
	}

	function Bullet(position, direction, speed, radius, game) {
		MovingObject.apply(this, arguments);
		this.direction = direction;
		this.speed = speed;
		this.radius = radius;
		game.bullets.push(this);
	}

	Bullet.prototype = new MovingObject({x: 0, y: 0});

	Bullet.prototype.draw = function (context) {
		context.beginPath();
		context.fillStyle = "red";
		context.arc(this.x, this.y, this.radius ,0, 2 * Math.PI);
		context.fill();
	};

	Bullet.prototype.update = function () {
		var x = this.direction.x;
		var y = this.direction.y;
		while(x === 0 && y === 0) {
			this.direction.y = Math.floor(Math.random() * (2 + 1) - 1);
			this.direction.x = Math.floor(Math.random() * (2 + 1) - 1);
			x = this.direction.x;
			y = this.direction.y;
		}
		this.x += x * this.speed;
		this.y += y * this.speed;
	}

	MovingObject.prototype.update = function(velocity){
		this.x += velocity.x;
		this.y += velocity.y;
	};

	MovingObject.prototype.offScreen = function () {
		return this.x > canvasMaxX || this.y > canvasMaxY || this.x < 0 || this.y < 0;
	};

	var canvasMaxX, canvasMaxY;
	function Game(context){
		this.context = context;
		this.asteroids = [];
		this.bullets = [];

		console.log(context.canvas.width);
		canvasMaxX = context.canvas.width;
		canvasMaxY = context.canvas.height;

		this.ship = new Ship({x: (canvasMaxX / 2), y: (canvasMaxY / 2)}, 50, 50);
		for(var i = 0; i < 10; i++) {
			this.asteroids.push(Asteroid.randomAsteroid());
		}
	}

	Game.prototype.draw = function () {
		this.ship.draw(this.context);

		for(var i = 0; i < this.asteroids.length; i ++) {
			this.asteroids[i].draw(this.context);
		}

		for(var i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].draw(this.context);
		}
	}

	Game.prototype.update = function() {
		console.log(canvasMaxX);
		for(var i = 0; i < this.asteroids.length; i++) {
			if(this.asteroids[i].offScreen()){
				this.asteroids[i].wrap();
			} else if (this.asteroids[i].isHit(this.bullets)){
				var ast = this.asteroids[i];
				console.log(ast);
				if(ast.radius > 10) {
					this.asteroids.push(new Asteroid({x: ast.x, y: ast.y}, ast.radius/2,
						{x: randomBetween(-10, 10), y: randomBetween(-10,10)}));
					this.asteroids.push(new Asteroid({x: ast.x, y: ast.y}, ast.radius/2,
						{x: randomBetween(-10, 10), y: randomBetween(-10,10)}));
				}

				this.asteroids.splice(i, 1);
			} else {
				this.asteroids[i].update();
			}
		}

		for(var i = 0; i < this.bullets.length; i++) {
			if(this.bullets[i].offScreen()){
				this.bullets.splice(i, 1);
			}else {
				this.bullets[i].update();
			}
		}

		this.ship.update();
	}

	Game.prototype.start = function () {
		var that = this;
		var timer = setInterval(function () {
			that.context.clearRect(0, 0, canvasMaxX, canvasMaxY);
			that.update();
			if(that.ship.offScreen()){
				that.ship.wrap();
			}
			if(that.ship.isHit(that.asteroids)){
				alert("BOOM!");
				clearInterval(timer);
			}
			that.draw();
		}, 100);
	};

	return {
		Game: Game
	}
})();

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}


$(document).ready(function(){
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext("2d");

	canvas.width = $(window).width();
	canvas.height = $(window).height();

	$(window).resize(function () {
		canvas.width = $(window).width();
		canvas.height = $(window).height();
		console.log("resizing" + canvas);
	});

	console.log(canvas);

	var g = new Asteroids.Game(context);
	key('left', function () {
		g.ship.power(-1, 0);
	});
	key('right', function () {
		g.ship.power(1, 0);
	});
	key('up', function () {
		g.ship.power(0, -1);
	});
	key('down', function () {
		g.ship.power(0, 1);
	});
	key('space', function () {
		g.ship.fireBullet(g);
	});

	g.start();
});
