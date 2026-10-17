import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext.js";

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("Use useTheme() in ThemeProvider.");
  return ctx;
}

export default useTheme;
