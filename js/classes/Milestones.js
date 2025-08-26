import { MilestoneElement } from "../components/MilestoneElement/MilestoneElement.js";

const viewPortHeight = window.innerHeight;

export class Milestones {
  constructor(numberOfTiles) {
    this.numberOfTiles = numberOfTiles;
    this.totalHeight = viewPortHeight * numberOfTiles;
    this.milestones = [];
    this.#createAll();
  }

  add(tileIndex, offsetXPercent, offsetYPercent, label = "", color = "red") {
    const worldContainer = document.getElementById("world");
    const milestone = new MilestoneElement(
      tileIndex,
      offsetXPercent,
      offsetYPercent,
      label,
      color
    );
    worldContainer.appendChild(milestone);
    this.milestones.push(milestone);
    return milestone;
  }

  initializeXPositions(tiles) {
    this.milestones.forEach((milestone) => milestone.setXPosition(tiles));
  }

  updatePosition(tiles) {
    this.milestones.forEach((milestone) => milestone.updatePosition(tiles));
  }

  forEach(callback) {
    this.milestones.forEach(callback);
  }

  #createAll() {
    this.add(1, -12, 0, "Task", "red");
    this.add(1, 0, -20, "Microtask Checkpoint #1", "yellow");
    this.add(1, 13, -33, "MutationObserver Callbacks", "green");
    this.add(1, 5, -45, "Microtask Checkpoint #2", "yellow");
    this.add(0, -16, 12, "requestAnimationFrame Callbacks", "cyan");
    this.add(0, -22, -12, "Style", "orange");
    this.add(0, 34, -24, "Layout", "purple");
    this.add(0, 21, -49, "ResizeObserver Callbacks", "gold");
    this.add(2, 18, 33, "Paint", "blue");
    this.add(2, -29, -13, "Composite", "silver");
    this.add(2, -25, -27, "IntersectionObserver Callbacks", "white");
    this.add(2, -12, -64, "requestIdleCallback Callbacks", "black");
  }
}
