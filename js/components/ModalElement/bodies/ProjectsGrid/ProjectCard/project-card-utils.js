export async function loadProjectCardTemplate() {
  const response = await fetch(
    "./js/components/ModalElement/bodies/ProjectsGrid/ProjectCard/project-card.html"
  );
  const htmlText = await response.text();
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlText;
  const template = tempDiv.querySelector("#project-card");
  if (!template) throw new Error("#project-card not found");
  document.body.appendChild(template);
}
