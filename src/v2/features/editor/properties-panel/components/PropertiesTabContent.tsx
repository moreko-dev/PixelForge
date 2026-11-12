import { EmptyState } from "@src/components/EmptyState.js";
import Form from "@src/components/Form.js";
import type { BrushLayer, Layer, Project } from "@src/core/CoreTypes.js";
import { updateLayerPropertiesOnState } from "@src/core/utils/LayerUtils.js";
import useLayer from "@src/hooks/useLayer.js";
import useProject from "@src/hooks/useProject.js";
import { Fragment } from "react/jsx-runtime";
import LineCapSelector from "./components/LineCapSelector.js";
import LineJoinSelector from "./components/LineJoinSelector.js";

function getLayerProperties(
  layer: Layer,
  setState: React.Dispatch<React.SetStateAction<Project | null>>,
): React.ReactNode {
  switch (layer.type) {
    case "brush":
      return (
        <Form
          formConfig={{ group: true }}
          formFields={[
            {
              groupName: "Brush style",
              groupFields: [
                {
                  dir: "col",
                  fields: [
                    {
                      key: "brush-stroke-color",
                      label: "Stroke color:",
                      type: "color",
                      layout: "inline",
                      config: {
                        size: "sm",
                        swatchOnly: true,
                        className: "rounded!",
                        onChange: (value) => {
                          updateLayerPropertiesOnState<BrushLayer>(
                            setState,
                            layer,
                            "strokeColor",
                            value,
                          );
                        },
                      },
                    },
                  ],
                },
              ],
            },
            {
              groupName: "Line style",
              groupFields: [
                {
                  dir: "col",
                  fields: [
                    {
                      key: "brush-line-width",
                      label: "Line Width:",
                      type: "number",
                      layout: "inline",
                      config: {
                        max: 999999,
                        unit: "px",
                        size: "sm",
                        hideStepper: true,
                        className: "rounded! max-w-30",
                      },
                    },
                    {
                      key: "brush-line-cap",
                      label: "Line cap",
                      type: "custom",
                      layout: "inline",
                      config: {
                        Component: LineCapSelector,
                      },
                    },
                    {
                      key: "brush-line-join",
                      label: "Line join",
                      type: "custom",
                      layout: "inline",
                      config: {
                        Component: LineJoinSelector,
                      },
                    },
                  ],
                },
              ],
            },
          ]}
          formData={{
            "brush-stroke-color": (layer as BrushLayer).strokeColor,
            "brush-line-width": (layer as BrushLayer).lineWidth,
            "brush-line-cap": (layer as BrushLayer).lineCap,
            "brush-line-join": (layer as BrushLayer).lineJoin,
          }}
        />
      );

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
