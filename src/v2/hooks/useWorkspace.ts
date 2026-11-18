import WorkspaceContext from "@src/contexts/WorkspaceContext.js";
import { useContext } from "react";

function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("Use useWorkspace() in WorkspaceProvider!");
  return ctx;
}

export default useWorkspace;
