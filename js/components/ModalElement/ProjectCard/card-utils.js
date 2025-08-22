export async function loadProjectTemplate() {
  const response = await fetch(
    "/js/components/ModalElement/ProjectCard//project-template.html"
  );
  const htmlText = await response.text();
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlText;
  const template = tempDiv.querySelector("#project-template");
  if (!template) throw new Error("#project-template not found");
  document.body.appendChild(template);
}
