export class Milestone {
  constructor(imageFractionX, initialY) {
    this.imageFractionX = imageFractionX;
    this.y = initialY;
    this.element = document.createElement("div");
    this.element.className = "milestone";
    document.getElementById("game").appendChild(this.element);
  }

  updateX(tileElement) {
    const tileWidth = tileElement.offsetWidth;
    this.element.style.left = `${tileWidth * this.imageFractionX}px`;
  }

  updateY() {
    this.element.style.transform = `translateY(${this.y}px)`;
  }

  update(tileElement, velocity) {
    this.y += velocity;
    if (this.y >= tileElement.offsetHeight) this.y -= tileElement.offsetHeight;
    if (this.y <= -tileElement.offsetHeight) this.y += tileElement.offsetHeight;
    this.updateY();
    this.updateX(tileElement);
  }
}
