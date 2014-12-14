/*globals window, AG */
'use strict';

(function () {
  if (window.AG === undefined) {
    window.AG = {};
  }

  var MovingObject = AG.MovingObject;

  var Bullet = AG.Bullet = function (position, direction, speed, radius, game) {
    this.direction = direction;
    this.speed = speed;
    this.radius = radius;
    this.color = "red";

    game.bullets.push(this);
    MovingObject.apply(this, arguments);
  };

  Bullet.inherits(MovingObject);

  Bullet.prototype.update = function () {
    var x = this.direction.x;
    var y = this.direction.y;

    while (x === 0 && y === 0) {
      this.direction.y = Math.floor(Math.random() * (2 + 1) - 1);
      this.direction.x = Math.floor(Math.random() * (2 + 1) - 1);
      x = this.direction.x;
      y = this.direction.y;
    }

    this.x += x * this.speed;
    this.y += y * this.speed;
  };
}());
