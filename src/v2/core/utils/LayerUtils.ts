import type {
  AnchorPointType,
  BoundingBox,
  BrushLayer,
  CoordinateType,
  EllipseLayer,
  EraserLayer,
  Filter,
  Layer,
  LineLayer,
  PenLayer,
  PolygonLayer,
  Project,
  RectangleLayer,
  Shadow,
  TextLayer,
} from "../CoreTypes.js";

export function getLayerName(layerType: string): string {
  return `${layerType} ${Date.now().toString().slice(-5)}`;
}

export function getDefaultShadow(): Shadow {
  return {
    color: "rgba(0, 0, 0, 0)",
    blur: 0,
    offsetX: 0,
    offsetY: 0,
  };
}

export function getDefaultFilter(): Filter {
  return {
    grayscale: 0, // 0%
    brightness: 100, // 100%
    contrast: 100, // 100%
    blur: 0, // 0px
    hueRotate: 0, // 0deg
    saturate: 100, // 100%
    sepia: 0, // 0%
    opacity: 100, // 100%
  };
}

export function getDefaultBoundingBox(): BoundingBox {
  return {
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  };
}

export function createBrushLayer(points: CoordinateType[]): BrushLayer {
  return {
    type: "brush",
    id: crypto.randomUUID(),
    locked: false,
    visible: true,
    renderable: true,
    name: getLayerName("Brush"),
    shadow: getDefaultShadow(),
    filter: getDefaultFilter(),
    boundingBox: getDefaultBoundingBox(),
    strokeColor: "#000000",
    lineWidth: 1,
    lineCap: "butt",
    lineJoin: "miter",
    points,
  };
}

export function createPenLayer(points: AnchorPointType[]): PenLayer {
  return {
    type: "pen",
    id: crypto.randomUUID(),
    locked: false,
    visible: true,
    renderable: true,
    name: getLayerName("Pencil"),
    shadow: getDefaultShadow(),
    filter: getDefaultFilter(),
    boundingBox: getDefaultBoundingBox(),
    strokeColor: "#000000",
    lineWidth: 1,
    lineCap: "butt",
    lineJoin: "miter",
    points,
  };
}

export function createEraserLayer(
  points: CoordinateType[],
  lineWidth: number = 5,
): EraserLayer {
  return {
    type: "eraser",
    id: crypto.randomUUID(),
    locked: true,
    visible: false,
    renderable: false,
    name: getLayerName("Eraser"),
    shadow: getDefaultShadow(),
    filter: getDefaultFilter(),
    boundingBox: getDefaultBoundingBox(),
    strokeColor: "rgba(0, 0, 0, 0)",
    lineWidth: lineWidth,
    lineCap: "round",
    lineJoin: "round",
    points,
  };
}

export function createLineLayer(
  sx: number,
  sy: number,
  ex: number,
  ey: number,
): LineLayer {
  return {
    type: "line",
    id: crypto.randomUUID(),
    locked: false,
    visible: true,
    renderable: true,
    name: getLayerName("Line"),
    shadow: getDefaultShadow(),
    filter: getDefaultFilter(),
    boundingBox: getDefaultBoundingBox(),
    strokeColor: "#000000",
    lineWidth: 1,
    sx,
    sy,
    ex,
    ey,
  };
}

export function createRectangleLayer(
  x: number,
  y: number,
  width: number,
  height: number,
): RectangleLayer {
  return {
    type: "rectangle",
    id: crypto.randomUUID(),
    locked: false,
    visible: true,
    renderable: true,
    name: getLayerName("Rectangle"),
    shadow: getDefaultShadow(),
    filter: getDefaultFilter(),
    boundingBox: getDefaultBoundingBox(),
    strokeColor: "#000000",
    fillColor: "#ffffff",
    lineWidth: 1,
    x,
    y,
    width,
    height,
  };
}

export function createEllipseLayer(
  x: number,
  y: number,
  width: number,
  height: number,
): EllipseLayer {
  return {
    type: "ellipse",
    id: crypto.randomUUID(),
    locked: false,
    visible: true,
    renderable: true,
    name: getLayerName("Ellipse"),
    shadow: getDefaultShadow(),
    filter: getDefaultFilter(),
    boundingBox: getDefaultBoundingBox(),
    strokeColor: "#000000",
    fillColor: "#ffffff",
    lineWidth: 1,
    x,
    y,
    width,
    height,
  };
}

export function createPolygonLayer(
  sides: number,
  points: CoordinateType[],
): PolygonLayer {
  return {
    type: "polygon",
    id: crypto.randomUUID(),
    locked: false,
    visible: true,
    renderable: true,
    name: getLayerName("Polygon"),
    shadow: getDefaultShadow(),
    filter: getDefaultFilter(),
    boundingBox: getDefaultBoundingBox(),
    strokeColor: "#000000",
    fillColor: "#ffffff",
    lineWidth: 1,
    points,
    sides,
  };
}

export function createTextLayer(
  value: string,
  x: number,
  y: number,
  width: number,
  height: number,
): TextLayer {
  return {
    type: "text",
    id: crypto.randomUUID(),
    locked: false,
    visible: true,
    renderable: true,
    name: getLayerName("Text"),
    shadow: getDefaultShadow(),
    filter: getDefaultFilter(),
    boundingBox: getDefaultBoundingBox(),
    value,
    x,
    y,
    width,
    height,
    fontFamily: "serif",
    fontSize: 12,
    fillColor: "#000000",
    strokeColor: "rgba(0,0,0,0)",
  };
}

export function updateLayerPropertiesOnState<L extends Layer>(
  setState: React.Dispatch<React.SetStateAction<Project | null>>,
  layerId: string,
  key: keyof L,
  value: any,
) {
  setState((prev) => {
    if (!prev) throw new Error("Project state is null or undefined!");
    const layersClone = prev.layers.slice();
    const layerIndex = layersClone.findIndex((item) => item.id === layerId);
    layersClone.splice(layerIndex, 1, {
      ...prev.layers[layerIndex],
      [key]: value,
    } as L);

    return {
      ...prev,
      layers: layersClone.slice(),
    };
  });
}

export function removeLayerOnState(
  setState: React.Dispatch<React.SetStateAction<Project | null>>,
  layerId: string,
) {
  setState((prev) => {
    if (!prev) throw new Error("Project state is null or undefined!");
    const layersClone = prev.layers.slice();
    const layerIndex = layersClone.findIndex((item) => item.id === layerId);
    layersClone.splice(layerIndex, 1);
    return {
      ...prev,
      layers: layersClone.slice(),
    };
  });
}
