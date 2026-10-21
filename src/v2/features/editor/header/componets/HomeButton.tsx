import { DestructiveButton } from "@src/components/buttons.js";
import { LuHouse } from "react-icons/lu";

function HomeButton() {
  return <DestructiveButton size="sm" appearance="soft" icon={<LuHouse />} />;
}

export default HomeButton;
