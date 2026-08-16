import { createContext, useRef, useState } from "react";
import Project from "../core/project/Project.js";

export const DocumentContext = createContext();

function DocumentProvider({ children }) {
    const projectState = useRef(new Project());
    const [, forceUpdateProject] = useState(false);
    const [selectedLayerID, setSelectedLayerID] = useState(null);
    const projectCanvasRef = useRef(null);
    const documentViewRef = useRef(null);
    const isDrawing = useRef(false);

    return (
        <DocumentContext.Provider
            value={{
                projectState: projectState.current,
                forceUpdateProject,
                selectedLayerID,
                setSelectedLayerID,
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
