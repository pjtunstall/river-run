export class CompassRose extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const cssPath = "js/components/CompassRose/compass-rose.css";
    const svgPath = "js/components/CompassRose/compass-rose.svg";

    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", cssPath);

    const svgResponse = await fetch(svgPath);
    const svgContent = await svgResponse.text();

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 180 180");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.innerHTML = svgContent;

    svg.addEventListener("click", (e) => {
      e.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("compass-click", {
          bubbles: true,
          composed: true,
        })
      );
    });

    this.shadowRoot.append(link, svg);
  }
}
