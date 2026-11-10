import useProject from "@src/hooks/useProject.js";
import useTool from "@src/hooks/useTool.js";
import { getCursor } from "@src/utils/Utils.js";
import { useRef } from "react";

function CanvasViewer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { selectedTool, activeTool } = useTool();
  const { projectState } = useProject();
  if (!projectState) throw new Error("Project state is null or undefined!");
  if (!projectState.canvas)
    throw new Error("Project canvas is null or undefined!");

  return (
    <div className="bg-workspace overflow-auto p-20! grid place-items-center">
      <canvas
        ref={canvasRef}
        width={projectState.canvas.width}
        height={projectState.canvas.height}
        className="border"
        onClick={(event) => activeTool.onClick?.(event)}
        onPointerDown={(event) => {
          canvasRef.current?.setPointerCapture(event.pointerId);
          activeTool.onPointerDown?.(event);
        }}
        onPointerUp={(event) => activeTool.onPointerUp?.(event)}
        onPointerMove={(event) => activeTool.onPointerMove?.(event)}
        onPointerCancel={(event) => activeTool.onPointerCancel?.(event)}
        style={{
          cursor: getCursor(selectedTool),
          backgroundColor: projectState.canvas.backgroundColor,
          borderColor: projectState.canvas.borderColor,
        }}
      ></canvas>
    </div>
  );
}

export default CanvasViewer;
