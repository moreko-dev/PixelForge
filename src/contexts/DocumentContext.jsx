import { createContext, useRef, useState } from "react";
import Project from "../core/project/Project.js";
import SelectionManager from "../core/selection/SelectionManager.js";

export const DocumentContext = createContext();

function DocumentProvider({ children }) {
    const projectState = useRef(new Project());
    const [updateProject, forceUpdateProject] = useState(false);
    const selectionState = useRef(new SelectionManager());
    const [selectionUpdate, forceSelectionUpdate] = useState(false);
    const projectCanvasRef = useRef(null);
    const documentViewRef = useRef(null);
    const isDrawing = useRef(false);

    return (
        <DocumentContext.Provider
            value={{
                projectState: projectState.current,
                updateProject,
                forceUpdateProject,
                selectionState,
                selectionUpdate,
                forceSelectionUpdate,
                projectCanvasRef,
                documentViewRef,
                isDrawing,
            }}
        >
            {children}
        </DocumentContext.Provider>
    );

    // const [documentState, setDocumentState] = useState({
    //     isDocumentCreated: false,
    //     documentName: "",
    //     canvas: {},
    //     layers: [],
    // });
    // const documentCanvasRef = useRef(null);
    // const documentViewContainerRef = useRef(null);
    // const isDrawing = useRef(false);
    // const [selectedLayerID, setSelectedLayerID] = useState(null);

    // return (
    //     <DocumentContext.Provider
    //         value={{
    //             documentState,
    //             setDocumentState,
    //             documentCanvasRef,
    //             documentViewContainerRef,
    //             isDrawing,
    //             selectedLayerID,
    //             setSelectedLayerID,
    //         }}
    //     >
    //         {children}
    //     </DocumentContext.Provider>
    // );
}

export default DocumentProvider;
