import Form, { type FormRef } from "@src/components/Form.js";
import Modal from "@src/components/Modal.js";
import { useMemo, useRef } from "react";
import toast from "react-hot-toast";

function CreateProjectModal({ onClose }: { onClose: () => void }) {
  const formRef = useRef<FormRef>(null);

  const handleModalSubmit = () => {
    const values = formRef.current?.getValues();
    if (!values) throw new Error("Form values not found!");
    if (!String(values["project-name"]).trim()) {
      toast.error("Empty project name!");
    }
  };

  const formData = useMemo(
    () => ({
      "project-name": "",
      "canvas-width": 500,
      "canvas-height": 500,
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
                  className: "rounded!",
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
        ]}
        formData={formData}
      />
    </Modal>
  );
}

export default CreateProjectModal;
