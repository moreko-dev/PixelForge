import useLayer from "@src/hooks/useLayer.js";
function LayerStatus() {
  const { selectedLayerName } = useLayer();

  return <span>{selectedLayerName || "NO_SELECTED_LAYER"}</span>;
}

export default LayerStatus;
