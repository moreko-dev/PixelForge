import ProjectContext from "@src/contexts/ProjectContext.js";
import { useContext } from "react";

function useTheme() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("Use useProject() in ProjectProvider.");
  return ctx;
}

export default useTheme;
