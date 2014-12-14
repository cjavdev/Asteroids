/*globals window, AG */

(function () {
  if (window.AG === undefined) {
    window.AG = {};
  }

  var Game = AG.Game = function (context) {
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

  Game.prototype.draw = function () {
    this.ship.draw(this.context);

    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.context);
    }

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(this.context);
    }
  }

  Game.prototype.update = function () {
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
  }

  Game.prototype.start = function () {
    var that = this;
    var timer = setInterval(function () {
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
  };
}());
