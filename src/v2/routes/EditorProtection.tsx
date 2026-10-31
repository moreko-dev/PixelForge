import { DestructiveButton, SecondaryButton } from "@src/components/buttons.js";
import Modal from "@src/components/Modal.js";
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
        <Modal
          title="Exit without saving?"
          onClose={() => blocker.reset()}
          actions={
            <div className="w-full flex items-center justify-end gap-2">
              <DestructiveButton
                appearance="soft"
                className="rounded!"
                onClick={() => blocker.proceed()}
              >
                Leave
              </DestructiveButton>
              <SecondaryButton
                className="rounded!"
                onClick={() => blocker.reset()}
              >
                Cancel
              </SecondaryButton>
            </div>
          }
        >
          Are you sure to leave editor without saving? This action will reset
          all your progress.
        </Modal>
      )}
    </>
  ) : null;
}

export default EditorProtection;
