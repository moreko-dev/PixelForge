import { useContext, useState } from "react";
import { HiOutlineHome } from "react-icons/hi2";
import Modal from "../../../../../components/Modal/Modal";
import { DocumentContext } from "../../../../../contexts/DocumentContext";

function BackToStartPanelModalContent() {
    return (
        <div className="modal-body__wrapper">
            <div className="desc">
                Are you sure to back to start panel. Your progress and changes
                is reseting!
            </div>
        </div>
    );
}

function BackToStartPanelButton() {
    const { documentState, setDocumentState } = useContext(DocumentContext);
    const [backToStartPanelModalShow, setBackToStartPanelModalShow] =
        useState(false);

    const backToStartPanelButtonHandler = () => {
        setBackToStartPanelModalShow(true);
    };

    const backToStartPanelModalOnClose = () => {
        setBackToStartPanelModalShow(false);
    };

    const backToStartPanelModalOnSubmit = () => {
        setDocumentState({
            ...documentState,
            isDocumentCreated: false,
            documentName: "",
            canvas: {},
            layers: [],
        });
    };

    return (
        <>
            <button
                className="button round"
                onClick={backToStartPanelButtonHandler}
            >
                <HiOutlineHome />
            </button>
            {backToStartPanelModalShow && (
                <Modal
                    headerContent="Back to start panel"
                    bodyContent={<BackToStartPanelModalContent />}
                    onSubmit={backToStartPanelModalOnSubmit}
                    onClose={backToStartPanelModalOnClose}
                />
            )}
        </>
    );
}

export default BackToStartPanelButton;
