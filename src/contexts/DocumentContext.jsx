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
    const isDrawing = useRef(false);

    return (
        <DocumentContext.Provider
            value={{
                documentState,
                setDocumentState,
                documentCanvasRef,
                isDrawing,
            }}
        >
            {children}
        </DocumentContext.Provider>
    );
}

export default DocumentProvider;
