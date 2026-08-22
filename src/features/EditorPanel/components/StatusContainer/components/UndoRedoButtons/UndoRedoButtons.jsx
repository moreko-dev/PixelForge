import { useContext } from "react";
import { FiCornerUpLeft, FiCornerUpRight } from "react-icons/fi";
import { DocumentContext } from "../../../../../../contexts/DocumentContext";
import "./UndoRedoButtons.css";

function UndoRedoButtons() {
    const { historyState } = useContext(DocumentContext);
    return (
        <div className="status-container__undoredo">
            <button
                className="button round"
                onClick={historyState.undo}
                disabled={historyState.undoStack.length === 0}
            >
                <FiCornerUpLeft />
            </button>
            <button
                className="button round"
                onClick={historyState.redo}
                disabled={historyState.redoStack.length === 0}
            >
                <FiCornerUpRight />
            </button>
        </div>
    );
}

export default UndoRedoButtons;

// import { useContext } from "react";
// import { FiCornerUpLeft, FiCornerUpRight } from "react-icons/fi";
// import { UndoRedoContext } from "../../../../../../contexts/UndoRedoContext";
// import "./UndoRedoButtons.css";

// function UndoRedoButtons() {
//     const { undoStack, redoStack, undo, redo } = useContext(UndoRedoContext);
//     return (
//         <div className="status-container__undoredo">
//             <button
//                 className="button round"
//                 onClick={undo}
//                 disabled={undoStack.length === 0}
//             >
//                 <FiCornerUpLeft />
//             </button>
//             <button
//                 className="button round"
//                 onClick={redo}
//                 disabled={redoStack.length === 0}
//             >
//                 <FiCornerUpRight />
//             </button>
//         </div>
//     );
// }

// export default UndoRedoButtons;
