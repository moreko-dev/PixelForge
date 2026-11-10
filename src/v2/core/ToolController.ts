import type { Tool, Tools } from "./CoreTypes.js";

export class SelectTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "select";
}

export class MoveTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "move";
}

export class PanTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "pan";
}

export class BrushTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "brush";
}

export class PencilTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "pencil";
}

export class EraserTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "eraser";
}

export class LineTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "line";
}

export class RectangleTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "rectangle";
}

export class CircleTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "circle";
}

export class PolygonTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "polygon";
}

export class TextTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "text";
}

export class CropTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "crop";
}

export class ResizeTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "resize";
}

export class EyedropperTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "eyedropper";
}

export class GradientTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "gradient";
}

export class BlurTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "blur";
}

export class CloneTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "clone";
}

export class LassoTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "lasso";
}

export class MagicTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "magic";
}

export class ZoomTool<M, P> implements Tool<M, P> {
  readonly type: Tools = "zoom";
}
