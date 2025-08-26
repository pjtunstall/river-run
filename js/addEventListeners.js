export function addEventListeners(handlers, modals) {
  const { helpModal, leftModal, rightModal } = modals;
  const compass = document.getElementById("compass");

  // Window events.
  window.addEventListener("resize", handlers.handleResize);
  window.addEventListener("touchstart", handlers.handleTouchStart, {
    passive: true,
  });
  window.addEventListener("touchmove", handlers.handleTouchMove, {
    passive: true,
  });
  window.addEventListener("touchend", handlers.handleTouchEnd);

  window.addEventListener("wheel", handlers.handleScroll);
  document.addEventListener("keydown", handlers.handleKeyDown);
  document.addEventListener("keyup", handlers.handleKeyUp);

  // Catch custom events originating in web components and relay them to their logical event handlers.
  document.addEventListener("river-run-click", (e) => {
    handlers.handleRiverRunLinkClick(e);
  });
  document.addEventListener("repo-click", (e) => {
    window.open(e.detail.repo, "_blank");
  });
  document.addEventListener("nav-arrow-click", (e) => {
    switch (e.detail.direction) {
      case "left":
        handlers.handleNavLeft(e);
        break;
      case "right":
        handlers.handleNavRight(e);
        break;
    }
  });
  compass.addEventListener("compass-click", handlers.handleCompassClick);
  helpModal.addEventListener("modal-closed", (e) => {
    handlers.handleUpdateCloseStateOfModal(e.detail);
  });
  leftModal.addEventListener("modal-closed", (e) => {
    handlers.handleUpdateCloseStateOfModal(e.detail);
  });
  rightModal.addEventListener("modal-closed", (e) => {
    handlers.handleUpdateCloseStateOfModal(e.detail);
  });
}
