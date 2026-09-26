import { LuSun, LuUser } from "react-icons/lu";
import { DefaultButton, PrimaryButton } from "../../../components/Buttons";

function StarterHeader() {
  return (
    <div className="flex flex-row-reverse gap-4 p-4 border-b border-b-border">
      <PrimaryButton className="cursor-pointer size-10 flex justify-center items-center rounded-full">
        <LuUser />
      </PrimaryButton>
      <DefaultButton className="cursor-pointer size-10 flex justify-center items-center rounded-full">
        <LuSun />
        {/* <LuMoon /> */}
      </DefaultButton>
    </div>
  );
}

export default StarterHeader;
