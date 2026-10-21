import { LuImage } from "react-icons/lu";

function ProjectsHeader() {
  return (
    <div className="flex gap-8 items-center">
      <LuImage className="size-20 p-4 rounded-lg bg-linear-to-br from-primary to-info text-info-foreground border-2 border-info-border" />
      <div>
        <h2 className="text-4xl font-bold mb-4 text-brand">Your projects</h2>
        <span className="inline-block text-foreground-secondary max-w-100">
          All your creation in one place. Continue working or organize the
          projects.
        </span>
      </div>
    </div>
  );
}

export default ProjectsHeader;
