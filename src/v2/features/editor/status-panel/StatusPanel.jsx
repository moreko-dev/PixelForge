import VSeprator from "../../../components/VSeprator";
import GoToHome from "./components/GoToHome";
import ProjectNameLabel from "./components/ProjectNameLabel";
import ProjectSave from "./components/ProjectSave";
import ProjectUndoRedo from "./components/ProjectUndoRedo";
import ProjectZoom from "./components/ProjectZoom";

function StatusPanel() {
  return (
    <div className="col-span-3 bg-surface p-4 border-b border-b-border flex gap-4 items-center justify-between">
      <h1 className="w-fit font-bold text-xl bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        PixelForge
      </h1>
      <VSeprator />
      <ProjectNameLabel />
      <ProjectZoom />
      <VSeprator />
      <ProjectUndoRedo />
      <VSeprator />
      <ProjectSave />
      <VSeprator variant="danger" />
      <GoToHome />
    </div>
  );
}

export default StatusPanel;
