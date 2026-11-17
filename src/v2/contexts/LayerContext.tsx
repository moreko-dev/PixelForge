import useProject from "@src/hooks/useProject.js";
import { createContext, useState } from "react";

type LayerContextType = {
  selectedLayer: string | null;
  selectedLayerName: string | undefined;
  setSelectedLayer: React.Dispatch<React.SetStateAction<string | null>>;
} | null;

const LayerContext = createContext<LayerContextType>(null);

export function LayerProvider({ children }: { children: React.ReactNode }) {
  const { projectState } = useProject();
  if (!projectState) throw new Error("Project state is null or undefined!");

  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const selectedLayerName = projectState.layers.find(
    (l) => l.id === selectedLayer,
  )?.name;

  return (
    <LayerContext.Provider
      value={{
        selectedLayer,
        selectedLayerName,
        setSelectedLayer,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
}

export default LayerContext;
