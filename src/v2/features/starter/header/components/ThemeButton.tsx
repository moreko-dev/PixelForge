import useTheme from "@src/hooks/useTheme.js";
import { LuMoon, LuSun } from "react-icons/lu";

function ThemeButton() {
  const { theme, toggle } = useTheme();

  return (
    <button
      className="cursor-pointer size-10 text-lg rounded-full flex items-center justify-center bg-secondary text-secondary-foreground transition-colors duration-300 hover:bg-secondary-hover disabled:bg-secondary-disabled"
      onClick={toggle}
    >
      {theme === "light" ? <LuMoon /> : <LuSun />}
    </button>
  );
}

export default ThemeButton;
