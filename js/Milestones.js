const viewPortHeight = window.innerHeight;

export class Milestones {
  numberOfTiles;
  milestones;

  constructor(numberOfTiles) {
    this.numberOfTiles = numberOfTiles;
    this.milestones = [];
    this.#createAll();
  }

  get totalHeight() {
    return viewPortHeight * this.numberOfTiles;
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

  initializeXPositions(tiles) {
    this.milestones.forEach((milestone) => milestone.setXPosition(tiles));
  }

  updatePosition(tiles) {
    this.milestones.forEach((milestone) => milestone.updatePosition(tiles));
  }

  // Make this iterable so we can use forEach directly on the Milestones instance.
  forEach(callback) {
    this.milestones.forEach(callback);
  }

  #createAll() {
    this.create(1, -12, 0, "Task", "red"); // tileIndex, offsetXPercent, offsetYPercent
    this.create(1, 0, -20, "Microtask Checkpoint #1", "yellow");
    this.create(1, 13, -33, "MutationObserver Callbacks", "green");
    this.create(1, 5, -45, "Microtask Checkpoint #2", "yellow");
    this.create(0, -24, 0, "requestAnimationFrame Callbacks", "cyan");
    this.create(0, -22, -12, "Style", "orange");
    this.create(0, 34, -24, "Layout", "purple");
    this.create(0, 21, -49, "ResizeObserver Callbacks", "gold");
    this.create(2, 18, 33, "Paint", "blue");
    this.create(2, -29, -13, "Composite", "silver");
    this.create(2, -25, -27, "IntersectionObserver Callbacks", "white");
    this.create(2, -12, -64, "requestIdleCallback Callbacks", "black");
  }
}

class Milestone {
  constructor(
    milestones,
    tileIndex,
    offsetXPercent,
    offsetYPercent,
    label = "",
    color = "red"
  ) {
    const worldContainer = document.getElementById("world");
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

    worldContainer.appendChild(milestone);

    this.element = milestone;
    this.tileIndex = tileIndex;
    this.offsetXPercent = offsetXPercent;
    this.offsetYPercent = offsetYPercent;
    this.milestones = milestones;
  }

  get totalHeight() {
    return this.milestones.totalHeight;
  }

  setXPosition(tiles) {
    const tile = tiles.elements[this.tileIndex];
    const tileRect = tile.getBoundingClientRect();
    const worldRect = document.getElementById("world").getBoundingClientRect();

    // Scale the X offset based on tile aspect ratio to keep milestones from wandering too much with horizontally relative to the river when the window is resized.
    const aspectRatio = tileRect.width / tileRect.height;
    const baseAspectRatio = 4 / 3;
    const scaleFactor = Math.min(1, baseAspectRatio / aspectRatio);

    const offsetX = (tileRect.width * this.offsetXPercent * scaleFactor) / 100;
    const x = tileRect.left - worldRect.left + tileRect.width / 2 + offsetX;

    this.xPos = x;
    this.element.style.transform = `translate(${this.xPos}px, ${
      this.yPos || 0
    }px)`;
  }

  updatePosition(tiles) {
    const tile = tiles.elements[this.tileIndex];
    const tileRect = tile.getBoundingClientRect();
    const worldRect = document.getElementById("world").getBoundingClientRect();

    const offsetY = (tileRect.height * this.offsetYPercent) / 100;
    const y = tileRect.top - worldRect.top + tileRect.height / 2 + offsetY;

    this.yPos = y;
    this.element.style.transform = `translate(${this.xPos || 0}px, ${
      this.yPos
    }px)`;
  }
}
