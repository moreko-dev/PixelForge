import VSeprator from "@src/components/VSeprator.js";
import CanvasStatus from "./components/CanvasStatus.js";
import CursorStatus from "./components/CursorStatus.js";
import LayerStatus from "./components/LayerStatus.js";
import ProjectStatus from "./components/ProjectStatus.js";
import ShortcutHint from "./components/ShortcutHint.js";
import ToolStatus from "./components/ToolStatus.js";
import ZoomStatus from "./components/ZoomStatus.js";

function StatusBar() {
  return (
    <div className="py-1! px-3! col-span-3 bg-toolbar flex text-sm items-center text-foreground-secondary">
      <ProjectStatus />
      <VSeprator marginValue={3} />
      <ToolStatus />
      <VSeprator marginValue={3} />
      <LayerStatus />
      <VSeprator marginValue={3} />
      <div className="flex-1"></div>
      <VSeprator marginValue={3} />
      <CursorStatus />
      <VSeprator marginValue={3} />
      <ZoomStatus />
      <VSeprator marginValue={3} />
      <CanvasStatus />
      <VSeprator marginValue={3} />
      <ShortcutHint />
    </div>
  );
}

export default StatusBar;
