export async function loadModalLinkFooterTemplate() {
  const res = await fetch(
    "./components/ModalElement/footers/ModalLinkFooter/modal-link-footer.html"
  );
  const text = await res.text();
  document.body.insertAdjacentHTML("beforeend", text);
}
