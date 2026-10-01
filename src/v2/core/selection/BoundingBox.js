import { checkNumberOrThrow } from "./../CoreValidator.js";

class BoundingBox {
  #x;
  #y;
  #width;
  #height;

  constructor({ x = 0, y = 0, width = 0, height = 0 } = {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  set x(value) {
    checkNumberOrThrow(value, "BoundingBox.x");
    this.#x = value;
  }

  get x() {
    return this.#x;
  }

  setX(value) {
    this.x = value;
  }

  set y(value) {
    checkNumberOrThrow(value, "BoundingBox.y");
    this.#y = value;
  }

  get y() {
    return this.#y;
  }

  setY(value) {
    this.y = value;
  }

  set width(value) {
    checkNumberOrThrow(value, "BoundingBox.width");
    this.#width = value;
  }

  get width() {
    return this.#width;
  }

  setWidth(value) {
    this.width = value;
  }

  set height(value) {
    checkNumberOrThrow(value, "BoundingBox.height");
    this.#height = value;
  }

  get height() {
    return this.#height;
  }

  setHeight(value) {
    this.height = value;
  }

  update({
    x = this.x,
    y = this.y,
    width = this.width,
    height = this.height,
  } = {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }
}

export default BoundingBox;
