import { LuHouse } from "react-icons/lu";
import { DangerButton } from "../../../../components/Buttons";

function GoToHome() {
  return (
    <div>
      <DangerButton className="size-9 flex items-center justify-center rounded-full cursor-pointer">
        <LuHouse />
      </DangerButton>
    </div>
  );
}

export default GoToHome;
