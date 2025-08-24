export async function loadProjectsGridTemplate() {
  const res = await fetch(
    "/js/components/ModalElement/ProjectsGrid/projects-grid-template.html"
  );
  const text = await res.text();
  document.body.insertAdjacentHTML("beforeend", text);
}
