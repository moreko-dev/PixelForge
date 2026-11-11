import { getPointerRelativeCoordinate } from "@src/utils/Utils.js";
import type { CoordinateType, Tool, Tools } from "./CoreTypes.js";

export type BrushCallbackType = {
  points: CoordinateType[];
};

class ToolManager<T = unknown> implements Tool<T> {
  readonly type: Tools;
  readonly canvas: HTMLCanvasElement | null;

  constructor(type: Tools, canvas: HTMLCanvasElement | null) {
    this.type = type;
    this.canvas = canvas;
  }

  onClick(event: React.MouseEvent<HTMLCanvasElement>): void {}
  onPointerCancel(event: React.PointerEvent<HTMLCanvasElement>): void {}
  onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void {}
  onPointerMove(event: React.PointerEvent<HTMLCanvasElement>): void {}
  onPointerUp(
    event: React.PointerEvent<HTMLCanvasElement>,
    callback?: (props: T) => void,
  ): void {}

  getCanvas2dContext(): CanvasRenderingContext2D {
    if (!this.canvas) throw new Error("No canvas reference");
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get CanvasRenderingContext2D");
    return ctx;
  }
}

export class SelectTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("select", canvas);
  }
}

export class MoveTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("move", canvas);
  }
}

export class PanTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("pan", canvas);
  }
}

export class BrushTool extends ToolManager<BrushCallbackType> {
  private isDrawing = false;
  private points: CoordinateType[] = [];

  constructor(canvas: HTMLCanvasElement | null) {
    super("brush", canvas);
  }

  onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isDrawing = true;
    const ctx = this.getCanvas2dContext();
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    ctx?.beginPath();
    ctx?.moveTo(pc.x, pc.y);
    ctx?.lineTo(pc.x, pc.y);
    ctx?.stroke();
    this.points.push({ x: pc.x, y: pc.y });
  }

  onPointerMove(event: React.PointerEvent<HTMLCanvasElement>): void {
    if (!this.isDrawing) return;
    const ctx = this.getCanvas2dContext();
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    ctx?.lineTo(pc.x, pc.y);
    ctx?.stroke();
    this.points.push({ x: pc.x, y: pc.y });
  }

  onPointerUp(
    event: React.PointerEvent<HTMLCanvasElement>,
    callback: (props: BrushCallbackType) => void,
  ): void {
    const ctx = this.getCanvas2dContext();
    ctx?.closePath();
    this.isDrawing = false;
    callback?.({ points: this.points });
    this.points = [];
  }
}

export class PencilTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("pencil", canvas);
  }
}

export class EraserTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("eraser", canvas);
  }
}

export class LineTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("line", canvas);
  }
}

export class RectangleTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("rectangle", canvas);
  }
}

export class CircleTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("circle", canvas);
  }
}

export class PolygonTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("polygon", canvas);
  }
}

export class TextTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("text", canvas);
  }
}

export class CropTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("crop", canvas);
  }
}

export class ResizeTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("resize", canvas);
  }
}

export class EyedropperTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("eyedropper", canvas);
  }
}

export class GradientTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("gradient", canvas);
  }
}

export class BlurTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("blur", canvas);
  }
}

export class CloneTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("clone", canvas);
  }
}

export class LassoTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("lasso", canvas);
  }
}

export class MagicTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("magic", canvas);
  }
}

export class ZoomTool extends ToolManager {
  constructor(canvas: HTMLCanvasElement | null) {
    super("zoom", canvas);
  }
}
