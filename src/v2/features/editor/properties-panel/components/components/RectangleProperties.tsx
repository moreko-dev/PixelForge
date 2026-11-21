import Form from "@src/components/Form.js";
import type { Layer, Project, RectangleLayer } from "@src/core/CoreTypes.js";
import { updateLayerPropertiesOnState } from "@src/core/utils/LayerUtils.js";
import React from "react";

function RectangleProperties({
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
                      updateLayerPropertiesOnState<RectangleLayer>(
                        setState,
                        layer.id,
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
                      updateLayerPropertiesOnState<RectangleLayer>(
                        setState,
                        layer.id,
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
                      updateLayerPropertiesOnState<RectangleLayer>(
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
        {
          groupName: "Shape dimension",
          groupFields: [
            {
              dir: "row",
              fields: [
                {
                  key: "rectangle-x",
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
                      updateLayerPropertiesOnState<RectangleLayer>(
                        setState,
                        layer.id,
                        "x",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "rectangle-y",
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
                      updateLayerPropertiesOnState<RectangleLayer>(
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
                  key: "rectangle-width",
                  label: "Width:",
                  type: "number",
                  layout: "inline",
                  config: {
                    max: 999999,
                    unit: "px",
                    size: "sm",
                    hideStepper: true,
                    className: "rounded! max-w-30",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<RectangleLayer>(
                        setState,
                        layer.id,
                        "width",
                        value,
                      );
                    },
                  },
                },
                {
                  key: "rectangle-height",
                  label: "Height:",
                  type: "number",
                  layout: "inline",
                  config: {
                    max: 999999,
                    unit: "px",
                    size: "sm",
                    hideStepper: true,
                    className: "rounded! max-w-30",
                    onChange: (value) => {
                      updateLayerPropertiesOnState<RectangleLayer>(
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
      ]}
      formData={{
        "rectangle-stroke-color": (layer as RectangleLayer).strokeColor,
        "rectangle-fill-color": (layer as RectangleLayer).fillColor,
        "rectangle-line-width": (layer as RectangleLayer).lineWidth,
        "rectangle-x": (layer as RectangleLayer).x,
        "rectangle-y": (layer as RectangleLayer).y,
        "rectangle-width": (layer as RectangleLayer).width,
        "rectangle-height": (layer as RectangleLayer).height,
      }}
    />
  );
}

export default RectangleProperties;
