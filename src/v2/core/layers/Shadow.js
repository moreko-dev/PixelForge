import { shadowDefaultValues } from "../CoreConstants";
import {
  checkHexaCodeOrThrow,
  checkIntegerOrThrow,
  checkNonNegativeIntegerOrThrow,
} from "../CoreValidator";

class Shadow {
  #color;
  #blur;
  #offsetX;
  #offsetY;

  constructor({
    color = shadowDefaultValues.color,
    blur = shadowDefaultValues.blur,
    offsetX = shadowDefaultValues.offsetX,
    offsetY = shadowDefaultValues.offsetY,
  } = {}) {
    this.color = color;
    this.blur = blur;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  set color(value) {
    checkHexaCodeOrThrow(value, "Shadow.color");
    this.#color = value;
  }

  get color() {
    return this.#color;
  }

  setColor(value) {
    this.color = value;
  }

  set blur(value) {
    checkNonNegativeIntegerOrThrow(value, "Shadow.blur");
    this.#blur = value;
  }

  get blur() {
    return this.#blur;
  }

  setBlur(value) {
    this.blur = value;
  }

  set offsetX(value) {
    checkIntegerOrThrow(value, "Shadow.offsetX");
    this.#offsetX = value;
  }

  get offsetX() {
    return this.#offsetX;
  }

  setOffsetX(value) {
    this.offsetX = value;
  }

  set offsetY(value) {
    checkIntegerOrThrow(value, "Shadow.offsetY");
    this.#offsetY = value;
  }

  get offsetY() {
    return this.#offsetY;
  }

  setOffsetY(value) {
    this.offsetY = value;
  }

  reset() {
    this.color = shadowDefaultValues.color;
    this.blur = shadowDefaultValues.blur;
    this.offsetX = shadowDefaultValues.offsetX;
    this.offsety = shadowDefaultValues.offsetY;
  }

  toJSON() {
    return {
      color: this.color,
      blur: this.blur,
      offsetX: this.offsetX,
      offsetY: this.offsetY,
    };
  }
}

export default Shadow;
