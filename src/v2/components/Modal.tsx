import { LuX } from "react-icons/lu";
import { IconButton, PrimaryButton, SecondaryButton } from "./buttons.js";

type ModalPropsType = {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  actionCancelText?: string;
  actionSubmitText?: string;
  onClose?: () => void;
  onSubmit?: () => void;
};

function Modal({
  title,
  children,
  actions,
  actionCancelText,
  actionSubmitText,
  onClose,
  onSubmit,
}: ModalPropsType) {
  return (
    <div
      className="fixed z-999999 inset-0 backdrop-blur-[2px] bg-overlay"
      onClick={onClose}
    >
      <div
        className="bg-dialog text-foreground border border-border rounded shadow-(--shadow-xl) absolute top-[50%] left-[50%] translate-[-50%] max-w-100 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 items-center justify-between p-2 border-b border-divider">
          <span className="font-bold text-lg text-brand-active truncate">
            {title}
          </span>
          <IconButton
            size="sm"
            icon={<LuX />}
            className="rounded"
            onClick={onClose}
          />
        </div>
        <div className="p-2 text-foreground-secondary">{children}</div>
        <div className="p-2 border-t border-divider">
          {actions || (
            <div className="w-full flex items-center justify-end gap-2">
              <SecondaryButton className="rounded!" onClick={onClose}>
                {actionCancelText || "Cancel"}
              </SecondaryButton>
              <PrimaryButton className="rounded!" onClick={onSubmit}>
                {actionSubmitText || "Submit"}
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
