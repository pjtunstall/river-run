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
  let touchLastY = null;
  let touchStartTime = null;
  let velocity = 0;
  let momentumId = null;

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
        if (isHelpModalOpen) {
          closeModals();
        } else {
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
      if (e.key === "ArrowRight") rightArrowHeld = false;
      else if (e.key === "ArrowLeft") leftArrowHeld = false;
    },

    handleCompassClick() {
      if (
        isMobileDevice() ||
        isHelpModalOpen ||
        isRightModalOpen ||
        isLeftModalOpen
      )
        return;
      openHelpModal();
    },

    handleScroll(e) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      const direction = e.deltaY < 0 ? 1 : -1;
      if (direction !== 0) {
        physics.setAcceleration(direction);
        setTimeout(() => physics.setAcceleration(0), 300);
      }
    },

    handleTouchStart(e) {
      e.preventDefault();
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      if (momentumId) {
        cancelAnimationFrame(momentumId);
        momentumId = null;
      }
      touchStartY = e.touches[0].clientY;
      touchLastY = touchStartY;
      touchStartTime = Date.now();
    },

    handleTouchMove(e) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      if (touchLastY === null) return;
      const currentY = e.touches[0].clientY;
      const delta = currentY - touchLastY;
      physics.setAcceleration(delta * 0.5);
      touchLastY = currentY;
    },

    handleTouchEnd(e) {
      e.preventDefault();
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      if (touchStartY === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY;
      const swipeTime = Date.now() - touchStartTime;
      velocity = deltaY / Math.max(swipeTime, 1);
      function momentumStep() {
        if (Math.abs(velocity) < 0.01) {
          physics.setAcceleration(0);
          return;
        }
        physics.setAcceleration(velocity * 15);
        velocity *= 0.95;
        momentumId = requestAnimationFrame(momentumStep);
      }
      momentumStep();
      touchStartY = null;
      touchLastY = null;
    },

    handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => window.location.reload(), 200);
    },

    handleRepoClick(e) {
      e.preventDefault();
      e.stopPropagation();
      const url = e.currentTarget.dataset.repo;
      window.open(url, "_blank", "noopener");
    },

    handleTouchStart(e) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      if (momentumId) {
        cancelAnimationFrame(momentumId);
        momentumId = null;
      }
      touchStartY = e.touches[0].clientY;
      touchLastY = touchStartY;
      touchStartTime = Date.now();
    },

    handleTouchMove(e) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      if (touchLastY === null) return;
      const currentY = e.touches[0].clientY;
      const delta = currentY - touchLastY;
      physics.setAcceleration(delta * 0.5);
      touchLastY = currentY;
    },

    handleTouchEnd(e) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      if (touchStartY === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY;
      const swipeTime = Date.now() - touchStartTime;
      velocity = deltaY / Math.max(swipeTime, 1);
      function momentumStep() {
        if (Math.abs(velocity) < 0.01) {
          physics.setAcceleration(0);
          return;
        }
        physics.setAcceleration(velocity * 15);
        velocity *= 0.95;
        momentumId = requestAnimationFrame(momentumStep);
      }
      momentumStep();
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
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
