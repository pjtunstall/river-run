import { World } from "./World.js";
import { Physics } from "./Physics.js";
import { Tiles } from "./Tiles.js";
import { createEventHandlers } from "./eventHandlers.js";
import { Milestones } from "./Milestones.js";

const numberOfTiles = 3;
const tiles = new Tiles(numberOfTiles);
const physics = new Physics();
const milestones = new Milestones(numberOfTiles);
milestones.initializeXPositions(tiles);
const world = new World(tiles, physics, milestones);

const helpModal = document.getElementById("help-modal");
const infoModal = document.getElementById("info-modal");
const handlers = createEventHandlers(physics, helpModal, infoModal, world);

document.addEventListener("keydown", handlers.handleKeyDown);
document.addEventListener("keyup", handlers.handleKeyUp);
window.addEventListener("resize", handlers.handleResize);
window.addEventListener("click", handlers.closeModals, { passive: true });
window.addEventListener("touchstart", handlers.handleScroll, { passive: true });
window.addEventListener("wheel", handlers.handleScroll, { passive: true });

requestAnimationFrame(world.update);
