export function createEventHandlers({ physics, world, modals, arrows }) {
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

  const openHelpModal = () => {
    helpModal.show();
    isHelpModalOpen = true;
    physics.setAcceleration(0);
    for (const arrow of arrows) {
      arrow.classList.remove("show");
      arrow.classList.add("hide");
    }
  };

  const openLeftModal = () => {
    leftModal.show();
    isLeftModalOpen = true;
    leftArrowHeld = true;
    physics.setAcceleration(0);
    for (const arrow of arrows) {
      arrow.classList.remove("show");
      arrow.classList.add("hide");
    }
  };

  const openRightModal = () => {
    rightModal.show();
    isRightModalOpen = true;
    rightArrowHeld = true;
    physics.setAcceleration(0);
    for (const arrow of arrows) {
      arrow.classList.remove("show");
      arrow.classList.add("hide");
    }
  };

  const closeModals = () => {
    [helpModal, leftModal, rightModal].forEach((modal, i) => {
      modal.hide();
    });
    isHelpModalOpen = false;
    isLeftModalOpen = false;
    isRightModalOpen = false;
    for (const arrow of arrows) {
      arrow.classList.remove("hide");
      arrow.classList.add("show");
    }
  };

  return {
    handleUpdateCloseStateOfModal(modalId) {
      if (modalId === "help-modal") isHelpModalOpen = false;
      else if (modalId === "projects-modal") isLeftModalOpen = false;
      else if (modalId === "profile-modal") isRightModalOpen = false;
      for (const arrow of arrows) {
        arrow.classList.remove("hide");
        arrow.classList.add("show");
      }
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
      world.isDragging = true;
      physics.velocity = 0;
      physics.acceleration = 0;
      touchStartY = e.touches[0].clientY;
      touchLastY = touchStartY;
      touchStartTime = Date.now();
    },

    handleTouchMove(e) {
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      if (touchLastY === null) return;
      const currentY = e.touches[0].clientY;
      const delta = currentY - touchLastY;
      world.changePositionBy(delta);
      touchLastY = currentY;
    },

    handleTouchEnd(e) {
      world.isDragging = false;
      if (isHelpModalOpen || isRightModalOpen || isLeftModalOpen) return;
      if (touchStartY === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY;
      const swipeTime = Date.now() - touchStartTime;
      physics.setVelocity((256 * deltaY) / Math.max(swipeTime, 1) / 16); // Pixels per frame.
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
