import { useContext, useEffect } from "react";
import { Navigate, Outlet, useBlocker } from "react-router";
import { DangerButton, DefaultButton } from "../components/Buttons";
import Modal from "../components/Modal";
import ProjectContext from "../contexts/ProjectContext";

function UnmountModalContent() {
  return <span>Are you sure to exit without saving your progress?</span>;
}

function UnmountModalActions({ onClose, onSubmit }) {
  return (
    <>
      <DangerButton
        className="py-2 px-4 rounded-lg cursor-pointer"
        onClick={onSubmit}
      >
        Exit anyway
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

function EditorLayout() {
  const { projectState, removeProject } = useContext(ProjectContext);
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname,
  );
  const modalShow = blocker.state === "blocked";

  const handleModalClose = () => {
    if (blocker.state === "blocked") blocker.reset();
  };

  const handleModalSubmit = () => {
    removeProject();
    if (blocker.state === "blocked") blocker.proceed();
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {projectState.current ? <Outlet /> : <Navigate to="/" />}
      {modalShow && (
        <Modal
          title="Exit from editor"
          content={<UnmountModalContent />}
          actions={
            <UnmountModalActions
              onClose={handleModalClose}
              onSubmit={handleModalSubmit}
            />
          }
          onClose={handleModalClose}
        />
      )}
    </>
  );
}

export default EditorLayout;
