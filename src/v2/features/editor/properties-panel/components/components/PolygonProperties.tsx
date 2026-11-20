import Form from "@src/components/Form.js";
import type { Layer, PolygonLayer, Project } from "@src/core/CoreTypes.js";
import { updateLayerPropertiesOnState } from "@src/core/utils/LayerUtils.js";

function PolygonProperties({
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
          groupName: "Shape style",
          groupFields: [
            {
              dir: "col",
              fields: [
                {
                  key: "rectangle-stroke-color",
                  label: "Stroke color:",
                  type: "color",
                  layout: "inline",
                  config: {
                    size: "sm",
                    swatchOnly: true,
                    className: "rounded!",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<PolygonLayer>(
                        setState,
                        layer,
                        "strokeColor",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "rectangle-fill-color",
                  label: "Fill color:",
                  type: "color",
                  layout: "inline",
                  config: {
                    size: "sm",
                    swatchOnly: true,
                    className: "rounded!",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<PolygonLayer>(
                        setState,
                        layer,
                        "fillColor",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "rectangle-line-width",
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
                      updateLayerPropertiesOnState<PolygonLayer>(
                        setState,
                        layer,
                        "lineWidth",
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
        "rectangle-stroke-color": (layer as PolygonLayer).strokeColor,
        "rectangle-fill-color": (layer as PolygonLayer).fillColor,
        "rectangle-line-width": (layer as PolygonLayer).lineWidth,
      }}
    />
  );
}

export default PolygonProperties;
