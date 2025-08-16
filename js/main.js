import { Game } from "./Game.js";
import { Physics } from "./Physics.js";
import { Tiles } from "./Tiles.js";
import { createEventHandlers } from "./eventHandlers.js";

const tiles = new Tiles(3);
const physics = new Physics();
const game = new Game(tiles, physics);
const handlers = createEventHandlers(physics);

document.addEventListener("keydown", handlers.handleKeyDown);
document.addEventListener("keyup", handlers.handleKeyUp);
window.addEventListener("resize", handlers.handleResize);

requestAnimationFrame(game.update);
