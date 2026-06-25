import { createContext, useContext, useEffect, useState } from "react";
import { DocumentContext } from "./DocumentContext";

export const UndoRedoContext = createContext();

function UndoRedoProvider({ children }) {
    const { documentState, setDocumentState } = useContext(DocumentContext);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    const saveNewChange = () => {
        setUndoStack([...undoStack, documentState]);
        setRedoStack([]);
    };

    const undo = () => {
        if (undoStack.length > 0) {
            setRedoStack([...redoStack, documentState]);
            const lastState = undoStack[undoStack.length - 1];
            setDocumentState(lastState);
            setUndoStack(undoStack.slice(0, -1));
        }
    };

    const redo = () => {
        if (redoStack.length > 0) {
            setUndoStack([...undoStack, documentState]);
            const lastRedoState = redoStack[redoStack.length - 1];
            setDocumentState(lastRedoState);
            setRedoStack(redoStack.slice(0, -1));
        }
    };

    return (
        <UndoRedoContext.Provider
            value={{
                undoStack,
                setUndoStack,
                redoStack,
                setRedoStack,
                undo,
                redo,
                saveNewChange,
            }}
        >
            {children}
        </UndoRedoContext.Provider>
    );
}

export default UndoRedoProvider;
