export function createEventHandlers(physics) {
  return {
    handleKeyDown(e) {
      if (e.key === "ArrowUp") physics.setAcceleration(1);
      else if (e.key === "ArrowDown") physics.setAcceleration(-1);
    },

    handleKeyUp(e) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown")
        physics.setAcceleration(0);
    },

    handleResize() {
      let resizeTimeout;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => location.reload(), 200);
    },
  };
}
