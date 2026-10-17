import { createContext, useEffect, useState } from "react";

const THEME_KEY = "theme";

type Theme = "light" | "dark";

type ThemeContextType = { theme: Theme; toggle: () => void } | null;
const ThemeContext = createContext<ThemeContextType>(null);

function getDefaultTheme(): Theme {
  return (localStorage.getItem(THEME_KEY) as Theme) ?? "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getDefaultTheme());

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem(THEME_KEY, newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
