#!/usr/bin/env node

/**
 * 创建新页面脚本
 * 用法: pnpm create-page
 *
 * 功能：
 * 1. 创建页面组件目录和文件
 * 2. 创建入口文件
 * 3. 创建HTML模板
 * 4. 创建页面专用vite配置文件
 * 5. 更新pages.ts配置文件
 * 6. 更新package.json添加脚本
 * 7. 更新README.md文档
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 初始化readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 项目根目录
const rootDir = path.resolve(__dirname, '..');

// 日志颜色
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

// 问题列表
const questions = [
  {
    name: 'pageName',
    question: '请输入页面名称（英文，如marketing）:',
    validate: (input) => {
      if (!input) return '页面名称不能为空';
      if (!/^[a-z][a-z0-9-]*$/.test(input)) return '页面名称必须是小写字母开头，可包含小写字母、数字和连字符';
      return true;
    }
  },
  {
    name: 'pageTitle',
    question: '请输入页面标题（中文，如营销页面）:',
    validate: (input) => {
      if (!input) return '页面标题不能为空';
      return true;
    }
  },
  {
    name: 'pageDescription',
    question: '请输入页面描述（可选）:',
    default: ''
  },
  {
    name: 'pageKeywords',
    question: '请输入页面关键词（逗号分隔，可选）:',
    default: ''
  }
];

// 保存用户输入的答案
const answers = {};

// 日志输出
function log(message, type = 'info') {
  const typeColors = {
    info: colors.blue,
    success: colors.green,
    warning: colors.yellow,
    error: colors.red,
    title: colors.bright + colors.blue,
  };

  console.log(`${typeColors[type] || colors.blue}${message}${colors.reset}`);
}

// 递归提问函数
function askQuestion(index) {
  if (index >= questions.length) {
    createPage(answers);
    return;
  }

  const question = questions[index];
  rl.question(question.question, (answer) => {
    const trimmedAnswer = answer.trim();
    const validation = question.validate ? question.validate(trimmedAnswer) : true;

    if (validation !== true) {
      log(validation, 'error');
      askQuestion(index);
      return;
    }

    answers[question.name] = trimmedAnswer || question.default || '';
    askQuestion(index + 1);
  });
}

// 创建目录（如果不存在）
function createDirIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    log(`创建目录: ${dir}`, 'info');
  }
}

// 创建文件（如果不存在）
function createFileIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    log(`创建文件: ${filePath}`, 'success');
  } else {
    log(`文件已存在，跳过: ${filePath}`, 'warning');
  }
}

// 更新配置文件添加新页面
function updatePageConfig(pageName, pageTitle, pageDescription, pageKeywords) {
  const configPath = path.join(rootDir, 'src', 'config', 'pages.ts');

  if (fs.existsSync(configPath)) {
    log(`更新页面配置文件: ${configPath}`, 'info');

    // 读取当前配置文件
    let configContent = fs.readFileSync(configPath, 'utf8');

    // 更新PAGE_MODES数组
    const pageModesRegex = /export const PAGE_MODES = \[(.*?)\];/;
    const pageModesMatch = configContent.match(pageModesRegex);

    if (pageModesMatch) {
      const currentModes = pageModesMatch[1];
      // 检查是否已包含该页面
      if (!currentModes.includes(`'${pageName}'`) && !currentModes.includes(`"${pageName}"`)) {
        // 添加新页面到PAGE_MODES数组
        const newModes = currentModes.trim().length === 0
          ? `'${pageName}'`
          : currentModes.endsWith(',')
            ? `${currentModes} '${pageName}'`
            : `${currentModes}, '${pageName}'`;

        configContent = configContent.replace(pageModesRegex, `export const PAGE_MODES = [${newModes}];`);
      }
    }

    // 更新PAGE_INFO对象 - 使用更精确的正则表达式
    const pageInfoRegex = /export const PAGE_INFO:([^{]*?)(Record<[^>]*>)?\s*=\s*\{([\s\S]*?)\};/;
    const pageInfoMatch = configContent.match(pageInfoRegex);

    if (pageInfoMatch) {
      const typeDeclaration = pageInfoMatch[2] || 'Record<string, { title: string; description: string; keywords: string }>'; // 捕获类型声明部分
      const currentInfo = pageInfoMatch[3];    // 捕获对象内容部分

      // 检查是否已包含该页面的信息
      if (!currentInfo.includes(`${pageName}:`)) {
        // 添加新页面到PAGE_INFO对象
        const pageInfoEntry = `  ${pageName}: {
    title: '${pageTitle}',
    description: '${pageDescription || pageTitle}',
    keywords: '${pageKeywords || pageName}',
  },\n`;

        const newInfo = currentInfo.trim().endsWith(',')
          ? `${currentInfo}${pageInfoEntry}`
          : `${currentInfo},${pageInfoEntry}`;

        configContent = configContent.replace(pageInfoRegex, `export const PAGE_INFO: ${typeDeclaration} = {${newInfo}};`);
      }
    }

    // 写入更新后的配置文件
    fs.writeFileSync(configPath, configContent);
    log(`页面配置文件已更新，添加了 '${pageName}' 页面`, 'success');
  } else {
    log(`页面配置文件不存在: ${configPath}，请先创建配置文件`, 'error');
  }
}

// 更新package.json添加脚本
function updatePackageJson(pageName) {
  const packageJsonPath = path.join(rootDir, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    log(`更新package.json添加脚本`, 'info');

    // 读取package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // 添加开发和构建脚本
    let isUpdated = false;

    if (!packageJson.scripts[`dev:${pageName}`]) {
      packageJson.scripts[`dev:${pageName}`] = `cross-env PAGE_TYPE=${pageName} vite`;
      isUpdated = true;
      log(`添加开发脚本: dev:${pageName}`, 'success');
    }

    if (!packageJson.scripts[`build:${pageName}`]) {
      packageJson.scripts[`build:${pageName}`] = `tsc -b && cross-env PAGE_TYPE=${pageName} vite build --mode prod`;
      isUpdated = true;
      log(`添加构建脚本: build:${pageName}`, 'success');
    }

    if (!packageJson.scripts[`build:${pageName}:test  `]) {
      packageJson.scripts[`build:${pageName}:test`] = `tsc -b && cross-env PAGE_TYPE=${pageName} vite build --mode test`;
      isUpdated = true;
      log(`添加构建脚本: build:${pageName}:test`, 'success');
    }

    if (isUpdated) {
      // 写入更新后的package.json
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      log(`package.json已更新`, 'success');
    } else {
      log(`package.json脚本已存在，无需更新`, 'warning');
    }
  } else {
    log(`package.json不存在: ${packageJsonPath}`, 'error');
  }
}

// 更新README.md添加新页面
function updateReadme(pageName, pageTitle) {
  const readmePath = path.join(rootDir, 'README.md');

  if (fs.existsSync(readmePath)) {
    log(`更新README.md添加新页面信息`, 'info');

    // 读取README.md
    let readmeContent = fs.readFileSync(readmePath, 'utf8');

    // 更新开发环境启动部分
    const devEnvRegex = /(# 启动特定页面\n)([\s\S]*?)(\n\n|$)/;
    const devEnvMatch = readmeContent.match(devEnvRegex);

    if (devEnvMatch) {
      const devEnvSection = devEnvMatch[2];
      if (!devEnvSection.includes(`pnpm dev:${pageName}`)) {
        const newDevEnvSection = devEnvSection + `\npnpm dev:${pageName}     # ${pageTitle}\n`;
        readmeContent = readmeContent.replace(devEnvRegex, `$1${newDevEnvSection}\n\n`);
        log(`更新README.md开发环境启动部分`, 'success');
      }
    }

    // 更新生产环境构建部分
    const buildEnvRegex = /(# 构建特定页面\n)([\s\S]*?)(\n\n|$)/;
    const buildEnvMatch = readmeContent.match(buildEnvRegex);

    if (buildEnvMatch) {
      const buildEnvSection = buildEnvMatch[2];
      if (!buildEnvSection.includes(`pnpm build:${pageName}`)) {
        const newBuildEnvSection = buildEnvSection + `\npnpm build:${pageName}     # 只构建${pageTitle}\n`;
        readmeContent = readmeContent.replace(buildEnvRegex, `$1${newBuildEnvSection}\n\n`);
        log(`更新README.md生产环境构建部分`, 'success');
      }
    }

    // 更新项目结构部分
    // 没有找到明确的模式来匹配，所以这里就简单提醒用户手动更新
    log(`请手动更新README.md中的项目结构部分，添加新页面: ${pageName}`, 'warning');

    // 写入更新后的README.md
    fs.writeFileSync(readmePath, readmeContent);
    log(`README.md已更新`, 'success');
  } else {
    log(`README.md不存在: ${readmePath}`, 'error');
  }
}

// 创建新页面的主函数
function createPage(answers) {
  const { pageName, pageTitle, pageDescription, pageKeywords } = answers;

  log(`\n开始创建 ${pageName} 页面...`, 'title');

  try {
    // 1. 创建页面目录
    const pageDir = path.join(rootDir, 'src', 'pages', pageName);
    createDirIfNotExists(pageDir);

    // 2. 创建页面组件
    const pageComponentPath = path.join(pageDir, 'index.tsx');
    const pageComponentContent = `import React from 'react';
import './index.less';

/**
 * ${pageTitle}组件
 */
const ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page: React.FC = () => {
  return (
    <div className="${pageName}-page">
      <header className="page-header">
        <h1>${pageTitle}</h1>
      </header>

      <main className="page-content">
        <section className="content-section">
          <h2>欢迎访问${pageTitle}</h2>
          <p>这是${pageTitle}的内容区域，您可以在这里添加实际内容。</p>
        </section>
      </main>

      <footer className="page-footer">
        <p>© ${new Date().getFullYear()} Galaxy应用</p>
      </footer>
    </div>
  );
};

export default ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page;
`;
    createFileIfNotExists(pageComponentPath, pageComponentContent);

    // 3. 创建页面样式
    const pageStylePath = path.join(pageDir, 'index.less');
    const pageStyleContent = `.${pageName}-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .page-header {
    padding: 1rem;
    background-color: #f0f2f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h1 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
      text-align: center;
    }
  }

  .page-content {
    flex: 1;
    padding: 1rem;

    .content-section {
      background-color: white;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

      h2 {
        margin-top: 0;
        font-size: 1.2rem;
        color: #333;
      }

      p {
        color: #666;
        line-height: 1.5;
      }
    }
  }

  .page-footer {
    padding: 1rem;
    background-color: #f0f2f5;
    text-align: center;

    p {
      margin: 0;
      color: #999;
      font-size: 0.875rem;
    }
  }
}
`;
    createFileIfNotExists(pageStylePath, pageStyleContent);

    // 4. 创建入口文件
    const entryDir = path.join(rootDir, 'src', 'entries');
    createDirIfNotExists(entryDir);

    const entryFilePath = path.join(entryDir, `${pageName}.tsx`);
    const entryFileContent = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd-mobile/es/global'
import '../index.css'
import '../styles/global.less'
import ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page from '../pages/${pageName}'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page />
  </StrictMode>,
)
`;
    createFileIfNotExists(entryFilePath, entryFileContent);

    // 5. 创建HTML入口文件
    const htmlFilePath = path.join(rootDir, `${pageName}.html`);
    const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <title>${pageTitle}</title>
    <meta name="description" content="${pageDescription || pageTitle}" />
    <meta name="keywords" content="${pageKeywords || pageName}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/entries/${pageName}.tsx"></script>
  </body>
</html>
`;
    createFileIfNotExists(htmlFilePath, htmlContent);

    // 8. 更新页面配置文件
    updatePageConfig(pageName, pageTitle, pageDescription, pageKeywords);

    // 9. 更新package.json
    updatePackageJson(pageName);

    // 10. 更新README.md
    updateReadme(pageName, pageTitle);

    log(`\n✅ ${pageName} 页面创建成功！`, 'success');
    log('\n下一步：', 'title');
    log(`1. 开发新页面: ${colors.yellow}pnpm dev:${pageName}${colors.reset}`);
    log(`2. 构建新页面: ${colors.yellow}pnpm build:${pageName}${colors.reset}`);

  } catch (error) {
    log(`\n❌ 创建页面时出错: ${error.message}`, 'error');
    console.error(error);
  }

  rl.close();
}

log('\n===== Galaxy应用 - 创建新页面 =====\n', 'title');

// 开始提问
askQuestion(0);
