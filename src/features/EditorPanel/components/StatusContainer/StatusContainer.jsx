import "./StatusContainer.css";
import ProjectNameLabel from "./components/ProjectNameLabel/ProjectNameLabel";
import UndoRedoButtons from "./components/UndoRedoButtons/UndoRedoButtons";
import ZoomButtons from "./components/ZoomButtons/ZoomButtons";

function StatusContainer({ projectName, setProjectName }) {
    return (
        <div className="status-container">
            <ProjectNameLabel projectName={projectName} />
            <div className="v-seperator"></div>
            <ZoomButtons />
            <div className="v-seperator"></div>
            <UndoRedoButtons />
        </div>
    );
}

export default StatusContainer;
