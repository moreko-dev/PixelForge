import ProjectsContent from "../features/starter/projects/ProjectsContent";
import ProjectsHeader from "../features/starter/projects/ProjectsHeader";

function ProjectsPage() {
  return (
    <div className="relative p-4 overflow-y-auto overflow-x-hidden">
      <ProjectsHeader />
      <ProjectsContent />
    </div>
  );
}

export default ProjectsPage;
