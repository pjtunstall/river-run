export class CompassRose extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        position: absolute;
        z-index: 10;
        left: 50%;
        transform: translateX(200px);
        top: 1rem;
        width: 6rem;
        height: 6rem;
        filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.8));
        cursor: pointer;
        /* Remove transition to prevent sliding effect */
      }

      .compass-text {
        font-size: 24px;
        font-weight: bold;
        fill: #3c2915;
        text-anchor: middle;
      }

      :host(:hover) {
        transform: translateX(200px) scale(1.1);
        transition: transform 0.3s ease; /* Only animate on hover */
      }

      @media (max-width: 768px) {
        :host {
          transform: translateX(100px);
        }

        :host(:hover) {
          transform: translateX(100px) scale(1.1);
        }
      }

      @media (max-width: 768px) and (max-aspect-ratio: 3/4) {
        :host {
          width: min(25vw, 8rem);
          height: min(25vw, 8rem);
        }
      }
    `;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 180 180");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    svg.innerHTML = `
      <circle cx="90" cy="90" r="85" fill="#d6c2a1" stroke="#6b5537" stroke-width="3"/>
      <g fill="#8b7047">
        <polygon points="90,10 99,81 90,90 81,81" />
        <polygon points="142,38 99,81 90,90 81,81" />
        <polygon points="170,90 99,99 90,90 99,81" />
        <polygon points="142,142 99,99 90,90 99,81" />
        <polygon points="90,170 81,99 90,90 99,99" />
        <polygon points="38,142 81,99 90,90 81,81" />
        <polygon points="10,90 81,81 90,90 81,99" />
        <polygon points="38,38 81,81 90,90 99,81" />
      </g>
      <g fill="#3c2915">
        <polygon points="90,14 96,85 90,154 84,85" />
        <polygon points="166,90 96,96 14,90 84,84" />
      </g>
      <circle cx="90" cy="90" r="7" fill="#3c2915"/>
      <circle cx="90" cy="90" r="4" fill="#d6c2a1"/>
      <g class="compass-text">
        <text x="68" y="35">Fut</text>
        <text x="112" y="35">ure</text>
        <text x="72" y="160">Pa</text>
        <text x="104" y="160">st</text>
        <text x="145" y="80">Se</text>
        <text x="145" y="112">lf</text>
        <text x="35" y="80">Wo</text>
        <text x="35" y="112">rk</text>
      </g>
    `;

    // Add click event listener to forward clicks to the host element.
    svg.addEventListener("click", (e) => {
      e.stopPropagation();
      // Dispatch a custom event that bubbles up from the host element.
      this.dispatchEvent(
        new CustomEvent("compass-click", {
          bubbles: true,
          composed: true, // This allows the event to cross shadow DOM boundaries.
        })
      );
    });

    shadow.appendChild(style);
    shadow.appendChild(svg);
  }
}
