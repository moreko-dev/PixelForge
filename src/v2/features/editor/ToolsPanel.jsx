import {
  LuCircle, // select
  LuImage, // rectangle
  LuMinus,
  LuMousePointer2, // text
  LuPaintbrush, // brush
  LuSquare, // image
  LuType, // text
} from "react-icons/lu";
import { ToolsButton } from "../../components/Buttons";

function ToolsPanel() {
  return (
    <div className="bg-surface p-4 border-t border-t-border border-r border-r-border flex flex-col gap-2">
      <ToolsButton className="rounded-lg py-2 px-4 flex gap-2 items-center cursor-pointer">
        <LuMousePointer2 />
        Select
      </ToolsButton>
      <ToolsButton className="rounded-lg py-2 px-4 flex gap-2 items-center cursor-pointer">
        <LuImage />
        Image
      </ToolsButton>
      <ToolsButton className="rounded-lg py-2 px-4 flex gap-2 items-center cursor-pointer">
        <LuType />
        Text
      </ToolsButton>
      <ToolsButton className="rounded-lg py-2 px-4 flex gap-2 items-center cursor-pointer">
        <LuPaintbrush />
        Brush
      </ToolsButton>
      <ToolsButton className="rounded-lg py-2 px-4 flex gap-2 items-center cursor-pointer">
        <LuSquare />
        Rectangle
      </ToolsButton>
      <ToolsButton className="rounded-lg py-2 px-4 flex gap-2 items-center cursor-pointer">
        <LuMinus />
        Line
      </ToolsButton>
      <ToolsButton className="rounded-lg py-2 px-4 flex gap-2 items-center cursor-pointer">
        <LuCircle />
        Circle
      </ToolsButton>
    </div>
  );
}

export default ToolsPanel;
