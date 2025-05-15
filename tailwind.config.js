/*
 * @FilePath: /galaxy-app-h5/tailwind.config.js
 * @Description: 
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // 关闭预处理，防止与antd-mobile样式冲突
  corePlugins: {
    preflight: false,
  },
} 