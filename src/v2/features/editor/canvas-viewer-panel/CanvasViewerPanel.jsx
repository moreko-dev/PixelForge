import { useContext } from "react";
import ProjectContext from "./../../../contexts/ProjectContext";

function CanvasViewerPanel() {
  const { projectState } = useContext(ProjectContext);

  return (
    <div className="grid place-items-center overflow-auto">
      <canvas
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
