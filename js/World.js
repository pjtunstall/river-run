export class World {
  isDragging = false;
  lastTimestamp = 0;
  milestones;
  physics;
  tiles;

  constructor(tiles, physics, milestones) {
    this.tiles = tiles;
    this.physics = physics;
    this.milestones = milestones;
  }

  update = (timestamp) => {
    requestAnimationFrame(this.update);
    if (this.isDragging || timestamp - this.lastTimestamp < 16) return;
    this.lastTimestamp = timestamp;

    const velocity = this.physics.updateVelocity();
    this.tiles.updatePosition(velocity);
    this.milestones.updatePosition(this.tiles);
  };

  // For scrolling while still touching screen.
  changePositionBy = (delta) => {
    requestAnimationFrame(() => {
      this.tiles.updatePosition(delta);
      this.milestones.updatePosition(this.tiles);
    });
  };
}
