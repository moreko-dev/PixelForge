import Form, { type FormRef } from "@src/components/Form.js";
import Modal from "@src/components/Modal.js";
import type { HexaColorType, Project } from "@src/core/CoreTypes.js";
import useProject from "@src/hooks/useProject.js";
import { useMemo, useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

function CreateProjectModal({ onClose }: { onClose: () => void }) {
  const formRef = useRef<FormRef>(null);
  const { setProjectState } = useProject();
  const navigate = useNavigate();

  const handleModalSubmit = () => {
    const values = formRef.current?.getValues();
    if (!values) throw new Error("Form values not found!");

    const projectName = String(values["project-name"]);
    const canvasWidth = Number(values["canvas-width"]);
    const canvasHeight = Number(values["canvas-height"]);
    const canvasBgColor = String(values["canvas-bgcolor"]);

    if (!projectName.trim()) return toast.error("Invalid Project Name!");
    if (canvasWidth <= 0 || canvasHeight <= 0)
      return toast.error("Invalid Canvas width or height");
    if (!canvasBgColor.trim()) return toast.error("Invalid Canvas Background!");

    const newProject: Project = {
      isCreated: true,
      saveStatus: "unsaved",
      name: projectName,
      canvas: {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: canvasBgColor as HexaColorType,
        borderColor: "#000000",
      },
      layers: [],
    };

    setProjectState(newProject);
    toast.success("Project created successfuly.");
    navigate("/editor");
  };

  const formData = useMemo(
    () => ({
      "project-name": "",
      "canvas-width": 500,
      "canvas-height": 500,
      "canvas-bgcolor": "#FFFFFF",
    }),
    [],
  );

  return (
    <Modal
      title="Create New Project"
      actionSubmitText="Create"
      onClose={onClose}
      onSubmit={handleModalSubmit}
    >
      <span className="block mb-4">
        Create empty project to start with blank canvas.
      </span>
      <Form
        ref={formRef}
        formConfig={{ group: false }}
        formFields={[
          {
            dir: "col",
            fields: [
              {
                key: "project-name",
                label: "Project name:",
                type: "text",
                layout: "inline",
                config: {
                  size: "sm",
                  className: "rounded! max-w-50",
                  placeholder: "Project name...",
                },
              },
            ],
          },
          {
            dir: "row",
            fields: [
              {
                key: "canvas-width",
                label: "Width:",
                type: "number",
                layout: "inline",
                config: {
                  size: "sm",
                  max: 999999,
                  unit: "px",
                  hideStepper: true,
                  className: "rounded! max-w-25",
                  placeholder: "ex: 500",
                },
              },
              {
                key: "canvas-height",
                label: "Height:",
                type: "number",
                layout: "inline",
                config: {
                  size: "sm",
                  max: 999999,
                  unit: "px",
                  hideStepper: true,
                  className: "rounded! max-w-25",
                  placeholder: "ex: 500",
                },
              },
            ],
          },
          {
            dir: "col",
            fields: [
              {
                key: "canvas-bgcolor",
                label: "Background Color",
                type: "color",
                layout: "inline",
                config: {
                  size: "sm",
                  swatchOnly: false,
                  className: "rounded! max-w-40",
                },
              },
            ],
          },
        ]}
        formData={formData}
      />
    </Modal>
  );
}

export default CreateProjectModal;
