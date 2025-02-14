module.exports = {
  darkMode: 'class', // یا 'media' برای استفاده از تنظیمات مرورگر
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // همه فایل‌های JS/JSX/TS/TSX در پوشه src
      "./public/index.html",        // فایل HTML اصلی
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('tailwindcss-rtl'), // اضافه کردن پلاگین RTL
    ],
  }