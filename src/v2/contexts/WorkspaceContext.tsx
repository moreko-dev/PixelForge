import React, { createContext, useState } from "react";

export type WorkspaceContextType = {
  eraserWidth: number;
  setEraserWidth: React.Dispatch<React.SetStateAction<number>>;
  polySides: number;
  setPolySides: React.Dispatch<React.SetStateAction<number>>;
};

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [eraserWidth, setEraserWidth] = useState<number>(5);
  const [polySides, setPolySides] = useState<number>(3);

  return (
    <WorkspaceContext.Provider
      value={{ eraserWidth, setEraserWidth, polySides, setPolySides }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export default WorkspaceContext;
