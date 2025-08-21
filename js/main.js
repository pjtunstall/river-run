import { World } from "./World.js";
import { Physics } from "./Physics.js";
import { Tiles } from "./Tiles.js";
import { createEventHandlers } from "./createEventHandlers.js";
import { Milestones } from "./Milestones.js";
import { loadModalBodies, loadModalTemplate, AppModal } from "./modals.js";

await loadModalTemplate();
customElements.define("app-modal", AppModal);
await loadModalBodies();

const numberOfTiles = 3;
const tiles = new Tiles(numberOfTiles);
const physics = new Physics();
const milestones = new Milestones(numberOfTiles);
milestones.initializeXPositions(tiles);
const world = new World(tiles, physics, milestones);

const compass = document.querySelector(".compass");
const helpModal = document.getElementById("help-modal");

const leftArrow = document.getElementById("nav-left");
const leftModal = document.getElementById("projects-modal");
const riverRunLink = document.getElementById("river-run-link");

const rightArrow = document.getElementById("nav-right");
const rightModal = document.getElementById("profile-modal");

const handlers = createEventHandlers({
  physics,
  world,
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
window.addEventListener("touchmove", handlers.handleTouchMove, {
  passive: true,
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
compass.addEventListener("click", handlers.handleCompassClick);
leftArrow.addEventListener("click", handlers.handleNavLeft);
rightArrow.addEventListener("click", handlers.handleNavRight);
helpModal.addEventListener("modal-closed", (e) => {
  handlers.handleUpdateCloseStateOfModal(e.detail);
});
leftModal.addEventListener("modal-closed", (e) => {
  handlers.handleUpdateCloseStateOfModal(e.detail);
});
rightModal.addEventListener("modal-closed", (e) => {
  handlers.handleUpdateCloseStateOfModal(e.detail);
});

leftModal.addEventListener("click", (e) => {
  const card = e.target.closest("#river-run-link");
  if (!card) return;
  if (e.target.closest(".repo-link")) return;
  handlers.handleRiverRunLinkClick(e);
});

requestAnimationFrame(world.update);
