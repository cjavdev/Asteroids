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
    this.color = "grey";

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

  Asteroid.prototype.update = function () {
    MovingObject.prototype.update.call(this, this.direction);
  };

  Asteroid.prototype.isHit = function (bullets) {
    var i;

    for (i = 0; i < bullets.length; i++) {
      if(this.colidedWith(bullets[i])) {
        return true;
      }
    }

    return false;
  };
}());
