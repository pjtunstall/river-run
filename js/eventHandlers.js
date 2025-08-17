export function createEventHandlers(physics, helpModal, infoModal) {
  let isHelpModalOpen = false;
  let isInfoModalOpen = false;
  let resizeTimeout;

  const openHelpModal = () => {
    helpModal.classList.add("show");
    isHelpModalOpen = true;
    physics.setAcceleration(0);
  };

  const openInfoModal = () => {
    infoModal.classList.add("show");
    isInfoModalOpen = true;
    physics.setAcceleration(0);
  };

  const closeModals = () => {
    helpModal.classList.remove("show");
    infoModal.classList.remove("show");
    isHelpModalOpen = false;
    isInfoModalOpen = false;
  };

  openHelpModal();

  return {
    openHelpModal,
    closeModals,

    handleKeyDown(e) {
      if (isHelpModalOpen || isInfoModalOpen) {
        closeModals();
      }

      if (e.key === "ArrowRight" && !isHelpModalOpen) openHelpModal();
      else if (e.key === "ArrowLeft" && !isInfoModalOpen) openInfoModal();

      if (e.key === "ArrowUp") physics.setAcceleration(1);
      else if (e.key === "ArrowDown") physics.setAcceleration(-1);
    },

    handleKeyUp(e) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown")
        physics.setAcceleration(0);
    },

    handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        window.location.reload();
      }, 200);
    },
  };
}
