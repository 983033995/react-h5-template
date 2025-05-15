# Galaxy应用 H5

基于React 18 + Ant Design Mobile + Vite + TypeScript开发的移动端H5应用框架，支持多页面应用架构，支持按页面入口增量部署。

## 技术栈

- React 18 (Ant Design Mobile暂不支持React 19，待升级之后升级)
- TypeScript
- Ant Design Mobile (UI组件库)
- Vite (开发构建工具)
- TailwindCSS (原子化CSS框架)
- Less (CSS预处理器)
- PostCSS px-to-viewport (自动将px转换为vw单位，实现移动端适配)
- React Router DOM (路由管理)
- pnpm (包管理工具)
- swr  (数据缓存)
- ESLint + Prettier (代码规范和格式化)
- Husky + lint-staged (Git钩子和提交前检查)

## 项目特性

- 响应式布局，自动适配各种移动端设备
- 多页面应用架构(MPA)，支持独立开发和构建
- 模块化CSS，避免样式冲突
- 严格的代码规范和提交检查
- 完善的构建优化和资源共享策略
- 灵活的部署配置，支持多种部署场景

## 开始使用

### 安装依赖

```bash
pnpm install
```

### 开发环境启动

```bash
# 启动所有应用
pnpm dev

# 启动特定页面
pnpm dev:consultation  # 咨询页面

### 代码检查和格式化

```bash
# 代码检查
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# 格式化代码
pnpm format
```

### 生产环境构建

```bash
# 构建整个项目
pnpm build

# 构建特定页面
pnpm build:consultation  # 只构建咨询页面

### 创建新页面

使用以下命令创建一个新页面：

```bash
pnpm create-page
```

该脚本将引导您完成新页面创建的以下步骤：

1. 创建页面组件目录和文件（src/pages/页面名称/）
2. 创建入口文件（src/entries/页面名称.tsx）
3. 创建HTML模板（页面名称.html）
4. 创建页面专用vite配置文件（vite.页面名称.config.ts）
5. 更新pages.ts配置文件，添加新页面信息
6. 更新package.json添加开发和构建脚本
7. 更新README.md添加新页面信息

创建完成后，您可以立即开始开发新页面：

```bash
pnpm dev:页面名称
```

### 预览生产环境构建结果

```bash
pnpm preview
```

## 多页面应用架构

本项目采用 MPA (多页面应用) + SPA (单页面应用) 混合架构：

- **主应用**：使用 React Router 实现的 SPA，提供主要功能
- **独立页面**：每个独立页面有自己的入口文件，可以单独开发和构建

项目结构如下：

```
├── index.html                # 主应用入口HTML
├── consultation.html         # 咨询页面入口HTML
└── src/
    ├── entries/              # 入口文件目录
    │   ├── main.tsx          # 主应用入口文件
    │   ├── consultation.tsx  # 咨询页面入口文件
    │   └── marketing.tsx     # 营销页面入口文件
    ├── pages/                # 页面组件目录
        ├── consultation/     # 咨询页面组件
        ├── marketing/        # 营销页面组件
        └── ...
```

构建输出结构：

```
dist/
├── index.html                # 主应用HTML
├── consultation.html         # 咨询页面HTML
├── marketing.html            # 营销页面HTML
└── assets/
    ├── shared/               # 共享资源
    │   ├── css/              # 共享CSS和第三方库CSS（如antd-mobile）
    │   └── js/               # 共享JS和第三方库JS（vendor、react等）
    ├── consultation/         # 咨询页面专属资源
    │   └── css/              # 咨询页面专属CSS
    │   └── js/               # 咨询页面专属JS
    ├── marketing/            # 营销页面专属资源
    │   └── css/              # 营销页面专属CSS
    │   └── js/               # 营销页面专属JS
    └── ...
```

> 注意：无论是执行完整构建（`pnpm build`）还是单页构建（如 `pnpm build:consultation`），
> 输出目录结构都保持一致，所有HTML文件都位于dist根目录，资源文件按页面分类存放在assets下，
> 这样便于统一部署和管理。

## 部署说明

本项目支持多种部署方式，无论是整体部署还是单页部署，都使用统一的目录结构：

### 整体部署

将 `dist` 目录整体部署到服务器，可通过以下URL访问不同页面：

```
https://example.com/            # 访问主应用
https://example.com/consultation.html  # 访问咨询页面
https://example.com/marketing.html     # 访问营销页面
```

### 单页部署

即使只部署单个页面（例如只部署咨询页面），目录结构也保持不变：

```
dist/
├── consultation.html         # 咨询页面HTML
├── vite.svg                  # 静态资源
└── assets/
    ├── shared/               # 共享资源
    └── consultation/         # 咨询页面专属资源
```

### Nginx配置示例

```nginx
server {
    listen 80;
    server_name example.com;
    root /path/to/dist;

    # 默认首页
    index index.html;

    # 静态资源缓存
    location /assets/ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }

    # HTML文件不缓存
    location ~ \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # 单页应用路由支持
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }
}
```

