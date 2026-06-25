import CanvasProperties from "./components/CanvasProperties/CanvasProperties";
import LayersProperties from "./components/LayersProperties/LayersProperties";
import "./components/shared.css";
import "./PropertiesContainer.css";

function PropertiesContainer() {
    return (
        <div className="properties-container">
            <CanvasProperties />
            <LayersProperties />
        </div>
    );
}

export default PropertiesContainer;
