export function addEventListeners(handlers, milestones, modals, arrows) {
  const { helpModal, leftModal, rightModal } = modals;
  const [leftArrow, rightArrow] = arrows;
  const compass = document.querySelector(".compass");

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
  milestones.forEach((milestone) => {
    milestone.element.addEventListener("click", handlers.handleMilestoneClick);
  });
  compass.addEventListener("click", handlers.handleCompassClick);
  leftArrow.addEventListener("click", handlers.handleNavLeft);
  rightArrow.addEventListener("click", handlers.handleNavRight);
  helpModal.addEventListener("modal-closed", (e) => {
    handlers.handleUpdateCloseStateOfModal(e.detail);
  });
  leftModal.addEventListener("modal-closed", (e) => {
    handlers.handleUpdateCloseStateOfModal(e.detail);
  });
  rightModal.addEventListener("modal-closed", (e) => {
    handlers.handleUpdateCloseStateOfModal(e.detail);
  });

  leftModal.addEventListener("click", (e) => {
    const card = e.target.closest("#river-run-link");
    if (!card) return;
    if (e.target.closest(".repo-link")) return;
    handlers.handleRiverRunLinkClick(e);
  });
}
