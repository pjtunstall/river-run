export async function loadProjectsGridTemplate() {
  const res = await fetch(
    "./js/components/ModalElement/bodies/ProjectsGrid/projects-grid-template.html"
  );
  const text = await res.text();
  document.body.insertAdjacentHTML("beforeend", text);
}
