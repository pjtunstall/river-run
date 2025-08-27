export class CompassRose extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const cssPath = "./js/components/CompassRose//compass-rose.css";
    const svgPath = "./js/components/CompassRose/compass-rose.svg";

    const css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", cssPath);

    let svgContent = null;
    try {
      const svgResponse = await fetch(svgPath);
      if (!svgResponse.ok) {
        throw new Error(
          `Failed to fetch SVG: ${svgResponse.status} ${svgResponse.statusText}`
        );
      }
      svgContent = await svgResponse.text();
    } catch (err) {
      console.error("Error loading SVG:", err);
    }

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

    this.shadowRoot.append(css, svg);
  }
}
