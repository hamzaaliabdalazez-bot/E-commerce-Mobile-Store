"use client";

import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ThemeModeContext = createContext({
  mode: "light",
  toggleTheme: () => {},
  language: "EN",
  toggleLanguage: () => {},
});

const THemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const [language, setLanguage] = useState("EN");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "AR" : "EN"));
  };

  const value = useMemo(
    () => ({ mode, toggleTheme, language, toggleLanguage }),
    [mode, language],
  );
  // const [mode, setMode] = useState("light");
  // const [language, setLanguage] = useState("EN");

  useEffect(() => {
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("themeMode") : null;
    const storedLanguage =
      typeof window !== "undefined" ? localStorage.getItem("language") : null;
    if (storedMode) setMode(storedMode);
    if (storedLanguage) setLanguage(storedLanguage);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("themeMode", mode);
      localStorage.setItem("language", language);
    }
  }, [mode, language]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#e3f2fd" },
        },
        typography: {
          fontFamily: ["Inter", "sans-serif"].join(","),
        },
      }),
    [mode],
  );
  return (
    <ThemeProvider theme={theme}>
      <ThemeModeContext.Provider value={value}>
        {children}
      </ThemeModeContext.Provider>
    </ThemeProvider>
  );
};

export default THemeModeProvider;
