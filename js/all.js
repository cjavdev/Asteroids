"use strict";
'use strict';
(function() {
  if (window.AG === undefined) {
    window.AG = {};
  }
  if (window.AG.Util === undefined) {
    AG.Util = {
      canvasMaxX: 500,
      canvasMaxY: 500
    };
  }
  AG.Util.randomBetween = function(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };
}());

"use strict";
'use strict';
(function() {
  if (window.AG === undefined) {
    window.AG = {};
  }
  var MovingObject = function MovingObject(position) {
    this.x = position.x;
    this.y = position.y;
  };
  ($traceurRuntime.createClass)(MovingObject, {
    wrap: function() {
      if (this.x > AG.canvasMaxX) {
        this.x = 0;
      } else if (this.y > AG.canvasMaxY) {
        this.y = 0;
      } else if (this.x < 1) {
        this.x = AG.canvasMaxX;
      } else if (this.y < 1) {
        this.y = AG.canvasMaxY;
      }
    },
    update: function(velocity) {
      this.x += velocity.x;
      this.y += velocity.y;
    },
    offScreen: function() {
      return this.x > AG.canvasMaxX || this.y > AG.canvasMaxY || this.x < 0 || this.y < 0;
    },
    draw: function(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    },
    colidedWith: function(other) {
      var distance,
          xSquared,
          ySquared;
      xSquared = Math.pow((other.x - this.x), 2);
      ySquared = Math.pow((other.y - this.y), 2);
      distance = Math.sqrt(xSquared + ySquared);
      if (distance < (other.radius + this.radius)) {
        return true;
      }
      return false;
    }
  }, {});
  AG.MovingObject = MovingObject;
}());

"use strict";
'use strict';
(function() {
  if (window.AG === undefined) {
    window.AG = {};
  }
  var Asteroid = function Asteroid(position, radius, direction) {
    this.radius = radius;
    this.direction = direction;
    this.color = 'grey';
    $traceurRuntime.superConstructor($Asteroid).call(this, position);
  };
  var $Asteroid = Asteroid;
  ($traceurRuntime.createClass)(Asteroid, {
    update: function() {
      $traceurRuntime.superGet(this, $Asteroid.prototype, "update").call(this, this.direction);
    },
    isHit: function(bullets) {
      var i;
      for (i = 0; i < bullets.length; i++) {
        if (this.colidedWith(bullets[i])) {
          return true;
        }
      }
      return false;
    }
  }, {}, AG.MovingObject);
  Asteroid.randomAsteroid = function() {
    var position = {
      x: Math.floor(Math.random() * AG.canvasMaxX + 1),
      y: Math.floor(Math.random() * AG.canvasMaxX + 1)
    };
    var direction = {
      x: AG.Util.randomBetween(-10, 10),
      y: AG.Util.randomBetween(-10, 10)
    };
    return new Asteroid(position, AG.Util.randomBetween(5, 25), direction);
  };
  AG.Asteroid = Asteroid;
}());

"use strict";
(function() {
  if (window.AG === undefined) {
    window.AG = {};
  }
  var Ship = function Ship(position, height, width, imgPath) {
    this.height = height;
    this.width = width;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.installImage(imgPath);
    $traceurRuntime.superConstructor($Ship).call(this, position);
  };
  var $Ship = Ship;
  ($traceurRuntime.createClass)(Ship, {
    center: function() {
      return {
        x: (this.x + this.height / 2),
        y: (this.y + this.width / 2)
      };
    },
    draw: function(ctx) {
      ctx.beginPath();
      ctx.drawImage(this.image, this.x, this.y, this.height, this.width);
    },
    installImage: function(path) {
      this.image = new Image();
      if (path === undefined) {
        this.image.src = "img/spaceship.png";
      } else {
        this.image.src = path;
      }
    },
    isHit: function(asteroids) {
      var i,
          distance,
          xSquared,
          ySquared;
      for (i = 0; i < asteroids.length; i++) {
        xSquared = Math.pow((asteroids[i].x - this.center().x), 2);
        ySquared = Math.pow((asteroids[i].y - this.center().y), 2);
        distance = Math.sqrt(xSquared + ySquared);
        if (distance < (asteroids[i].radius + this.height / 2)) {
          return true;
        }
      }
      return false;
    },
    update: function() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      if (this.velocity.x !== 0) {
        this.velocity.x < 0 ? this.velocity.x++ : this.velocity.x--;
      }
      if (this.velocity.y !== 0) {
        this.velocity.y < 0 ? this.velocity.y++ : this.velocity.y--;
      }
    },
    power: function(dx, dy) {
      if (this.velocity.x + dx >= -10 && this.velocity.x + dx <= 10) {
        this.velocity.x += dx;
      }
      if (this.velocity.y + dy >= -10 && this.velocity.y + dy <= 10) {
        this.velocity.y += dy;
      }
    },
    fireBullet: function(game) {
      var bullet = new AG.Bullet({
        x: this.center().x,
        y: this.center().y
      }, {
        x: this.velocity.x,
        y: this.velocity.y
      }, 3, 2, game);
    }
  }, {}, AG.MovingObject);
  AG.Ship = Ship;
}());

