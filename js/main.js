import { World } from "./World.js";
import { Physics } from "./Physics.js";
import { Tiles } from "./Tiles.js";
import { Milestones } from "./Milestones.js";
import { createEventHandlers } from "./createEventHandlers.js";
import { addEventListeners } from "./addEventListeners.js";
import { loadModalBodies, loadModalTemplate, AppModal } from "./AppModal.js";
import { ModalQuoteFooter, ModalLinkFooter } from "./ModalFooters.js";

await loadModalTemplate();
customElements.define("app-modal", AppModal);
customElements.define("modal-quote-footer", ModalQuoteFooter);
customElements.define("modal-link-footer", ModalLinkFooter);
await loadModalBodies();

const numberOfTiles = 3;
const tiles = new Tiles(numberOfTiles);
const physics = new Physics();
const milestones = new Milestones(numberOfTiles);
milestones.initializeXPositions(tiles);
const world = new World(tiles, physics, milestones);

const helpModal = document.getElementById("help-modal");
const leftModal = document.getElementById("projects-modal");
const rightModal = document.getElementById("profile-modal");
const modals = {
  helpModal,
  leftModal,
  rightModal,
};

const leftArrow = document.getElementById("nav-left");
const rightArrow = document.getElementById("nav-right");
const arrows = [leftArrow, rightArrow];

const handlers = createEventHandlers({
  physics,
  world,
  modals,
  arrows,
});
addEventListeners(handlers, milestones, modals, arrows);

requestAnimationFrame(world.update);
