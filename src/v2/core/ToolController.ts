import { getPointerRelativeCoordinate } from "@src/utils/Utils.js";
import type { Dispatch, SetStateAction } from "react";
import type {
  AnchorPointType,
  CoordinateType,
  Project,
  Tool,
  Tools,
} from "./CoreTypes.js";
import { createBrushLayer, createPenLayer } from "./utils/LayerUtils.js";

export type BrushCallbackType = {
  points: CoordinateType[];
};

class ToolManager implements Tool {
  readonly type: Tools;
  readonly canvas: HTMLCanvasElement | null;
  readonly setState: Dispatch<SetStateAction<Project | null>>;

  constructor(
    type: Tools,
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    this.type = type;
    this.canvas = canvas;
    this.setState = setState;
  }

  activate(): void {}
  deactivate(): void {}
  onClick(event: React.MouseEvent<HTMLCanvasElement>): void {}
  onPointerCancel(event: React.PointerEvent<HTMLCanvasElement>): void {}
  onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void {}
  onPointerMove(event: React.PointerEvent<HTMLCanvasElement>): void {}
  onPointerUp(event: React.PointerEvent<HTMLCanvasElement>): void {}
  onKeyDown(event: React.KeyboardEvent<HTMLCanvasElement>): void {}
  onKeyUp(event: React.KeyboardEvent<HTMLCanvasElement>): void {}

  getCanvas2dContext(): CanvasRenderingContext2D {
    if (!this.canvas) throw new Error("No canvas reference");
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get CanvasRenderingContext2D");
    return ctx;
  }

  resetContextState() {
    const ctx = this.getCanvas2dContext();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
    ctx.lineWidth = 1;
    ctx.lineCap = "butt";
    ctx.lineJoin = "miter";
    ctx.miterLimit = 10;
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "rgba(0,0,0,0)";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.filter = "none";
    ctx.beginPath();
  }
}

export class SelectTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("select", canvas, setState);
  }
}

export class MoveTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("move", canvas, setState);
  }
}

export class PanTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("pan", canvas, setState);
  }
}

export class BrushTool extends ToolManager {
  private isDrawing = false;
  private points: CoordinateType[] = [];

  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("brush", canvas, setState);
  }

  onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isDrawing = true;
    const ctx = this.getCanvas2dContext();
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    ctx.beginPath();
    ctx.moveTo(pc.x, pc.y);
    ctx.lineTo(pc.x, pc.y);
    ctx.stroke();
    this.points.push({ x: pc.x, y: pc.y });
  }

  onPointerMove(event: React.PointerEvent<HTMLCanvasElement>): void {
    if (!this.isDrawing) return;
    const ctx = this.getCanvas2dContext();
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    ctx.lineTo(pc.x, pc.y);
    ctx.stroke();
    this.points.push({ ...pc });
  }

  onPointerUp(event: React.PointerEvent<HTMLCanvasElement>): void {
    const ctx = this.getCanvas2dContext();
    ctx.closePath();
    this.isDrawing = false;
    this.deactivate();
    this.points = [];
  }

  activate(): void {
    this.resetContextState();
  }

  deactivate(): void {
    const brushLayer = createBrushLayer(this.points);
    this.setState((prev) => {
      if (!prev) throw new Error("No project found");
      return {
        ...prev,
        layers: [...prev.layers, brushLayer],
      };
    });
  }
}

