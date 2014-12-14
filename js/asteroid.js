/*globals window, AG */
'use strict';

(function () {
  if (window.AG === undefined) {
    window.AG = {};
  }

  var MovingObject = AG.MovingObject;
  var Asteroid = AG.Asteroid = function (position, radius, direction) {
    this.radius = radius;
    this.direction = direction;

    MovingObject.apply(this, arguments);
  };

  Asteroid.inherits(MovingObject);

  Asteroid.randomAsteroid = function () {
    var position = {
      x: Math.floor(Math.random() * AG.canvasMaxX + 1),
      y: Math.floor(Math.random() * AG.canvasMaxX + 1),
    };
    var direction = {
      x: AG.Util.randomBetween(-10, 10),
      y: AG.Util.randomBetween(-10, 10)
    };
    return new Asteroid(position, AG.Util.randomBetween(5, 25), direction);
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "grey";
    ctx.fill();
  };

  Asteroid.prototype.update = function () {
    this.x += this.direction.x;
    this.y += this.direction.y;
  };

  Asteroid.prototype.isHit = function (bullets) {
    var i, distance, xSquared, ySquared;

    for (i = 1; i < bullets.length; i++) {
      xSquared = Math.pow((bullets[i].x - this.x), 2);
      ySquared = Math.pow((bullets[i].y - this.y), 2);
      distance = Math.sqrt(xSquared + ySquared);
      if (distance < (bullets[i].radius + this.radius)) {
        return true;
      }
    }

    return false;
  };
}());
