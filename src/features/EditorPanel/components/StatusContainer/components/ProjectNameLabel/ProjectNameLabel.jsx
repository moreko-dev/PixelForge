import { useContext } from "react";
import { DocumentContext } from "../../../../../../contexts/DocumentContext";
import "./ProjectNameLabel.css";

function ProjectNameLabel(/* { projectName } */) {
    const { projectState } = useContext(DocumentContext);
    return <div className="status-container__project-name">{projectName}</div>;
}

export default ProjectNameLabel;
