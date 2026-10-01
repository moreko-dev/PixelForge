import { backgroundTypes, gradientTypes } from "../CoreConstants.js";
import {
  checkArrayOrThrow,
  checkHexaCodeOrThrow,
  checkNumberInRangeOrThrow,
  checkOneOfOrThrow,
} from "../CoreValidator.js";
import Background from "./Background.js";

class GradientBackground extends Background {
  #gradientType;
  #stops;

  constructor({ gradientType, stops = [] } = {}) {
    super({ type: backgroundTypes.GRADIENT });
    checkOneOfOrThrow(
      gradientType,
      Object.values(gradientTypes),
      "GradientBackground.type",
    );
    this.#gradientType = gradientType;
    this.stops = stops;
  }

  get gradientType() {
    return this.#gradientType;
  }

  set stops(value) {
    checkArrayOrThrow(value, "GradientBackground.stops");
    this.#stops = value;
  }

  get stops() {
    return this.#stops;
  }

  addStop(offset, color) {
    checkNumberInRangeOrThrow(
      offset,
      0,
      1,
      "GradientBackground.addStop(offset)",
    );
    checkHexaCodeOrThrow(color, "GradientBackground.addStop(color)");
    this.stops.push({ offset, color });
  }

  removeStop(index) {
    this.stops.splice(index, 1);
  }

  changeOffset(index, newOffset) {
    checkNumberInRangeOrThrow(
      newOffset,
      0,
      1,
      "GradientBackground.changeOffset(newOffset)",
    );
    this.stops[index].offset = newOffset;
  }

  changeColor(index, newColor) {
    checkHexaCodeOrThrow(newColor, "GradientBackground.changeColor(newColor)");
    this.stops[index].color = newColor;
  }
}

export default GradientBackground;
