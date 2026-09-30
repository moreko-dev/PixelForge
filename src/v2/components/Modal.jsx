import { IoClose } from "react-icons/io5";
import { DefaultButton } from "./Buttons";

function Modal({ title, content, actions, onClose }) {
  const handleChildClick = (event) => {
    event.stopPropagation();
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 p-2 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="max-w-100 w-full bg-surface border border-border rounded-lg"
        onClick={handleChildClick}
      >
        <div className="flex gap-2 justify-between items-center border-b border-b-border p-4">
          <h3 className="text-lg">{title}</h3>
          <DefaultButton
            className="size-8 text-lg flex justify-center items-center rounded-lg cursor-pointer"
            onClick={onClose}
          >
            <IoClose />
          </DefaultButton>
        </div>
        <div className="border-b border-b-border p-4">{content}</div>
        <div className="p-4 flex gap-2 justify-end">{actions}</div>
      </div>
    </div>
  );
}

export default Modal;
