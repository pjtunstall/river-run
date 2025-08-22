export class ModalComponent extends HTMLElement {
  #modal;

  connectedCallback() {
    const template = document.getElementById("modal-template");
    this.#modal = template.content.cloneNode(true);
    this.appendChild(this.#modal);

    const bodyPlaceholder = this.querySelector(".modal-body-placeholder");
    const bodyContent = this.querySelector(".modal-body-content");
    if (bodyPlaceholder && bodyContent)
      bodyPlaceholder.appendChild(bodyContent);

    const footerPlaceholder = this.querySelector(".modal-footer-placeholder");
    const footer =
      this.querySelector(".modal-footer") ||
      this.querySelector("modal-quote-footer") ||
      this.querySelector("modal-link-footer");
    if (footerPlaceholder && footer) footerPlaceholder.appendChild(footer);

    const titleElem = this.querySelector(".modal-title");
    if (titleElem)
      titleElem.textContent = this.getAttribute("aria-label") || "";

    const closeBtn = this.querySelector(".close-button");
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
    const modalEl = this.querySelector(".modal");
    if (modalEl) modalEl.classList.add("show");
  }

  hide() {
    const modalEl = this.querySelector(".modal");
    if (modalEl) modalEl.classList.remove("show");
  }
}
