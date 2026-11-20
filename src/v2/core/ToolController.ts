import { getPointerRelativeCoordinate } from "@src/utils/Utils.js";
import type { Dispatch, SetStateAction } from "react";
import type {
  AnchorPointType,
  CoordinateType,
  Project,
  Tool,
  Tools,
} from "./CoreTypes.js";
import {
  createBrushLayer,
  createEllipseLayer,
  createEraserLayer,
  createLineLayer,
  createPenLayer,
  createPolygonLayer,
  createRectangleLayer,
} from "./utils/LayerUtils.js";

export type BrushCallbackType = {
  points: CoordinateType[];
};

class ToolManager implements Tool {
  protected isDrawing = false;
  protected isDragging = false;
  protected isUsed = false;
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
  private points: CoordinateType[] = [];

  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("brush", canvas, setState);
  }

  onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isUsed = true;
    this.isDrawing = true;
    const ctx = this.getCanvas2dContext();
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    ctx.beginPath();
    ctx.moveTo(pc.x, pc.y);
    ctx.lineTo(pc.x, pc.y);
    ctx.stroke();
    this.points.push({ ...pc });
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
    if (!this.isUsed) return;
    this.isUsed = false;
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
  private readonly THRESHOLD = 2;
  private isPointerDown = false;
  private startPoint: CoordinateType | null = null;
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
    this.isUsed = true;
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
    if (!this.isDrawing || !this.isUsed) return;
    this.isUsed = false;
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
  private points: CoordinateType[] = [];
  private lineWidth: number = 5;

  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
    lineWidth?: number,
  ) {
    super("eraser", canvas, setState);
    this.lineWidth = lineWidth ?? 5;
  }

  onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isUsed = true;
    this.isDrawing = true;
    const ctx = this.getCanvas2dContext();
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    this.points.push({ ...pc });
    ctx.beginPath();
    ctx.moveTo(pc.x, pc.y);
    ctx.lineTo(pc.x, pc.y);
    ctx.stroke();
  }

  onPointerMove(event: React.PointerEvent<HTMLCanvasElement>): void {
    if (!this.isDrawing) return;
    const ctx = this.getCanvas2dContext();
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    const last = this.points[this.points.length - 1]!;
    this.points.push({ ...pc });
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(pc.x, pc.y);
    ctx.stroke();
  }

  onPointerUp(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.getCanvas2dContext().closePath();
    this.isDrawing = false;
    this.deactivate();
    this.points = [];
  }

  activate(): void {
    this.resetContextState();
    const ctx = this.getCanvas2dContext();
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.globalCompositeOperation = "destination-out";
  }

  deactivate(): void {
    if (!this.isUsed) return;
    this.isUsed = false;
    this.getCanvas2dContext().globalCompositeOperation = "source-over";
    const eraserLayer = createEraserLayer(this.points);
    this.points = [];
    this.setState((prev) => {
      if (!prev) throw new Error("No project found");
      return {
        ...prev,
        layers: [...prev.layers, eraserLayer],
      };
    });
  }
}

export class LineTool extends ToolManager {
  private lineBounds: { start: CoordinateType; end: CoordinateType } = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  };

  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("line", canvas, setState);
  }

  onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isUsed = true;
    this.isDrawing = true;
    this.isDragging = true;
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    this.lineBounds.start = { ...pc };
  }

  onPointerMove(event: React.PointerEvent<HTMLCanvasElement>): void {
    if (!this.isDrawing) return;
    const ctx = this.getCanvas2dContext();
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    ctx.beginPath();
    ctx.moveTo(this.lineBounds.start.x, this.lineBounds.start.y);
    ctx.lineTo(pc.x, pc.y);
    ctx.stroke();
    ctx.closePath();
  }

  onPointerUp(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isDrawing = false;
    this.isDragging = false;
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    const ctx = this.getCanvas2dContext();
    ctx.closePath();
    this.lineBounds.end = { ...pc };
    this.deactivate();
  }

  activate(): void {
    this.resetContextState();
  }

  deactivate(): void {
    if (!this.isUsed) return;
    this.isUsed = false;
    const {
      start: { x: sx, y: sy },
      end: { x: ex, y: ey },
    } = (this.lineBounds = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });
    const lineLayer = createLineLayer(sx, sy, ex, ey);
    this.setState((prev) => {
      if (!prev) throw new Error("No project found");
      return {
        ...prev,
        layers: [...prev.layers, lineLayer],
      };
    });
  }
}

export class RectangleTool extends ToolManager {
  private rectangleBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  } = { x: 0, y: 0, width: 0, height: 0 };

  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("rectangle", canvas, setState);
  }

  onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isUsed = true;
    this.isDragging = true;
    this.isDrawing = true;
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    [this.rectangleBounds.x, this.rectangleBounds.y] = [pc.x, pc.y];
  }

  onPointerMove(event: React.PointerEvent<HTMLCanvasElement>): void {
    if (!this.isDrawing) return;
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    [this.rectangleBounds.width, this.rectangleBounds.height] = [
      pc.x - this.rectangleBounds.x,
      pc.y - this.rectangleBounds.y,
    ];
    const ctx = this.getCanvas2dContext();
    ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    const { x, y, width, height } = this.rectangleBounds;
    ctx.strokeRect(x, y, width, height);
  }

  onPointerUp(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isDrawing = false;
    this.isDragging = false;
    this.deactivate();
  }

  activate(): void {
    this.resetContextState();
  }

  deactivate(): void {
    if (!this.isUsed) return;
    this.isUsed = false;
    const { x, y, width, height } = this.rectangleBounds;
    const rectangleLayer = createRectangleLayer(x, y, width, height);
    this.setState((prev) => {
      if (!prev) throw new Error("No project found");
      return {
        ...prev,
        layers: [...prev.layers, rectangleLayer],
      };
    });
  }
}

