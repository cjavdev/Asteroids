class MovingObject {
  constructor(position) {
    this.x = position.x;
    this.y = position.y;
  }

  wrap() {
    if (this.x > AG.canvasMaxX) {
      this.x = 0;
    } else if (this.y > AG.canvasMaxY) {
      this.y = 0;
    } else if (this.x < 1) {
      this.x = AG.canvasMaxX;
    } else if (this.y < 1) {
      this.y = AG.canvasMaxY;
    }
  }

  wrapIfOffScreen() {
    if(this.offScreen()) {
      this.wrap();
    }
  }

  update(velocity) {
    this.x += velocity.x;
    this.y += velocity.y;
  }

  offScreen() {
    return this.x > AG.canvasMaxX || this.y > AG.canvasMaxY || this.x < 0 || this.y < 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  colidedWith(other) {
    var distance, xSquared, ySquared;
    xSquared = Math.pow((other.x - this.x), 2);
    ySquared = Math.pow((other.y - this.y), 2);
    distance = Math.sqrt(xSquared + ySquared);
    if (distance < (other.radius + this.radius)) {
      return true;
    }
    return false;
  }
}
