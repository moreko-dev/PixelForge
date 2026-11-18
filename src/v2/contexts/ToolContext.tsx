import type { Tools } from "@src/core/CoreTypes.js";
import { createContext, useState } from "react";

type ToolContextType = {
  selectedTool: Tools | null;
  setSelectedTool: React.Dispatch<React.SetStateAction<Tools | null>>;
} | null;

const ToolContext = createContext<ToolContextType>(null);

export function ToolProvider({ children }: { children: React.ReactNode }) {
  const [selectedTool, setSelectedTool] = useState<Tools | null>(null);

  return (
    <ToolContext.Provider
      value={{
        selectedTool,
        setSelectedTool,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
}

export default ToolContext;
