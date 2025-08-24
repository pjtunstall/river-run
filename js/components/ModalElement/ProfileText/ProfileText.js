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

    this.#shadow.append(html);
  }
}
