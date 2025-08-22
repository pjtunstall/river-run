export class ModalElement extends HTMLElement {
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
      titleElem.textContent = this.getAttribute("modal-title") || "";

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
    const modall = this.querySelector(".modal");
    if (modall) modall.classList.add("show");
  }

  hide() {
    const modall = this.querySelector(".modal");
    if (modall) modall.classList.remove("show");
  }
}
