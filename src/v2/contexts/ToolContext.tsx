import type { Tool, Tools } from "@src/core/CoreTypes.js";
import type { ReactMouseEvent, ReactPointerEvent } from "@src/types/global.js";
import { getToolController } from "@src/utils/Utils.js";
import { createContext, useMemo, useState } from "react";

type ToolContextType = {
  selectedTool: Tools;
  setSelectedTool: React.Dispatch<React.SetStateAction<Tools>>;
  activeTool: Tool<ReactMouseEvent, ReactPointerEvent>;
} | null;

const ToolContext = createContext<ToolContextType>(null);

export function ToolProvider({ children }: { children: React.ReactNode }) {
  const [selectedTool, setSelectedTool] = useState<Tools>("select");
  const activeTool = useMemo(
    () => getToolController(selectedTool),
    [selectedTool],
  );

  return (
    <ToolContext.Provider value={{ selectedTool, setSelectedTool, activeTool }}>
      {children}
    </ToolContext.Provider>
  );
}

export default ToolContext;
