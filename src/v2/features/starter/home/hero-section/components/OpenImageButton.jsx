import { LuImages } from "react-icons/lu";
import { PrimaryButton } from "../../../../../components/Buttons";

function OpenImageButton() {
  return (
    <PrimaryButton className="cursor-pointer flex gap-2 items-center px-6 py-2 rounded-full">
      <LuImages /> Open image
    </PrimaryButton>
  );
}

export default OpenImageButton;
