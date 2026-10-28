import { InfoButton } from "@src/components/buttons.js";
import useTheme from "@src/hooks/useTheme.js";
import { LuMoon, LuSun } from "react-icons/lu";

function ThemeButton() {
  const { theme, toggle } = useTheme();

  return (
    <InfoButton
      size="sm"
      icon={theme === "light" ? <LuMoon /> : <LuSun />}
      className="rounded!"
      onClick={toggle}
    />
  );
}

export default ThemeButton;
