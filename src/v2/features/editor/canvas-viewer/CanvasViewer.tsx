import type { BrushCallbackType } from "@src/core/ToolController.js";
import { createBrushLayer } from "@src/core/utils/LayerUtils.js";
import useProject from "@src/hooks/useProject.js";
import useTool from "@src/hooks/useTool.js";
import { getCursor } from "@src/utils/Utils.js";
import { useEffect } from "react";

function CanvasViewer() {
  const { selectedTool, setSelectedTool, activeTool } = useTool();
  const { canvasRef, projectState, setProjectState } = useProject();
  if (!projectState) throw new Error("Project state is null or undefined!");
  if (!projectState.canvas)
    throw new Error("Project canvas is null or undefined!");

  useEffect(() => setSelectedTool("select"), []);

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!activeTool) return;
    activeTool.onPointerUp?.(event, (props) => {
      if (activeTool.type === "brush") {
        const brushLayer = createBrushLayer(
          (props as BrushCallbackType).points,
        );
        setProjectState((prev) => {
          if (!prev) throw new Error("No project found");
          return {
            ...prev,
            layers: [...prev.layers, brushLayer],
          };
        });
      }
    });
  };

  return (
    <div className="bg-workspace overflow-auto p-20! grid place-items-center">
      <canvas
        ref={canvasRef}
        width={projectState.canvas.width}
        height={projectState.canvas.height}
        className="border"
        {...(activeTool !== null && {
          onClick: (event) => activeTool.onClick?.(event),
          onPointerDown: (event) => {
            canvasRef.current?.setPointerCapture(event.pointerId);
            activeTool.onPointerDown?.(event);
          },
          onPointerUp: (event) => handlePointerUp(event),
          onPointerMove: (event) => activeTool.onPointerMove?.(event),
          onPointerCancel: (event) => activeTool.onPointerCancel?.(event),
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
