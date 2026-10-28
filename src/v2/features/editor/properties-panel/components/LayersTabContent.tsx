import { IconButton } from "@src/components/buttons.js";
import { EmptyState } from "@src/components/EmptyState.js";
import { BsThreeDots } from "react-icons/bs";
import { LuImage } from "react-icons/lu";

function LayersTabContent() {
  return (
    <div className="flex flex-col gap-1">
      <EmptyState
        title="No Layer Found!"
        description="Start using tools to add new layers."
        className="min-h-fit! p-4! border-none!"
      />
    </div>
  );
}

function LayerItem() {
  return (
    <div className="group select-none w-full flex gap-2 items-center rounded bg-surface border border-border-subtle overflow-hidden">
      <div className="size-8 flex items-center justify-center bg-surface-raised border-r border-border">
        <LuImage />
      </div>
      <div className="flex-1 text-sm leading-none text-foreground-secondary transition-colors duration-300 group-hover:text-foreground">
        Image-Layer001
      </div>
      <div>
        <IconButton icon={<BsThreeDots />} size="sm" className="rounded-none" />
      </div>
    </div>
  );
}

export default LayersTabContent;
