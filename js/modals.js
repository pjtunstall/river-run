export async function loadModalBodies() {
  const slots = document.querySelectorAll('[slot="body"][data-body-src]');
  for (const slot of slots) {
    const url = slot.getAttribute("data-body-src");
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`Failed to load ${url}: ${resp.status}`);
      const html = await resp.text();
      slot.innerHTML = html;
    } catch (err) {
      console.error(err);
      slot.innerHTML = "<p>Failed to load content.</p>";
    }
  }
}

class AppModal extends HTMLElement {
  connectedCallback() {
    this._modal = document.createElement("div");
    this._modal.className = "modal";
    const bodySlot = this.querySelector('[slot="body"]');
    const footerSlot = this.querySelector('[slot="footer"]');
    const bodyHTML = bodySlot ? bodySlot.outerHTML : "";
    const footerHTML = footerSlot ? footerSlot.outerHTML : "";
    this._modal.innerHTML = `
      <div class="modal-content">
        <button class="close-button">&times;</button>
        <div class="modal-header">
          <h2 class="modal-title">${this.getAttribute("title") || ""}</h2>
        </div>
        <div class="modal-body">
          ${bodyHTML}
          <hr />
          ${footerHTML}
        </div>
      </div>
    `;
    this.appendChild(this._modal);
    this._modal.querySelector(".close-button").addEventListener("click", () => {
      this.hide();
      this.dispatchEvent(new CustomEvent("modal-closed", { detail: this.id }));
    });
  }

  show() {
    this._modal.classList.add("show");
  }

  hide() {
    this._modal.classList.remove("show");
  }
}

customElements.define("app-modal", AppModal);
