import { createContext, useRef, useState } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const projectState = useRef(null);
  const [, forceUpdate] = useState(0);

  const createProject = (project) => {
    projectState.current = project;
  };

  const removeProject = () => {
    projectState.current = null;
  };

  return (
    <ProjectContext.Provider
      value={{ projectState, forceUpdate, createProject, removeProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContext;
