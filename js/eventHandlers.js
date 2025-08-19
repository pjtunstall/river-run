export function createEventHandlers({
  physics,
  helpModal,
  leftModal,
  rightModal,
}) {
  let isHelpModalOpen = true;
  let isLeftModalOpen = false;
  let isRightModalOpen = false;
  let resizeTimeout = null;
  let rightArrowHeld = false;
  let leftArrowHeld = false;
  let touchStartY = null;

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
          // Mustn't close the help modal before checking if it's open!
          closeModals();
        } else {
          // But if it's one of the other modals that's open, return early to prevent further modals from opening.
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
      const isMobile =
        window.innerWidth <= 768 &&
        window.innerHeight <= 1024 &&
        "ontouchstart" in window;
      if (isMobile) return;

      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) {
        closeModals();
      } else {
        openHelpModal();
      }
    },

    handleScroll(e) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;

      let direction = 0;
      direction = e.deltaY < 0 ? 1 : -1;

      if (direction !== 0) {
        physics.setAcceleration(direction);

        setTimeout(() => {
          physics.setAcceleration(0);
        }, 500);
      }
    },

    handleTouchStart(e) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      touchStartY = e.touches[0].clientY;
    },

    handleTouchEnd(e) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      if (touchStartY === null) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY;

      let direction = 0;
      if (Math.abs(deltaY) > 30) {
        // Small threshold so a tap isn’t treated as a flick.
        direction = deltaY < 0 ? -1 : 1;
      }

      physics.setAcceleration(direction);
      setTimeout(() => {
        physics.setAcceleration(0);
      }, 500);

      touchStartY = null;
    },

    handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        window.location.reload();
      }, 200);
    },

    handleRepoClick(e) {
      e.stopPropagation();
      const url = e.currentTarget.dataset.repo;
      window.open(url, "_blank", "noopener");
    },

    handleMilestoneClick(e) {
      e.stopPropagation();
      const label = e.currentTarget.querySelector(".label");
      if (!label) return;
      label.classList.toggle("visible");
    },
  };
}
