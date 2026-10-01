import Canvas from "./Canvas.js";
import { layerTypes } from "./CoreConstants.js";
import { generateProjectName } from "./CoreUtils.js";
import {
  checkArrayOrThrow,
  checkInstanceOfOrThrow,
  checkNonEmptyStringOrThrow,
  checkOneOfOrThrow,
} from "./CoreValidator.js";

class Project {
  #name;
  #canvas;
  #layers;

  constructor({
    name = generateProjectName(),
    canvas = new Canvas(),
    layers = [],
  } = {}) {
    this.name = name;
    this.canvas = canvas;
    this.layers = layers;
  }

  set name(value) {
    checkNonEmptyStringOrThrow(value, "Project.name");
    this.#name = value;
  }

  get name() {
    return this.#name;
  }

  setName(value) {
    this.name = value;
  }

  set canvas(value) {
    checkInstanceOfOrThrow(value, Canvas, "Project.canvas");
    this.#canvas = value;
  }

  get canvas() {
    return this.#canvas;
  }

  set layers(value) {
    checkArrayOrThrow(value, "Project.layers");
    this.#layers = value;
  }

  get layers() {
    return this.#layers;
  }

  addLayer(newLayer) {
    checkOneOfOrThrow(
      newLayer.type,
      Object.values(layerTypes),
      "addLayer().layerType",
    );
    this.layers.push(newLayer);
  }

  removeLayer(index) {
    this.layers.splice(index, 1);
  }

  getLayer(index) {
    return this.layers[index];
  }

  toJSON() {
    return {
      name: this.name,
      canvas: this.canvas,
      layers: this.layers,
    };
  }
}

export default Project;
