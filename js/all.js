"use strict";
'use strict';
var randomBetween = function(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

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
      for (var $__1 = bullets[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__2; !($__2 = $__1.next()).done; ) {
        var bullet = $__2.value;
        {
          if (this.colidedWith(bullet)) {
            return true;
          }
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
      x: randomBetween(-10, 10),
      y: randomBetween(-10, 10)
    };
    return new Asteroid(position, randomBetween(5, 25), direction);
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
      var distance,
          xSquared,
          ySquared;
      for (var $__1 = asteroids[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__2; !($__2 = $__1.next()).done; ) {
        var asteroid = $__2.value;
        {
          xSquared = Math.pow((asteroid.x - this.center().x), 2);
          ySquared = Math.pow((asteroid.y - this.center().y), 2);
          distance = Math.sqrt(xSquared + ySquared);
          if (distance < (asteroid.radius + this.height / 2)) {
            return true;
          }
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
    },
    wrapIfOffScreen: function() {
      if (this.offScreen()) {
        this.wrap();
      }
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
      var $__2;
      var $__1 = [this.direction.x, this.direction.y],
          x = $__1[0],
          y = $__1[1];
      while (x === 0 && y === 0) {
        this.direction.y = Math.floor(Math.random() * (2 + 1) - 1);
        this.direction.x = Math.floor(Math.random() * (2 + 1) - 1);
        ($__2 = [this.direction.x, this.direction.y], x = $__2[0], y = $__2[1], $__2);
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
      for (var $__2 = this.asteroids[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__3; !($__3 = $__2.next()).done; ) {
        var asteroid = $__3.value;
        {
          asteroid.draw(this.context);
        }
      }
      for (var $__4 = this.bullets[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__5; !($__5 = $__4.next()).done; ) {
        var bullet = $__5.value;
        {
          bullet.draw(this.context);
        }
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
              x: randomBetween(-10, 10),
              y: randomBetween(-10, 10)
            }));
            this.asteroids.push(new AG.Asteroid({
              x: ast.x,
              y: ast.y
            }, ast.radius / 2, {
              x: randomBetween(-10, 10),
              y: randomBetween(-10, 10)
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
      var $__0 = this;
      var timer = setInterval((function() {
        $__0.context.clearRect(0, 0, AG.canvasMaxX, AG.canvasMaxY);
        $__0.update();
        $__0.ship.wrapIfOffScreen();
        if ($__0.ship.isHit($__0.asteroids)) {
          alert("BOOM!");
          clearInterval(timer);
        }
        $__0.draw();
      }), 100);
    }
  }, {});
  AG.Game = Game;
}());

//# sourceMappingURL=all.js.map