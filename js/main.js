import { Game } from "./Game.js";
import { Physics } from "./Physics.js";
import { Tiles } from "./Tiles.js";
import { createEventHandlers } from "./eventHandlers.js";
import { Milestone } from "./Milestone.js";

const viewPortHeight = window.innerHeight;
const numberOfTiles = 3;
const tiles = new Tiles(numberOfTiles, viewPortHeight);
const milestone = new Milestone(
  viewPortHeight,
  viewPortHeight * numberOfTiles,
  1, // Place on tile 1.
  -50, // 50px left of tile center.
  0, // Same vertical position as tile center.
  "Checkpoint 1"
);

const physics = new Physics();
const game = new Game(tiles, physics, milestone);
const handlers = createEventHandlers(physics);

document.addEventListener("keydown", handlers.handleKeyDown);
document.addEventListener("keyup", handlers.handleKeyUp);
window.addEventListener("resize", handlers.handleResize);

requestAnimationFrame(game.update);
