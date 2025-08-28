export class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL("project-card.css", import.meta.url).href;
    this.shadowRoot.appendChild(link);

    const template = document.getElementById("project-card");
    if (!template) {
      console.error("Template #project-card not found");
      return;
    }

    const content = template.content.cloneNode(true);

    const linkEl = content.querySelector("a");
    if (this.hasAttribute("href")) linkEl.href = this.getAttribute("href");

    const img = content.querySelector("img");
    if (this.hasAttribute("img-src")) img.src = this.getAttribute("img-src");
    if (this.hasAttribute("img-alt")) img.alt = this.getAttribute("img-alt");

    const title = content.querySelector(".project-title span:first-child");
    if (this.hasAttribute("project-title"))
      title.textContent = this.getAttribute("project-title");

    const description = content.querySelector(".project-description");
    if (this.hasAttribute("description"))
      description.textContent = this.getAttribute("description");

    const year = content.querySelector(".project-year");
    if (this.hasAttribute("year")) year.textContent = this.getAttribute("year");

    if (this.hasAttribute("tech")) {
      const techContainer = content.querySelector(".project-tech");
      techContainer.replaceChildren();
      this.getAttribute("tech")
        .split(",")
        .forEach((tech, i) => {
          const span = document.createElement("span");
          span.className = "tech-tag" + (i === 0 ? " primary" : "");
          span.textContent = tech.trim();
          techContainer.appendChild(span);
        });
    }

    if (this.hasAttribute("repo")) {
      const footer = content.querySelector(".project-footer");
      if (footer) {
        const repoLink = document.createElement("a");
        repoLink.href = this.getAttribute("repo");
        repoLink.textContent = "Repo";
        repoLink.className = "repo-link";
        repoLink.target = "_blank";
        footer.appendChild(repoLink);
      }
    }

    this.shadowRoot.appendChild(content);

    const cardRoot = this.shadowRoot.querySelector(".project-card");
    cardRoot.addEventListener("click", (e) => {
      if (e.target.closest(".repo-link")) {
        e.preventDefault();
        this.dispatchEvent(
          new CustomEvent("repo-click", {
            detail: { repo: this.getAttribute("repo") },
            bubbles: true,
            composed: true,
          })
        );
        return;
      }

      if (this.id === "river-run-card") {
        e.preventDefault();
        this.dispatchEvent(
          new CustomEvent("river-run-click", { bubbles: true, composed: true })
        );
        return;
      }
    });
  }
}
