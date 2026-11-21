export type SaveStatusType = "saved" | "unsaved" | "changed";
export type HexaColorType = `#${string}`;
export type RGBColorType =
  | `rgba(${number}, ${number}, ${number})`
  | `rgba(${number},${number},${number})`;
export type RGBAColorType =
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgba(${number},${number},${number},${number})`;
export type CanvasColorType = HexaColorType | RGBColorType | RGBAColorType;
export type LayersType =
  | "brush"
  | "pen"
  | "eraser"
  | "line"
  | "rectangle"
  | "ellipse"
  | "polygon"
  | "text";
export type ShapesType = "line" | "rectangle" | "ellipse" | "polygon";
export type CoordinateType = { x: number; y: number };
export type AnchorPointType = CoordinateType & {
  handleIn: CoordinateType | null;
  handleOut: CoordinateType | null;
};
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
  | "ellipse"
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
  locked: boolean;
  visible: boolean;
  renderable: boolean;
  shadow: Shadow;
  filter: Filter;
  boundingBox: BoundingBox;
}

export interface BrushLayer extends Layer {
  strokeColor: CanvasColorType;
  lineWidth: number;
  lineCap: LineCapType;
  lineJoin: LineJoinType;
  points: CoordinateType[];
}

export interface PenLayer extends BrushLayer {
  points: AnchorPointType[];
}

export interface EraserLayer extends BrushLayer {}

export interface LineLayer extends Layer {
  strokeColor: CanvasColorType;
  lineWidth: number;
  sx: number;
  sy: number;
  ex: number;
  ey: number;
}

export interface RectangleLayer extends Layer {
  strokeColor: CanvasColorType;
  fillColor: CanvasColorType;
  lineWidth: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EllipseLayer extends RectangleLayer {}

export interface Shadow {
  color: CanvasColorType;
  blur: number;
  offsetX: number;
  offsetY: number;
}

export interface PolygonLayer extends Layer {
  strokeColor: CanvasColorType;
  fillColor: CanvasColorType;
  lineWidth: number;
  points: CoordinateType[];
  sides: number;
}

export interface TextLayer extends Layer {
  value: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: FontFamilyType;
  strokeColor: CanvasColorType;
  fillColor: CanvasColorType;
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

export interface Tool {
  readonly type: Tools;
  readonly canvas: HTMLCanvasElement | null;
  readonly setState: React.Dispatch<React.SetStateAction<Project | null>>;
  activate?(): void;
  deactivate?(): void;
  onClick?(event: React.MouseEvent<HTMLCanvasElement>): void;
  onPointerDown?(event: React.PointerEvent<HTMLCanvasElement>): void;
  onPointerMove?(event: React.PointerEvent<HTMLCanvasElement>): void;
  onPointerUp?(event: React.PointerEvent<HTMLCanvasElement>): void;
  onPointerCancel?(event: React.PointerEvent<HTMLCanvasElement>): void;
  onKeyDown?(event: React.KeyboardEvent<HTMLCanvasElement>): void;
  onKeyUp?(event: React.KeyboardEvent<HTMLCanvasElement>): void;
}
