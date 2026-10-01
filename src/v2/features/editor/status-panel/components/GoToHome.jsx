import { useContext, useState } from "react";
import { LuHouse } from "react-icons/lu";
import { DangerButton, DefaultButton } from "../../../../components/Buttons";
import ProjectContext from "../../../../contexts/ProjectContext";
import Modal from "./../../../../components/Modal";

function GoToHomeModalContent() {
  return <span>Are you sure to back home without saving your progress?</span>;
}

function GoToHomeModalActions({ onClose, onSubmit }) {
  return (
    <>
      <DangerButton
        className="py-2 px-4 rounded-lg cursor-pointer"
        onClick={onSubmit}
      >
        Back home
      </DangerButton>
      <DefaultButton
        className="py-2 px-4 rounded-lg cursor-pointer"
        onClick={onClose}
      >
        Cancel
      </DefaultButton>
    </>
  );
}

function GoToHome() {
  const { removeProject } = useContext(ProjectContext);
  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);

  const handleModalOpen = () => setModalShow(true);

  const handleGoToHomeClick = () => removeProject();

  return (
    <div>
      <DangerButton
        className="size-9 flex items-center justify-center rounded-full cursor-pointer"
        onClick={handleModalOpen}
      >
        <LuHouse />
      </DangerButton>
      {modalShow && (
        <Modal
          title="Back to home page"
          content={<GoToHomeModalContent />}
          actions={
            <GoToHomeModalActions
              onClose={handleModalClose}
              onSubmit={handleGoToHomeClick}
            />
          }
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default GoToHome;
