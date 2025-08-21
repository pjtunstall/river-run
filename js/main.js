import { World } from "./World.js";
import { Physics } from "./Physics.js";
import { Tiles } from "./Tiles.js";
import { createEventHandlers } from "./createEventHandlers.js";
import { Milestones } from "./Milestones.js";
import { loadModalBodies, loadModalTemplate, AppModal } from "./modals.js";
import { addEventListeners } from "./addEventListeners.js";

await loadModalTemplate();
customElements.define("app-modal", AppModal);
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

const handlers = createEventHandlers({
  physics,
  world,
  modals,
});
addEventListeners(handlers, milestones, modals);

requestAnimationFrame(world.update);
