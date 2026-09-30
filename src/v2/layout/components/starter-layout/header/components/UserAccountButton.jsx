import { LuUser } from "react-icons/lu";
import { PrimaryButton } from "../../../../../components/Buttons";

function UserAccountButton() {
  return (
    <PrimaryButton className="cursor-pointer size-10 flex justify-center items-center rounded-full">
      <LuUser />
    </PrimaryButton>
  );
}

export default UserAccountButton;
