import { handleKeyDown, handleKeyUp, handleResize } from "./eventHandlers.js";
import { gameLoop } from "./gameLoop.js";

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
window.addEventListener("resize", handleResize);

requestAnimationFrame(gameLoop);
