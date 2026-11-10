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
): Tool<ReactMouseEvent, ReactPointerEvent> {
  const toolMap: Record<Tools, Tool<ReactMouseEvent, ReactPointerEvent>> = {
    select: new SelectTool<ReactMouseEvent, ReactPointerEvent>(),
    move: new MoveTool<ReactMouseEvent, ReactPointerEvent>(),
    pan: new PanTool<ReactMouseEvent, ReactPointerEvent>(),
    brush: new BrushTool<ReactMouseEvent, ReactPointerEvent>(),
    pencil: new PencilTool<ReactMouseEvent, ReactPointerEvent>(),
    eraser: new EraserTool<ReactMouseEvent, ReactPointerEvent>(),
    line: new LineTool<ReactMouseEvent, ReactPointerEvent>(),
    rectangle: new RectangleTool<ReactMouseEvent, ReactPointerEvent>(),
    circle: new CircleTool<ReactMouseEvent, ReactPointerEvent>(),
    polygon: new PolygonTool<ReactMouseEvent, ReactPointerEvent>(),
    text: new TextTool<ReactMouseEvent, ReactPointerEvent>(),
    crop: new CropTool<ReactMouseEvent, ReactPointerEvent>(),
    resize: new ResizeTool<ReactMouseEvent, ReactPointerEvent>(),
    eyedropper: new EyedropperTool<ReactMouseEvent, ReactPointerEvent>(),
    gradient: new GradientTool<ReactMouseEvent, ReactPointerEvent>(),
    blur: new BlurTool<ReactMouseEvent, ReactPointerEvent>(),
    clone: new CloneTool<ReactMouseEvent, ReactPointerEvent>(),
    lasso: new LassoTool<ReactMouseEvent, ReactPointerEvent>(),
    magic: new MagicTool<ReactMouseEvent, ReactPointerEvent>(),
    zoom: new ZoomTool<ReactMouseEvent, ReactPointerEvent>(),
  };

  return toolMap[tool];
}
