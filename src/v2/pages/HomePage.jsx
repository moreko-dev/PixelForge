import HeroSection from "../features/starter/home/hero-section/HeroSection";
import HomeBlurPoints from "../features/starter/home/HomeBlurPoints";
import HomeQuickActions from "../features/starter/home/quick-actions/HomeQuickActions";
import HomeRecentProjects from "../features/starter/home/recent-projects/HomeRecentProjects";

function HomePage() {
  return (
    <div className="relative p-4 overflow-y-auto overflow-x-hidden">
      <HomeBlurPoints />
      <HeroSection />
      <HomeQuickActions />
      <HomeRecentProjects />
    </div>
  );
}

export default HomePage;
