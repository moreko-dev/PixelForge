import { filterDefaultValues } from "../CoreConstants";
import { checkNonNegativeIntegerOrThrow } from "../CoreValidator.js";
class Filters {
  #grayscale;
  #brightness;
  #contrast;
  #blur;
  #hueRotate;
  #saturate;
  #sepia;
  #opacity;

  constructor({
    grayscale = filterDefaultValues.grayscale,
    brightness = filterDefaultValues.brightness,
    contrast = filterDefaultValues.contrast,
    blur = filterDefaultValues.blur,
    hueRotate = filterDefaultValues.hueRotate,
    saturate = filterDefaultValues.saturate,
    sepia = filterDefaultValues.sepia,
    opacity = filterDefaultValues.opacity,
  } = {}) {
    this.grayscale = grayscale;
    this.brightness = brightness;
    this.contrast = contrast;
    this.blur = blur;
    this.hueRotate = hueRotate;
    this.saturate = saturate;
    this.sepia = sepia;
    this.opacity = opacity;
  }

  set grayscale(value) {
    checkNonNegativeIntegerOrThrow(value, "Filters.grayscale");
    this.#grayscale = value;
  }

  get grayscale() {
    return this.#grayscale;
  }

  setGrayscale(value) {
    this.grayscale = value;
  }

  set brightness(value) {
    checkNonNegativeIntegerOrThrow(value, "Filters.brightness");
    this.#brightness = value;
  }

  get brightness() {
    return this.#brightness;
  }

  setBrightness(value) {
    this.brightness = value;
  }

  set contrast(value) {
    checkNonNegativeIntegerOrThrow(value, "Filters.contrast");
    this.#contrast = value;
  }

  get contrast() {
    return this.#contrast;
  }

  setContrast(value) {
    this.contrast = value;
  }

  set blur(value) {
    checkNonNegativeIntegerOrThrow(value, "Filters.blur");
    this.#blur = value;
  }

  get blur() {
    return this.#blur;
  }

  setBlur(value) {
    this.blur = value;
  }

  set hueRotate(value) {
    checkNonNegativeIntegerOrThrow(value, "Filters.hueRotate");
    this.#hueRotate = value;
  }

  get hueRotate() {
    return this.#hueRotate;
  }

  setHueRotate(value) {
    this.hueRotate = value;
  }

  set saturate(value) {
    checkNonNegativeIntegerOrThrow(value, "Filters.saturate");
    this.#saturate = value;
  }

  get saturate() {
    return this.#saturate;
  }

  setSaturate(value) {
    this.saturate = value;
  }

  set sepia(value) {
    checkNonNegativeIntegerOrThrow(value, "Filters.sepia");
    this.#sepia = value;
  }

  get sepia() {
    return this.#sepia;
  }

  setSepia(value) {
    this.sepia = value;
  }

  set opacity(value) {
    checkNonNegativeIntegerOrThrow(value, "Filters.opacity");
    this.#opacity = value;
  }

  get opacity() {
    return this.#opacity;
  }

  setOpacity(value) {
    this.opacity = value;
  }

  reset() {
    this.grayscale = filterDefaultValues.grayscale;
    this.brightness = filterDefaultValues.brightness;
    this.contrast = filterDefaultValues.contrast;
    this.blur = filterDefaultValues.blur;
    this.hueRotate = filterDefaultValues.hueRotate;
    this.saturate = filterDefaultValues.saturate;
    this.sepia = filterDefaultValues.sepia;
    this.opacity = filterDefaultValues.opacity;
  }

  toJSON() {
    return {
      grayscale: this.grayscale,
      brightness: this.brightness,
      contrast: this.contrast,
      blur: this.blur,
      hueRotate: this.hueRotate,
      saturate: this.saturate,
      sepia: this.sepia,
      opacity: this.opacity,
    };
  }
}

export default Filters;
