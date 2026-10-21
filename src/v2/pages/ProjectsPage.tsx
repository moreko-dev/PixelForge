import HSeprator from "@src/components/HSeprator.js";
import ProjectsHeader from "@src/features/projects/projects-header/ProjectsHeader.js";
import ProjectsList from "@src/features/projects/projects-list/ProjectsList.js";

function ProjectsPage() {
  return (
    <>
      <ProjectsHeader />
      <HSeprator />
      <ProjectsList />
    </>
  );
}

export default ProjectsPage;
