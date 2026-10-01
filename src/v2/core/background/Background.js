import { backgroundTypes } from "../CoreConstants";
import { checkOneOfOrThrow } from "../CoreValidator";

class Background {
  #type;

  constructor({ type } = {}) {
    checkOneOfOrThrow(type, Object.values(backgroundTypes), "Background.type");
    this.#type = type;
  }

  get type() {
    return this.#type;
  }
}

export default Background;
