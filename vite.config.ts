/*
 * @FilePath: /h5-react/vite.config.ts
 * @Description:
 */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import fs from 'fs'
import alias from '@rollup/plugin-alias'
import iconfontLoader, { FileSystemIconLoader } from '@galaxy-fe/vite-plugin-unocss-iconfont'
import Icons from 'unplugin-icons/vite'
import { PAGE_MODES, getPageName } from './src/config/pages'

// 获取当前文件URL
const __filename = fileURLToPath(import.meta.url)
// 获取当前目录
const __dirname = dirname(__filename)

// 自动检测HTML入口文件
const getEntryPoints = () => {
  const entries: Record<string, string> = {};
  // 读取根目录下的所有HTML文件
  const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

  htmlFiles.forEach(file => {
    // 提取文件名（不含后缀）作为入口名
    const entryName = file.replace('.html', '');
    entries[entryName] = resolve(__dirname, file);
  });

  return entries;
};

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // 判断当前模式
  const currentMode = mode || 'development';
  const pageType = process.env.PAGE_TYPE || '';
  const isPageMode = PAGE_MODES.includes(pageType);
  const isDevelopment = command === 'serve';
  console.log('currentMode', currentMode, pageType, isPageMode, isDevelopment, command, env.VITE_APP_ENV)
  // 构建入口配置
  const entryPoints = getEntryPoints();

  // 单页面模式下只构建特定页面，全量模式构建所有页面
  const inputConfig = isPageMode
    ? { [pageType]: resolve(__dirname, `${pageType}.html`) }
    : entryPoints;

  return {
    // 在开发环境中使用绝对路径，在生产环境中使用相对路径
    base: isDevelopment ? '/' : './',
    plugins: [
      react(),
      // 处理源码别名
      alias({
        entries: [
          { find: '@', replacement: resolve(__dirname, 'src') },
          { find: '@components', replacement: resolve(__dirname, 'src/components') },
          { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
          { find: '@assets', replacement: resolve(__dirname, 'src/assets') },
          { find: '@styles', replacement: resolve(__dirname, 'src/styles') },
          { find: '@config', replacement: resolve(__dirname, 'src/config') },
          { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
          { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') },
          { find: '@services', replacement: resolve(__dirname, 'src/services') },
        ]
      }),
      iconfontLoader({
        cookie: 'locale=zh-cn; isg=BAwM2th6hyRUbpIcKM76hqhZ3Ww-RbDvAZ-eEWbNGLda8az7jlWAfwIClflJuehH; ctoken=hiC08YROpmjnSWhaHXFDEmIY; xlly_s=1; EGG_SESS_ICONFONT=dzIFRF6UFHpWicZx2_bPckt6tcP0u-elZfnZNz_70XbODm6HVGlIgb1-k021opQ2RnlrOJoHmE3H3yejPtNQ4eKaGlqIXZVPWr-RIoyduyT4X6bY9P2tHgn_nm__9mfG; u=951001; u.sig=uFHEc4J6kIeM_x81lB5Bqn40pJ8k0UtwpDVguKVFOaw; tfstk=gELtMyZ2zXFthOLOtCo3m7lo2_hHkDAasdR7otXgcpppNQyGchDwHnpJLi4DGA-vpN8HjrXiQZdXEZHoE40k_C7NlYDkNZm0mZ1jotihfFe7qQHoE40nfW_xBYvmD2Xx9sWC1s1f1XQCMs_bcr9fdM15ZR_XhKsQOs5O1t_fc96CLs_fhK_j9w6FMZ6Xr4MAd560k3u-R2GofT4bleCOfDA1dr1eJ1IOFCTTlrNV6GBW19MoXI8NDdI9-VeP6HOJL1pqzP71Dht55EH-WwOyxd1phYEAd3LwkgYteuW67tJR5HHQWZ_1wIIkxjZRKnOeJMLtqS5eSITNqagzCtxHwECvuxupeC99VgT_BgkprUKxR8bCQlGK9orVf6ze2clIoSK6I6Bo6qE40MlF9TcLzorVYX5dEXbb0oSET',
        pid: '4429575',
        ctoken: 'XvUqxMtqtL4PkD1QEdMeDLaA',
      }),
      Icons({
        customCollections: {
          font: FileSystemIconLoader(svg => svg.replace(/fill="#[\w\d]+"/g, 'fill="currentColor"').replace(/style="[^"]*"/g, '')),
        },
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@config': resolve(__dirname, 'src/config'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@services': resolve(__dirname, 'src/services'),
      },
    },
    // 配置预览选项，允许main.tsx被正确加载
    preview: {
      headers: {
        'Content-Type': 'text/javascript',
      },
    },
    // 处理开发服务器配置
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
          '.ts': 'tsx',
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: '@import "@/styles/variables.less"; @import "@/styles/mixins.less";',
        },
      },
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // 根据当前模式自动打开对应页面
      open: isPageMode ? `/${pageType}.html` : '/',
    },
    // 多页应用配置
    build: {
      // 生产环境移除 console 和 debugger
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // 多入口配置 - 使用动态检测的入口点
      rollupOptions: {
        input: inputConfig,
        // 优化分组
        output: {
          // 设置正确的MIME类型
          format: 'es',
          // Chunk命名策略
          manualChunks: (id) => {
            // 增量构建模式下不提取公共资源
            if (isPageMode) {
              return null; // 不创建公共chunk
            }

            // 全量构建模式下提取公共资源
            if (id.includes('node_modules')) {
              // 框架相关
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'vendor-react';
              }

              // UI组件库
              if (id.includes('antd-mobile') || id.includes('antd')) {
                return 'vendor-ui';
              }

              // 工具库和其他公共依赖
              if (
                id.includes('axios') ||
                id.includes('lodash') ||
                id.includes('dayjs') ||
                id.includes('moment') ||
                id.includes('redux')
              ) {
                return 'vendor-utils';
              }

              // 其他node_modules依赖，如果没有明确分类，都归入common组
              return 'vendor-common';
            }
            return null;
          },
          // 统一的输出文件结构
          chunkFileNames: (chunkInfo) => {
            console.log('chunkInfo', chunkInfo.name, chunkInfo.facadeModuleId);

            // vendor chunks 归为 shared
            if (chunkInfo.name && (chunkInfo.name.includes('vendor') || chunkInfo.name.includes('antd-mobile'))) {
              return `assets/shared/js/[name]-[hash].js`;
            }

            // 明确匹配入口页面名称
            for (const mode of PAGE_MODES) {
              if (
                chunkInfo.name === mode ||
                chunkInfo.name?.startsWith(`${mode}-`) ||
                chunkInfo.facadeModuleId?.includes(`/${mode}.html`) ||
                chunkInfo.facadeModuleId?.includes(`/src/entries/${mode}`) ||
                chunkInfo.facadeModuleId?.includes(`/src/pages/${mode}/`)
              ) {
                return `assets/${mode}/js/[name]-[hash].js`;
              }
            }

            // 根据 chunk 名称确定页面（旧方法备用）
            const pageName = getPageName(chunkInfo.name);

            return `assets/${pageName}/js/[name]-[hash].js`;
          },
          entryFileNames: (chunkInfo) => {
            console.log('entryFileNames', chunkInfo.name, chunkInfo.facadeModuleId);

            // 明确匹配入口页面名称
            for (const mode of PAGE_MODES) {
              if (
                chunkInfo.name === mode ||
                chunkInfo.facadeModuleId?.includes(`/${mode}.html`) ||
                chunkInfo.facadeModuleId?.includes(`/src/entries/${mode}`)
              ) {
                return `assets/${mode}/js/[name]-[hash].js`;
              }
            }

            // 获取文件名
            const name = chunkInfo.name || '';
            // 确定页面归属
            const pageName = getPageName(name);

            return `assets/${pageName}/js/[name]-[hash].js`;
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name || '';
            const extType = info.split('.').pop() || 'txt';

            // 特殊处理CSS文件
            if (extType === 'css') {
              // 增量构建模式下，不将任何CSS提取为公共资源
              if (isPageMode) {
                return `assets/${pageType}/css/[name]-[hash].[ext]`;
              }

              // 全量构建模式下，提取公共CSS资源
              // antd-mobile 的CSS归为共享资源
              if (info.includes('antd-mobile') || info.includes('antd')) {
                return `assets/shared/css/[name]-[hash].[ext]`;
              }

              // 根据CSS文件名确定归属
              const pageName = getPageName(info);
              return `assets/${pageName}/css/[name]-[hash].[ext]`;
            }

            // 其他资源文件
            // 增量构建模式下，所有资源直接归属到当前页面
            if (isPageMode) {
              return `assets/${pageType}/[ext]/[name]-[hash].[ext]`;
            }

            // 全量构建模式下，根据文件名确定归属
            const pageName = getPageName(info);
            return `assets/${pageName}/[ext]/[name]-[hash].[ext]`;
          },
        },
      },
      // 所有模式都使用相同的输出目录结构
      outDir: 'dist',
      // 确保静态资源被正确复制
      copyPublicDir: true,
      // 避免全量构建时清空单页构建生成的文件
      // emptyOutDir: isPageMode ? false : true,
      emptyOutDir: true,
    },
    // 命令行参数支持
    define: {
      __APP_ENV__: JSON.stringify(process.env.APP_ENV || currentMode),
      __APP_TYPE__: JSON.stringify(pageType),
    },
  };
})
