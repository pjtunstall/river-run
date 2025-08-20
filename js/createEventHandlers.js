export function createEventHandlers({
  physics,
  helpModal,
  leftModal,
  rightModal,
}) {
  let isHelpModalOpen = false;
  let isLeftModalOpen = false;
  let isRightModalOpen = false;
  let resizeTimeout = null;
  let rightArrowHeld = false;
  let leftArrowHeld = false;
  let touchStartY = null;
  let touchStartTime = null;

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

  return {
    handleClickToClose(e) {
      e.preventDefault();
      e.stopPropagation();
      closeModals();
    },

    handleRiverRunLinkClick(e) {
      e.preventDefault();
      e.stopPropagation();
      closeModals();
    },

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

    handleCompassClick() {
      if (
        isMobileDevice() ||
        isHelpModalOpen ||
        isRightModalOpen ||
        isLeftModalOpen
      ) {
        return;
      }

      openHelpModal();
    },

    // Trackpad and mouse wheel.
    handleScroll(e) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;

      let direction = 0;
      direction = e.deltaY < 0 ? 1 : -1;

      if (direction !== 0) {
        physics.setAcceleration(direction);

        setTimeout(() => {
          physics.setAcceleration(0);
        }, 300);
      }
    },

    // Start swipe to scroll.
    handleTouchStart(e) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    },

    // End swipe to scroll.
    handleTouchEnd(e) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      if (touchStartY === null) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY;
      const swipeTime = Date.now() - touchStartTime;

      // Threshold so a tap isn't treated as a flick.
      if (Math.abs(deltaY) > 30) {
        // Scale based on distance but cap it for control.
        const maxDistance = 200;
        const deltaBoundedAbove = Math.min(maxDistance, deltaY);
        const clampedDelta = Math.max(-maxDistance, deltaBoundedAbove);
        const baseAcceleration = (clampedDelta / maxDistance) * 0.4; // Gentler base than for trackpad and wheel.

        // Adjust for quick swipes vs slow drags.
        const swipeSpeed = Math.abs(deltaY) / Math.max(swipeTime, 50);
        const boost = Math.min(2, swipeSpeed / 2); // Cap the velocity boost.

        const finalAcceleration = baseAcceleration * boost;

        physics.setAcceleration(finalAcceleration);
        setTimeout(() => {
          physics.setAcceleration(0);
        }, 300);
      }

      touchStartY = null;
    },

    handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        window.location.reload();
      }, 200);
    },

    handleRepoClick(e) {
      e.preventDefault();
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

    handleNavLeft(e) {
      e.preventDefault();
      e.stopPropagation();

      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) {
        closeModals();
        return;
      }

      openLeftModal();
    },

    handleNavRight(e) {
      e.preventDefault();
      e.stopPropagation();

      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) {
        closeModals();
        return;
      }

      openRightModal();
    },
  };
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
