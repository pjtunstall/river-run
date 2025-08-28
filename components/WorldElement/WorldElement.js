import { Milestones } from "../../js/classes/Milestones.js";
import { Physics } from "../../js/classes/Physics.js";
import { Tiles } from "../../js/classes/Tiles.js";
import { World } from "../../js/classes/World.js";

export class WorldElement extends HTMLElement {
  #shadow;
  #animationFrameId;
  world;

  constructor() {
    super();
    this.tabIndex = 0;
    this.#shadow = this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  connectedCallback() {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./components/WorldElement/world-element.css");
    this.#shadow.appendChild(link);

    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.overflow = "hidden";
    this.#shadow.appendChild(container);

    const numberOfTiles = 3;
    const tiles = new Tiles(numberOfTiles, container);
    const physics = new Physics();
    const milestones = new Milestones(numberOfTiles, container);
    milestones.initializeXPositions(tiles);
    this.world = new World(tiles, physics, milestones);

    container.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        this.dispatchEvent(
          new CustomEvent("world-wheel", {
            detail: { deltaY: e.deltaY },
            bubbles: true,
            composed: true,
          })
        );
      },
      { passive: false }
    );

    container.addEventListener("touchstart", (e) => {
      this.dispatchEvent(
        new CustomEvent("world-touchstart", {
          detail: { clientY: e.touches[0].clientY },
          bubbles: true,
          composed: true,
        })
      );
    });

    container.addEventListener("touchmove", (e) => {
      this.dispatchEvent(
        new CustomEvent("world-touchmove", {
          detail: { clientY: e.touches[0].clientY },
          bubbles: true,
          composed: true,
        })
      );
    });

    container.addEventListener("touchend", (e) => {
      this.dispatchEvent(
        new CustomEvent("world-touchend", {
          detail: { clientY: e.changedTouches[0].clientY },
          bubbles: true,
          composed: true,
        })
      );
    });

    this.world.update();
    this.focus();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.#animationFrameId);
  }
}
