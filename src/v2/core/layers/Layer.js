import { layerTypes, resizeTypes } from "../CoreConstants.js";
import {
  checkBooleanOrThrow,
  checkInstanceOfOrThrow,
  checkNonEmptyStringOrThrow,
  checkOneOfOrThrow,
} from "../CoreValidator.js";
import BoundingBox from "../selection/BoundingBox.js";
import { generateID, generateLayerName } from "./../CoreUtils.js";
import Filters from "./Filters.js";
import Shadow from "./Shadow.js";

class Layer {
  #type;
  #id;
  #name;
  #visible;
  #locked;
  #shadow;
  #filters;
  #boundingBox;

  constructor({
    type,
    id = generateID(),
    name = generateLayerName(type),
    visible = true,
    locked = false,
    shadow = new Shadow(),
    filters = new Filters(),
  } = {}) {
    checkOneOfOrThrow(type, Object.values(layerTypes), "Layer.type");
    this.#type = type;
    this.id = id;
    this.name = name;
    this.visible = visible;
    this.locked = locked;
    this.shadow = shadow;
    this.filters = filters;
  }

  get type() {
    return this.#type;
  }

  set id(value) {
    checkNonEmptyStringOrThrow(value, "Layer.id");
    this.#id = value;
  }

  get id() {
    return this.#id;
  }

  set name(value) {
    checkNonEmptyStringOrThrow(value, "Layer.name");
    this.#name = value;
  }

  get name() {
    return this.#name;
  }

  setName(value) {
    this.name = value;
  }

  set visible(value) {
    checkBooleanOrThrow(value, "Layer.visible");
    this.#visible = value;
  }

  get visible() {
    return this.#visible;
  }

  setVisible(value) {
    this.visible = value;
  }

  set locked(value) {
    checkBooleanOrThrow(value, "Layer.locked");
    this.#locked = value;
  }

  get locked() {
    return this.#locked;
  }

  setLocked(value) {
    this.locked = value;
  }

  set shadow(value) {
    checkInstanceOfOrThrow(value, Shadow, "Layer.shadow");
    this.#shadow = value;
  }

  get shadow() {
    return this.#shadow;
  }

  set filters(value) {
    checkInstanceOfOrThrow(value, Filters, "Layer.filters");
    this.#filters = value;
  }

  get filters() {
    return this.#filters;
  }

  set boundingBox(value) {
    checkInstanceOfOrThrow(value, BoundingBox, "Layer.boundingBox");
    this.#boundingBox = value;
  }

  get boundingBox() {
    return this.#boundingBox;
  }

  getBoundingBox() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  move(mouseStartPosition, mouseCurrentPosition) {
    let deltaX = mouseCurrentPosition.x - mouseStartPosition.x;
    let deltaY = mouseCurrentPosition.y - mouseStartPosition.y;
    this.x += deltaX;
    this.y += deltaY;
  }

  resize(type, mouseStartPosition, mouseCurrentPosition) {
    let posType = type === resizeTypes.RIGHT ? "x" : "y";
    let dimenType = type === resizeTypes.RIGHT ? "width" : "height";
    let diff = mouseCurrentPosition[posType] - mouseStartPosition[posType];
    this[dimenType] += diff;
  }
}

export default Layer;
