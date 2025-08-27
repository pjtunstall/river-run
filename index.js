import { createEventHandlers } from "./js/events/createEventHandlers.js";
import { addEventListeners } from "./js/events/addEventListeners.js";

import { loadProfileTextTemplate } from "./components/ModalElement/bodies/ProfileText/profile-text-utils.js";
import { loadModalElementTemplate } from "./components/ModalElement/modal-element-utils.js";
import { loadProjectCardTemplate } from "./components/ModalElement/bodies/ProjectsGrid/ProjectCard/project-card-utils.js";
import { loadProjectsGridTemplate } from "./components/ModalElement/bodies/ProjectsGrid/projects-grid-utils.js";
import { loadModalQuoteFooterTemplate } from "./components/ModalElement/footers/ModalQuoteFooter/modal-quote-footer-utils.js";
import { loadModalLinkFooterTemplate } from "./components/ModalElement/footers/ModalLinkFooter/modal-link-footer-utils.js";
import { loadDirectionListTemplate } from "./components/ModalElement/bodies/DirectionList/direction-list-utils.js";

import { ProjectCard } from "./components/ModalElement/bodies/ProjectsGrid/ProjectCard/ProjectCard.js";
import { ProjectsGrid } from "./components/ModalElement/bodies/ProjectsGrid/ProjectsGrid.js";
import { DirectionList } from "./components/ModalElement/bodies/DirectionList/DirectionList.js";
import { ProfileText } from "./components/ModalElement/bodies/ProfileText/ProfileText.js";
import { ModalElement } from "./components/ModalElement/ModalElement.js";
import { ModalLinkFooter } from "./components/ModalElement/footers/ModalLinkFooter/ModalLinkFooter.js";
import { ModalQuoteFooter } from "./components/ModalElement/footers/ModalQuoteFooter/ModalQuoteFooter.js";
import { CompassRose } from "./components/CompassRose/CompassRose.js";
import { NavArrow } from "./components/NavArrow/NavArrow.js";
import { MilestoneElement } from "./components/MilestoneElement/MilestoneElement.js";
import { WorldElement } from "./components/WorldElement/WorldElement.js";

// Prevent flash of unstyled content.
window.addEventListener("DOMContentLoaded", async () => {
  const customElementsList = Array.from(document.querySelectorAll("*")).filter(
    (el) => el.tagName.includes("-")
  );

  await Promise.all(
    customElementsList.map((el) =>
      customElements.whenDefined(el.tagName.toLowerCase())
    )
  );

  document.body.style.opacity = "1";
});

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
customElements.define("world-element", WorldElement);

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

const worldElement = document.querySelector("world-element");
const world = worldElement.world;
const handlers = createEventHandlers({
  world,
  worldElement,
  modals,
  arrows,
  worldElement,
});
addEventListeners({ handlers, modals, worldElement });
