/*globals window, AG */
'use strict';

(function () {
  if (window.AG === undefined) {
    window.AG = {};
  }

  class Asteroid extends AG.MovingObject {
    constructor(position, radius, direction) {
      this.radius = radius;
      this.direction = direction;
      this.color = 'grey';

      super(position);
    }

    update () {
      super.update(this.direction);
    }

    isHit(bullets) {
      for(var bullet of bullets) {
        if(this.colidedWith(bullet)) {
          return true;
        }
      }
      return false;
    }
  }

  Asteroid.randomAsteroid = function () {
    var position = {
      x: Math.floor(Math.random() * AG.canvasMaxX + 1),
      y: Math.floor(Math.random() * AG.canvasMaxX + 1),
    };
    var direction = {
      x: randomBetween(-10, 10),
      y: randomBetween(-10, 10)
    };
    return new Asteroid(position, randomBetween(5, 25), direction);
  };

  AG.Asteroid = Asteroid;
}());
