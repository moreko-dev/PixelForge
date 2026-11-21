import Form from "@src/components/Form.js";
import type { Layer, Project, TextLayer } from "@src/core/CoreTypes.js";
import { updateLayerPropertiesOnState } from "@src/core/utils/LayerUtils.js";
import { canvasFontFamilies } from "@src/data/Constants.js";

function TextProperties({
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
          groupName: "Text dimension",
          groupFields: [
            {
              dir: "row",
              fields: [
                {
                  key: "text-x",
                  label: "X:",
                  type: "number",
                  layout: "inline",
                  config: {
                    max: 999999,
                    unit: "px",
                    size: "sm",
                    hideStepper: true,
                    className: "rounded! max-w-20!",
                    placeholder: "X...",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<TextLayer>(
                        setState,
                        layer.id,
                        "x",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "text-y",
                  label: "Y:",
                  type: "number",
                  layout: "inline",
                  config: {
                    max: 999999,
                    unit: "px",
                    size: "sm",
                    hideStepper: true,
                    className: "rounded! max-w-20!",
                    placeholder: "Y...",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<TextLayer>(
                        setState,
                        layer.id,
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
                  key: "text-width",
                  label: "Width:",
                  type: "number",
                  layout: "inline",
                  config: {
                    max: 999999,
                    unit: "px",
                    size: "sm",
                    hideStepper: true,
                    className: "rounded! max-w-20!",
                    placeholder: "W...",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<TextLayer>(
                        setState,
                        layer.id,
                        "width",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "text-height",
                  label: "Height:",
                  type: "number",
                  layout: "inline",
                  config: {
                    max: 999999,
                    unit: "px",
                    size: "sm",
                    hideStepper: true,
                    className: "rounded! max-w-20!",
                    placeholder: "H...",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<TextLayer>(
                        setState,
                        layer.id,
                        "height",
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
          groupName: "Text style",
          groupFields: [
            {
              dir: "col",
              fields: [
                {
                  key: "text-stroke-color",
                  label: "Stroke color:",
                  type: "color",
                  layout: "inline",
                  config: {
                    size: "sm",
                    swatchOnly: true,
                    className: "rounded!",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<TextLayer>(
                        setState,
                        layer.id,
                        "strokeColor",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "text-fill-color",
                  label: "Fill color:",
                  type: "color",
                  layout: "inline",
                  config: {
                    size: "sm",
                    swatchOnly: true,
                    className: "rounded!",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<TextLayer>(
                        setState,
                        layer.id,
                        "fillColor",
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
          groupName: "Font style",
          groupFields: [
            {
              dir: "col",
              fields: [
                {
                  key: "text-font-family",
                  label: "Font:",
                  type: "select",
                  layout: "inline",
                  config: {
                    size: "sm",
                    className: "rounded!",
                    options: Object.keys(canvasFontFamilies).map((key) => ({
                      label: key,
                      value: canvasFontFamilies[key] as string,
                    })),
                    onChange: (value) => {
                      updateLayerPropertiesOnState<TextLayer>(
                        setState,
                        layer.id,
                        "fontFamily",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "text-font-size",
                  label: "Font size:",
                  type: "number",
                  layout: "inline",
                  config: {
                    max: 999999,
                    unit: "px",
                    size: "sm",
                    hideStepper: true,
                    className: "rounded! max-w-20!",
                    placeholder: "Size...",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<TextLayer>(
                        setState,
                        layer.id,
                        "fontSize",
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
        "text-x": (layer as TextLayer).x,
        "text-y": (layer as TextLayer).y,
        "text-width": (layer as TextLayer).width,
        "text-height": (layer as TextLayer).height,
        "text-stroke-color": (layer as TextLayer).strokeColor,
        "text-fill-color": (layer as TextLayer).fillColor,
        "text-font-family": (layer as TextLayer).fontFamily,
        "text-font-size": (layer as TextLayer).fontSize,
      }}
    />
  );
}

export default TextProperties;
