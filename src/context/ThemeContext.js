import React, { createContext, useState, useEffect, useContext } from "react";

// ✅ Create a Context for theme management
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Load saved theme from localStorage or default to light
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save preference
  };

  // Apply theme to document body (Bootstrap handles most colors)
  useEffect(() => {
    document.body.className =
      theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Custom hook for easy use in components
export const useTheme = () => useContext(ThemeContext);
