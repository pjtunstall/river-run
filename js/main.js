import { Game } from "./Game.js";
import { Physics } from "./Physics.js";
import { Tiles } from "./Tiles.js";
import { createEventHandlers } from "./eventHandlers.js";
import { Milestone } from "./Milestone.js";

const viewPortHeight = window.innerHeight;
const numberOfTiles = 3;
const tiles = new Tiles(numberOfTiles, viewPortHeight);
// const milestone = new Milestone(0.25, 0, "Test marker");

const physics = new Physics();
const game = new Game(tiles, physics);
const handlers = createEventHandlers(physics);

document.addEventListener("keydown", handlers.handleKeyDown);
document.addEventListener("keyup", handlers.handleKeyUp);
window.addEventListener("resize", handlers.handleResize);

requestAnimationFrame(game.update);
