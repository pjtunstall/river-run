export class ModalQuoteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <p class="modal-footer">
        <em>${this.textContent}</em>
      </p>
    `;
  }
}

export class ModalLinkFooter extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute("href");
    const text = this.textContent || this.getAttribute("text");

    this.innerHTML = `
      <div class="modal-footer" style="text-align: center">
        <a 
          href="${href}" 
          class="footer-link" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          ${text}
        </a>
      </div>
    `;
  }
}
