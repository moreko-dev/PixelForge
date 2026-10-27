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
                  { key: "canvas-width", label: "Width:", type: "number" },
                  { key: "canvas-height", label: "Height:", type: "number" },
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
                  },
                  {
                    key: "canvas-bordercolor",
                    label: "Border:",
                    type: "color",
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
