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
  // 1. نقرأ من localStorage مباشرة عند تعريف الـ State
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("themeMode") || "light";
    }
    return "light";
  });

  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "EN";
    }
    return "EN";
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // نقرأ من الـ storage فقط بعد أول رندر على المتصفح
    const storedMode = localStorage.getItem("themeMode") || "light";
    const storedLang = localStorage.getItem("language") || "EN";
    setMode(storedMode);
    setLanguage(storedLang);
    setMounted(true); // الآن نحن على المتصفح وجاهزون
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const toggleLanguage = () => {
    const newLang = language === "EN" ? "AR" : "EN";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const value = useMemo(
    () => ({ mode, toggleTheme, language, toggleLanguage }),
    [mode, language],
  );

  // 2. نحتفظ فقط بـ useEffect الخاص بالحفظ
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    localStorage.setItem("language", language);
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
  if (!mounted) {
  return <div style={{ visibility: "hidden" }}>{children}</div>;
}
  return (
    <ThemeProvider theme={theme}>
      <ThemeModeContext.Provider value={value}>
        {children}
      </ThemeModeContext.Provider>
    </ThemeProvider>
  );
};;;;

export default THemeModeProvider;