### 部署检查清单

- [ ] 确保所有HTML文件都位于服务器根目录
- [ ] 资源路径正确（检查assets路径是否正确解析）
- [ ] 静态资源设置了合适的缓存策略
- [ ] 对于SPA路由，配置了适当的URL重写规则
- [ ] 启用了HTTPS（生产环境必备）

### 部署路径配置

项目默认使用相对路径（`base: './'`）进行构建，这意味着所有资源引用都是相对于HTML所在目录的。这种配置适用于以下场景：

1. 静态文件托管（如阿里云OSS、腾讯云COS等）
2. 将dist目录直接部署到服务器网站根目录
3. 将dist目录部署到子目录（如`https://example.com/app/`）

如果需要将资源部署到CDN或其他域名，可以通过修改`vite.config.ts`中的`base`配置：

```typescript
// 使用绝对路径（从网站根目录开始）
base: '/',

// 使用CDN路径
base: 'https://cdn.example.com/',

// 使用子路径
base: '/app/',
```

部署到不同环境时，可以根据需要调整这个配置。

## 共享资源管理

在多页面应用中，共享资源是指被多个页面共同使用的资源文件，如公共组件、全局样式、第三方库等。项目中对共享资源的管理是自动的，不需要手动配置。

### 共享资源范围

当前项目中以下资源被视为共享资源：

1. **第三方库**：
   - React、React DOM、React Router等框架库
   - Ant Design Mobile等UI组件库
   - 所有手动配置在`manualChunks`中的库

2. **全局样式文件**：
   - `src/index.css`
   - `src/styles/global.less`
   - 全局变量和混合器文件

3. **公共组件**：
   - `src/components/`目录下的组件
   - 不属于特定页面的通用组件

4. **公共资源**：
   - `public/`目录下的静态资源
   - `src/assets/`中的共享图片、图标等

### 共享资源规则

项目中共享资源的识别和分类是根据文件路径自动完成的。在`vite.config.ts`中定义了一个`getPageName`函数来判断资源的归属：

```typescript
// 判断资源属于哪个页面
const getPageName = (fileName = '') => {
  // 默认共享资源
  let pageName = 'shared';

  // 检查是否是特定页面的资源
  for (const mode of PAGE_MODES) {
    if (
      fileName.includes(`/${mode}/`) ||
      fileName.includes(`\\${mode}\\`) ||
      fileName.includes(`/${mode}.`) ||
      fileName.includes(`\\${mode}.`) ||
      fileName.startsWith(`${mode}/`) ||
      fileName.startsWith(`${mode}\\`) ||
      fileName.startsWith(`${mode}.`)
    ) {
      pageName = mode;
      break;
    }
  }

  return pageName;
};
```

此函数的工作原理是：
- 默认所有资源都归类为`shared`（共享资源）
- 如果资源路径中包含特定页面名称（如`/consultation/`），则归属于该页面
- 最终会将资源输出到`dist/assets/{pageName}/`目录下

### 添加新的共享资源

要添加新的共享资源，您可以：

1. **添加全局共享样式**：
   - 在`src/styles/`目录下添加新的样式文件
   - 在`global.less`中导入新的样式文件

2. **添加共享组件**：
   - 在`src/components/`目录下创建新的组件
   - 确保组件不包含页面特定的逻辑和样式

3. **添加共享图片、图标等**：
   - 将资源放在`src/assets/`目录下
   - 避免将资源放在页面特定目录（如`src/pages/consultation/`）

4. **添加第三方库共享**：
   - 如果需要添加新的第三方库到共享资源，可以修改`vite.config.ts`中的`manualChunks`配置：

   ```typescript
   manualChunks: {
     'vendor': ['react', 'react-dom', 'react-router-dom'],
     'antd-mobile': ['antd-mobile'],
     'chart-libs': ['echarts', 'chart.js'], // 添加新的库分组
   },
   ```

### 共享资源最佳实践

为确保共享资源被正确识别和优化，建议遵循以下最佳实践：

1. **保持清晰的目录结构**：
   - 公共组件放在`src/components/`
   - 页面特定组件放在`src/pages/{pageName}/components/`
   - 共享资源放在`src/assets/`或`public/`

2. **明确导入路径**：
   - 使用别名导入（如`@/components/Button`）
   - 避免使用相对路径穿越目录层级

3. **合理拆分和合并资源**：
   - 较小的组件可以合并以减少HTTP请求
   - 较大的第三方库应该单独分组以优化缓存

4. **动态导入**：
   - 对于较大的共享组件，可以使用动态导入以实现按需加载：
   ```typescript
   const BigComponent = React.lazy(() => import('@/components/BigComponent'));
   ```

通过这种方式，项目可以在保持代码组织清晰的同时，自动优化资源加载性能，减少页面间的重复资源，提升用户体验。

### 可能遇到的问题

#### 1. 模块加载错误

如果遇到以下错误：

```
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "application/octet-stream". Strict MIME checking is enforced for module scripts per HTML spec.
```

