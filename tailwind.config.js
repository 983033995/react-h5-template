/*
 * @FilePath: /h5-react/tailwind.config.js
 * @Description:
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // 您可以根据需要自定义字体大小
        'base': '1rem', // 16px
      },
    },
  },
  plugins: [],
  // 关闭预处理，防止与antd-mobile样式冲突
  corePlugins: {
    preflight: false,
  },
}
