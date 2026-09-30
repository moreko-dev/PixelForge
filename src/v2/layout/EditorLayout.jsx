import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import ProjectContext from "../contexts/ProjectContext";

function EditorLayout() {
  const { projectState } = useContext(ProjectContext);

  return projectState.current ? <Outlet /> : <Navigate to="/" />;
}

export default EditorLayout;
