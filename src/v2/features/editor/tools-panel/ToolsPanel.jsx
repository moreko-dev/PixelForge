import { useState } from "react";
import {
  LuCircle,
  LuMinus,
  LuMousePointer2,
  LuPaintbrush,
  LuSquare,
  LuType,
} from "react-icons/lu";
import { ToolsButton } from "../../../components/Buttons";
import ImageTool from "./components/ImageTool";

const toolButtonItems = [
  { id: "select", Icon: LuMousePointer2, name: "Select" },
  { id: "text", Icon: LuType, name: "Text" },
  { id: "brush", Icon: LuPaintbrush, name: "Brush" },
  { id: "rectangle", Icon: LuSquare, name: "Rectangle" },
  { id: "line", Icon: LuMinus, name: "Line" },
  { id: "circle", Icon: LuCircle, name: "Circle" },
];

function ToolsPanel() {
  const [acitveButton, setActiveButton] = useState(toolButtonItems[0].id);

  return (
    <div className="bg-surface p-4 border-t border-t-border border-r border-r-border flex flex-col gap-2">
      {toolButtonItems.map((item, index) => (
        <ToolsButton
          key={index}
          className="select-none rounded-lg py-2 px-4 flex gap-2 items-center cursor-pointer"
          active={item.id === acitveButton}
          onClick={() => setActiveButton(item.id)}
        >
          <item.Icon />
          {item.name}
        </ToolsButton>
      ))}
      <ImageTool />
    </div>
  );
}

export default ToolsPanel;
