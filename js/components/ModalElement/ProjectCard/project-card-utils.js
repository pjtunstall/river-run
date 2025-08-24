export async function loadProjectCardTemplate() {
  const response = await fetch(
    "/js/components/ModalElement/ProjectCard/project-card-template.html"
  );
  const htmlText = await response.text();
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlText;
  const template = tempDiv.querySelector("#project-card-template");
  if (!template) throw new Error("#project-card-template not found");
  document.body.appendChild(template);
}
