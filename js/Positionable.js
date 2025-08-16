export class Positionable {
  #el;
  #y;
  #viewPortHeight;
  #totalHeight;

  constructor(el, y, viewPortHeight, totalHeight) {
    this.#el = el;
    this.#y = y;
    this.#viewPortHeight = viewPortHeight;
    this.#totalHeight = totalHeight;
    this.#el.style.transform = `translateY(${this.#y}px)`;
  }

  update(velocity) {
    this.#y += velocity;
    if (this.#y >= this.#viewPortHeight) this.#y -= this.#totalHeight;
    if (this.#y <= -this.#viewPortHeight) this.#y += this.#totalHeight;
    this.#el.style.transform = `translateY(${this.#y}px)`;
  }
}
