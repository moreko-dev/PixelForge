import { checkNonNegativeIntegerOrThrow } from "./CoreValidator";

class Canvas {
  #width;
  #height;
  #background;

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

  set background() {
    // Background should be a class
  }
}

export default Canvas;
