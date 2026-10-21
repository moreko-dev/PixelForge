import { GhostButton, PrimaryButton } from "@src/components/buttons.js";
import { EmptyState } from "@src/components/EmptyState.js";
import { LuImage, LuPlus } from "react-icons/lu";
import { TbMoodEmpty } from "react-icons/tb";
import HomeSection from "../../starter/home-section/HomeSection.js";

function RecentProjects() {
  return (
    <HomeSection
      title="Recent Projects"
      desc="Continue working on your latest projects."
    >
      <EmptyState
        icon={<TbMoodEmpty />}
        title="No project yet"
        description="Start with blank canvas or import image to start editing."
        action={
          <div className="flex gap-4">
            <PrimaryButton icon={<LuPlus />}>Blank canvas</PrimaryButton>
            <GhostButton icon={<LuImage />}>Import image</GhostButton>
          </div>
        }
      />
    </HomeSection>
  );
}

export default RecentProjects;
