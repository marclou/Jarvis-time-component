import React, { useState } from "react";

import { ThemeContext, themes } from "./theme-context";
import Time from "./Time";
import "./index.css";

function App() {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    const nextTheme = theme === themes.dark ? themes.light : themes.dark;

    setTheme(nextTheme);
  };

  const handleDateChange = (year, month, day) => {
    console.log(`${day}-${month}-${year}`);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <h3>Jarvis Coding Exercice</h3>
      <button onClick={toggleTheme} style={{ marginBottom: "20px" }}>
        {theme === themes.dark ? "Light mode ☀️" : "Dark mode 🌚"}
      </button>
      <Time handleDateChange={handleDateChange} />
    </ThemeContext.Provider>
  );
}

export default App;
