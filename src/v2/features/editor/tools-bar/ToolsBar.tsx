import type { Tools } from "@src/types/global.types.js";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  LuBlend,
  LuBrush,
  LuCircle,
  LuCopy,
  LuCrop,
  LuDroplet,
  LuEraser,
  LuHand,
  LuHexagon,
  LuMinus,
  LuMousePointer2,
  LuMove,
  LuPencil,
  LuPipette,
  LuScaling,
  LuSquare,
  LuType,
  LuWand,
  LuZoomIn,
} from "react-icons/lu";
import { PiLasso } from "react-icons/pi";

type toolType = { id: Tools; text: string; Icon: IconType };

const tools: toolType[] = [
  { id: "select", text: "Select", Icon: LuMousePointer2 },
  { id: "move", text: "Move", Icon: LuMove },
  { id: "pan", text: "Pan", Icon: LuHand },
  { id: "brush", text: "Brush", Icon: LuBrush },
  { id: "pencil", text: "Pencil", Icon: LuPencil },
  { id: "eraser", text: "Eraser", Icon: LuEraser },
  { id: "line", text: "Line", Icon: LuMinus },
  { id: "rectangle", text: "Rectangle", Icon: LuSquare },
  { id: "circle", text: "Circle", Icon: LuCircle },
  { id: "polygon", text: "Polygon", Icon: LuHexagon },
  { id: "text", text: "Text", Icon: LuType },
  { id: "crop", text: "Crop", Icon: LuCrop },
  { id: "resize", text: "Resize", Icon: LuScaling },
  { id: "eyedropper", text: "Eyedropper", Icon: LuPipette },
  { id: "gradient", text: "Gradient", Icon: LuBlend },
  { id: "blur", text: "Blur", Icon: LuDroplet },
  { id: "clone", text: "Clone", Icon: LuCopy },
  { id: "lasso", text: "Lasso", Icon: PiLasso },
  { id: "magic", text: "Magic", Icon: LuWand },
  { id: "zoom", text: "Zoom", Icon: LuZoomIn },
];

function ToolsBar() {
  const [selectedTool, setSelectedTool] = useState<Tools>("select");

  return (
    <div className="bg-sidebar overflow-x-hidden overflow-y-auto flex flex-col gap-2">
      {tools.map((item) => (
        <button
          key={item.id}
          className={`select-none cursor-pointer w-full flex gap-4 items-center text-foreground-secondary px-4 py-2 rounded transition-colors duration-200 hover:text-brand hover:bg-brand-soft ${item.id === selectedTool ? "text-brand! bg-brand-soft pointer-events-none" : ""}`}
          onClick={() => setSelectedTool(item.id)}
        >
          <item.Icon />
          {item.text}
        </button>
      ))}
    </div>
  );
}

export default ToolsBar;
