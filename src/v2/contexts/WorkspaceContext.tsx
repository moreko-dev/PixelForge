import React, { createContext, useRef, useState } from "react";

type TextInputState = {
  status: "active" | "deactive";
  x: number;
  y: number;
};

export type WorkspaceContextType = {
  eraserWidth: number;
  setEraserWidth: React.Dispatch<React.SetStateAction<number>>;
  polySides: number;
  setPolySides: React.Dispatch<React.SetStateAction<number>>;
  textToolInputRef: React.RefObject<HTMLInputElement | null>;
  textInputState: TextInputState;
  setTextInputState: React.Dispatch<React.SetStateAction<TextInputState>>;
};

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [eraserWidth, setEraserWidth] = useState<number>(5);
  const [polySides, setPolySides] = useState<number>(3);
  const textToolInputRef = useRef<HTMLInputElement | null>(null);
  const [textInputState, setTextInputState] = useState<TextInputState>({
    status: "deactive",
    x: 0,
    y: 0,
  });

  return (
    <WorkspaceContext.Provider
      value={{
        eraserWidth,
        setEraserWidth,
        polySides,
        setPolySides,
        textToolInputRef,
        textInputState,
        setTextInputState,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export default WorkspaceContext;
