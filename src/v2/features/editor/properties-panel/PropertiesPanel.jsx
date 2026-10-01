import { Tabs } from "../../../components/Tabs";
import CanvasTabContent from "./components/canvas-content/CanvasTabContent";
import LayersTabContent from "./components/layers-content/LayersTabContent";

const tabsData = [
  {
    id: "canvas",
    label: "Canvas",
    content: <CanvasTabContent />,
  },
  {
    id: "layers",
    label: "Layers",
    content: <LayersTabContent />,
  },
];

function PropertiesPanel() {
  return (
    <div className="min-w-75 bg-surface border-l border-t border-l-border border-t-border overflow-y-auto">
      <Tabs tabs={tabsData} defaultTab="canvas" className="h-full" />
    </div>
  );
}

export default PropertiesPanel;