"use strict";
'use strict';
(function() {
  if (window.AG === undefined) {
    window.AG = {};
  }
  var Bullet = function Bullet(position, direction, speed, radius, game) {
    this.direction = direction;
    this.speed = speed;
    this.radius = radius;
    this.color = 'red';
    game.bullets.push(this);
    $traceurRuntime.superConstructor($Bullet).call(this, position);
  };
  var $Bullet = Bullet;
  ($traceurRuntime.createClass)(Bullet, {update: function() {
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
    }}, {}, AG.MovingObject);
  AG.Bullet = Bullet;
}());

"use strict";
(function() {
  if (window.AG === undefined) {
    window.AG = {};
  }
  var Game = function Game(context) {
    this.context = context;
    this.asteroids = [];
    this.bullets = [];
    AG.canvasMaxX = context.canvas.width;
    AG.canvasMaxY = context.canvas.height;
    this.ship = new AG.Ship({
      x: (AG.canvasMaxX / 2),
      y: (AG.canvasMaxY / 2)
    }, 50, 50);
    for (var i = 0; i < 10; i++) {
      this.asteroids.push(AG.Asteroid.randomAsteroid());
    }
  };
  ($traceurRuntime.createClass)(Game, {
    draw: function() {
      this.ship.draw(this.context);
      for (var i = 0; i < this.asteroids.length; i++) {
        this.asteroids[i].draw(this.context);
      }
      for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].draw(this.context);
      }
    },
    update: function() {
      for (var i = 0; i < this.asteroids.length; i++) {
        if (this.asteroids[i].offScreen()) {
          this.asteroids[i].wrap();
        } else if (this.asteroids[i].isHit(this.bullets)) {
          var ast = this.asteroids[i];
          console.log(ast);
          if (ast.radius > 10) {
            this.asteroids.push(new AG.Asteroid({
              x: ast.x,
              y: ast.y
            }, ast.radius / 2, {
              x: AG.Util.randomBetween(-10, 10),
              y: AG.Util.randomBetween(-10, 10)
            }));
            this.asteroids.push(new AG.Asteroid({
              x: ast.x,
              y: ast.y
            }, ast.radius / 2, {
              x: AG.Util.randomBetween(-10, 10),
              y: AG.Util.randomBetween(-10, 10)
            }));
          }
          this.asteroids.splice(i, 1);
        } else {
          this.asteroids[i].update();
        }
      }
      for (var i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i].offScreen()) {
          this.bullets.splice(i, 1);
        } else {
          this.bullets[i].update();
        }
      }
      this.ship.update();
    },
    start: function() {
      var that = this;
      var timer = setInterval(function() {
        that.context.clearRect(0, 0, AG.canvasMaxX, AG.canvasMaxY);
        that.update();
        if (that.ship.offScreen()) {
          that.ship.wrap();
        }
        if (that.ship.isHit(that.asteroids)) {
          alert("BOOM!");
          clearInterval(timer);
        }
        that.draw();
      }, 100);
    }
  }, {});
  AG.Game = Game;
}());

//# sourceMappingURL=all.js.map