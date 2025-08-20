import { World } from "./World.js";
import { Physics } from "./Physics.js";
import { Tiles } from "./Tiles.js";
import { createEventHandlers } from "./createEventHandlers.js";
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
const riverRunLink = document.getElementById("river-run-link");
const compass = document.querySelector(".compass");

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
  passive: false,
});
window.addEventListener("touchmove", handlers.handleTouchMove, {
  passive: false,
});
window.addEventListener("touchend", handlers.handleTouchEnd);

window.addEventListener("wheel", handlers.handleScroll);
document.addEventListener("keydown", handlers.handleKeyDown);
document.addEventListener("keyup", handlers.handleKeyUp);
document.querySelectorAll(".repo-link").forEach((link) => {
  link.addEventListener("click", handlers.handleRepoClick);
});
document.querySelectorAll(".close-button").forEach((button) => {
  button.addEventListener("click", handlers.handleClickToClose);
});
milestones.forEach((milestone) => {
  milestone.element.addEventListener("click", handlers.handleMilestoneClick);
});
riverRunLink.addEventListener("click", handlers.handleRiverRunLinkClick);

const leftArrow = document.getElementById("nav-left");
const rightArrow = document.getElementById("nav-right");
compass.addEventListener("click", handlers.handleCompassClick);

if (leftArrow) {
  leftArrow.addEventListener("click", handlers.handleNavLeft);
}
if (rightArrow) {
  rightArrow.addEventListener("click", handlers.handleNavRight);
}

requestAnimationFrame(world.update);
