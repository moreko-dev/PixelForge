import Form from "@src/components/Form.js";
import type { BrushLayer, Layer, Project } from "@src/core/CoreTypes.js";
import { updateLayerPropertiesOnState } from "@src/core/utils/LayerUtils.js";
import LineCapSelector from "./LineCapSelector.js";
import LineJoinSelector from "./LineJoinSelector.js";

function PenBrushProperties({
  layer,
  setState,
}: {
  layer: Layer;
  setState: React.Dispatch<React.SetStateAction<Project | null>>;
}) {
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
                        layer.id,
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
                    onChange: (value) => {
                      updateLayerPropertiesOnState<BrushLayer>(
                        setState,
                        layer.id,
                        "lineWidth",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "brush-line-cap",
                  label: "Line cap",
                  type: "custom",
                  layout: "inline",
                  config: {
                    Component: LineCapSelector,
                    onChange: (value) => {
                      updateLayerPropertiesOnState<BrushLayer>(
                        setState,
                        layer.id,
                        "lineCap",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "brush-line-join",
                  label: "Line join",
                  type: "custom",
                  layout: "inline",
                  config: {
                    Component: LineJoinSelector,
                    onChange: (value) => {
                      updateLayerPropertiesOnState<BrushLayer>(
                        setState,
                        layer.id,
                        "lineJoin",
                        value,
                      );
                    },
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
}

export default PenBrushProperties;
