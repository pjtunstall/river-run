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

window.addEventListener("resize", handlers.handleResize);
window.addEventListener("click", handlers.handleClick);
window.addEventListener("touchstart", handlers.handleTouchStart, {
  passive: true,
});
window.addEventListener("touchend", handlers.handleTouchEnd, { passive: true });
window.addEventListener("wheel", handlers.handleScroll, { passive: true });
document.addEventListener("keydown", handlers.handleKeyDown);
document.addEventListener("keyup", handlers.handleKeyUp);
document.querySelectorAll(".repo-link").forEach((link) => {
  link.addEventListener("click", handlers.handleRepoClick);
});
document.querySelectorAll(".close-button").forEach((button) => {
  button.addEventListener("click", handlers.closeModals);
});
milestones.forEach((milestone) => {
  milestone.element.addEventListener("click", handlers.handleMilestoneClick);
});

const leftArrow = document.getElementById("mobileNavLeft");
const rightArrow = document.getElementById("mobileNavRight");

if (leftArrow) {
  leftArrow.addEventListener("click", handlers.handleMobileNavLeft);
}
if (rightArrow) {
  rightArrow.addEventListener("click", handlers.handleMobileNavRight);
}

requestAnimationFrame(world.update);
