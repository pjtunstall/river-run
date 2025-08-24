export function addEventListeners(handlers, milestones, modals) {
  const { helpModal, leftModal, rightModal } = modals;
  const compass = document.getElementById("compass");

  window.addEventListener("resize", handlers.handleResize);
  window.addEventListener("click", handlers.handleClick);
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
  document.querySelectorAll(".repo-link").forEach((link) => {
    link.addEventListener("click", handlers.handleRepoClick);
  });
  document.querySelectorAll(".close-button").forEach((button) => {
    button.addEventListener("click", handlers.handleClickToClose);
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
}
