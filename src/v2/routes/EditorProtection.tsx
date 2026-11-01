import LeaveEditorModal from "@src/features/shared/LeaveEditorModal.js";
import useProject from "@src/hooks/useProject.js";
import type React from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useBeforeUnload, useBlocker, useNavigate } from "react-router";

function EditorProtection({ children }: { children: React.ReactNode }) {
  const { projectState, isDirty } = useProject();
  const navigate = useNavigate();

  const valid = projectState && projectState.isCreated;
  const blocker = useBlocker(isDirty);

  useEffect(() => {
    if (!valid) {
      navigate("/");
      toast.error("No project found! Create one.");
    }
  }, [navigate, valid]);

  useBeforeUnload((event) => {
    if (isDirty) event.preventDefault();
  });

  return valid ? (
    <>
      {children}
      {blocker.state === "blocked" && (
        <LeaveEditorModal
          onClose={() => blocker.reset()}
          onSubmit={() => blocker.proceed()}
          modalTitle="Exit without saving?"
          modalText="Are you sure to leave editor without saving? This action will reset all your progress."
        />
      )}
    </>
  ) : null;
}

export default EditorProtection;
