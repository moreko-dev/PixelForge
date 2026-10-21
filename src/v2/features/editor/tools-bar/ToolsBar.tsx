import type { IconType } from "react-icons";
import {
  LuCircle,
  LuMinus,
  LuMousePointer2,
  LuPencil,
  LuRectangleHorizontal,
  LuType,
} from "react-icons/lu";

type toolType = { text: string; Icon: IconType };
const tools: toolType[] = [
  { text: "Select", Icon: LuMousePointer2 },
  { text: "Text", Icon: LuType },
  { text: "Pen", Icon: LuPencil },
  { text: "Rectangle", Icon: LuRectangleHorizontal },
  { text: "Line", Icon: LuMinus },
  { text: "Circle", Icon: LuCircle },
];

function ToolsBar() {
  return (
    <div className="bg-sidebar">
      {tools.map((item) => (
        <button className="cursor-pointer w-full flex gap-4 items-center text-foreground-secondary px-4 py-2 rounded transition-colors duration-200 hover:text-brand hover:bg-brand-soft">
          <item.Icon />
          {item.text}
        </button>
      ))}
    </div>
  );
}

export default ToolsBar;

// ${isActive ? "text-brand! bg-brand-soft" : ""}

// Need to complete
