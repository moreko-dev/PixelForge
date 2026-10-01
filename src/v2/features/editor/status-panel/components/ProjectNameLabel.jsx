import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { LuPen } from "react-icons/lu";
import { DefaultButton, PrimaryButton } from "../../../../components/Buttons";
import { DefaultInput } from "../../../../components/Inputs";
import Modal from "../../../../components/Modal";
import ProjectContext from "./../../../../contexts/ProjectContext";

const EditNameModalContent = ({ state, setState }) => {
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="name" className="flex-1">
        Project name:
      </label>
      <DefaultInput
        type="text"
        id="name"
        className="max-w-50 w-full py-1 px-3 rounded-lg"
        value={state}
        onChange={(event) => setState(event.target.value)}
      />
    </div>
  );
};

export function EditNameModalActions({ onClose, onSubmit }) {
  return (
    <>
      <DefaultButton
        className="py-2 px-4 rounded-lg cursor-pointer"
        onClick={onClose}
      >
        Cancel
      </DefaultButton>
      <PrimaryButton
        className="py-2 px-4 rounded-lg cursor-pointer"
        onClick={onSubmit}
      >
        Rename
      </PrimaryButton>
    </>
  );
}

function ProjectNameLabel() {
  const { projectState, forceUpdate } = useContext(ProjectContext);
  const [modalShow, setModalShow] = useState(false);
  const [projectName, setProjectName] = useState(projectState.current.name);

  const handleModalClose = () => setModalShow(false);

  const handleModalOpen = () => setModalShow(true);

  const handleModalSubmit = () => {
    try {
      projectState.current.setName(projectName);
      forceUpdate();
      handleModalClose();
      toast.success("Project renamed successfuly.");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex-1 flex gap-2 items-center">
      <span className="inline-block size-2 bg-danger rounded-full"></span>
      <span className="text-text-muted">{projectState.current.name}</span>
      <PrimaryButton
        className="size-7 text-sm flex items-center justify-center rounded-md cursor-pointer"
        onClick={handleModalOpen}
      >
        <LuPen />
      </PrimaryButton>
      {modalShow && (
        <Modal
          title="Edit project name"
          content={
            <EditNameModalContent
              state={projectName}
              setState={setProjectName}
            />
          }
          actions={
            <EditNameModalActions
              onClose={handleModalClose}
              onSubmit={handleModalSubmit}
            />
          }
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default ProjectNameLabel;
