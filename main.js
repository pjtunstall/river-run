let viewHeight = window.innerHeight;
let lastTimestamp = 0;
let indexTop = 0;
let yPositions = [-viewHeight, 0, viewHeight];

let images = [];
for (let i = 0; i < 3; i++) {
  images.push(`river${i}.jpg`);
}
let tiles = [
  document.getElementById("bg1"),
  document.getElementById("bg2"),
  document.getElementById("bg3"),
];
tiles.forEach((tile, i) => {
  tile.style.backgroundImage = `url(${images[i % images.length]})`;
  tile.style.top = yPositions[i] + "px";
});

let velocity = 0;
let acceleration = 0;
const maxSpeed = 32;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    acceleration = 1;
  } else if (e.key === "ArrowDown") {
    acceleration = -1;
  } else {
    acceleration = 0;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    acceleration = 0;
  }
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

  for (let i = 0; i < 3; i++) {
    yPositions[i] += velocity;

    if (yPositions[i] >= viewHeight) {
      yPositions[i] -= viewHeight * 3;
      indexTop = (indexTop - 1 + images.length) % images.length;
      tiles[i].style.backgroundImage = `url(${images[indexTop]})`;
    }
    if (yPositions[i] <= -viewHeight) {
      yPositions[i] += viewHeight * 3;
      indexTop = (indexTop + 1) % images.length;
      tiles[i].style.backgroundImage = `url(${images[indexTop]})`;
    }
    tiles[i].style.top = yPositions[i] + "px";
  }
}
