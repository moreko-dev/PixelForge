import { backgroundTypes } from "../CoreConstants";
import { checkOneOfOrThrow } from "../CoreValidator";

class Background {
  #type;

  constructor({type} = {}) {
    this.type = type;
  }

  set type(value) {
    checkOneOfOrThrow(value, Object.values(backgroundTypes), "Background.type");
    this.#type = value;
  }

  get type() {
    return this.#type;
  }
}

export default Background;
