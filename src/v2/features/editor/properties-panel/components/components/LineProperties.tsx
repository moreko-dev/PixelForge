import Form from "@src/components/Form.js";
import type { Layer, LineLayer, Project } from "@src/core/CoreTypes.js";
import { updateLayerPropertiesOnState } from "@src/core/utils/LayerUtils.js";

function LineProperties({
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
          groupName: "Line style",
          groupFields: [
            {
              dir: "col",
              fields: [
                {
                  key: "line-stroke-color",
                  label: "Stroke color:",
                  type: "color",
                  layout: "inline",
                  config: {
                    size: "sm",
                    swatchOnly: true,
                    className: "rounded!",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<LineLayer>(
                        setState,
                        layer.id,
                        "strokeColor",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "line-line-width",
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
                      updateLayerPropertiesOnState<LineLayer>(
                        setState,
                        layer.id,
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
        "line-stroke-color": (layer as LineLayer).strokeColor,
        "line-line-width": (layer as LineLayer).lineWidth,
      }}
    />
  );
}

export default LineProperties;
