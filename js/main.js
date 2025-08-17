import { Game } from "./Game.js";
import { Physics } from "./Physics.js";
import { Tiles } from "./Tiles.js";
import { createEventHandlers } from "./eventHandlers.js";
import { Milestone } from "./Milestone.js";

const viewPortHeight = window.innerHeight;
const numberOfTiles = 3;
const totalHeight = viewPortHeight * numberOfTiles;
const tiles = new Tiles(numberOfTiles, viewPortHeight);

const milestones = [];
// If you forget to push a milestone to the milestones array, it will appear at the top left of the screen and not scroll. Fix this so that milestones are automatically pushed on creation.
const milestone_0 = new Milestone(
  viewPortHeight,
  totalHeight,
  1, // Place on tile 1.
  -12, // 12% of tile width left of tile center.
  0, // Same vertical position as tile center.
  "Task",
  "red"
);
const milestone_1 = new Milestone(
  viewPortHeight,
  totalHeight,
  1,
  0,
  -20,
  "Microtask Checkpoint #1",
  "yellow"
);
const milestone_2 = new Milestone(
  viewPortHeight,
  totalHeight,
  1,
  13,
  -33,
  "MutationObserver Callbacks",
  "green"
);
const milestone_3 = new Milestone(
  viewPortHeight,
  totalHeight,
  1,
  5,
  -45,
  "Microtask Checkpoint #2",
  "yellow"
);
const milestone_4 = new Milestone(
  viewPortHeight,
  totalHeight,
  0,
  -24,
  0,
  "requestAnimationFrame Callbacks",
  "cyan"
);
const milestone_5 = new Milestone(
  viewPortHeight,
  totalHeight,
  0,
  -22,
  -12,
  "Style",
  "orange"
);
const milestone_6 = new Milestone(
  viewPortHeight,
  totalHeight,
  0,
  34,
  -24,
  "Layout",
  "purple"
);
const milestone_7 = new Milestone(
  viewPortHeight,
  totalHeight,
  0,
  27,
  -36,
  "ResizeObserver Callbacks",
  "gold"
);
const milestone_8 = new Milestone(
  viewPortHeight,
  totalHeight,
  2,
  18,
  33,
  "Paint",
  "blue"
);
const milestone_9 = new Milestone(
  viewPortHeight,
  totalHeight,
  2,
  -18,
  -18,
  "Composite",
  "silver"
);
const milestone_10 = new Milestone(
  viewPortHeight,
  totalHeight,
  2,
  -25,
  -27,
  "IntersectionObserver Callbacks",
  "white"
);
const milestone_11 = new Milestone(
  viewPortHeight,
  totalHeight,
  2,
  -12,
  -64,
  "requestIdleCallback Callbacks",
  "black"
);
milestones.push(milestone_0);
milestones.push(milestone_1);
milestones.push(milestone_2);
milestones.push(milestone_3);
milestones.push(milestone_4);
milestones.push(milestone_5);
milestones.push(milestone_6);
milestones.push(milestone_7);
milestones.push(milestone_8);
milestones.push(milestone_9);
milestones.push(milestone_10);
milestones.push(milestone_11);

const physics = new Physics();
const game = new Game(tiles, physics, milestones);
const modal = document.getElementById("modal");
const handlers = createEventHandlers(physics, modal);

document.addEventListener("keydown", handlers.handleKeyDown);
document.addEventListener("keyup", handlers.handleKeyUp);
window.addEventListener("resize", handlers.handleResize);
window.addEventListener("touchstart", handlers.openModal, { passive: true });
window.addEventListener("wheel", handlers.openModal, { passive: true });
window.addEventListener("click", handlers.closeModal);

requestAnimationFrame(game.update);
