import Form from "@src/components/Form.js";
import type { WorkspaceContextType } from "@src/contexts/WorkspaceContext.js";
import type { Tools } from "@src/core/CoreTypes.js";
import useTool from "@src/hooks/useTool.js";
import useWorkspace from "@src/hooks/useWorkspace.js";

function ControlPanel() {
  const workspaceConfig = useWorkspace();
  const { selectedTool } = useTool();
  return (
    <div className="p-2! bg-workspace col-start-2 col-end-3 row-start-2 row-end-3">
      {getControlContent(selectedTool, workspaceConfig)}
    </div>
  );
}

function getControlContent(tool: Tools | null, config: WorkspaceContextType) {
  switch (tool) {
    case "eraser":
      return (
        <div className="flex gap-2 flex-wrap">
          <Form
            formConfig={{ group: false }}
            formFields={[
              {
                dir: "col",
                fields: [
                  {
                    key: "eraser-width",
                    label: "Eraser width:",
                    type: "number",
                    layout: "inline",
                    config: {
                      max: 100,
                      unit: "px",
                      size: "sm",
                      hideStepper: true,
                      className: "rounded! max-w-20!",
                      placeholder: "W...",
                      onChange: (value) => config.setEraserWidth(value!),
                    },
                  },
                ],
              },
            ]}
            formData={{
              "eraser-width": config.eraserWidth,
            }}
          />
        </div>
      );
    default:
      return (
        <span className="block select-none text-sm text-muted-foreground">
          No matched tool!
        </span>
      );
  }
}

export default ControlPanel;
