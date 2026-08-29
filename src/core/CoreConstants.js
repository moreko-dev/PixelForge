export const pictureType = { png: "png", jpeg: "jpeg" };
export const defaultCanvas = {
    width: 500,
    height: 500,
    bgColor: "#ffffff",
    scale: 1,
};
export const defaultShadow = {
    color: "#000000",
    blur: 0,
    offsetX: 0,
    offsetY: 0,
};
export const defaultFilters = {
    grayscale: 0,
    brightness: 100,
    contrast: 100,
    blur: 0,
    ["hue-rotate"]: 0,
    saturate: 100,
    sepia: 0,
    opacity: 100,
};
export const resizeType = {
    right: "right",
    bottom: "bottom",
};
export const defaultFonts = [
    "serif",
    "sans-serif",
    "monospace",
    "cursive",
    "fantasy",
    "system-ui",
    "ui-serif",
    "ui-sans-serif",
    "ui-monospace",
    "ui-rounded",
];
export const defaultLineCap = {
    butt: "butt",
    round: "round",
    square: "square",
};
export const defaultLineJoin = {
    miter: "miter",
    round: "round",
    bevel: "bevel",
};
export const layerType = {
    IMAGE_LAYER: "image",
    TEXT_LAYER: "text",
    PEN_LAYER: "pen",
    SHAPE_LAYER: "shape",
};
export const shapeType = {
    RECT: "rect",
    LINE: "line",
    CIRCLE: "circle",
};
export const filters = [
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
        name: "hue-rotate",
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
export const validProjectSchema = {
    type: "object",
    required: ["isProjectCreated", "name", "canvas", "layers"],
    properties: {
        isProjectCreated: { type: "boolean" },
        name: { type: "string" },
        canvas: {
            type: "object",
            required: ["width", "height", "backgroundColor"],
            properties: {
                width: { type: "number" },
                height: { type: "number" },
                backgroundColor: { type: "string" },
                scale: { type: "number" },
            },
        },
        layers: { type: "array" },
    },
};
export const toolsType = {
    PEN: "pen",
    RECT: "rect",
    LINE: "line",
    CIRCLE: "circle",
};
