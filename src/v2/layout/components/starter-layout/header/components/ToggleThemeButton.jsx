import { useContext } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { DefaultButton } from "../../../../../components/Buttons";
import ThemeContext from "./../../../../../contexts/ThemeContext";

function ToggleThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <DefaultButton
      className="cursor-pointer size-10 flex justify-center items-center rounded-full"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <LuSun /> : <LuMoon />}
    </DefaultButton>
  );
}

export default ToggleThemeButton;
