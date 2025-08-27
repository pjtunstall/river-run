export async function loadModalLinkFooterTemplate() {
  const res = await fetch(
    "./js/components/ModalElement/footers/ModalLinkFooter/modal-link-footer.html"
  );
  const text = await res.text();
  document.body.insertAdjacentHTML("beforeend", text);
}
