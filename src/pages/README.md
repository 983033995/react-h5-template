# 页面组件目录

本目录包含所有页面组件，按页面类型分目录组织。

## 目录结构

- `consultation/` - 咨询页面组件
- `test/` - 测试页面组件
- 其他共享页面组件直接放在本目录下

## 添加新页面步骤

1. 在本目录下创建新的页面目录，如 `marketing/`
2. 添加页面组件，通常命名为 `index.tsx` 和 `index.less`
3. 在 `src/entries/` 目录下创建对应的入口文件，如 `marketing.tsx`
4. 在项目根目录添加 HTML 入口文件，如 `marketing.html`
5. 在 `vite.config.ts` 的 `PAGE_MODES` 数组中添加新页面名称

## 页面组件规范

- 每个页面组件应当是一个完整的功能单元
- 页面专有组件应放在对应页面目录下
- 共享组件应放在 `src/components` 目录
- 样式应当使用 Less 模块化或直接的 Less 文件
- 尽量使用 Ant Design Mobile 组件库 