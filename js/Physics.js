export class Physics {
  #velocity = 0;
  #acceleration = 0;
  #maxSpeed = 32;
  #friction = 0.95;

  updateVelocity() {
    this.#velocity += this.#acceleration;
    this.#velocity = Math.max(
      -this.#maxSpeed,
      Math.min(this.#maxSpeed, this.#velocity)
    );
    if (this.#acceleration === 0) this.#velocity *= this.#friction;
    return this.#velocity;
  }

  setAcceleration(value) {
    this.#acceleration = value;
  }
}
