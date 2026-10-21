import { SecondaryButton } from "@src/components/buttons.js";
import { LuUser } from "react-icons/lu";

function AccountButton() {
  return <SecondaryButton icon={<LuUser />} className="rounded-full!" />;
}

export default AccountButton;
