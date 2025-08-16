export class Milestone {
  yPosition;
  viewHeight;
  totalHeight;
  element;
  offsetX; // Distance from tile center.
  offsetY; // Distance from tile center.
  tileIndex; // Which tile to follow.

  constructor(
    viewHeight,
    totalHeight,
    tileIndex,
    offsetX,
    offsetY,
    label = ""
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

    gameContainer.appendChild(milestone);

    this.element = milestone;
    this.tileIndex = tileIndex;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.viewHeight = viewHeight;
    this.totalHeight = totalHeight;
  }

  updatePosition(tiles) {
    const tile = tiles.elements[this.tileIndex];
    const tileRect = tile.getBoundingClientRect();
    const gameRect = document.getElementById("game").getBoundingClientRect();

    // Position relative to tile center, offset by our desired distance.
    const x = tileRect.left - gameRect.left + tileRect.width / 2 + this.offsetX;
    const y = tileRect.top - gameRect.top + tileRect.height / 2 + this.offsetY;

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }

  updateViewHeight(newViewHeight) {
    this.viewHeight = newViewHeight;
    this.totalHeight = newViewHeight * 3;
  }
}
