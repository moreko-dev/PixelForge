import {
  LuCircle,
  LuImage,
  LuMinus,
  LuMousePointer2,
  LuPaintbrush,
  LuSquare,
  LuType,
} from "react-icons/lu";
import { ToolsButton } from "../../../components/Buttons";

const toolButtonItems = [
  { Icon: LuMousePointer2, name: "Select" },
  { Icon: LuImage, name: "Image" },
  { Icon: LuType, name: "Text" },
  { Icon: LuPaintbrush, name: "Brush" },
  { Icon: LuSquare, name: "Rectangle" },
  { Icon: LuMinus, name: "Line" },
  { Icon: LuCircle, name: "Circle" },
];

function ToolsPanel() {
  return (
    <div className="bg-surface p-4 border-t border-t-border border-r border-r-border flex flex-col gap-2">
      {toolButtonItems.map((item, index) => (
        <ToolsButton
          key={index}
          className="rounded-lg py-2 px-4 flex gap-2 items-center cursor-pointer"
        >
          <item.Icon />
          {item.name}
        </ToolsButton>
      ))}
    </div>
  );
}

export default ToolsPanel;
