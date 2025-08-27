export async function loadProfileTextTemplate() {
  const res = await fetch(
    "./components/ModalElement/bodies/ProfileText/profile-text.html"
  );
  const text = await res.text();
  document.body.insertAdjacentHTML("beforeend", text);
}
