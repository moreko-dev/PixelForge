import { GhostButton } from "@src/components/buttons.js";
import { LuKeyboard } from "react-icons/lu";

function ShortcutHint() {
  return <GhostButton size="sm" icon={<LuKeyboard />} />;
}

export default ShortcutHint;
