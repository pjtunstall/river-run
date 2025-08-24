export class ProjectsBody extends HTMLElement {
  #shadow;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = document.getElementById("projects-body-template");
    if (!template) return;
    const html = template.content.cloneNode(true);

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "js/components/ModalElement/ProjectsBody/projects-body.css";

    this.#shadow.append(css, html);
  }
}
