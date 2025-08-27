export class ModalLinkFooter extends HTMLElement {
  #shadow;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const href = this.getAttribute("href");
    const text = this.textContent || this.getAttribute("text");

    const template = document.getElementById("modal-link-footer");
    if (!template) return;

    const html = template.content.cloneNode(true);

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href =
      "components/ModalElement/footers/ModalLinkFooter/modal-link-footer.css";

    this.#shadow.append(css, html);

    const a = this.#shadow.querySelector("a");
    if (a) {
      a.href = href;
      a.textContent = text;
    }
  }
}
