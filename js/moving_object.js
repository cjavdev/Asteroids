/*global AG, window */
'use strict';

(function () {
  if(window.AG === undefined) {
    window.AG = {};
  }

  var MovingObject = AG.MovingObject = function (position) {
    this.x = position.x;
    this.y = position.y;
  };

  MovingObject.prototype.wrap = function () {
    if (this.x > AG.canvasMaxX) {
      this.x = 0;
    } else if (this.y > AG.canvasMaxY) {
      this.y = 0;
    } else if (this.x < 1) {
      this.x = AG.canvasMaxX;
    } else if (this.y < 1) {
      this.y = AG.canvasMaxY;
    }
  };

  MovingObject.prototype.update = function (velocity) {
    this.x += velocity.x;
    this.y += velocity.y;
  };

  MovingObject.prototype.offScreen = function () {
    return this.x > AG.canvasMaxX || this.y > AG.canvasMaxY || this.x < 0 || this.y < 0;
  };
}());
