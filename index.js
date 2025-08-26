import { World } from "./js/World.js";
import { Physics } from "./js/Physics.js";
import { Tiles } from "./js/Tiles.js";
import { Milestones } from "./js/Milestones.js";
import { createEventHandlers } from "./js/createEventHandlers.js";
import { addEventListeners } from "./js/addEventListeners.js";

import { loadProfileTextTemplate } from "./js/components/ModalElement/ProfileText/profile-text-utils.js";
import { loadModalElementTemplate } from "./js/components/ModalElement/modal-element-utils.js";
import { loadProjectCardTemplate } from "./js/components/ModalElement/ProjectsGrid/ProjectCard/project-card-utils.js";
import { loadProjectsGridTemplate } from "./js/components/ModalElement/ProjectsGrid/projects-grid-utils.js";
import { loadModalQuoteFooterTemplate } from "./js/components/ModalElement/ModalQuoteFooter/modal-quote-footer-utils.js";
import { loadModalLinkFooterTemplate } from "./js/components/ModalElement/ModalLinkFooter/modal-link-footer-utils.js";
import { loadDirectionListTemplate } from "./js/components/ModalElement/DirectionList/direction-list-utils.js";

import { ProjectCard } from "./js/components/ModalElement/ProjectsGrid/ProjectCard/ProjectCard.js";
import { ProjectsGrid } from "./js/components/ModalElement/ProjectsGrid/ProjectsGrid.js";
import { DirectionList } from "./js/components/ModalElement/DirectionList/DirectionList.js";
import { ProfileText } from "./js/components/ModalElement/ProfileText/ProfileText.js";
import { ModalElement } from "./js/components/ModalElement/ModalElement.js";
import { ModalLinkFooter } from "./js/components/ModalElement/ModalLinkFooter/ModalLinkFooter.js";
import { ModalQuoteFooter } from "./js/components/ModalElement/ModalQuoteFooter/ModalQuoteFooter.js";
import { CompassRose } from "./js/components/CompassRose/CompassRose.js";
import { NavArrow } from "./js/components/NavArrow/NavArrow.js";
import { MilestoneElement } from "./js/components/MilestoneElement/MilestoneElement.js";

await Promise.all([
  loadDirectionListTemplate(),
  loadProfileTextTemplate(),
  loadProjectCardTemplate(),
  loadProjectsGridTemplate(),
  loadModalQuoteFooterTemplate(),
  loadModalLinkFooterTemplate(),
  loadModalElementTemplate(),
]);

customElements.define("direction-list", DirectionList);
customElements.define("profile-text", ProfileText);
customElements.define("project-card", ProjectCard);
customElements.define("projects-grid", ProjectsGrid);
customElements.define("modal-element", ModalElement);
customElements.define("modal-quote-footer", ModalQuoteFooter);
customElements.define("modal-link-footer", ModalLinkFooter);
customElements.define("compass-rose", CompassRose);
customElements.define("nav-arrow", NavArrow);
customElements.define("milestone-element", MilestoneElement);

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
addEventListeners(handlers, modals);

requestAnimationFrame(world.update);
