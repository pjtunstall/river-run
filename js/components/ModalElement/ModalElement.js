export class ModalElement extends HTMLElement {
  #shadow;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = document.getElementById("modal-template");
    if (!template) return;

    this.#shadow.appendChild(template.content.cloneNode(true));

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "js/components/ModalElement/modal-element.css";
    this.#shadow.prepend(link);

    const titleElem = this.#shadow.querySelector(".modal-title");
    if (titleElem) {
      titleElem.textContent = this.getAttribute("modal-title") || "";
    }

    const closeBtn = this.#shadow.querySelector(".close-button");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.hide();
        this.dispatchEvent(
          new CustomEvent("modal-closed", { detail: this.id })
        );
      });
    }
  }

  show() {
    const modall = this.#shadow.querySelector(".modal");
    if (modall) modall.classList.add("show");
  }

  hide() {
    const modall = this.#shadow.querySelector(".modal");
    if (modall) modall.classList.remove("show");
  }
}
