let viewHeight = window.innerHeight;
let lastTimestamp = 0;

const numTiles = 3;
const gameContainer = document.getElementById("game");
let tiles = Array.from({ length: numTiles }, (_, i) => {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.id = `tile-${i}`;
  tile.style.backgroundImage = `url(river-${i}.jpg)`;
  gameContainer.appendChild(tile);
  return tile;
});

let yPositions = tiles.map(
  (_, i) => (i - Math.floor(tiles.length / 2)) * viewHeight
);

tiles.forEach((tile, i) => {
  tile.style.transform = `translateY(${yPositions[i]}px)`;
});

let velocity = 0;
let acceleration = 0;
const maxSpeed = 32;
const totalHeight = viewHeight * tiles.length;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") acceleration = 1;
  else if (e.key === "ArrowDown") acceleration = -1;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") acceleration = 0;
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => location.reload(), 200);
});

requestAnimationFrame(update);

function update(timestamp) {
  requestAnimationFrame(update);

  if (timestamp - lastTimestamp < 16) return;
  lastTimestamp = timestamp;

  velocity += acceleration;
  velocity = Math.max(-maxSpeed, Math.min(maxSpeed, velocity));
  if (acceleration === 0) velocity *= 0.95;

  yPositions.forEach((pos, i) => {
    yPositions[i] += velocity;

    if (yPositions[i] >= viewHeight) yPositions[i] -= totalHeight;
    if (yPositions[i] <= -viewHeight) yPositions[i] += totalHeight;

    tiles[i].style.transform = `translateY(${Math.round(yPositions[i])}px)`;
  });
}
