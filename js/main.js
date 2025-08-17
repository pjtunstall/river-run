import { Game } from "./Game.js";
import { Physics } from "./Physics.js";
import { Tiles } from "./Tiles.js";
import { createEventHandlers } from "./eventHandlers.js";
import { createMilestones } from "./milestones.js";

const numberOfTiles = 3;
const tiles = new Tiles(numberOfTiles);
const physics = new Physics();
const milestones = createMilestones();
const game = new Game(tiles, physics);
game.setMilestones(milestones);

const helpModal = document.getElementById("help-modal");
const handlers = createEventHandlers(physics, helpModal);

document.addEventListener("keydown", handlers.handleKeyDown);
document.addEventListener("keyup", handlers.handleKeyUp);
window.addEventListener("resize", handlers.handleResize);
window.addEventListener("touchstart", handlers.closeModals, { passive: true });
window.addEventListener("wheel", handlers.closeModals, { passive: true });
window.addEventListener("click", handlers.closeModals, { passive: true });

requestAnimationFrame(game.update);
