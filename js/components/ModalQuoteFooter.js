export class ModalQuoteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <p class="modal-footer">
        <em>${this.textContent}</em>
      </p>
    `;
  }
}
