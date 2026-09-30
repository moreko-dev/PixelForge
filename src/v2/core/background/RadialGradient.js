import { gradientTypes } from "../CoreConstants.js";
import GradientBackground from "./GradientBackground.js";

class RadialGradien extends GradientBackground {
  constructor() {
    super({ gradientType: gradientTypes.RADIAL });
  }
}

export default RadialGradien;
