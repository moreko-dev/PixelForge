import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import DocumentProvider from "./contexts/DocumentContext.jsx";
import UndoRedoProvider from "./contexts/UndoRedoContext.jsx";

createRoot(document.getElementById("root")).render(
    <DocumentProvider>
        <UndoRedoProvider>
            <App />
        </UndoRedoProvider>
    </DocumentProvider>,
);
