import { SecondaryButton } from "@src/components/buttons.js";
import { LuSearch } from "react-icons/lu";

function SearchButton() {
  return <SecondaryButton icon={<LuSearch />} className="rounded-full!" />;
}

export default SearchButton;
