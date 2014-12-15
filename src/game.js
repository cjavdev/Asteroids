/*globals window, AG */

(function () {
  if (window.AG === undefined) {
    window.AG = {};
  }

  class Game {
    constructor(context) {
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
    }

    draw() {
      this.ship.draw(this.context);

      for(var asteroid of this.asteroids) {
        asteroid.draw(this.context);
      }
      for(var bullet of this.bullets) {
        bullet.draw(this.context);
      }
    }

    update() {
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
    }

    start() {
      var timer = setInterval(() => {
        this.context.clearRect(0, 0, AG.canvasMaxX, AG.canvasMaxY);
        this.update();
        this.ship.wrapIfOffScreen();

        if (this.ship.isHit(this.asteroids)) {
          alert("BOOM!");
          clearInterval(timer);
        }

        this.draw();
      }, 100);
    }
  }

  AG.Game = Game;
}());
