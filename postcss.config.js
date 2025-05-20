/*
 * @FilePath: /h5-react/postcss.config.js
 * @Description:
 */

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-mobile-forever': {
      viewportWidth: 375,
      maxDisplayWidth: 1080,
      appSelector: '#root',
    }
  },
}
