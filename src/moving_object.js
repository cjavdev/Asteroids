/*global AG, window */
'use strict';

(function () {
  if(window.AG === undefined) {
    window.AG = {};
  }

  var MovingObject = AG.MovingObject = function (position) {
    this.x = position.x;
    this.y = position.y;
  };

  MovingObject.prototype.wrap = function () {
    if (this.x > AG.canvasMaxX) {
      this.x = 0;
    } else if (this.y > AG.canvasMaxY) {
      this.y = 0;
    } else if (this.x < 1) {
      this.x = AG.canvasMaxX;
    } else if (this.y < 1) {
      this.y = AG.canvasMaxY;
    }
  };

  MovingObject.prototype.update = function (velocity) {
    this.x += velocity.x;
    this.y += velocity.y;
  };

  MovingObject.prototype.offScreen = function () {
    return this.x > AG.canvasMaxX || this.y > AG.canvasMaxY || this.x < 0 || this.y < 0;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  MovingObject.prototype.colidedWith = function(other) {
    var distance, xSquared, ySquared;

    xSquared = Math.pow((other.x - this.x), 2);
    ySquared = Math.pow((other.y - this.y), 2);
    distance = Math.sqrt(xSquared + ySquared);
    if (distance < (other.radius + this.radius)) {
      return true;
    }

    return false;
  };
}());
