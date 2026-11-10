import { SecondaryButton } from "@src/components/buttons.js";
import { LuImage } from "react-icons/lu";

function ImageButton() {
  return (
    <SecondaryButton icon={<LuImage />} size="sm" className="rounded!">
      Import image
    </SecondaryButton>
  );
}

export default ImageButton;
