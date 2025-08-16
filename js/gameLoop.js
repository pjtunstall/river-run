import { Physics } from "./Physics.js";
import { Tiles } from "./Tiles.js";

const tiles = new Tiles(3);
let lastTimestamp = 0;

export const physics = new Physics();

export function gameLoop(timestamp) {
  requestAnimationFrame(gameLoop);

  if (timestamp - lastTimestamp < 16) return;
  lastTimestamp = timestamp;

  const velocity = physics.updateVelocity();
  tiles.reposition(velocity);
}
