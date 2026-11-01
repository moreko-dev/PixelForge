import useProject from "@src/hooks/useProject.js";

function CanvasViewer() {
  const { projectState } = useProject();
  if (!projectState) throw new Error("Project state is null or undefined!");
  if (!projectState.canvas)
    throw new Error("Project canvas is null or undefined!");

  return (
    <div className="bg-workspace overflow-auto p-20! grid place-items-center">
      <canvas
        width={projectState.canvas.width}
        height={projectState.canvas.height}
        className="border"
        style={{
          backgroundColor: projectState.canvas.backgroundColor,
          borderColor: projectState.canvas.borderColor,
        }}
      ></canvas>
    </div>
  );
}

export default CanvasViewer;
