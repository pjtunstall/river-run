export class MilestoneElement extends HTMLElement {
  labelElement;
  xPos = 0;
  yPos = 0;
  #container;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute(
      "href",
      "js/components/MilestoneElement/milestone-element.css"
    );

    const labelDiv = document.createElement("div");
    labelDiv.className = "label";
    this.labelElement = labelDiv;
    this.shadowRoot.append(link, labelDiv);

    this.addEventListener("click", (e) => {
      e.stopPropagation();
      this.labelElement.classList.toggle("visible");

      this.classList.remove("glow");
      this.classList.add("glow");

      this.addEventListener(
        "animationend",
        () => {
          this.classList.remove("glow");
        },
        { once: true }
      );
    });
  }

  initialize(
    tileIndex = 0,
    offsetXPercent = 0,
    offsetYPercent = 0,
    label = "",
    color = "red",
    container
  ) {
    this.#container = container;
    this.setAttribute("tile-index", tileIndex);
    this.setAttribute("offset-x", offsetXPercent);
    this.setAttribute("offset-y", offsetYPercent);
    this.setAttribute("label", label);
    this.setAttribute("color", color);
    return this;
  }

  static get observedAttributes() {
    return ["label", "color"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.labelElement) return;
    if (name === "label") this.labelElement.textContent = newValue || "";
    if (name === "color")
      this.style.setProperty("--milestone-color", newValue || "red");
  }

  get tileIndex() {
    return parseInt(this.getAttribute("tile-index")) || 0;
  }

  get offsetXPercent() {
    return parseFloat(this.getAttribute("offset-x")) || 0;
  }

  get offsetYPercent() {
    return parseFloat(this.getAttribute("offset-y")) || 0;
  }

  setXPosition(tiles) {
    const tile = tiles.elements[this.tileIndex];
    const tileRect = tile.getBoundingClientRect();
    const worldRect = this.#container.getBoundingClientRect();
    const offsetX = (tileRect.width * this.offsetXPercent) / 100;
    const x = tileRect.left - worldRect.left + tileRect.width / 2 + offsetX;
    this.xPos = x;
    this.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
  }

  updatePosition(tiles) {
    const tile = tiles.elements[this.tileIndex];
    const tileRect = tile.getBoundingClientRect();
    const worldRect = this.#container.getBoundingClientRect();
    const offsetY = (tileRect.height * this.offsetYPercent) / 100;
    const y = tileRect.top - worldRect.top + tileRect.height / 2 + offsetY;
    this.yPos = y;
    this.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
  }

  connectedCallback() {
    if (this.hasAttribute("label"))
      this.labelElement.textContent = this.getAttribute("label");
    if (this.hasAttribute("color"))
      this.style.setProperty("--milestone-color", this.getAttribute("color"));
  }
}
