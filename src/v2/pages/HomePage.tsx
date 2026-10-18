import QuickActions from "../features/home/quick-actions/QuickActions.js";
import RecentProjects from "../features/home/recent-projects/RecentProjects.js";
import TopTemplates from "../features/home/top-templates/TopTemplates.js";

function HomePage() {
  return (
    <>
      <QuickActions />
      <RecentProjects />
      <TopTemplates />
    </>
  );
}

export default HomePage;
