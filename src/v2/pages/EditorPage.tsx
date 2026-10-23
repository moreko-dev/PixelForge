import CanvasViewer from "@src/features/editor/canvas-viewer/CanvasViewer.js";
import Header from "@src/features/editor/header/Header.js";
import PropertiesPanel from "@src/features/editor/properties-panel/PropertiesPanel.js";
import StatusBar from "@src/features/editor/status-bar/StatusBar.js";
import ToolsBar from "@src/features/editor/tools-bar/ToolsBar.js";

function EditorPage() {
  return (
    <main className="p-2 w-full h-dvh grid grid-cols-[250px_1fr_300px] grid-rows-[auto_1fr_auto] gap-2 *:p-3 *:rounded">
      <Header />
      <ToolsBar />
      <CanvasViewer />
      <PropertiesPanel />
      <StatusBar />
    </main>
  );
}

export default EditorPage;
