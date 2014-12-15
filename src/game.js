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

      for (var asteroid of this.asteroids) {
        asteroid.draw(this.context);
      }
      for (var bullet of this.bullets) {
        bullet.draw(this.context);
      }
    }

    trySplitAsteroid(asteroid) {
      if (asteroid.radius > 10) {
        this.asteroids.push(new AG.Asteroid({
          x: asteroid.x,
          y: asteroid.y
        }, asteroid.radius / 2, {
          x: randomBetween(-10, 10),
          y: randomBetween(-10, 10)
        }));
        this.asteroids.push(new AG.Asteroid({
          x: asteroid.x,
          y: asteroid.y
        }, asteroid.radius / 2, {
          x: randomBetween(-10, 10),
          y: randomBetween(-10, 10)
        }));
      }
    }

    update() {
      for (var asteroid of this.asteroids) {
        asteroid.wrapIfOffScreen();
        asteroid.update();

        if (asteroid.isHit(this.bullets)) {
          console.log('direct hit!');
          this.trySplitAsteroid(asteroid);
          this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
        }
      }

      for (var bullet of this.bullets) {
        bullet.update();
        if (bullet.offScreen()) {
          this.bullets.splice(this.bullets.indexOf(bullet), 1);
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
