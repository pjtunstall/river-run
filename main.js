let viewHeight = window.innerHeight;
let scrollDirection = 0;
let lastTimestamp = 0;
let speed = 16;
let indexTop = 0;
let yPositions = [-viewHeight, 0, viewHeight];

images = Array(3).fill("river.jpg");
let tiles = [
  document.getElementById("bg1"),
  document.getElementById("bg2"),
  document.getElementById("bg3"),
];
tiles.forEach((tile, i) => {
  tile.style.backgroundImage = `url(${images[i % images.length]})`;
  tile.style.top = yPositions[i] + "px";
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    scrollDirection = -1;
  } else if (e.key === "ArrowDown") {
    scrollDirection = 1;
  } else scrollDirection = 0;
});

requestAnimationFrame(update);

function update(timestamp) {
  requestAnimationFrame(update);
  if (timestamp - lastTimestamp < 16) return;
  lastTimestamp = timestamp;

  for (let i = 0; i < 3; i++) {
    if (scrollDirection > 0) {
      yPositions[i] -= speed;
    } else if (scrollDirection < 0) {
      yPositions[i] += speed;
    } else {
      yPositions[i] += 0;
    }

    if (yPositions[i] >= viewHeight) {
      // This tile has moved down off-screen, so put it above.
      yPositions[i] -= viewHeight * 3;
      indexTop = (indexTop - 1 + images.length) % images.length;
      tiles[i].style.backgroundImage = `url(${images[indexTop]})`;
    }
    if (yPositions[i] <= -viewHeight) {
      // This tile has moved up off-screen, so put it below.
      yPositions[i] += viewHeight * 3;
      indexTop = (indexTop + 1) % images.length;
      tiles[i].style.backgroundImage = `url(${images[indexTop]})`;
    }
    tiles[i].style.top = yPositions[i] + "px";
  }
}
