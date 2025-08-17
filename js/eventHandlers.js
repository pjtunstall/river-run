export function createEventHandlers(physics, helpModal) {
  let isHelpModalOpen;

  const openHelpModal = () => {
    helpModal.classList.add("show");
    isHelpModalOpen = true;
    physics.setAcceleration(0);
  };

  const closeModals = () => {
    helpModal.classList.remove("show");
    isHelpModalOpen = false;
    physics.setAcceleration(0);
  };

  openHelpModal();

  return {
    openHelpModal,
    closeModals,

    handleKeyDown(e) {
      if (e.key === "ArrowRight") openHelpModal();
      else if (isHelpModalOpen) closeModals();

      if (e.key === "ArrowUp") physics.setAcceleration(1);
      else if (e.key === "ArrowDown") physics.setAcceleration(-1);
    },

    handleKeyUp(e) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown")
        physics.setAcceleration(0);
    },

    handleResize() {
      window.location.reload();
    },
  };
}
