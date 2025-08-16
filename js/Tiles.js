export class Tiles {
  elements = [];
  yPositions = [];
  viewHeight;
  totalHeight;

  constructor(n, viewHeight) {
    // Create tile elements and add them to the DOM.
    const gameContainer = document.getElementById("game");
    let tiles = Array.from({ length: n }, (_, i) => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.id = `tile-${i}`;
      tile.style.backgroundImage = `url(images/tiles/river-${i}.jpg)`;
      gameContainer.appendChild(tile);
      return tile;
    });

    // Set initial vertical positions of tiles.
    let yPositions = tiles.map(
      (_, i) => (i - Math.floor(tiles.length / 2)) * viewHeight
    );
    tiles.forEach((tile, i) => {
      tile.style.transform = `translateY(${yPositions[i]}px)`;
    });

    this.viewHeight = viewHeight;
    this.totalHeight = viewHeight * tiles.length;
    this.elements = tiles;
    this.yPositions = yPositions;
  }

  updatePosition(velocity) {
    this.yPositions.forEach((pos, i) => {
      this.yPositions[i] += velocity;

      if (this.yPositions[i] >= this.viewHeight)
        this.yPositions[i] -= this.totalHeight;
      if (this.yPositions[i] <= -this.viewHeight)
        this.yPositions[i] += this.totalHeight;

      this.elements[i].style.transform = `translateY(${this.yPositions[i]}px)`;
    });
  }
}
