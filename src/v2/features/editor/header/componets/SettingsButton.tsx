import { SecondaryButton } from "@src/components/buttons.js";
import { IoSettingsOutline } from "react-icons/io5";

function SettingsButton() {
  return (
    <SecondaryButton
      icon={<IoSettingsOutline />}
      size="sm"
      className="rounded!"
    />
  );
}

export default SettingsButton;
