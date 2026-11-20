import { EmptyState } from "@src/components/EmptyState.js";
import type { Layer, Project } from "@src/core/CoreTypes.js";
import useLayer from "@src/hooks/useLayer.js";
import useProject from "@src/hooks/useProject.js";
import { Fragment } from "react/jsx-runtime";
import LineProperties from "./components/LineProperties.js";
import PenBrushProperties from "./components/PenBrushProperties.js";
import PolygonProperties from "./components/PolygonProperties.js";
import RectangleProperties from "./components/RectangleProperties.js";

function getLayerProperties(
  layer: Layer,
  setState: React.Dispatch<React.SetStateAction<Project | null>>,
): React.ReactNode {
  switch (layer.type) {
    case "brush":
    case "pen":
      return <PenBrushProperties layer={layer} setState={setState} />;
    case "line":
      return <LineProperties layer={layer} setState={setState} />;
    case "rectangle":
    case "ellipse":
      return <RectangleProperties layer={layer} setState={setState} />;
    case "polygon":
      return <PolygonProperties layer={layer} setState={setState} />;
    default:
      return (
        <span className="block select-none text-sm text-muted-foreground text-center">
          Unsupported layer
        </span>
      );
  }
}

function PropertiesTabContent() {
  const { selectedLayer } = useLayer();
  const { projectState, setProjectState } = useProject();
  if (!projectState) throw new Error("Project state is null or undefined!");

  const selectedLayerObj = projectState.layers.find(
    (layer) => layer.id === selectedLayer,
  );

  return (
    <div>
      {selectedLayerObj ? (
        <Fragment key={selectedLayerObj.id}>
          {getLayerProperties(selectedLayerObj, setProjectState)}
        </Fragment>
      ) : (
        <EmptyState
          title="No Selection!"
          description="Select layer to start editing."
          className="min-h-fit! p-4! border-none!"
        />
      )}
    </div>
  );
}

export default PropertiesTabContent;
