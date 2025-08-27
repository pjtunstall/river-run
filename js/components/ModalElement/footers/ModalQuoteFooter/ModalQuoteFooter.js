export class ModalQuoteFooter extends HTMLElement {
  #shadow;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = document.getElementById("modal-quote-footer");
    if (!template) return;
    const html = template.content.cloneNode(true);

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href =
      "js/components/ModalElement/footers/ModalQuoteFooter/modal-quote-footer.css";

    this.#shadow.append(css, html);

    const em = this.#shadow.querySelector("em");
    if (em) em.textContent = this.textContent;
  }
}
