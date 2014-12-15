/*globals window, AG */
'use strict';

(function () {
  if (window.AG === undefined) {
    window.AG = {};
  }

  class Bullet extends AG.MovingObject {
    constructor(position, direction, speed, radius, game) {
      this.direction = direction;
      this.speed = speed;
      this.radius = radius;
      this.color = 'red';

      game.bullets.push(this);
      super(position);
    }

    update() {
      var [x, y] = [this.direction.x, this.direction.y];

      while (x === 0 && y === 0) {
        this.direction.y = Math.floor(Math.random() * (2 + 1) - 1);
        this.direction.x = Math.floor(Math.random() * (2 + 1) - 1);
        [x, y] = [this.direction.x, this.direction.y];
      }

      this.x += x * this.speed;
      this.y += y * this.speed;
    }
  }

  AG.Bullet = Bullet;
}());
