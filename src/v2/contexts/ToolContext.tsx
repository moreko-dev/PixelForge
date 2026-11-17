import type { Tool, Tools } from "@src/core/CoreTypes.js";
import useProject from "@src/hooks/useProject.js";
import { getToolController } from "@src/utils/Utils.js";
import { createContext, useEffect, useRef, useState } from "react";

type ToolContextType = {
  selectedTool: Tools | null;
  setSelectedTool: React.Dispatch<React.SetStateAction<Tools | null>>;
  activeTool: Tool | null;
} | null;

const ToolContext = createContext<ToolContextType>(null);

export function ToolProvider({ children }: { children: React.ReactNode }) {
  const { canvasRef, setProjectState } = useProject();
  const [selectedTool, setSelectedTool] = useState<Tools | null>(null);
  let activeTool = useRef<Tool | null>(null);

  useEffect(() => {
    activeTool.current?.deactivate?.();
    activeTool.current =
      selectedTool === null
        ? null
        : getToolController(selectedTool, canvasRef.current, setProjectState);
    activeTool.current?.activate?.();
  }, [selectedTool]);

  return (
    <ToolContext.Provider
      value={{ selectedTool, setSelectedTool, activeTool: activeTool.current }}
    >
      {children}
    </ToolContext.Provider>
  );
}

export default ToolContext;
