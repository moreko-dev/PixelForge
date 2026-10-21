import { OutlineButton } from "@src/components/buttons.js";
import { LuBug } from "react-icons/lu";

function ReportBugButton() {
  return (
    <OutlineButton size="sm" icon={<LuBug />} className="rounded!">
      Report bug
    </OutlineButton>
  );
}

export default ReportBugButton;
