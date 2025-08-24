export async function loadModalElementTemplate() {
  const res = await fetch("/js/components/ModalElement/modal-element.html");
  const text = await res.text();
  document.body.insertAdjacentHTML("beforeend", text);
}
