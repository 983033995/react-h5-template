<!--
 * @FilePath: /galaxy-app-h5/src/entries/README.md
 * @Description: 
-->
# 应用入口文件目录

本目录包含所有页面的入口文件，是连接 HTML 和组件的桥梁。

## 目录结构

- `main.tsx` - 主应用入口文件
- `consultation.tsx` - 咨询页面入口文件

## 入口文件职责

入口文件主要负责以下工作：

1. 导入全局样式
2. 初始化 React 应用
3. 渲染对应的页面组件
4. 提供全局上下文（如需要）

## 添加新入口文件

1. 创建新的入口文件，如 `marketing.tsx`
2. 引入必要的全局样式
3. 引入对应的页面组件
4. 使用 ReactDOM 渲染组件到根元素

## 入口文件规范

入口文件应保持简洁，只负责初始化和挂载应用，不应包含业务逻辑。

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import '../styles/global.less'
import SomePage from '../pages/some-page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SomePage />
  </StrictMode>,
)
``` 