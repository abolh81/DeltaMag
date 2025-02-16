import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} نشریه دلتا. تمام حقوق محفوظ است.</p>
      </div>
    </footer>
  );
};

export default Footer;