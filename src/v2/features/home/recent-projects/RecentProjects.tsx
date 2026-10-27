import ProjectsEmptyState from "@src/features/shared/ProjectsEmptyState.js";
import HomeSection from "../../starter/home-section/HomeSection.js";

function RecentProjects() {
  return (
    <HomeSection
      title="Recent Projects"
      desc="Continue working on your latest projects."
    >
      <ProjectsEmptyState />
    </HomeSection>
  );
}

export default RecentProjects;
