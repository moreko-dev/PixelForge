import { backgroundTypes } from "../CoreConstants.js";
import { checkHexaCodeOrThrow } from "../CoreValidator.js";
import Background from "./Background.js";

class ColorBackground extends Background {
  #color;

  constructor({ color } = {}) {
    super({ type: backgroundTypes.COLOR });
    this.color = color;
  }

  set color(value) {
    checkHexaCodeOrThrow(value, "ColorBackground.color");
    this.#color = value;
  }

  get color() {
    return this.#color;
  }

  toJSON() {
    return {
      type: this.type,
      color: this.color,
    };
  }
}

export default ColorBackground;
