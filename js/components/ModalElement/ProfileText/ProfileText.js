export class ProfileText extends HTMLElement {
  #shadow;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = document.getElementById("profile-text");
    if (!template) return;
    const html = template.content.cloneNode(true);

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "js/components/ModalElement/ProfileText/profile-text.css";

    this.#shadow.append(css, html);
  }
}
