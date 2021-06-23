import React from "react";

export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
    highlight: "#EF8345",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
    highlight: "#b0af30",
  },
};

export const ThemeContext = React.createContext(themes.light);
