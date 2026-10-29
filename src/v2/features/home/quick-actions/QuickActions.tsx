import { LuCloud, LuImage, LuLayoutTemplate, LuPlus } from "react-icons/lu";
import HomeSection from "../../starter/home-section/HomeSection.js";
import ActionCard from "./components/ActionCard.js";
import CreateProjectActionCard from "./components/CreateProjectActionCard.js";

function QuickActions() {

  return (
    <HomeSection
      title="Quick Actions"
      desc="Get started with tools and features."
    >
      <div className="grid grid-cols-4 gap-4">
        <ActionCard
          title="Open image"
          desc="Choose a photo from your device to start editing."
          Icon={LuImage}
          mode="success"
        />
        <CreateProjectActionCard />
        <ActionCard
          title="Templates"
          desc="Use pre-designed templates for quick editing."
          Icon={LuLayoutTemplate}
          mode="info"
        />
        <ActionCard
          title="From cloud"
          desc="Open files from your cloud storage."
          Icon={LuCloud}
          mode="warning"
        />
      </div>
    </HomeSection>
  );
}

export default QuickActions;
