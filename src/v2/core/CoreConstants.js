import ColorBackground from "./background/ColorBackground.js";

export const backgroundTypes = { COLOR: "color", GRADIENT: "gradient" };

export const gradientTypes = { LINEAR: "linear", RADIAL: "radial" };

export const toolTypes = {
  SELECT: "select",
  IMAGE: "image",
  TEXT: "text",
  BRUSH: "brush",
  RECTANGLE: "rectangle",
  LINE: "line",
  CIRCLE: "circle",
};

export const layerTypes = {
  IMAGE: "image",
  TEXT: "text",
  BRUSH: "brush",
  RECTANGLE: "rectangle",
  LINE: "line",
  CIRCLE: "circle",
};

export const resizeTypes = {
  RIGHT: "right",
  BOTTOM: "bottom",
};

export const canvasDefaultValues = {
  width: 500,
  height: 500,
  background: new ColorBackground({ color: "#ffffff" }),
};

export const shadowDefaultValues = {
  color: "#000000",
  blur: 0,
  offsetX: 0,
  offsetY: 0,
};

export const filterDefaultValues = {
  grayscale: 0,
  brightness: 100,
  contrast: 100,
  blur: 0,
  hueRotate: 0,
  saturate: 100,
  sepia: 0,
  opacity: 100,
};

export const filtersDetails = [
  {
    name: "grayscale",
    minValue: 0,
    maxValue: 100,
    unit: "%",
  },
  {
    name: "brightness",
    minValue: 0,
    maxValue: 100,
    unit: "%",
  },
  {
    name: "contrast",
    minValue: 0,
    maxValue: 100,
    unit: "%",
  },
  {
    name: "blur",
    minValue: 0,
    maxValue: 10,
    unit: "px",
  },
  {
    name: "hueRotate",
    minValue: 0,
    maxValue: 360,
    unit: "deg",
  },
  {
    name: "saturate",
    minValue: 0,
    maxValue: 100,
    unit: "%",
  },
  {
    name: "sepia",
    minValue: 0,
    maxValue: 100,
    unit: "%",
  },
  {
    name: "opacity",
    minValue: 0,
    maxValue: 100,
    unit: "%",
  },
];
