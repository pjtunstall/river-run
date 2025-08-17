let viewPortHeight = window.innerHeight;
const numberOfTiles = 3;
const totalHeight = viewPortHeight * numberOfTiles;

class Milestone {
  yPosition;
  totalHeight;
  element;
  offsetX; // Distances from tile center.
  offsetY;
  tileIndex; // Which tile to follow.

  constructor(
    totalHeight,
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
    this.totalHeight = totalHeight;
  }

  updatePosition(tiles) {
    const tile = tiles.elements[this.tileIndex];
    const tileRect = tile.getBoundingClientRect();
    const gameRect = document.getElementById("game").getBoundingClientRect();

    // Calculate offsets as percentages of tile dimensions.
    const offsetX = (tileRect.width * this.offsetXPercent) / 100;
    const offsetY = (tileRect.height * this.offsetYPercent) / 100;

    // Position relative to tile center, offset by calculated amounts.
    const x = tileRect.left - gameRect.left + tileRect.width / 2 + offsetX;
    const y = tileRect.top - gameRect.top + tileRect.height / 2 + offsetY;

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }

  updateViewHeight(newViewHeight) {
    viewPortHeight = newViewHeight;
    this.totalHeight = viewPortHeight * 3;
  }
}

export function createMilestones() {
  return [
    new Milestone(totalHeight, 1, -12, 0, "Task", "red"),
    new Milestone(totalHeight, 1, 0, -20, "Microtask Checkpoint #1", "yellow"),
    new Milestone(
      totalHeight,
      1,
      13,
      -33,
      "MutationObserver Callbacks",
      "green"
    ),
    new Milestone(totalHeight, 1, 5, -45, "Microtask Checkpoint #2", "yellow"),
    new Milestone(
      totalHeight,
      0,
      -24,
      0,
      "requestAnimationFrame Callbacks",
      "cyan"
    ),
    new Milestone(totalHeight, 0, -22, -12, "Style", "orange"),
    new Milestone(totalHeight, 0, 34, -24, "Layout", "purple"),
    new Milestone(totalHeight, 0, 27, -36, "ResizeObserver Callbacks", "gold"),
    new Milestone(totalHeight, 2, 18, 33, "Paint", "blue"),
    new Milestone(totalHeight, 2, -18, -18, "Composite", "silver"),
    new Milestone(
      totalHeight,
      2,
      -25,
      -27,
      "IntersectionObserver Callbacks",
      "white"
    ),
    new Milestone(
      totalHeight,
      2,
      -12,
      -64,
      "requestIdleCallback Callbacks",
      "black"
    ),
  ];
}
