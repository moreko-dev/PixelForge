import useProject from "@src/hooks/useProject.js";

function ProjectStatus() {
  const { projectState } = useProject();
  if (!projectState) throw new Error("Project state is null or undefined!");

  const saveStatusColor =
    projectState.saveStatus === "unsaved"
      ? "bg-error"
      : projectState.saveStatus === "saved"
        ? "bg-info"
        : "bg-warning";

  return (
    <div className="flex gap-2 items-center">
      <div className={`size-2 ${saveStatusColor} rounded-full`}></div>
      <span className="text-muted-foreground leading-none">
        {projectState.name}
      </span>
    </div>
  );
}

export default ProjectStatus;
