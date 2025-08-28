export function createEventHandlers({ world, modals, arrows, worldElement }) {
  const physics = world.physics;
  const { helpModal, leftModal, rightModal } = modals;
  let isHelpModalOpen = false;
  let isLeftModalOpen = false;
  let isRightModalOpen = false;
  let resizeTimeout = null;
  let rightArrowHeld = false;
  let leftArrowHeld = false;
  let touchStartY = null;
  let touchLastY = null;
  let touchStartTime = null;
  let scrollResetTimeout;

  const openHelpModal = () => {
    helpModal.show();
    isHelpModalOpen = true;
    physics.setAcceleration(0);
    // Hide arrows when a modal opens.
    arrows.forEach((arrow) => arrow.hide());
  };

  const openLeftModal = () => {
    leftModal.show();
    isLeftModalOpen = true;
    leftArrowHeld = true; // Prevent re-opening immediately.
    physics.setAcceleration(0);
    arrows.forEach((arrow) => arrow.hide());
  };

  const openRightModal = () => {
    rightModal.show();
    isRightModalOpen = true;
    rightArrowHeld = true; // Prevent re-opening immediately.
    physics.setAcceleration(0);
    arrows.forEach((arrow) => arrow.hide());
  };

  const closeModals = () => {
    [helpModal, leftModal, rightModal].forEach((modal) => modal.hide());
    isHelpModalOpen = false;
    isLeftModalOpen = false;
    isRightModalOpen = false;
    // Show arrows when all modals are closed.
    arrows.forEach((arrow) => arrow.show());
    worldElement.focus();
  };

  openHelpModal();

  return {
    handleUpdateCloseStateOfModal(modalId) {
      if (modalId === "help-modal") isHelpModalOpen = false;
      if (modalId === "projects-modal") isLeftModalOpen = false;
      if (modalId === "profile-modal") isRightModalOpen = false;

      // If all modals are closed, show the arrows.
      if (!isHelpModalOpen && !isLeftModalOpen && !isRightModalOpen) {
        arrows.forEach((arrow) => arrow.show());
      }
    },

    handleRiverRunLinkClick(e) {
      e.preventDefault();
      e.stopPropagation();
      closeModals();
    },

    handleKeyDown(detail) {
      // If any modal is open, any key press closes it and does nothing else.
      if (isHelpModalOpen || isLeftModalOpen || isRightModalOpen) {
        closeModals();
        return;
      }

      if (detail.key === "ArrowRight" && !rightArrowHeld) {
        openRightModal();
      } else if (detail.key === "ArrowLeft" && !leftArrowHeld) {
        openLeftModal();
      } else if (detail.key === "ArrowUp") {
        physics.setAcceleration(1);
      } else if (detail.key === "ArrowDown") {
        physics.setAcceleration(-1);
      }
    },

    handleKeyUp(detail) {
      if (detail.key === "ArrowUp" || detail.key === "ArrowDown") {
        physics.setAcceleration(0);
      }
      if (detail.key === "ArrowRight") rightArrowHeld = false;
      if (detail.key === "ArrowLeft") leftArrowHeld = false;
    },

    handleCompassClick() {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      openHelpModal();
    },

    handleScroll(detail) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;

      // Added damping to prevent overshooting. Adjust the 0.1 value to tune sensitivity.
      const scrollDamping = 0.1;
      const direction = detail.deltaY * scrollDamping < 0 ? 1 : -1;

      physics.setAcceleration(direction);
      // The shorter the timeout, the more responsive the controls.
      clearTimeout(scrollResetTimeout);
      scrollResetTimeout = setTimeout(() => physics.setAcceleration(0), 150);
    },

    handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => window.location.reload(), 200);
    },

    handleRepoClick(e) {
      e.stopPropagation();
      // Read the repo URL from the event detail passed by ProjectCard.
      const url = e.detail.repo;
      if (url) {
        window.open(url, "_blank", "noopener");
      }
    },

    handleTouchStart(detail) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      world.isDragging = true;
      physics.velocity = 0;
      physics.acceleration = 0;
      touchStartY = detail.clientY;
      touchLastY = touchStartY;
      touchStartTime = Date.now();
    },

    handleTouchMove(detail) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      if (touchLastY === null) return;
      const currentY = detail.clientY;
      const delta = currentY - touchLastY;
      world.changePositionBy(delta);
      touchLastY = currentY;
    },

    handleTouchEnd(detail) {
      world.isDragging = false;

      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) {
        touchStartY = null;
        touchLastY = null;
        return;
      }

      if (touchStartY === null) return;

      const touchEndY = detail.clientY;
      const deltaY = touchEndY - touchStartY;
      const swipeTime = Date.now() - touchStartTime;
      physics.setVelocity((150 * deltaY) / Math.max(swipeTime, 1) / 16);

      touchStartY = null;
      touchLastY = null;
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
