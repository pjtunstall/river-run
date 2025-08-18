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
const leftModal = document.getElementById("projects-modal");
const rightModal = document.getElementById("profile-modal");
const handlers = createEventHandlers({
  physics,
  helpModal,
  leftModal,
  rightModal,
  world,
});

document.addEventListener("keydown", handlers.handleKeyDown);
document.addEventListener("keyup", handlers.handleKeyUp);
window.addEventListener("resize", handlers.handleResize);
window.addEventListener("click", handlers.handleClick);
window.addEventListener("touchstart", handlers.handleScroll, { passive: true });
window.addEventListener("wheel", handlers.handleScroll, { passive: true });

document.querySelectorAll(".repo-link").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    const url = el.dataset.repo;
    window.open(url, "_blank", "noopener");
  });
});

requestAnimationFrame(world.update);
