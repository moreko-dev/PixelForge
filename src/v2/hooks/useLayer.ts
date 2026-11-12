import LayerContext from "@src/contexts/LayerContext.js";
import { useContext } from "react";

function useLayer() {
  const ctx = useContext(LayerContext);
  if (!ctx) throw new Error("Use useLayer() in LayerProvider.");
  return ctx;
}

export default useLayer;
