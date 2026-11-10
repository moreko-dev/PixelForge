import ToolContext from "@src/contexts/ToolContext.js";
import { useContext } from "react";

function useTool() {
  const ctx = useContext(ToolContext);
  if (!ctx) throw new Error("Use useTool() in ToolProvider.");
  return ctx;
}

export default useTool;
