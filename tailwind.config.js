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
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const utilities = Object.entries(theme('lineClamp')).map(([key, value]) => {
        return {
          [`.line-clamp-${key}`]: {
            'overflow': 'hidden',
            'display': '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': value,
          },
        };
      });

      addUtilities(utilities);
    },
  ],
  // 关闭预处理，防止与antd-mobile样式冲突
  corePlugins: {
    preflight: false,
  },
}
