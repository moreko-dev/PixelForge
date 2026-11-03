import Form from "@src/components/Form.js";
import type { Canvas } from "@src/core/CoreTypes.js";
import useProject from "@src/hooks/useProject.js";

function CanvasTabContent() {
  const { projectState, setProjectState } = useProject();
  if (!projectState) throw new Error("Project state is null or undefined!");
  if (!projectState.canvas)
    throw new Error("Project canvas is null or undefined!");

  const updateCanvasProperties = (key: keyof Canvas, value: any) => {
    setProjectState((prev) => {
      if (!prev) throw new Error("Project state is null or undefined!");
      if (!prev.canvas) throw new Error("Project canvas is null or undefined!");

      return {
        ...prev,
        canvas: {
          ...prev.canvas,
          [key]: value!,
        },
      };
    });
  };

  return (
    <div>
      <Form
        formConfig={{ group: true }}
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
                      max: 999999,
                      unit: "px",
                      size: "sm",
                      hideStepper: true,
                      className: "rounded! max-w-30",
                      onChange: (value) => {
                        updateCanvasProperties("width", value);
                      },
                    },
                  },
                  {
                    key: "canvas-height",
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
                        updateCanvasProperties("height", value);
                      },
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
                      size: "sm",
                      swatchOnly: true,
                      className: "rounded!",
                      onChange: (value) => {
                        updateCanvasProperties("backgroundColor", value);
                      },
                    },
                  },
                  {
                    key: "canvas-bordercolor",
                    label: "Border:",
                    type: "color",
                    layout: "inline",
                    config: {
                      size: "sm",
                      swatchOnly: true,
                      className: "rounded!",
                      onChange: (value) => {
                        updateCanvasProperties("borderColor", value);
                      },
                    },
                  },
                ],
              },
            ],
          },
        ]}
        formData={{
          "canvas-width": projectState.canvas.width,
          "canvas-height": projectState.canvas.height,
          "canvas-bgcolor": projectState.canvas.backgroundColor,
          "canvas-bordercolor": projectState.canvas.borderColor,
        }}
      />
    </div>
  );
}

export default CanvasTabContent;
