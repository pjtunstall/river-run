export class Milestone {
  yPosition;
  viewHeight;
  totalHeight;
  element;
  offsetX; // Distances from tile center.
  offsetY;
  tileIndex; // Which tile to follow.

  constructor(
    viewHeight,
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
    this.viewHeight = viewHeight;
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
    this.viewHeight = newViewHeight;
    this.totalHeight = newViewHeight * 3;
  }
}
