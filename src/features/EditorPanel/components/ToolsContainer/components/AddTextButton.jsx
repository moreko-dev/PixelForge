import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineTextFields } from "react-icons/md";
import Modal from "../../../../../components/Modal/Modal";
import { DocumentContext } from "../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../contexts/UndoRedoContext";
import { defaultTextValues, layersType } from "../../../../../data/Constants";
import { randomID } from "../../../../../utils/Functions";

function AddTextModalContent({ value, onChange }) {
    return (
        <div className="modal-body__wrapper">
            <span className="desc">Add new text to canvas:</span>
            <input
                type="text"
                className="modal-body__input"
                placeholder="Enter any text..."
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

function AddTextButton() {
    const [addTextModalShow, setAddTextModalShow] = useState(false);
    const [newText, setNewText] = useState("");
    const { saveNewChange } = useContext(UndoRedoContext);
    const { documentState, setDocumentState } = useContext(DocumentContext);

    const addTextButtonHandler = () => {
        setAddTextModalShow(true);
    };

    const addTextModalOnClose = () => {
        setAddTextModalShow(false);
        setNewText("");
    };

    const addTextModalOnSubmit = () => {
        if (!newText) {
            toast.error("Text value is empty.");
            return;
        }
        saveNewChange();
        const layerID = randomID(6);
        setDocumentState({
            ...documentState,
            layers: [
                ...documentState.layers,
                {
                    id: layerID,
                    type: layersType.TEXT_LAYER,
                    properties: {
                        ...defaultTextValues,
                        value: newText,
                    },
                },
            ],
        });
        addTextModalOnClose();
    };

    const addTextModalTextValueInputHandler = (event) => {
        setNewText(event.target.value);
    };

    return (
        <>
            <button className="button round" onClick={addTextButtonHandler}>
                <MdOutlineTextFields />
            </button>
            {addTextModalShow && (
                <Modal
                    headerContent="Add new text"
                    bodyContent={
                        <AddTextModalContent
                            value={newText}
                            onChange={addTextModalTextValueInputHandler}
                        />
                    }
                    onClose={addTextModalOnClose}
                    onSubmit={addTextModalOnSubmit}
                    submitText="Add"
                />
            )}
        </>
    );
}

export default AddTextButton;
