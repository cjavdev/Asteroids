(function () {
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

}());