export class PencilTool extends ToolManager {
  private isDrawing = false;
  private isPointerDown = false;
  private isDragging = false;
  private startPoint: CoordinateType | null = null;
  private readonly THRESHOLD = 2;
  private points: AnchorPointType[] = [];

  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("pencil", canvas, setState);
  }

  getDistance(start: CoordinateType, current: CoordinateType): CoordinateType {
    return { x: current.x - start.x, y: current.y - start.y };
  }

  getHandleInOut(
    start: CoordinateType,
    current: CoordinateType,
  ): { handleIn: CoordinateType; handleOut: CoordinateType } {
    const d = this.getDistance(start, current);
    return {
      handleIn: { x: start.x - d.x, y: start.y - d.y },
      handleOut: { x: start.x + d.x, y: start.y + d.y },
    };
  }

  renderPreview(cursor?: CoordinateType) {
    const ctx = this.getCanvas2dContext();
    const canvas = this.canvas!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!this.points.length) return;
    // Commited path
    ctx.beginPath();
    const firstPoint = this.points[0]!;
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (let index = 1; index < this.points.length; index++) {
      const prev = this.points[index - 1]!;
      const curr = this.points[index]!;
      if (prev.handleOut || curr.handleIn) {
        ctx.bezierCurveTo(
          prev.handleOut?.x ?? prev.x,
          prev.handleOut?.y ?? prev.y,
          curr.handleIn?.x ?? curr.x,
          curr.handleIn?.y ?? curr.y,
          curr.x,
          curr.y,
        );
      } else ctx.lineTo(curr.x, curr.y);
    }
    // Rubber band to cursor
    if (this.isDrawing && cursor && !this.isPointerDown) {
      const last = this.points[this.points.length - 1]!;
      if (last.handleOut) {
        ctx.bezierCurveTo(
          last.handleOut.x,
          last.handleOut.y,
          cursor.x,
          cursor.y,
          cursor.x,
          cursor.y,
        );
      } else ctx.lineTo(cursor.x, cursor.y);
    }
    ctx.stroke();
    // Handle guides while dragging
    if (this.isPointerDown && this.isDragging) {
      const last = this.points[this.points.length - 1]!;
      if (last.handleOut && last.handleIn) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(last.handleIn.x, last.handleIn.y);
        ctx.lineTo(last.handleOut.x, last.handleOut.y);
        ctx.stroke();
        for (const h of [last.handleIn, last.handleOut]) {
          ctx.beginPath();
          ctx.arc(h.x, h.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }
  }

  onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isDrawing = true;
    this.isPointerDown = true;
    this.isDragging = false;
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    this.startPoint = { ...pc };
    this.points.push({ ...this.startPoint, handleIn: null, handleOut: null });
    this.renderPreview();
  }

  onPointerMove(event: React.PointerEvent<HTMLCanvasElement>): void {
    if (!this.isDrawing) return;
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    if (this.isPointerDown && this.startPoint) {
      const { x: dx, y: dy } = this.getDistance(this.startPoint, pc);
      if (!this.isDragging && Math.hypot(dx, dy) > this.THRESHOLD) {
        this.isDragging = true;
      }
      if (this.isDragging) {
        const h = this.getHandleInOut(this.startPoint, pc);
        const last = this.points[this.points.length - 1]!;
        last.handleIn = h.handleIn;
        last.handleOut = h.handleOut;
      }
    }
    this.renderPreview(pc);
  }

  onPointerUp(event: React.PointerEvent<HTMLCanvasElement>): void {
    if (!this.isDrawing) return;
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    this.isPointerDown = false;
    this.isDragging = false;
    this.startPoint = null;
    this.renderPreview(pc);
  }

  onKeyDown(event: React.KeyboardEvent<HTMLCanvasElement>): void {
    if (event.key === "Escape") this.deactivate();
  }

  activate(): void {
    this.resetContextState();
  }

  deactivate(): void {
    if (!this.isDrawing) return;
    this.renderPreview();
    this.isDrawing = false;
    this.isPointerDown = false;
    this.isDragging = false;
    const ctx = this.getCanvas2dContext();
    ctx.closePath();
    const penLayer = createPenLayer(this.points);
    this.points = [];
    this.setState((prev) => {
      if (!prev) throw new Error("No project found");
      return {
        ...prev,
        layers: [...prev.layers, penLayer],
      };
    });
  }
}

export class EraserTool extends ToolManager {
  private isDrawing = false;

  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("eraser", canvas, setState);
  }

  onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isDrawing = true;
    const ctx = this.getCanvas2dContext();
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    ctx.beginPath();
    ctx.moveTo(pc.x, pc.y);
  }

  onPointerMove(event: React.PointerEvent<HTMLCanvasElement>): void {
    if (!this.isDrawing) return;
    const ctx = this.getCanvas2dContext();
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    ctx.lineTo(pc.x, pc.y);
    ctx.stroke();
  }

  onPointerUp(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isDrawing = false;
    this.getCanvas2dContext().closePath();
  }

  activate(): void {
    this.resetContextState();
    const ctx = this.getCanvas2dContext();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    ctx.globalCompositeOperation = "destination-out";
  }

  deactivate(): void {
    this.getCanvas2dContext().globalCompositeOperation = "source-over";
  }
}

export class LineTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("line", canvas, setState);
  }
}

export class RectangleTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("rectangle", canvas, setState);
  }
}

export class CircleTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("circle", canvas, setState);
  }
}

export class PolygonTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("polygon", canvas, setState);
  }
}

export class TextTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("text", canvas, setState);
  }
}

export class CropTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("crop", canvas, setState);
  }
}

export class ResizeTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("resize", canvas, setState);
  }
}

export class EyedropperTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("eyedropper", canvas, setState);
  }
}

export class GradientTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("gradient", canvas, setState);
  }
}

export class BlurTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("blur", canvas, setState);
  }
}

export class CloneTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("clone", canvas, setState);
  }
}

export class LassoTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("lasso", canvas, setState);
  }
}

export class MagicTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("magic", canvas, setState);
  }
}

export class ZoomTool extends ToolManager {
  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("zoom", canvas, setState);
  }
}
