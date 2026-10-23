import { GhostButton } from "@src/components/buttons.js";
import { LuZoomIn, LuZoomOut } from "react-icons/lu";

function ZoomStatus() {
  return (
    <div className="flex gap-2 items-center">
      <GhostButton icon={<LuZoomOut />} size="sm" />
      <span>100%</span>
      <GhostButton icon={<LuZoomIn />} size="sm" />
    </div>
  );
}

export default ZoomStatus;
