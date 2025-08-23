export class NavArrow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const direction = this.getAttribute("direction") || "left";
    const isLeft = direction === "left";
    const path = isLeft
      ? "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      : "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";

    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="js/components/NavArrow/nav-arrow.css">
    <button class="nav-arrow nav-arrow-${direction}" id="nav-${direction}">
      <svg viewBox="0 0 24 24">
        <path d="${path}" />
      </svg>
    </button>
  `;

    const button = this.shadowRoot.querySelector("button");
    button.addEventListener("click", (e) => {
      const customEvent = new CustomEvent("nav-arrow-click", {
        bubbles: true,
        composed: true,
        detail: { direction, originalEvent: e },
      });
      this.dispatchEvent(customEvent);
    });
  }

  show() {
    const button = this.shadowRoot.querySelector("button");
    button.classList.remove("hide");
    button.classList.add("show");
  }

  hide() {
    const button = this.shadowRoot.querySelector("button");
    button.classList.remove("show");
    button.classList.add("hide");
  }
}
