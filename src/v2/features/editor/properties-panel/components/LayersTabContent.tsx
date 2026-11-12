import { DestructiveButton } from "@src/components/buttons.js";
import { EmptyState } from "@src/components/EmptyState.js";
import type { LayersType } from "@src/core/CoreTypes.js";
import useLayer from "@src/hooks/useLayer.js";
import useProject from "@src/hooks/useProject.js";
import {
  LuBrush,
  LuImage,
  LuPen,
  LuShapes,
  LuTrash,
  LuType,
} from "react-icons/lu";

function LayersTabContent() {
  const { projectState } = useProject();
  const { selectedLayer, setSelectedLayer } = useLayer();
  if (!projectState) throw new Error("Project state is null or undefined!");

  return (
    <div className="flex flex-col gap-1">
      {projectState.layers.length === 0 ? (
        <EmptyState
          title="No Layer Found!"
          description="Start using tools to add new layers."
          className="min-h-fit! p-4! border-none!"
        />
      ) : (
        projectState.layers.map((layer) => (
          <LayerItem
            key={layer.id}
            type={layer.type}
            name={layer.name}
            onClick={() => setSelectedLayer(layer.id)}
            active={selectedLayer === layer.id}
          />
        ))
      )}
    </div>
  );
}

function LayerItem({
  type,
  name,
  onClick,
  active,
}: {
  type: LayersType;
  name: string;
  onClick: () => void;
  active: boolean;
}) {
  const getLayerIconType = () => {
    switch (type) {
      case "brush":
        return <LuBrush />;
      case "image":
        return <LuImage />;
      case "pen":
        return <LuPen />;
      case "shape":
        return <LuShapes />;
      case "text":
        return <LuType />;
      default:
        return null;
    }
  };
  return (
    <div
      className={`bg-surface border ${active ? "border-primary-disabled bg-primary-foreground!" : "border-border-subtle"} rounded overflow-hidden transition-colors duration-300`}
    >
      <div className="select-none w-full flex items-stretch">
        <div className="size-8 flex items-center justify-center text-primary bg-surface-raised border-r border-border">
          {getLayerIconType()}
        </div>
        <div className="w-6 flex justify-center items-center" onClick={onClick}>
          <div
            className={`size-2 rounded-full ${active ? "bg-primary" : "bg-surface-active"} transition-colors duration-300`}
          ></div>
        </div>
        <div
          className={`me-2 flex-1 text-sm flex items-center ${active ? "text-foreground" : "text-foreground-secondary"} transition-colors duration-300`}
          onClick={onClick}
        >
          {name}
        </div>
        <div>
          <DestructiveButton
            icon={<LuTrash />}
            appearance="soft"
            className="rounded-none border-none!"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}

export default LayersTabContent;
