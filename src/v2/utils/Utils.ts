import type { WorkspaceContextType } from "@src/contexts/WorkspaceContext.js";
import type {
  CoordinateType,
  Project,
  Tool,
  Tools,
} from "@src/core/CoreTypes.js";
import {
  BlurTool,
  BrushTool,
  CloneTool,
  CropTool,
  EllipseTool,
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
import type React from "react";
import type { Dispatch, SetStateAction } from "react";

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
    ellipse: "crosshair",
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
  setState: Dispatch<SetStateAction<Project | null>>,
  workspaceConfig: WorkspaceContextType,
): Tool {
  const toolMap: Record<Tools, Tool> = {
    select: new SelectTool(canvas, setState),
    move: new MoveTool(canvas, setState),
    pan: new PanTool(canvas, setState),
    brush: new BrushTool(canvas, setState),
    pencil: new PencilTool(canvas, setState),
    eraser: new EraserTool(canvas, setState, workspaceConfig.eraserWidth),
    line: new LineTool(canvas, setState),
    rectangle: new RectangleTool(canvas, setState),
    ellipse: new EllipseTool(canvas, setState),
    polygon: new PolygonTool(canvas, setState, workspaceConfig.polySides),
    text: new TextTool(canvas, setState),
    crop: new CropTool(canvas, setState),
    resize: new ResizeTool(canvas, setState),
    eyedropper: new EyedropperTool(canvas, setState),
    gradient: new GradientTool(canvas, setState),
    blur: new BlurTool(canvas, setState),
    clone: new CloneTool(canvas, setState),
    lasso: new LassoTool(canvas, setState),
    magic: new MagicTool(canvas, setState),
    zoom: new ZoomTool(canvas, setState),
  };

  return toolMap[tool];
}

export function getPointerRelativeCoordinate(
  canvas: HTMLCanvasElement,
  event: React.PointerEvent<HTMLCanvasElement> | PointerEvent,
): CoordinateType {
  const rect = canvas.getBoundingClientRect();

  // No Scale //
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

export function calculateRadius(
  sx: number,
  sy: number,
  cx: number,
  cy: number,
): number {
  return Math.abs(cx >= cy ? sx - cx : sy - cy);
}
