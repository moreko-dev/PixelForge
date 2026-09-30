import ToggleThemeButton from "./components/ToggleThemeButton";
import UserAccountButton from "./components/UserAccountButton";

function StarterHeader() {
  return (
    <div className="flex flex-row-reverse gap-4 p-4 border-b border-b-border">
      <UserAccountButton />
      <ToggleThemeButton />
    </div>
  );
}

export default StarterHeader;
