import HomeBlurPoints from "../features/starter/home/HomeBlurPoints";
import HomeHeroSection from "../features/starter/home/HomeHeroSection";
import HomeQuickActions from "../features/starter/home/HomeQuickActions";
import HomeRecentProjects from "../features/starter/home/HomeRecentProjects";

function HomePage() {
  return (
    <div className="relative p-4 overflow-y-auto overflow-x-hidden">
      <HomeBlurPoints />
      <HomeHeroSection />
      <HomeQuickActions />
      <HomeRecentProjects />
    </div>
  );
}

export default HomePage;
