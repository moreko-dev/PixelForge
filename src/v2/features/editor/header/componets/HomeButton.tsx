import {
  DestructiveButton,
  PrimaryButton,
  SecondaryButton,
} from "@src/components/buttons.js";
import LeaveEditorModal from "@src/features/shared/LeaveEditorModal.js";
import useProject from "@src/hooks/useProject.js";
import { useState } from "react";
import { LuHouse } from "react-icons/lu";
import { useNavigate } from "react-router";

function HomeButton() {
  const { isDirty, setProjectState } = useProject();
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setProjectState(null);
    navigate("/");
  };

  const handleSave = () => {
    // Save code
  };

  return (
    <>
      <DestructiveButton
        size="sm"
        appearance="soft"
        icon={<LuHouse />}
        onClick={() => setModalShow(true)}
      />
      {modalShow &&
        (isDirty ? (
          <LeaveEditorModal
            onClose={() => setModalShow(false)}
            modalTitle="Exit without saving?"
            modalText="Are you sure to leave editor without saving? This action will reset all your progress."
            actions={
              <div className="w-full flex items-center justify-end gap-2">
                <SecondaryButton onClick={handleSubmit}>
                  Don't save
                </SecondaryButton>
                <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
                <SecondaryButton onClick={() => setModalShow(false)}>
                  Cancel
                </SecondaryButton>
              </div>
            }
          />
        ) : (
          <LeaveEditorModal
            onClose={() => setModalShow(false)}
            onSubmit={handleSubmit}
            modalTitle="Exit"
            modalText="Are you sure to leave editor?"
          />
        ))}
    </>
  );
}

export default HomeButton;
