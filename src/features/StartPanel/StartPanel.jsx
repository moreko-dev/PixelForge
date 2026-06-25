import "./StartPanel.css";
import "./components/shared.css";
import ImportImageMethod from "./components/ImportImageMethod/ImportImageMethod";
import ImportProjectMethod from "./components/ImportProjectMethod/ImportProjectMethod";
import EmptyDocumentMethod from "./components/EmptyDocumentMethod/EmptyDocumentMethod";

function StartPanel() {
    return (
        <div className="start-panel">
            <h1 className="start-panel__title">
                Welcome to <span className="animational-text">PixelForge</span>
            </h1>
            <span className="start-panel__desc desc">Select how to start!</span>
            <div className="start-panel__methods">
                <EmptyDocumentMethod />
                <ImportImageMethod />
                <ImportProjectMethod />
            </div>
        </div>
    );
}

export default StartPanel;
