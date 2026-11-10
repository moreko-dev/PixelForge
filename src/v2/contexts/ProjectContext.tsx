import type { Project } from "@src/core/CoreTypes.js";
import { createContext, useRef, useState } from "react";

type ProjectStateType = Project | null;

type ProjectContextType = {
  projectState: ProjectStateType;
  setProjectState: React.Dispatch<React.SetStateAction<ProjectStateType>>;
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
} | null;

const ProjectContext = createContext<ProjectContextType>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projectState, setProjectState] = useState<ProjectStateType>(null);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <ProjectContext.Provider
      value={{
        projectState,
        setProjectState,
        isDirty,
        setIsDirty,
        canvasRef,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContext;
