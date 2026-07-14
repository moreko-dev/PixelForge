import { createContext, useRef, useState } from "react";

export const DocumentContext = createContext();

function DocumentProvider({ children }) {
    const [documentState, setDocumentState] = useState({
        isDocumentCreated: false,
        documentName: "",
        canvas: {},
        layers: [],
    });
    const documentCanvasRef = useRef(null);
    const documentViewContainerRef = useRef(null);
    const isDrawing = useRef(false);
    const [selectedLayerID, setSelectedLayerID] = useState(null);

    return (
        <DocumentContext.Provider
            value={{
                documentState,
                setDocumentState,
                documentCanvasRef,
                documentViewContainerRef,
                isDrawing,
                selectedLayerID,
                setSelectedLayerID,
            }}
        >
            {children}
        </DocumentContext.Provider>
    );
}

export default DocumentProvider;
