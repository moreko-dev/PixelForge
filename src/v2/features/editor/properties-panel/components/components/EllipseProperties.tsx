import Form from "@src/components/Form.js";
import type { EllipseLayer, Layer, Project } from "@src/core/CoreTypes.js";
import { updateLayerPropertiesOnState } from "@src/core/utils/LayerUtils.js";

function EllipseProperties({
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
                  key: "circle-stroke-color",
                  label: "Stroke color:",
                  type: "color",
                  layout: "inline",
                  config: {
                    size: "sm",
                    swatchOnly: true,
                    className: "rounded!",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<EllipseLayer>(
                        setState,
                        layer,
                        "strokeColor",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "circle-fill-color",
                  label: "Fill color:",
                  type: "color",
                  layout: "inline",
                  config: {
                    size: "sm",
                    swatchOnly: true,
                    className: "rounded!",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<EllipseLayer>(
                        setState,
                        layer,
                        "fillColor",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "circle-line-width",
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
                      updateLayerPropertiesOnState<EllipseLayer>(
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
        {
          groupName: "Shape dimension",
          groupFields: [
            {
              dir: "row",
              fields: [
                {
                  key: "circle-x",
                  label: "X:",
                  type: "number",
                  layout: "inline",
                  config: {
                    max: 999999,
                    unit: "px",
                    size: "sm",
                    hideStepper: true,
                    className: "rounded! max-w-20",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<EllipseLayer>(
                        setState,
                        layer,
                        "x",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "circle-y",
                  label: "Y:",
                  type: "number",
                  layout: "inline",
                  config: {
                    max: 999999,
                    unit: "px",
                    size: "sm",
                    hideStepper: true,
                    className: "rounded! max-w-20",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<EllipseLayer>(
                        setState,
                        layer,
                        "y",
                        value,
                      );
                    },
                  },
                },
              ],
            },
            {
              dir: "col",
              fields: [
                {
                  key: "circle-radius",
                  label: "Radius:",
                  type: "number",
                  layout: "inline",
                  config: {
                    max: 999999,
                    unit: "px",
                    size: "sm",
                    hideStepper: true,
                    className: "rounded! max-w-30",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<EllipseLayer>(
                        setState,
                        layer,
                        "radius",
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
        "circle-stroke-color": (layer as EllipseLayer).strokeColor,
        "circle-fill-color": (layer as EllipseLayer).fillColor,
        "circle-line-width": (layer as EllipseLayer).lineWidth,
        "circle-x": (layer as EllipseLayer).x,
        "circle-y": (layer as EllipseLayer).y,
        "circle-radius": (layer as EllipseLayer).radius,
      }}
    />
  );
}

export default EllipseProperties;
