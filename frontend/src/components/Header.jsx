import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">نشریه دلتا</h1>
        <nav>
          <ul className="flex gap-4">
            <li><a href="/" className="">خانه</a></li>
            <li><a href="/multimedia" className="">چندرسانه‌ای</a></li>
            <li><a href="/upload-article" className="">آپلود مقاله</a></li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;