import { layerTypes } from "../CoreConstants.js";
import {
  checkBooleanOrThrow,
  checkInstanceOfOrNullableOrThrow,
  checkNumberOrThrow,
  checkStringOrNullableOrThrow,
} from "../CoreValidator";
import Layer from "./Layer.js";

class ImageLayer extends Layer {
  #x;
  #y;
  #width;
  #height;
  #image;
  #src;
  #rotate;
  #flipX;
  #flipY;

  constructor({
    id,
    name,
    visible,
    locked,
    shadow,
    filters,
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    image = null,
    src = null,
    rotate = 0,
    flipX = false,
    flipY = false,
  } = {}) {
    super({
      type: layerTypes.IMAGE,
      id,
      name,
      visible,
      locked,
      shadow,
      filters,
    });
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.src = src;
    this.rotate = rotate;
    this.flipX = flipX;
    this.flipY = flipY;
  }

  set x(value) {
    checkNumberOrThrow(value, "ImageLayer.x");
    this.#x = value;
  }

  get x() {
    return this.#x;
  }

  setX(value) {
    this.x = value;
  }

  set y(value) {
    checkNumberOrThrow(value, "ImageLayer.y");
    this.#y = value;
  }

  get y() {
    return this.#y;
  }

  setY(value) {
    this.y = value;
  }

  set width(value) {
    checkNumberOrThrow(value, "ImageLayer.width");
    this.#width = value;
  }

  get width() {
    return this.#width;
  }

  setWidth(value) {
    this.width = value;
  }

  set height(value) {
    checkNumberOrThrow(value, "ImageLayer.height");
    this.#height = value;
  }

  get height() {
    return this.#height;
  }

  setHeight(value) {
    this.height = value;
  }

  set image(value) {
    checkInstanceOfOrNullableOrThrow(value, Image, "ImageLayer.image");
    this.#image = value;
  }

  get image() {
    return this.#image;
  }

  setImage(value) {
    this.image = value;
  }

  set src(value) {
    checkStringOrNullableOrThrow(value, "ImageLayer.src");
    this.#src = value;
  }

  get src() {
    return this.#src;
  }

  setSrc(value) {
    this.src = value;
  }

  set rotate(value) {
    checkNumberOrThrow(value, "ImageLayer.rotate");
    this.#rotate = value;
  }

  get rotate() {
    return this.#rotate;
  }

  setRotate(value) {
    this.rotate = value;
  }

  set flipX(value) {
    checkBooleanOrThrow(value, "ImageLayer.flipX");
    this.#flipX = value;
  }

  get flipX() {
    return this.#flipX;
  }

  setFlipX(value) {
    this.flipX = value;
  }

  set flipY(value) {
    checkBooleanOrThrow(value, "ImageLayer.flipY");
    this.#flipY = value;
  }

  get flipY() {
    return this.#flipY;
  }

  setFlipY(value) {
    this.flipY = value;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      visible: this.visible,
      locked: this.locked,
      shadow: this.shadow,
      filters: this.filters,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      image: this.image,
      src: this.src,
      rotate: this.rotate,
      flipX: this.flipX,
      flipY: this.flipY,
    };
  }
}

export default ImageLayer;
