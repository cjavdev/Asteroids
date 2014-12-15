$(function () {
  var canvas = document.getElementById('space'),
    context = canvas.getContext('2d'),
    game = new Game(context);

  key('left', function () {
    game.ship.power(-1, 0);
  });
  key('right', function () {
    game.ship.power(1, 0);
  });
  key('up', function () {
    game.ship.power(0, -1);
  });
  key('down', function () {
    game.ship.power(0, 1);
  });
  key('space', function () {
    game.ship.fireBullet(game);
  });

  game.start();
});
