import type {
  BoundingBox,
  BrushLayer,
  CoordinateType,
  Filter,
  Layer,
  Project,
  Shadow,
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

export function updateLayerPropertiesOnState<L extends Layer>(
  setState: React.Dispatch<React.SetStateAction<Project | null>>,
  layer: Layer,
  key: keyof L,
  value: any,
) {
  setState((prev) => {
    if (!prev) throw new Error("Project state is null or undefined!");
    const layersClone = prev.layers.slice();
    const layerIndex = layersClone.findIndex((item) => item.id === layer.id);
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
