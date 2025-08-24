export class DirectionList extends HTMLElement {
  #shadow;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = document.getElementById("direction-list");
    if (!template) return;
    const html = template.content.cloneNode(true);

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "js/components/ModalElement/DirectionList/direction-list.css";

    this.#shadow.append(css, html);
  }
}
