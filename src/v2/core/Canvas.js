import { canvasDefaultValues } from "./CoreConstants.js";
import {
  checkInstanceOfOrThrow,
  checkNonNegativeIntegerOrThrow,
} from "./CoreValidator";
import Background from "./background/Background.js";

class Canvas {
  #width;
  #height;
  #background;

  constructor({
    width = canvasDefaultValues.width,
    height = canvasDefaultValues.height,
    background = canvasDefaultValues.background,
  } = {}) {
    this.width = width;
    this.height = height;
    this.background = background;
  }

  set width(value) {
    checkNonNegativeIntegerOrThrow(value, "Canvas.width");
    this.#width = value;
  }

  get width() {
    return this.#width;
  }

  set height(value) {
    checkNonNegativeIntegerOrThrow(value, "Canvas.height");
    this.#height = value;
  }

  get height() {
    return this.#height;
  }

  set background(value) {
    checkInstanceOfOrThrow(value, Background, "Canvas.background");
    this.#background = value;
  }

  get background() {
    return this.#background;
  }

  toJSON() {
    return {
      width: this.width,
      height: this.height,
      background: this.background,
    };
  }
}

export default Canvas;
