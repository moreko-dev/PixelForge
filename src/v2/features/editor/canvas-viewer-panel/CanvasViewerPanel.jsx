import { useContext, useEffect, useRef } from "react";
import Renderer from "../../../core/Renderer";
import ProjectContext from "./../../../contexts/ProjectContext";

function CanvasViewerPanel() {
  const { projectState } = useContext(ProjectContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    Renderer.render(canvasRef.current, projectState.current);
  });

  return (
    <div className="grid place-items-center overflow-auto">
      <canvas
        ref={canvasRef}
        width={projectState.current.canvas.width}
        height={projectState.current.canvas.height}
        style={{
          backgroundColor: projectState.current.canvas.background.color,
        }}
      ></canvas>
    </div>
  );
}

export default CanvasViewerPanel;
