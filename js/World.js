export class World {
  lastTimestamp;
  milestones;
  physics;
  tiles;

  constructor(tiles, physics, milestones) {
    this.tiles = tiles;
    this.physics = physics;
    this.milestones = milestones;
    this.lastTimestamp = 0;
  }

  update = (timestamp) => {
    requestAnimationFrame(this.update);

    if (timestamp - this.lastTimestamp < 16) return;
    this.lastTimestamp = timestamp;

    const velocity = this.physics.updateVelocity();
    this.tiles.updatePosition(velocity);
    this.milestones.updatePosition(this.tiles);
  };
}
