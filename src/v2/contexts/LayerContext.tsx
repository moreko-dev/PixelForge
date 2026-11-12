import { createContext, useState } from "react";

type LayerContextType = {
  selectedLayer: string | null;
  setSelectedLayer: React.Dispatch<React.SetStateAction<string | null>>;
} | null;

const LayerContext = createContext<LayerContextType>(null);

export function LayerProvider({ children }: { children: React.ReactNode }) {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  return (
    <LayerContext.Provider
      value={{
        selectedLayer,
        setSelectedLayer,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
}

export default LayerContext;
