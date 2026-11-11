import { DestructiveButton, IconButton } from "@src/components/buttons.js";
import { EmptyState } from "@src/components/EmptyState.js";
import type { LayersType } from "@src/core/CoreTypes.js";
import useProject from "@src/hooks/useProject.js";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
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
          <LayerItem key={layer.id} type={layer.type} name={layer.name}>
            <span>Layer properties</span>
          </LayerItem>
        ))
      )}
    </div>
  );
}

function LayerItem({
  type,
  name,
  children,
}: {
  type: LayersType;
  name: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    <div>
      <div
        className={`select-none w-full flex gap-2 items-center ${isOpen ? "rounded-t" : "rounded"} bg-surface border border-border-subtle overflow-hidden`}
      >
        <div className="size-8 flex items-center justify-center text-primary bg-surface-raised border-r border-border">
          {getLayerIconType()}
        </div>
        <div
          className={`flex-1 text-sm leading-none text-foreground-secondary transition-colors duration-300 ${isOpen ? "text-foreground!" : ""}`}
        >
          {name}
        </div>
        <div>
          <IconButton
            icon={<BsThreeDots />}
            size="sm"
            className="rounded-none"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </div>

      {isOpen && (
        <div className="bg-surface-raised rounded-b flex flex-col gap-2 p-1">
          <div className="flex justify-end">
            <DestructiveButton
              icon={<LuTrash />}
              appearance="soft"
              className="size-7! rounded!"
              size="sm"
            />
          </div>
          {children}
        </div>
      )}
    </div>
  );
}

export default LayersTabContent;
