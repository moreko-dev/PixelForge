import { useState } from "react";
import "./ToolsContainer.css";
import AddTextButton from "./components/AddTextButton";
import BrushButton from "./components/BrushButton";
import CircleButton from "./components/CircleButton";
import ImportImageButton from "./components/ImportImageButton";
import LineButton from "./components/LineButton";
import RectangleButton from "./components/RectangleButton";

function ToolsContainer() {
    const [activeTool, setActiveTool] = useState(null);
    return (
        <div className="tools-container">
            <ImportImageButton />
            <AddTextButton />
            <BrushButton
                activeTool={activeTool}
                setActiveTool={setActiveTool}
            />
            <RectangleButton
                activeTool={activeTool}
                setActiveTool={setActiveTool}
            />
            <LineButton activeTool={activeTool} setActiveTool={setActiveTool} />
            <CircleButton
                activeTool={activeTool}
                setActiveTool={setActiveTool}
            />
        </div>
    );
}

export default ToolsContainer;
