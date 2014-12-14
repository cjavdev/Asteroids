(function () {
	function Ship(position, height, width){
		this.height = height;
		this.width = width;
		this.velocity = {x: 0, y: 0};

		this.image = new Image();
		this.image.src = "./spaceship.png";
		MovingObject.apply(this, arguments);
	}

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
}());
