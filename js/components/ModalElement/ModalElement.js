export class ModalElement extends HTMLElement {
  #shadow;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = document.getElementById("modal-element");
    if (!template) return;
    const html = template.content.cloneNode(true);

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "js/components/ModalElement/modal-element.css";

    this.#shadow.append(css, html);

    const titleElement = this.#shadow.querySelector(".modal-title");
    if (titleElement) {
      titleElement.textContent = this.getAttribute("modal-title") || "";
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
    const modal = this.#shadow.querySelector(".modal-backdrop");
    if (modal) modal.classList.add("show");
  }

  hide() {
    const modal = this.#shadow.querySelector(".modal-backdrop");
    if (modal) modal.classList.remove("show");
  }
}
