const viewPortHeight = window.innerHeight;

export class Milestones {
  #container;
  #milestones;

  constructor(numberOfTiles, container) {
    this.#container = container;
    this.#milestones = [];
    this.#createAll();
  }

  #add(tileIndex, offsetXPercent, offsetYPercent, label = "", color = "red") {
    const milestone = document.createElement("milestone-element");
    milestone.initialize(
      tileIndex,
      offsetXPercent,
      offsetYPercent,
      label,
      color,
      this.#container
    );
    this.#container.appendChild(milestone);
    this.#milestones.push(milestone);
    return milestone;
  }

  initializeXPositions(tiles) {
    this.#milestones.forEach((m) => m.setXPosition(tiles));
  }

  updatePosition(tiles) {
    this.#milestones.forEach((m) => m.updatePosition(tiles));
  }

  forEach(callback) {
    this.#milestones.forEach(callback);
  }

  #createAll() {
    this.#add(1, -12, 0, "Task", "red");
    this.#add(1, 0, -20, "Microtask Checkpoint #1", "yellow");
    this.#add(1, 13, -33, "MutationObserver Callbacks", "green");
    this.#add(1, 5, -45, "Microtask Checkpoint #2", "yellow");
    this.#add(0, -16, 12, "requestAnimationFrame Callbacks", "cyan");
    this.#add(0, -22, -12, "Style", "orange");
    this.#add(0, 34, -24, "Layout", "purple");
    this.#add(0, 21, -49, "ResizeObserver Callbacks", "gold");
    this.#add(2, 18, 33, "Paint", "blue");
    this.#add(2, -29, -13, "Composite", "silver");
    this.#add(2, -25, -27, "IntersectionObserver Callbacks", "white");
    this.#add(2, -12, -64, "requestIdleCallback Callbacks", "black");
  }
}
