export type SaveStatusType = "saved" | "unsaved";
export type HexaColorType = `#${string}`;
export type LayersType = "image" | "text" | "pen" | "shape";
export type ShapesType = "line" | "rectangle" | "circle" | "polygon";
export type CoordinateType = { x: number; y: number };
export type LineCapType = "butt" | "round" | "square";
export type LineJoinType = "miter" | "round" | "bevel";
export type FontFamilyType =
  | "serif"
  | "sans-serif"
  | "monospace"
  | "cursive"
  | "fantasy"
  | "system-ui"
  | "ui-serif"
  | "ui-sans-serif"
  | "ui-monospace"
  | "ui-rounded"
  | "emoji"
  | "math"
  | "fangsong";

export interface Project {
  isCreated: boolean;
  saveStatus: SaveStatusType;
  name: string;
  canvas: Canvas | null;
  layers: Layer[];
}

export interface Canvas {
  width: number;
  height: number;
  backgroundColor: HexaColorType;
  borderColor: HexaColorType;
}

export interface Layer {
  type: LayersType;
  id: string;
  name: string;
  shadow: Shadow;
  filter: Filter;
  boundingBox: BoundingBox;
}

export interface ImageLayer extends Layer {
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  rotate: number;
  flipX: boolean;
  flipY: boolean;
}

export interface PenLayer extends Layer {
  strokeColor: HexaColorType;
  lineWidth: number;
  lineCap: LineCapType;
  lineJoin: LineJoinType;
  miterLimit: number;
  points: CoordinateType[];
}

export interface TextLayer extends Layer {
  value: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: FontFamilyType;
  fillColor: HexaColorType;
}

export interface ShapeLayer extends Layer {
  shapeType: ShapesType;
  strokeColor: HexaColorType;
  fillColor: HexaColorType;
  lineWidth: number;
}

export interface CircleLayer extends ShapeLayer {
  x: number;
  y: number;
  radius: number;
}

export interface LineShape extends ShapeLayer {
  sx: number;
  sy: number;
  ex: number;
  ey: number;
}

export interface RectangleShape extends ShapeLayer {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Shadow {
  color: HexaColorType;
  blur: number;
  offsetX: number;
  offsetY: number;
}

export interface Filter {
  grayscale: number;
  brightness: number;
  contrast: number;
  blur: number;
  hueRotate: number;
  saturate: number;
  sepia: number;
  opacity: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}
