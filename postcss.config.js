/*
 * @FilePath: /galaxy-app-h5/postcss.config.js
 * @Description: 
 */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-px-to-viewport-8-plugin': {
      unitToConvert: 'px', // 需要转换的单位
      viewportWidth: 375, // 设计稿的视口宽度
      unitPrecision: 5, // 单位转换后保留的精度
      propList: ['*'], // 能转化为vw的属性列表
      viewportUnit: 'vw', // 希望使用的视口单位
      fontViewportUnit: 'vw', // 字体使用的视口单位
      selectorBlackList: [], // 需要忽略的CSS选择器
      minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [], // 忽略某些文件夹下的文件，例如 'node_modules'
      landscape: false, // 是否处理横屏情况
    },
  },
} 