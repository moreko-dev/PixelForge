import ColorBackground from "./background/ColorBackground.js";

export const backgroundTypes = { COLOR: "color", GRADIENT: "gradient" };
export const gradientTypes = { LINEAR: "linear", RADIAL: "radial" };
export const canvasDefaultValues = {
  width: 500,
  height: 500,
  background: new ColorBackground({ color: "#ffffff" }),
};
