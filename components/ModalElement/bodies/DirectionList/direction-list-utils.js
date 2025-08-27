export async function loadDirectionListTemplate() {
  const res = await fetch(
    "./components/ModalElement/bodies/DirectionList/direction-list.html"
  );
  const text = await res.text();
  document.body.insertAdjacentHTML("beforeend", text);
}
