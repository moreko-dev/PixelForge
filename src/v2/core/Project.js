import { generateProjectName } from "./CoreUtils.js";
import {
  checkArrayOrThrow,
  checkInstanceOfOrThrow,
  checkNonEmptyStringOrThrow,
} from "./CoreValidator.js";
import Canvas from "./Canvas.js";

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

  toJSON() {
    return {
      name: this.name,
      canvas: this.canvas,
      layers: this.layers,
    };
  }
}

export default Project;