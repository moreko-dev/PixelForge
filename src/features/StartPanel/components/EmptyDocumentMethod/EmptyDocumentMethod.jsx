import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { useContext } from "react";
import { DocumentContext } from "../../../../contexts/DocumentContext";
import { randomID } from "../../../../utils/Functions";

function EmptyDocumentMethod() {
    const { documentState, setDocumentState } = useContext(DocumentContext);

    const emptyDocumentButtonHandler = () => {
        setDocumentState({
            isDocumentCreated: true,
            documentName: `untitled-${randomID(6)}`,
            canvas: {
                width: 500,
                height: 500,
                styles: {
                    backgroundColor: "#ffffff",
                    border: "1px solid #000000",
                    scale: 1,
                },
            },
            layers: [],
        });
    };

    return (
        <button
            className="start-panel__method-button"
            onClick={emptyDocumentButtonHandler}
        >
            <HiOutlineDocumentPlus />
            Start with empty document
        </button>
    );
}

export default EmptyDocumentMethod;
