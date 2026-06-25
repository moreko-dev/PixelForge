import { useContext, useState } from "react";
import { DocumentContext } from "../../contexts/DocumentContext";
import "./EditorPanel.css";
import DocumentViewContainer from "./components/DocumentViewContainer/DocumentViewContainer";
import HeaderContainer from "./components/HeaderContainer/HeaderContainer";
import PropertiesContainer from "./components/PropertiesContainer/PropertiesContainer";
import StatusContainer from "./components/StatusContainer/StatusContainer";
import ToolsContainer from "./components/ToolsContainer/ToolsContainer";
import "./components/shared.css";

function EditorPanel() {
    const { documentState } = useContext(DocumentContext);
    const [projectSaveName, setProjectSaveName] = useState(
        documentState.documentName,
    );

    return (
        <div className="editor-panel">
            <DocumentViewContainer />
            <HeaderContainer
                projectName={projectSaveName}
                setProjectName={setProjectSaveName}
            />
            <StatusContainer
                projectName={projectSaveName}
                setProjectName={setProjectSaveName}
            />
            <ToolsContainer />
            <PropertiesContainer />
        </div>
    );
}

export default EditorPanel;
