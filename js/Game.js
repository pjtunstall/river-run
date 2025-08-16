export class Game {
  constructor(tiles, physics) {
    this.tiles = tiles;
    this.physics = physics;
    this.lastTimestamp = 0;
  }

  update = (timestamp) => {
    requestAnimationFrame(this.update);

    if (timestamp - this.lastTimestamp < 16) return;
    this.lastTimestamp = timestamp;

    const velocity = this.physics.updateVelocity();
    this.tiles.updatePosition(velocity);
  };
}
