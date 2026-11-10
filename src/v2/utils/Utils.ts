import type { Tool, Tools } from "@src/core/CoreTypes.js";
import {
  BlurTool,
  BrushTool,
  CircleTool,
  CloneTool,
  CropTool,
  EraserTool,
  EyedropperTool,
  GradientTool,
  LassoTool,
  LineTool,
  MagicTool,
  MoveTool,
  PanTool,
  PencilTool,
  PolygonTool,
  RectangleTool,
  ResizeTool,
  SelectTool,
  TextTool,
  ZoomTool,
} from "@src/core/ToolController.js";
import type { ReactMouseEvent, ReactPointerEvent } from "@src/types/global.js";

export function getCursor(tool: Tools): string {
  const cursorMap: Record<Tools, string> = {
    select: "default",
    move: "move",
    pan: "grab",
    brush: "crosshair",
    pencil: "crosshair",
    eraser: "crosshair",
    line: "crosshair",
    rectangle: "crosshair",
    circle: "crosshair",
    polygon: "crosshair",
    text: "text",
    crop: "crosshair",
    resize: "nwse-resize",
    eyedropper: "crosshair",
    gradient: "crosshair",
    blur: "crosshair",
    clone: "crosshair",
    lasso: "crosshair",
    magic: "crosshair",
    zoom: "zoom-in",
  };

  return cursorMap[tool];
}

export function getProjectName(): string {
  return `untitled-${Date.now().toString().slice(-5)}`;
}

export function getToolController(
  tool: Tools,
  canvas: HTMLCanvasElement | null,
): Tool {
  type M = ReactMouseEvent;
  type P = ReactPointerEvent;
  const toolMap: Record<Tools, Tool> = {
    select: new SelectTool(canvas),
    move: new MoveTool(canvas),
    pan: new PanTool(canvas),
    brush: new BrushTool(canvas),
    pencil: new PencilTool(canvas),
    eraser: new EraserTool(canvas),
    line: new LineTool(canvas),
    rectangle: new RectangleTool(canvas),
    circle: new CircleTool(canvas),
    polygon: new PolygonTool(canvas),
    text: new TextTool(canvas),
    crop: new CropTool(canvas),
    resize: new ResizeTool(canvas),
    eyedropper: new EyedropperTool(canvas),
    gradient: new GradientTool(canvas),
    blur: new BlurTool(canvas),
    clone: new CloneTool(canvas),
    lasso: new LassoTool(canvas),
    magic: new MagicTool(canvas),
    zoom: new ZoomTool(canvas),
  };

  return toolMap[tool];
}
