import { LuZoomIn, LuZoomOut } from "react-icons/lu";
import { DefaultButton } from "../../../../components/Buttons";

function ProjectZoom() {
  return (
    <div className="flex gap-2 items-center">
      <DefaultButton className="size-9 flex items-center justify-center rounded-full cursor-pointer">
        <LuZoomOut />
      </DefaultButton>
      <span className="text-text-muted">100%</span>
      <DefaultButton className="size-9 flex items-center justify-center rounded-full cursor-pointer">
        <LuZoomIn />
      </DefaultButton>
    </div>
  );
}

export default ProjectZoom;
