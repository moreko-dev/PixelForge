import type { Tool, Tools } from "@src/core/CoreTypes.js";
import useProject from "@src/hooks/useProject.js";
import { getToolController } from "@src/utils/Utils.js";
import { createContext, useMemo, useState } from "react";

type ToolContextType = {
  selectedTool: Tools | null;
  setSelectedTool: React.Dispatch<React.SetStateAction<Tools | null>>;
  activeTool: Tool | null;
} | null;

const ToolContext = createContext<ToolContextType>(null);

export function ToolProvider({ children }: { children: React.ReactNode }) {
  const { canvasRef } = useProject();
  const [selectedTool, setSelectedTool] = useState<Tools | null>(null);

  const activeTool = useMemo(
    () =>
      selectedTool === null
        ? null
        : getToolController(selectedTool, canvasRef.current),
    [selectedTool],
  );

  return (
    <ToolContext.Provider value={{ selectedTool, setSelectedTool, activeTool }}>
      {children}
    </ToolContext.Provider>
  );
}

export default ToolContext;
