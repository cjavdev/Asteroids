/*globals window, AG, Image */

(function () {
  if (window.AG === undefined) {
    window.AG = {};
  }

  var MovingObject = AG.MovingObject;

  var Ship = AG.Ship = function (position, height, width, imgPath) {
    this.height = height;
    this.width = width;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.installImage(imgPath);

    MovingObject.apply(this, arguments);
  };

  Ship.inherits(MovingObject);

  Ship.prototype.installImage = function (path) {
    this.image = new Image();
    if(path === undefined) {
      this.image.src = "img/spaceship.png";
    } else {
      this.image.src = path;
    }
  };

  Ship.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.drawImage(this.image, this.x, this.y, this.height, this.width);
  };

  Ship.prototype.isHit = function (asteroids) {
    var i, distance, xSquared, ySquared;
    for (i = 0; i < asteroids.length; i++) {
      xSquared = Math.pow((asteroids[i].x - this.center().x), 2);
      ySquared = Math.pow((asteroids[i].y - this.center().y), 2);
      distance = Math.sqrt(xSquared + ySquared);
      if (distance < (asteroids[i].radius + this.height / 2)) {
        return true;
      }
    }
    return false;
  };

  Ship.prototype.center = function () {
    return {
      x: (this.x + this.height / 2),
      y: (this.y + this.width / 2)
    };
  };

  Ship.prototype.update = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.velocity.x !== 0) {
      this.velocity.x < 0 ? this.velocity.x++ : this.velocity.x--;
    }
    if (this.velocity.y !== 0) {
      this.velocity.y < 0 ? this.velocity.y++ : this.velocity.y--;
    }
  };

  Ship.prototype.power = function (dx, dy) {
    if (this.velocity.x + dx >= -10 && this.velocity.x + dx <= 10) {
      this.velocity.x += dx;
    }
    if (this.velocity.y + dy >= -10 && this.velocity.y + dy <= 10) {
      this.velocity.y += dy;
    }
  };

  Ship.prototype.fireBullet = function (game) {
    var bullet = new AG.Bullet({
      x: this.center().x,
      y: this.center().y
    }, {
      x: this.velocity.x,
      y: this.velocity.y
    }, 3, 2, game);
  };
}());
