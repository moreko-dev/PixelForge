import {
  DestructiveButton,
  IconButton,
  SecondaryButton,
} from "@src/components/buttons.js";
import { EmptyState } from "@src/components/EmptyState.js";
import Modal from "@src/components/Modal.js";
import type { Layer, Project } from "@src/core/CoreTypes.js";
import {
  removeLayerOnState,
  updateLayerPropertiesOnState,
} from "@src/core/utils/LayerUtils.js";
import useLayer from "@src/hooks/useLayer.js";
import useProject from "@src/hooks/useProject.js";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  LuBrush,
  LuEye,
  LuEyeOff,
  LuLock,
  LuLockOpen,
  LuPen,
  LuShapes,
  LuText,
  LuTrash,
} from "react-icons/lu";

function LayersTabContent() {
  const { projectState, setProjectState } = useProject();
  const { selectedLayer, setSelectedLayer } = useLayer();
  if (!projectState) throw new Error("Project state is null or undefined!");
  let renderableLayers = projectState.layers.filter(
    (layer) => layer.renderable,
  );
  const [removableLayer, setRemovableLayer] = useState<{
    state: boolean;
    layer: Layer | null;
  }>({ state: false, layer: null });

  const removeLayerHandler = () => {
    if (!removableLayer.layer) {
      return toast.error("An unknown error: Layer not found!");
    }
    removeLayerOnState(setProjectState, removableLayer.layer.id);
    if (removableLayer.layer.id === selectedLayer) {
      setSelectedLayer(null);
    }
    setRemovableLayer({ state: false, layer: null });
    toast.success("Layer removed!");
  };

  return (
    <div className="flex flex-col gap-1">
      {renderableLayers.length === 0 ? (
        <EmptyState
          title="No Layer Found!"
          description="Start using tools to add new layers."
          className="min-h-fit! p-4! border-none!"
        />
      ) : (
        <>
          {renderableLayers.toReversed().map((layer) => (
            <LayerItem
              layer={layer}
              key={layer.id}
              onClick={() => setSelectedLayer(layer.id)}
              active={selectedLayer === layer.id}
              setState={setProjectState}
              setRemoveState={setRemovableLayer}
            />
          ))}
          {removableLayer.state && (
            <Modal
              title="Remove layer"
              onClose={() => setRemovableLayer({ state: false, layer: null })}
              actions={
                <div className="w-full flex items-center justify-end gap-2">
                  <DestructiveButton
                    appearance="soft"
                    className="rounded!"
                    onClick={removeLayerHandler}
                  >
                    Remove
                  </DestructiveButton>
                  <SecondaryButton
                    className="rounded!"
                    onClick={() =>
                      setRemovableLayer({ state: false, layer: null })
                    }
                  >
                    Cancel
                  </SecondaryButton>
                </div>
              }
            >
              Are you sure to remove{" "}
              <span className="text-sm bg-info-soft text-info border border-info-border p-1 rounded">
                {removableLayer.layer?.name}
              </span>{" "}
              ?
            </Modal>
          )}
        </>
      )}
    </div>
  );
}

function LayerItem({
  layer,
  onClick,
  active,
  setState,
  setRemoveState,
}: {
  layer: Layer;
  onClick: () => void;
  active: boolean;
  setState: React.Dispatch<React.SetStateAction<Project | null>>;
  setRemoveState: React.Dispatch<
    React.SetStateAction<{ state: boolean; layer: Layer | null }>
  >;
}) {
  const getLayerIconType = () => {
    switch (layer.type) {
      case "brush":
        return <LuBrush />;
      case "pen":
        return <LuPen />;
      case "line":
      case "rectangle":
      case "ellipse":
      case "polygon":
        return <LuShapes />;
      case "text":
        return <LuText />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={`bg-surface border ${active ? "border-primary-disabled bg-primary-foreground!" : "border-border-subtle"} rounded overflow-hidden transition-colors duration-300`}
      >
        <div className="select-none w-full flex items-stretch">
          <div className="size-8 flex items-center justify-center text-primary bg-surface-raised border-r border-border">
            {getLayerIconType()}
          </div>
          <div
            className="w-6 flex justify-center items-center"
            onClick={onClick}
          >
            <div
              className={`size-2 rounded-full ${active ? "bg-primary" : "bg-surface-active"} transition-colors duration-300`}
            ></div>
          </div>
          <div
            className={`min-w-0 me-2 flex-1 text-sm flex items-center ${active ? "text-foreground" : "text-foreground-secondary"} transition-colors duration-300`}
            onClick={onClick}
          >
            <span className="truncate">{layer.name}</span>
          </div>
          <div>
            <IconButton
              icon={layer.visible ? <LuEye /> : <LuEyeOff />}
              size="sm"
              className="rounded-none border-none!"
              onClick={() => {
                updateLayerPropertiesOnState(
                  setState,
                  layer.id,
                  "visible",
                  !layer.visible,
                );
              }}
            />
            <IconButton
              icon={layer.locked ? <LuLock /> : <LuLockOpen />}
              size="sm"
              className="rounded-none border-none!"
              onClick={() => {
                updateLayerPropertiesOnState(
                  setState,
                  layer.id,
                  "locked",
                  !layer.locked,
                );
              }}
            />
            <DestructiveButton
              icon={<LuTrash />}
              appearance="soft"
              className="rounded-none border-none!"
              size="sm"
              onClick={() => setRemoveState({ state: true, layer })}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LayersTabContent;
