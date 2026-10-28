import Form from "@src/components/Form.js";

function CanvasTabContent() {
  return (
    <div>
      <Form
        formFields={[
          {
            groupName: "Canvas dimension",
            groupFields: [
              {
                dir: "col",
                fields: [
                  {
                    key: "canvas-width",
                    label: "Width:",
                    type: "number",
                    layout: "inline",
                    config: {
                      value: 0,
                      onValueChange: () => {},
                      max: 999999,
                      unit: "px",
                      size: "sm",
                      hideStepper: true,
                      className: "rounded! max-w-30",
                    },
                  },
                  {
                    key: "canvas-height",
                    label: "Height:",
                    type: "number",
                    layout: "inline",
                    config: {
                      value: 0,
                      onValueChange: () => {},
                      max: 999999,
                      unit: "px",
                      size: "sm",
                      hideStepper: true,
                      className: "rounded! max-w-30",
                    },
                  },
                ],
              },
            ],
          },
          {
            groupName: "Canvas style",
            groupFields: [
              {
                dir: "col",
                fields: [
                  {
                    key: "canvas-bgcolor",
                    label: "Background:",
                    type: "color",
                    layout: "inline",
                    config: {
                      value: "#FFFFFF",
                      onValueChange: () => {},
                      size: "sm",
                      swatchOnly: true,
                      className: "rounded!",
                    },
                  },
                  {
                    key: "canvas-bordercolor",
                    label: "Border:",
                    type: "color",
                    layout: "inline",
                    config: {
                      value: "#000000",
                      onValueChange: () => {},
                      size: "sm",
                      swatchOnly: true,
                      className: "rounded!",
                    },
                  },
                ],
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default CanvasTabContent;
