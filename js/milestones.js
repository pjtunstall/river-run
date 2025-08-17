let viewPortHeight = window.innerHeight;

class Milestone {
  constructor(
    milestones,
    tileIndex,
    offsetXPercent,
    offsetYPercent,
    label = "",
    color = "red"
  ) {
    const gameContainer = document.getElementById("game");
    const milestone = document.createElement("div");
    milestone.className = "milestone";

    if (label) {
      const labelElement = document.createElement("div");
      labelElement.className = "label";
      labelElement.textContent = label;
      milestone.appendChild(labelElement);
    }

    if (color !== "red") {
      milestone.style.background = color;
    }

    gameContainer.appendChild(milestone);

    this.element = milestone;
    this.tileIndex = tileIndex;
    this.offsetXPercent = offsetXPercent;
    this.offsetYPercent = offsetYPercent;
    this.milestones = milestones;
  }

  get totalHeight() {
    return this.milestones.totalHeight;
  }

  updatePosition(tiles) {
    const tile = tiles.elements[this.tileIndex];
    const tileRect = tile.getBoundingClientRect();
    const gameRect = document.getElementById("game").getBoundingClientRect();

    const offsetX = (tileRect.width * this.offsetXPercent) / 100;
    const offsetY = (tileRect.height * this.offsetYPercent) / 100;

    const x = tileRect.left - gameRect.left + tileRect.width / 2 + offsetX;
    const y = tileRect.top - gameRect.top + tileRect.height / 2 + offsetY;

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }
}

export class Milestones {
  constructor(numberOfTiles) {
    this.viewPortHeight = viewPortHeight;
    this.numberOfTiles = numberOfTiles;
    this.milestones = [];
    this.#createAll();
  }

  get totalHeight() {
    return this.viewPortHeight * this.numberOfTiles;
  }

  create(tileIndex, offsetXPercent, offsetYPercent, label = "", color = "red") {
    const milestone = new Milestone(
      this,
      tileIndex,
      offsetXPercent,
      offsetYPercent,
      label,
      color
    );
    this.milestones.push(milestone);
    return milestone;
  }

  updateViewHeight(newViewHeight) {
    viewPortHeight = newViewHeight;
    this.viewPortHeight = newViewHeight;
  }

  updateAllPositions(tiles) {
    this.milestones.forEach((milestone) => milestone.updatePosition(tiles));
  }

  // Make this iterable so we can use forEach directly on the Milestones instance.
  forEach(callback) {
    this.milestones.forEach(callback);
  }

  #createAll() {
    this.create(1, -12, 0, "Task", "red");
    this.create(1, 0, -20, "Microtask Checkpoint #1", "yellow");
    this.create(1, 13, -33, "MutationObserver Callbacks", "green");
    this.create(1, 5, -45, "Microtask Checkpoint #2", "yellow");
    this.create(0, -24, 0, "requestAnimationFrame Callbacks", "cyan");
    this.create(0, -22, -12, "Style", "orange");
    this.create(0, 34, -24, "Layout", "purple");
    this.create(0, 27, -36, "ResizeObserver Callbacks", "gold");
    this.create(2, 18, 33, "Paint", "blue");
    this.create(2, -18, -18, "Composite", "silver");
    this.create(2, -25, -27, "IntersectionObserver Callbacks", "white");
    this.create(2, -12, -64, "requestIdleCallback Callbacks", "black");
  }
}
