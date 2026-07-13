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
    const [selectedLayer, setSelectedLayer] = useState(null);
    const [handlerNeedsUpdate, setHandlerNeedsUpdate] = useState(false);

    return (
        <DocumentContext.Provider
            value={{
                documentState,
                setDocumentState,
                documentCanvasRef,
                documentViewContainerRef,
                isDrawing,
                selectedLayer,
                setSelectedLayer,
                handlerNeedsUpdate,
                setHandlerNeedsUpdate,
            }}
        >
            {children}
        </DocumentContext.Provider>
    );
}

export default DocumentProvider;
