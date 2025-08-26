export function addEventListeners({ handlers, modals, worldElement }) {
  const { helpModal, leftModal, rightModal } = modals;
  const compass = document.getElementById("compass");

  window.addEventListener("resize", handlers.handleResize);
  window.addEventListener("keydown", (e) => handlers.handleKeyDown(e));
  window.addEventListener("keyup", (e) => handlers.handleKeyUp(e));

  document.addEventListener(
    "river-run-click",
    handlers.handleRiverRunLinkClick
  );
  document.addEventListener("repo-click", handlers.handleRepoClick);
  document.addEventListener("nav-arrow-click", (e) => {
    if (e.detail.direction === "left") {
      handlers.handleNavLeft(e);
    } else if (e.detail.direction === "right") {
      handlers.handleNavRight(e);
    }
  });

  worldElement.addEventListener("world-wheel", (e) =>
    handlers.handleScroll(e.detail)
  );
  worldElement.addEventListener("world-touchstart", (e) =>
    handlers.handleTouchStart(e.detail)
  );
  worldElement.addEventListener("world-touchmove", (e) =>
    handlers.handleTouchMove(e.detail)
  );
  worldElement.addEventListener("world-touchend", (e) =>
    handlers.handleTouchEnd(e.detail)
  );

  compass.addEventListener("compass-click", handlers.handleCompassClick);
  helpModal.addEventListener("modal-closed", (e) =>
    handlers.handleUpdateCloseStateOfModal(e.detail)
  );
  leftModal.addEventListener("modal-closed", (e) =>
    handlers.handleUpdateCloseStateOfModal(e.detail)
  );
  rightModal.addEventListener("modal-closed", (e) =>
    handlers.handleUpdateCloseStateOfModal(e.detail)
  );
}
