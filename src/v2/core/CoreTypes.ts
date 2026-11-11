export type SaveStatusType = "saved" | "unsaved" | "changed";
export type HexaColorType = `#${string}`;
export type RGBColorType =
  | `rgba(${number}, ${number}, ${number})`
  | `rgba(${number},${number},${number})`;
export type RGBAColorType =
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgba(${number},${number},${number},${number})`;
export type CanvasColorType = HexaColorType | RGBColorType | RGBAColorType;
export type LayersType = "image" | "text" | "brush" | "pen" | "shape";
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
export type Tools =
  | "select"
  | "move"
  | "pan"
  | "brush"
  | "pencil"
  | "eraser"
  | "line"
  | "rectangle"
  | "circle"
  | "polygon"
  | "text"
  | "crop"
  | "resize"
  | "eyedropper"
  | "gradient"
  | "blur"
  | "clone"
  | "lasso"
  | "magic"
  | "zoom";

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
  backgroundColor: CanvasColorType;
  borderColor: CanvasColorType;
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

export interface BrushLayer extends Layer {
  strokeColor: CanvasColorType;
  lineWidth: number;
  lineCap: LineCapType;
  lineJoin: LineJoinType;
  points: CoordinateType[];
}

// export interface PenLayer extends Layer {
//   strokeColor: HexaColorType;
//   lineWidth: number;
//   lineCap: LineCapType;
//   lineJoin: LineJoinType;
//   miterLimit: number;
//   points: CoordinateType[];
// }

export interface TextLayer extends Layer {
  value: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: FontFamilyType;
  fillColor: CanvasColorType;
}

export interface ShapeLayer extends Layer {
  shapeType: ShapesType;
  strokeColor: CanvasColorType;
  fillColor: CanvasColorType;
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
  color: CanvasColorType;
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

export interface Tool<T = unknown> {
  readonly type: Tools;
  readonly canvas: HTMLCanvasElement | null;
  activate?(): void;
  deactivate?(): void;
  onClick?(event: React.MouseEvent<HTMLCanvasElement>): void;
  onPointerDown?(event: React.PointerEvent<HTMLCanvasElement>): void;
  onPointerMove?(event: React.PointerEvent<HTMLCanvasElement>): void;
  onPointerUp?(
    event: React.PointerEvent<HTMLCanvasElement>,
    callback?: (props: T) => void,
  ): void;
  onPointerCancel?(event: React.PointerEvent<HTMLCanvasElement>): void;
}
