import { createContext, useRef, useState } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const projectState = useRef(null);
  const [, updator] = useState(false);

  const createProject = (project) => {
    projectState.current = project;
    forceUpdate();
  };

  const removeProject = () => {
    projectState.current = null;
    forceUpdate();
  };

  const forceUpdate = () => {
    updator((prev) => !prev);
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
