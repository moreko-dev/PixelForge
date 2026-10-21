import HSeprator from "../components/HSeprator.js";
import QuickActions from "../features/home/quick-actions/QuickActions.js";
import RecentProjects from "../features/home/recent-projects/RecentProjects.js";

function HomePage() {
  return (
    <>
      <QuickActions />
      <HSeprator marginValue={8} />
      <RecentProjects />
    </>
  );
}

export default HomePage;
