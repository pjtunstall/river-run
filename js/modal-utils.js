export async function loadModalTemplate() {
  const res = await fetch("/js/components/ModalElement/modal-template.html");
  const text = await res.text();
  document.body.insertAdjacentHTML("beforeend", text);
}

export async function loadModalBodies() {
  const bodyContents = document.querySelectorAll(
    ".modal-body-content[data-body-src]"
  );
  for (const body of bodyContents) {
    const url = body.getAttribute("data-body-src");
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`Failed to load ${url}: ${resp.status}`);
      body.innerHTML = await resp.text();
    } catch (err) {
      console.error(err);
      body.innerHTML = "<p>Failed to load content.</p>";
    }
  }
}
