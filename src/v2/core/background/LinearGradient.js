import { gradientTypes } from "../CoreConstants";
import { checkAngleOrThrow } from "../CoreValidator.js";
import GradientBackground from "./GradientBackground.js";

class LinearGradient extends GradientBackground {
  #angle;

  constructor({ angle = 0 } = {}) {
    super({ type: gradientTypes.LINEAR });
    this.angle = angle;
  }

  set angle(value) {
    checkAngleOrThrow(value, "GradientBackground.angle");
    this.#angle = value;
  }

  get angle() {
    return this.#angle;
  }

  setAngle(value) {
    this.angle = value;
  }
}

export default LinearGradient;
