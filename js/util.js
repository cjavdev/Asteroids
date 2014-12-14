/*global AG, window */
'use strict';

(function () {
  if (window.AG === undefined) {
    window.AG = {};
  }

  if (window.AG.Util === undefined) {
    AG.Util = {};
  }

  AG.Util.randomBetween = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };
}());
