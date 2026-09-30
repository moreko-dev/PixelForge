import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function getDefaultTheme() {
  return localStorage.getItem("theme") || "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getDefaultTheme());

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
