export async function loadModalQuoteFooterTemplate() {
  const res = await fetch(
    "./js/components/ModalElement/footers/ModalQuoteFooter/modal-quote-footer.html"
  );
  const text = await res.text();
  document.body.insertAdjacentHTML("beforeend", text);
}
