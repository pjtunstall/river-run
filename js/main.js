import { Game } from "./Game.js";
import { Physics } from "./Physics.js";
import { Tiles } from "./Tiles.js";
import { createEventHandlers } from "./eventHandlers.js";
import { Milestones } from "./Milestones.js";

const numberOfTiles = 3;
const tiles = new Tiles(numberOfTiles);
const physics = new Physics();
const milestones = new Milestones(numberOfTiles);
const game = new Game(tiles, physics, milestones);

const helpModal = document.getElementById("help-modal");
const infoModal = document.getElementById("info-modal");
const handlers = createEventHandlers(physics, helpModal, infoModal, game);

document.addEventListener("keydown", handlers.handleKeyDown);
document.addEventListener("keyup", handlers.handleKeyUp);
window.addEventListener("resize", handlers.handleResize);
window.addEventListener("touchstart", handlers.closeModals, { passive: true });
window.addEventListener("wheel", handlers.closeModals, { passive: true });
window.addEventListener("click", handlers.closeModals, { passive: true });

requestAnimationFrame(game.update);
