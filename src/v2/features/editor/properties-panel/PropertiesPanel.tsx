import Tabs from "@src/components/Tabs.js";
import CanvasTabContent from "./components/CanvasTabContent.js";
import LayersTabContent from "./components/LayersTabContent.js";
import PropertiesTabContent from "./components/PropertiesTabContent.js";

function PropertiesPanel() {
  return (
    <div className="p-0! bg-sidebar flex flex-col gap-4 overflow-hidden">
      <Tabs
        tabItems={[
          { key: "canvas", label: "Canvas", content: <CanvasTabContent /> },
          { key: "layers", label: "Layers", content: <LayersTabContent /> },
        ]}
      />
      <Tabs
        tabItems={[
          {
            key: "properties",
            label: "Properties",
            content: <PropertiesTabContent />,
          },
        ]}
      />
    </div>
  );
}

export default PropertiesPanel;
