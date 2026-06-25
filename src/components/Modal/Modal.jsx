import { createPortal } from "react-dom";
import "./Modal.css";

function Modal({
    headerContent,
    bodyContent,
    onClose,
    onSubmit,
    closeText = "Cancel",
    submitText = "OK",
}) {
    return createPortal(
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">{headerContent}</div>
                <div className="modal-body">{bodyContent}</div>
                <div className="modal-footer">
                    <button className="modal-footer__button" onClick={onClose}>
                        {closeText}
                    </button>
                    <button className="modal-footer__button" onClick={onSubmit}>
                        {submitText}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}

export default Modal;
