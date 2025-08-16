let viewHeight = window.innerHeight;
let lastTimestamp = 0;

let images = ["river0.jpg", "river1.jpg", "river2.jpg"];
let tiles = [
  document.getElementById("tile-0"),
  document.getElementById("tile-1"),
  document.getElementById("tile-2"),
];

let yPositions = [-viewHeight, 0, viewHeight];
let tileIndices = [0, 1, 2];

tiles.forEach((tile, i) => {
  tile.style.backgroundImage = `url(${images[tileIndices[i]]})`;
  tile.style.transform = `translateY(${yPositions[i]}px)`;
});

let velocity = 0;
let acceleration = 0;
const maxSpeed = 32;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    acceleration = 1;
  } else if (e.key === "ArrowDown") {
    acceleration = -1;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    acceleration = 0;
  }
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    location.reload();
  }, 200);
});

requestAnimationFrame(update);

function update(timestamp) {
  requestAnimationFrame(update);

  if (timestamp - lastTimestamp < 16) return;
  lastTimestamp = timestamp;

  velocity += acceleration;
  if (velocity > maxSpeed) velocity = maxSpeed;
  if (velocity < -maxSpeed) velocity = -maxSpeed;
  if (acceleration === 0) velocity *= 0.95;

  for (let i = 0; i < tiles.length; i++) {
    yPositions[i] += velocity;

    if (yPositions[i] >= viewHeight) {
      yPositions[i] -= viewHeight * tiles.length;
      tileIndices[i] = (tileIndices[i] - 1 + images.length) % images.length;
      tiles[i].style.backgroundImage = `url(${images[tileIndices[i]]})`;
    }

    if (yPositions[i] <= -viewHeight) {
      yPositions[i] += viewHeight * tiles.length;
      tileIndices[i] = (tileIndices[i] + 1) % images.length;
      tiles[i].style.backgroundImage = `url(${images[tileIndices[i]]})`;
    }

    tiles[i].style.transform = `translateY(${Math.round(yPositions[i])}px)`;
  }
}
