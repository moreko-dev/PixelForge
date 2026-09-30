import { useContext } from "react";
import ProjectContext from "./../../../../contexts/ProjectContext";

function ProjectNameLabel() {
  const { projectState } = useContext(ProjectContext);
  return (
    <div className="flex-1 flex gap-2 items-center">
      <span className="inline-block size-2 bg-danger rounded-full"></span>
      <span className="text-text-muted">{projectState.current.name}</span>
    </div>
  );
}

export default ProjectNameLabel;