export class EllipseTool extends ToolManager {
  private isShiftDown = false;
  private ellipseBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  } = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
  ) {
    super("ellipse", canvas, setState);
  }

  onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isDragging = true;
    this.isDrawing = true;
    this.isUsed = true;
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    [this.ellipseBounds.x, this.ellipseBounds.y] = [pc.x, pc.y];
  }

  onPointerMove(event: React.PointerEvent<HTMLCanvasElement>): void {
    if (!this.isDrawing) return;
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    let width = pc.x - this.ellipseBounds.x;
    let height = pc.y - this.ellipseBounds.y;
    if (this.isShiftDown) {
      const size = Math.max(Math.abs(width), Math.abs(height));
      width = Math.sign(width) * size;
      height = Math.sign(height) * size;
    }
    const x = Math.min(this.ellipseBounds.x, this.ellipseBounds.x + width);
    const y = Math.min(this.ellipseBounds.y, this.ellipseBounds.y + height);
    const finalWidth = Math.abs(width);
    const finalHeight = Math.abs(height);
    [this.ellipseBounds.width, this.ellipseBounds.height] = [
      finalWidth,
      finalHeight,
    ];
    const ctx = this.getCanvas2dContext();
    ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    ctx.beginPath();
    ctx.ellipse(
      x + finalWidth / 2,
      y + finalHeight / 2,
      finalWidth / 2,
      finalHeight / 2,
      0,
      0,
      Math.PI * 2,
    );
    ctx.stroke();
    ctx.closePath();
  }

  onPointerUp(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isDragging = false;
    this.isDrawing = false;
    this.deactivate();
  }

  onKeyDown(event: React.KeyboardEvent<HTMLCanvasElement>): void {
    if (event.key === "Shift") this.isShiftDown = true;
  }

  onKeyUp(event: React.KeyboardEvent<HTMLCanvasElement>): void {
    if (event.key === "Shift") this.isShiftDown = false;
  }

  activate(): void {
    this.resetContextState();
  }

  deactivate(): void {
    if (!this.isUsed) return;
    this.isUsed = false;
    const { x, y, width, height } = this.ellipseBounds;
    const ellipseLayer = createEllipseLayer(x, y, width, height);
    this.setState((prev) => {
      if (!prev) throw new Error("No project found");
      return {
        ...prev,
        layers: [...prev.layers, ellipseLayer],
      };
    });
  }
}

export class PolygonTool extends ToolManager {
  private isShiftDown = false;
  private startPoint: CoordinateType | null = null;
  private sides: number;
  private points: CoordinateType[] = [];

  constructor(
    canvas: HTMLCanvasElement | null,
    setState: Dispatch<SetStateAction<Project | null>>,
    sides: number,
  ) {
    super("polygon", canvas, setState);
    this.sides = sides;
  }

  getPolygonPoints(
    start: CoordinateType,
    end: CoordinateType,
    sides: number,
    isRegular = false,
  ): CoordinateType[] {
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    if (isRegular) {
      const size = Math.min(Math.abs(dx), Math.abs(dy));
      dx = Math.sign(dx || 1) * size;
      dy = Math.sign(dy || 1) * size;
    }
    const width = dx;
    const height = dy;
    const centerX = start.x + width / 2;
    const centerY = start.y + height / 2;
    const radiusX = Math.abs(width) / 2;
    const radiusY = Math.abs(height) / 2;
    const points = [];
    for (let i = 0; i < sides; i++) {
      const angle = (2 * Math.PI * i) / sides - Math.PI / 2;
      points.push({
        x: centerX + radiusX * Math.cos(angle),
        y: centerY + radiusY * Math.sin(angle),
      });
    }
    return points;
  }

  renderPreview() {
    if (this.points.length < 3) return;
    const ctx = this.getCanvas2dContext();
    ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    ctx.beginPath();
    const firstPoint = this.points[0]!;
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (let i = 1; i < this.points.length; i++) {
      const currPoint = this.points[i]!;
      ctx.lineTo(currPoint.x, currPoint.y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.stroke();
    ctx.closePath();
  }

  onPointerDown(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isDrawing = true;
    this.isDragging = true;
    this.isUsed = true;
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    this.startPoint = { ...pc };
  }

  onPointerMove(event: React.PointerEvent<HTMLCanvasElement>): void {
    if (!this.isDrawing) return;
    const pc = getPointerRelativeCoordinate(this.canvas!, event);
    this.points = this.getPolygonPoints(
      this.startPoint!,
      pc,
      this.sides,
      this.isShiftDown,
    );
    this.renderPreview();
  }

  onPointerUp(event: React.PointerEvent<HTMLCanvasElement>): void {
    this.isDrawing = false;
    this.isDragging = false;
    this.deactivate();
  }

  onKeyDown(event: React.KeyboardEvent<HTMLCanvasElement>): void {
    if (event.key === "Shift") this.isShiftDown = true;
  }

  onKeyUp(event: React.KeyboardEvent<HTMLCanvasElement>): void {
    if (event.key === "Shift") this.isShiftDown = false;
  }

  activate(): void {
    this.resetContextState();
  }

  deactivate(): void {
    if (!this.isUsed) return;
    this.isUsed = false;
    const polygonLayer = createPolygonLayer(this.sides, this.points);
    this.setState((prev) => {
      if (!prev) throw new Error("No project found");
      return {
        ...prev,
        layers: [...prev.layers, polygonLayer],
      };
    });
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
