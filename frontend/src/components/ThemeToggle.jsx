import React, { useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 text-black dark:bg-gray-700 dark:text-white rounded-lg"
    >
      {isDarkMode ? "روز ☀️" : "شب 🌙"}
    </button>
  );
};

export default ThemeToggle;