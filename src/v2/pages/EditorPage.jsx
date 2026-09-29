import CanvasViewerPanel from "../features/editor/CanvasViewerPanel";
import PropertiesPanel from "../features/editor/properties-panel/PropertiesPanel";
import StatusPanel from "../features/editor/status-panel/StatusPanel";
import ToolsPanel from "../features/editor/ToolsPanel";

function EditorPage() {
  return (
    <div className="w-full h-dvh grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr] gap-2">
      <StatusPanel />
      <ToolsPanel />
      <CanvasViewerPanel />
      <PropertiesPanel />
    </div>
  );
}

export default EditorPage;
