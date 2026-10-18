import { DefaultButton } from "@src/components/buttons.js";
import useTheme from "@src/hooks/useTheme.js";
import { LuMoon, LuSun } from "react-icons/lu";

function ThemeButton() {
  const { theme, toggle } = useTheme();

  return (
    <DefaultButton onClick={toggle}>
      {theme === "light" ? <LuMoon /> : <LuSun />}
    </DefaultButton>
  );
}

export default ThemeButton;
