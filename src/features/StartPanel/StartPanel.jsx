import "./StartPanel.css";
import EmptyDocumentMethod from "./components/EmptyDocumentMethod/EmptyDocumentMethod";
import ImportImageMethod from "./components/ImportImageMethod/ImportImageMethod";
import ImportProjectMethod from "./components/ImportProjectMethod/ImportProjectMethod";
import "./components/shared.css";

function StartPanel() {
    return (
        <div className="start-panel">
            <h1 className="start-panel__title">
                Welcome to <span className="animational-text">PixelForge</span>
            </h1>
            <span className="start-panel__desc">
                Create a new project or continue where you left off
            </span>
            <div className="start-panel__methods">
                <ImportImageMethod />
                <EmptyDocumentMethod />
                <ImportProjectMethod />
            </div>
        </div>
    );
}

export default StartPanel;
