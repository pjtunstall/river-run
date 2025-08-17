export function createEventHandlers(physics, modal) {
  let isModalOpen = false;

  const openModal = () => {
    modal.classList.add("show");
    isModalOpen = true;
    physics.setAcceleration(0);
  };

  const closeModal = () => {
    modal.classList.remove("show");
    isModalOpen = false;
    physics.setAcceleration(0);
  };

  return {
    openModal,
    closeModal,

    handleKeyDown(e) {
      if (e.key === "ArrowRight") openModal();
      else if (isModalOpen) closeModal();

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
