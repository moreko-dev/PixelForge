import type { Tools } from "@src/core/CoreTypes.js";

export function isControlVisible(tool: Tools | null) {
  return tool && ["eraser", "polygon"].includes(tool);
}
