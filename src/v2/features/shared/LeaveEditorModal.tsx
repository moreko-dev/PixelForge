import { DestructiveButton, SecondaryButton } from "@src/components/buttons.js";
import Modal from "@src/components/Modal.js";
import type React from "react";

function LeaveEditorModal({
  onClose,
  onSubmit,
  modalTitle,
  modalText,
  actions,
}: {
  onClose: () => void;
  onSubmit?: () => void;
  modalTitle: string;
  modalText: string;
  actions?: React.ReactNode;
}) {
  return (
    <Modal
      title={modalTitle}
      onClose={onClose}
      actions={
        actions || (
          <div className="w-full flex items-center justify-end gap-2">
            <DestructiveButton
              appearance="soft"
              className="rounded!"
              onClick={onSubmit}
            >
              Leave
            </DestructiveButton>
            <SecondaryButton className="rounded!" onClick={onClose}>
              Cancel
            </SecondaryButton>
          </div>
        )
      }
    >
      {modalText}
    </Modal>
  );
}

export default LeaveEditorModal;
