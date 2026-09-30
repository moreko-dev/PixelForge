import { useContext } from "react";
import ProjectContext from "./../../../contexts/ProjectContext";

function CanvasViewerPanel() {
  const { projectState } = useContext(ProjectContext);

  return (
    <div className="grid place-items-center overflow-auto">
      <canvas
        width={projectState.canvas.width}
        height={projectState.canvas.height}
        style={{
          backgroundColor: projectState.canvas.background.color,
        }}
      ></canvas>
    </div>
  );
}

export default CanvasViewerPanel;
