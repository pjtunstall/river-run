export async function loadProjectsBodyTemplate() {
  const res = await fetch(
    "/js/components/ModalElement/ProjectsBody/projects-body-template.html"
  );
  const text = await res.text();
  document.body.insertAdjacentHTML("beforeend", text);
}
