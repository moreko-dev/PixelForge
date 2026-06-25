import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FiSave } from "react-icons/fi";
import Modal from "../../../../../../components/Modal/Modal";
import { DocumentContext } from "../../../../../../contexts/DocumentContext";
import { downloadFile } from "./../../../../../../utils/Utils";

function SaveProjectModalContent({ value, onChange }) {
    return (
        <div className="modal-body__wrapper">
            <div className="desc">Save project as Json:</div>
            <input
                type="text"
                className="modal-body__input"
                placeholder="Project name..."
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

function SaveProjectButton({ projectName, setProjectName }) {
    const [saveProjectModalShow, setSaveProjectModalShow] = useState(false);
    const [newProjectName, setNewProjectName] = useState(projectName);
    const { documentState, setDocumentState } = useContext(DocumentContext);

    const saveProjectModalOnClose = () => {
        setSaveProjectModalShow(false);
        setNewProjectName(projectName);
    };

    const saveProjectModalOnSubmit = () => {
        if (!newProjectName.trim()) {
            toast.error("Project name is empty!");
            return;
        }
        let projectJson;
        setDocumentState((prev) => {
            let validProjectName = newProjectName.endsWith(".json")
                ? newProjectName.substring(0, newProjectName.indexOf(".json"))
                : newProjectName;
            const updated = {
                ...documentState,
                documentName: validProjectName,
            };
            setProjectName(validProjectName);
            projectJson = JSON.stringify(updated, null, 2);
            return updated;
        });

        const blob = new Blob([projectJson], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const download = newProjectName.endsWith(".json")
            ? newProjectName
            : `${newProjectName}.json`;
        downloadFile(url, download);
        URL.revokeObjectURL(url);

        toast.success("Project saved on your computer!");
        setSaveProjectModalShow(false);
    };

    const saveProjectButtonHandler = () => {
        setSaveProjectModalShow(true);
    };

    const saveProjectModalContentInputHandler = (event) => {
        setNewProjectName(event.target.value);
    };

    return (
        <>
            <button className="button round" onClick={saveProjectButtonHandler}>
                <FiSave />
            </button>
            {saveProjectModalShow && (
                <Modal
                    headerContent="Save project"
                    bodyContent={
                        <SaveProjectModalContent
                            value={newProjectName}
                            onChange={saveProjectModalContentInputHandler}
                        />
                    }
                    onClose={saveProjectModalOnClose}
                    onSubmit={saveProjectModalOnSubmit}
                    submitText="Save"
                />
            )}
        </>
    );
}

export default SaveProjectButton;
