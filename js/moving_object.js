(function () {
	function MovingObject(position){
		this.x = position.x;
		this.y = position.y;
	}

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

	MovingObject.prototype.update = function(velocity){
		this.x += velocity.x;
		this.y += velocity.y;
	};

	MovingObject.prototype.offScreen = function () {
		return this.x > canvasMaxX || this.y > canvasMaxY || this.x < 0 || this.y < 0;
	};
}());
