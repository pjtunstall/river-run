export class Game {
  constructor(tiles, physics, milestone) {
    this.tiles = tiles;
    this.physics = physics;
    this.lastTimestamp = 0;
    this.milestone = milestone;
  }

  update = (timestamp) => {
    requestAnimationFrame(this.update);

    if (timestamp - this.lastTimestamp < 16) return;
    this.lastTimestamp = timestamp;

    const velocity = this.physics.updateVelocity();
    this.tiles.updatePosition(velocity);
    this.milestone.updatePosition(this.tiles);
  };
}
