export function createEventHandlers({
  physics,
  helpModal,
  leftModal,
  rightModal,
}) {
  let isHelpModalOpen = true;
  let isLeftModalOpen = false;
  let isRightModalOpen = false;
  let resizeTimeout;
  let rightArrowHeld = false;
  let leftArrowHeld = false;

  const openHelpModal = () => {
    helpModal.classList.add("show");
    isHelpModalOpen = true;
    physics.setAcceleration(0);
  };

  const openLeftModal = () => {
    leftModal.classList.add("show");
    isLeftModalOpen = true;
    leftArrowHeld = true;
    physics.setAcceleration(0);
  };

  const openRightModal = () => {
    rightModal.classList.add("show");
    isRightModalOpen = true;
    rightArrowHeld = true;
    physics.setAcceleration(0);
  };

  const closeModals = () => {
    helpModal.classList.remove("show");
    leftModal.classList.remove("show");
    rightModal.classList.remove("show");
    isHelpModalOpen = false;
    isLeftModalOpen = false;
    isRightModalOpen = false;
  };

  openHelpModal();

  return {
    openHelpModal,
    closeModals,

    handleKeyDown(e) {
      if (isHelpModalOpen || isLeftModalOpen || isRightModalOpen) {
        // Allow user to go straight from help modal to one of the others.
        if (isHelpModalOpen) {
          closeModals();
        } else {
          // Otherwise, only open a modal if no other modal is open.
          closeModals();
          return;
        }
      }

      if (e.key === "ArrowRight" && !isRightModalOpen && !rightArrowHeld) {
        openRightModal();
        return;
      } else if (e.key === "ArrowLeft" && !isLeftModalOpen && !leftArrowHeld) {
        openLeftModal();
        return;
      } else {
        closeModals();
      }

      if (e.key === "ArrowUp") physics.setAcceleration(1);
      else if (e.key === "ArrowDown") physics.setAcceleration(-1);
      else openHelpModal();
    },

    handleKeyUp(e) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown")
        physics.setAcceleration(0);

      if (e.key === "ArrowRight") {
        rightArrowHeld = false;
      } else if (e.key === "ArrowLeft") {
        leftArrowHeld = false;
      }
    },

    handleClick() {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) {
        closeModals();
      } else {
        openHelpModal();
      }
    },

    handleScroll() {
      if (!isHelpModalOpen && !isRightModalOpen && !isLeftModalOpen) {
        openHelpModal();
      }
    },

    handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        window.location.reload();
      }, 200);
    },
  };
}