原因是浏览器对ES模块脚本的MIME类型有严格要求，以下是完整解决方法：

1. **确保正确的Content-Type**：
   - 静态服务器需要为JS文件设置正确的MIME类型`text/javascript`
   - Nginx配置示例：`add_header Content-Type text/javascript;`

2. **使用相对路径**：
   - 确保vite.config.ts中配置了`base: './'`
   - 确保HTML文件中所有资源路径使用相对路径（例如：`./assets/`而不是`/assets/`）

3. **在vite.config.ts中添加预览配置**：
   ```typescript
   preview: {
     headers: {
       'Content-Type': 'text/javascript',
     },
   },
   ```

4. **在生产构建配置中指定模块格式**：
   ```typescript
   build: {
     rollupOptions: {
       output: {
         format: 'es',
         // 其他配置...
       }
     }
   }
   ```

5. **使用正规Web服务器**：
   - 不要直接在文件系统中打开HTML文件
   - 使用Nginx、Apache或`pnpm preview`来提供文件服务
   - 如果使用自己的服务器，确保配置了适当的MIME类型

#### 2. 资源路径问题

如果资源文件（JS、CSS、图片）无法加载，检查：

1. HTML文件中的资源引用路径是否正确
2. 服务器配置是否正确处理静态资源
3. 检查网络请求的具体错误（404、403等）

## Git提交规范

本项目使用 Husky 和 lint-staged 强制代码规范和提交信息规范。提交信息必须符合以下格式：

```
<类型>(<作用域>): <主题>
```

类型可以是：

- feat: 新功能
- fix: 修复bug
- docs: 文档变更
- style: 不影响代码含义的修改
- refactor: 代码重构
- perf: 性能优化
- test: 测试相关
- build: 构建相关
- ci: CI配置相关
- chore: 其他修改
- revert: 撤销提交

示例：`feat(login): add login form component`

## 项目结构

```
├── public/               # 静态资源
├── src/                  # 源代码
│   ├── assets/           # 资源文件（图片、字体等）
│   │   └── *.module.less # 组件样式模块
│   ├── components/       # 公共组件
│   │   └── *.module.less # 组件样式模块
│   ├── pages/            # 页面组件
│   │   └── *.module.less # 页面样式模块
│   ├── styles/           # 全局样式和Less变量、混合器
│   │   ├── variables.less  # 全局变量
│   │   ├── mixins.less     # 混合器
│   │   └── global.less     # 全局样式
│   ├── App.tsx           # 应用入口组件
│   ├── main.tsx          # 主入口文件
│   ├── consultation.tsx  # 咨询页面入口文件
│   └── index.css         # 全局样式
├── index.html            # HTML模板
├── consultation.html     # 咨询页面HTML模板
├── package.json          # 项目依赖和脚本
├── postcss.config.js     # PostCSS配置
├── tailwind.config.js    # TailwindCSS配置
├── .eslintrc.json        # ESLint配置
├── .prettierrc           # Prettier配置
├── .eslintignore         # ESLint忽略文件
├── .prettierignore       # Prettier忽略文件
├── .gitmessage           # Git提交消息模板
├── .husky/               # Husky Git钩子
├── scripts/              # 项目脚本
│   └── create-page.js    # 创建新页面脚本
├── pnpm-workspace.yaml   # pnpm工作区配置
├── .npmrc                # npm/pnpm配置
├── tsconfig.json         # TypeScript配置
└── vite.config.ts        # Vite配置
```

## 页面开发指南

### 创建新页面

使用以下命令创建一个新页面：

```bash
pnpm create-page
```

该脚本将引导您完成新页面创建的以下步骤：

1. 创建页面组件目录和文件（src/pages/页面名称/）
2. 创建入口文件（src/entries/页面名称.tsx）
3. 创建HTML模板（页面名称.html）
4. 创建页面专用vite配置文件（vite.页面名称.config.ts）
5. 更新pages.ts配置文件，添加新页面信息
6. 更新package.json添加开发和构建脚本
7. 更新README.md添加新页面信息

创建完成后，您可以立即开始开发新页面：

```bash
pnpm dev:页面名称
```

### 启动特定页面

```bash
# 启动主应用
pnpm dev

# 启动特定页面
pnpm dev:consultation  # 咨询页面
```

### 构建特定页面

```bash
# 构建整个项目
pnpm build

# 构建特定页面
pnpm build:consultation  # 只构建咨询页面

# 构建所有页面
pnpm build:all-pages
```

### 页面配置管理

页面相关的配置信息存储在 `src/config/pages.ts` 文件中，包括：

- `PAGE_MODES`：支持的页面模式列表
- `PAGE_INFO`：每个页面的元数据（标题、描述、关键词等）
- `getPageName`：根据文件路径判断资源所属页面
- `addPageMode`：添加新页面模式的辅助函数
- `getPageInfo`：获取页面信息的辅助函数

当需要添加新页面时，系统会自动更新此配置文件。
