export class ProjectsGrid extends HTMLElement {
  #shadow;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = document.getElementById("projects-grid-template");
    if (!template) return;
    const html = template.content.cloneNode(true);

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "js/components/ModalElement/ProjectsGrid/projects-grid.css";

    this.#shadow.append(css, html);
  }
}
