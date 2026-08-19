import { createContext, useRef, useState } from "react";
import Project from "../core/project/Project";
import SelectionManager from "../core/selection/SelectionManager";

export const DocumentContext = createContext();

function DocumentProvider({ children }) {
    const projectState = useRef(new Project());
    const [, forceUpdateProject] = useState(false);
    const selectionManager = useRef(new SelectionManager());
    const [, forceUpdateSelection] = useState(false);
    const projectCanvasRef = useRef(null);
    const documentViewRef = useRef(null);
    const isDrawing = useRef(false);

    return (
        <DocumentContext.Provider
            value={{
                projectState: projectState.current,
                forceUpdateProject,
                selectionManager: selectionManager.current,
                forceUpdateSelection,
                projectCanvasRef,
                documentViewRef,
                isDrawing: isDrawing.current,
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
