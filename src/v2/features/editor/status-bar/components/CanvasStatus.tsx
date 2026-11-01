import VSeprator from "@src/components/VSeprator.js";
import useProject from "@src/hooks/useProject.js";

function CanvasStatus() {
  const { projectState } = useProject();
  if (!projectState) throw new Error("Project state is null or undefined!");
  if (!projectState.canvas)
    throw new Error("Project canvas is null or undefined!");

  return (
    <div className="h-full flex items-center text-foreground-secondary">
      <div className="flex gap-0.5">
        <span>{projectState.canvas.width}</span>×
        <span>{projectState.canvas.height}</span>
      </div>
      <VSeprator marginValue={3} />
      <span>{projectState.canvas.backgroundColor}</span>
    </div>
  );
}

export default CanvasStatus;
