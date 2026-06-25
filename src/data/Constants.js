export const filtersObj = [
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

export const defaultFilterValues = {
    grayscale: 0,
    brightness: 100,
    contrast: 100,
    blur: 0,
    "hue-rotate": 0,
    saturate: 100,
    sepia: 0,
    opacity: 100,
};

export const defaultTextValues = {
    x: 0,
    y: 0,
    fontSize: 12,
    fontFamily: "Arial",
    fillStyle: "#000000",
    shadowColor: "#000000",
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
};

export const defaultBrushValues = {
    strokeStyle: "#000000",
    lineWidth: 1,
    lineCap: "butt",
    lineJoin: "mitter",
    miterLimit: 5,
};

export const defaultShapeValues = {
    strokeStyle: "#000000",
    fillStyle: "#ffffff",
    lineWidth: 1,
    shadowColor: "#000000",
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
};

export const layersType = {
    IMAGE_LAYER: "Image",
    TEXT_LAYER: "Text",
    BRUSH_LAYER: "Brush",
    SHAPE_LAYER: "Shape",
};

export const shapeTypes = {
    RECT: "rect",
    LINE: "line",
    CIRCLE: "circle",
};

export const downloadType = { png: "PNG", jpeg: "JPEG" };
