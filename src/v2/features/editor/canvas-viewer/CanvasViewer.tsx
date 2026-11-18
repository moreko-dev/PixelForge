import type { Tool } from "@src/core/CoreTypes.js";
import useProject from "@src/hooks/useProject.js";
import useTool from "@src/hooks/useTool.js";
import useWorkspace from "@src/hooks/useWorkspace.js";
import { isControlVisible } from "@src/utils/UiUtils.js";
import { getCursor, getToolController } from "@src/utils/Utils.js";
import { useEffect, useRef } from "react";

function CanvasViewer() {
  const workspaceConfig = useWorkspace();
  const { selectedTool, setSelectedTool } = useTool();
  const { canvasRef, projectState, setProjectState } = useProject();
  if (!projectState) throw new Error("Project state is null or undefined!");
  if (!projectState.canvas)
    throw new Error("Project canvas is null or undefined!");

  useEffect(() => setSelectedTool("select"), []);

  const activeTool = useRef<Tool | null>(null);

  activeTool.current?.deactivate?.();
  activeTool.current =
    selectedTool &&
    getToolController(
      selectedTool,
      canvasRef.current,
      setProjectState,
      workspaceConfig,
    );
  activeTool.current?.activate?.();

  return (
    <div
      className={`bg-workspace overflow-auto p-20! grid place-items-center col-start-2 ${isControlVisible(selectedTool) ? "row-start-3" : "row-start-2"} row-end-5`}
    >
      <canvas
        ref={canvasRef}
        width={projectState.canvas.width}
        height={projectState.canvas.height}
        className="border"
        tabIndex={0}
        {...(activeTool.current !== null && {
          onClick: (event) => activeTool.current?.onClick?.(event),
          onPointerDown: (event) => {
            canvasRef.current?.setPointerCapture(event.pointerId);
            activeTool.current?.onPointerDown?.(event);
          },
          onPointerUp: (event) => activeTool.current?.onPointerUp?.(event),
          onPointerMove: (event) => activeTool.current?.onPointerMove?.(event),
          onPointerCancel: (event) =>
            activeTool.current?.onPointerCancel?.(event),
          onKeyDown: (event) => activeTool.current?.onKeyDown?.(event),
        })}
        style={{
          cursor: selectedTool === null ? "default" : getCursor(selectedTool),
          backgroundColor: projectState.canvas.backgroundColor,
          borderColor: projectState.canvas.borderColor,
        }}
      ></canvas>
    </div>
  );
}

export default CanvasViewer;
