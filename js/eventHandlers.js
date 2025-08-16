import { physics } from "./gameLoop.js";

export function handleKeyDown(e) {
  if (e.key === "ArrowUp") physics.setAcceleration(1);
  else if (e.key === "ArrowDown") physics.setAcceleration(-1);
}

export function handleKeyUp(e) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") physics.setAcceleration(0);
}

export function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => location.reload(), 200);
}
