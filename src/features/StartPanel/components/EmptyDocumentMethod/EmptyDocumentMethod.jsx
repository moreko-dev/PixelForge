import { useContext } from "react";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { DocumentContext } from "../../../../contexts/DocumentContext";
import { generateProjectName } from "../../../../core/CoreUtils";

function EmptyDocumentMethod() {
    const { projectState, forceUpdateProject } = useContext(DocumentContext);

    const emptyDocumentButtonHandler = () => {
        projectState.isProjectCreated = true;
        projectState.name = generateProjectName();
        forceUpdateProject((prev) => !prev);
    };

    return (
        <button
            className="start-panel__method-button primary"
            onClick={emptyDocumentButtonHandler}
        >
            <HiOutlineDocumentPlus />
            <span className="start-panel__method-button-title">
                New project
            </span>
            <span className="start-panel__method-button-desc">
                Start with blank document
            </span>
        </button>
    );

    // const { documentState, setDocumentState } = useContext(DocumentContext);

    // const emptyDocumentButtonHandler = () => {
    //     setDocumentState({
    //         isDocumentCreated: true,
    //         documentName: `untitled-${randomID(6)}`,
    //         canvas: {
    //             width: 500,
    //             height: 500,
    //             styles: {
    //                 backgroundColor: "#ffffff",
    //                 border: "1px solid #000000",
    //                 scale: 1,
    //             },
    //         },
    //         layers: [],
    //     });
    // };

    // return (
    //     <button
    //         className="start-panel__method-button primary"
    //         onClick={emptyDocumentButtonHandler}
    //     >
    //         <HiOutlineDocumentPlus />
    //         <span className="start-panel__method-button-title">
    //             New project
    //         </span>
    //         <span className="start-panel__method-button-desc">
    //             Start with blank document
    //         </span>
    //     </button>
    // );
}

export default EmptyDocumentMethod;
