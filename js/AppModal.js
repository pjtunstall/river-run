export async function loadModalTemplate() {
  const res = await fetch("/app-modal-template.html");
  const text = await res.text();
  document.body.insertAdjacentHTML("beforeend", text);
}

export async function loadModalBodies() {
  const bodyContents = document.querySelectorAll(
    ".modal-body-content[data-body-src]"
  );
  for (const body of bodyContents) {
    const url = body.getAttribute("data-body-src");
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`Failed to load ${url}: ${resp.status}`);
      body.innerHTML = await resp.text();
    } catch (err) {
      console.error(err);
      body.innerHTML = "<p>Failed to load content.</p>";
    }
  }
}

export class AppModal extends HTMLElement {
  #modal;

  connectedCallback() {
    const template = document.getElementById("app-modal-template");
    this.#modal = template.content.cloneNode(true);
    this.appendChild(this.#modal);

    const bodyPlaceholder = this.querySelector(".modal-body-placeholder");
    const bodyContent = this.querySelector(".modal-body-content");
    if (bodyPlaceholder && bodyContent)
      bodyPlaceholder.appendChild(bodyContent);

    const footerPlaceholder = this.querySelector(".modal-footer-placeholder");
    const footer = this.querySelector(".modal-footer");
    if (footerPlaceholder && footer) footerPlaceholder.appendChild(footer);

    const titleElem = this.querySelector(".modal-title");
    if (titleElem) titleElem.textContent = this.getAttribute("title") || "";

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
