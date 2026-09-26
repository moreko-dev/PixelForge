import { PrimaryLineButton } from "../../../components/Buttons";
import HomeActionCenter from "./HomeActionCenter";

function HomeRecentProjects() {
  return (
    <HomeActionCenter
      title="Recent Projects"
      desc="Continue working on your latest projects or images."
    >
      <div className="w-full text-center py-12 rounded-lg border border-dashed border-border text-text-muted">
        <span className="inline-block mb-4 text-lg">
          No recent project or image found!
        </span>
        <span className="block mb-2">
          Start your first project from{" "}
          <PrimaryLineButton className="cursor-pointer">HERE</PrimaryLineButton>
        </span>
      </div>
    </HomeActionCenter>
  );
}

export default HomeRecentProjects;
