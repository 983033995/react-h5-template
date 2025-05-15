/*
 * @FilePath: /galaxy-app-h5/src/config/pages.ts
 * @Description:
 */
/**
 * 页面模式配置文件
 * 此文件定义了所有支持的页面模式和相关配置
 */

/**
 * 支持的页面模式列表
 * 用于构建配置和页面资源归属判断
 */
export const PAGE_MODES = ['consultation'];

/**
 * 页面信息配置
 * 包含页面标题、描述等元数据
 */
export const PAGE_INFO: Record<string, { title: string; description: string; keywords: string }> = {
  consultation: {
    title: 'Galaxy咨询服务',
    description: '专业咨询服务平台，为您解答各类问题',
    keywords: '咨询,服务,解答,专业',
  },
};

/**
 * 判断资源属于哪个页面
 * @param fileName 文件名或路径
 * @returns 页面名称，如果不属于特定页面则返回'shared'
 */
export function getPageName(fileName = ''): string {
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
}

/**
 * 添加新页面到配置中
 * @param pageName 页面名称
 * @param info 页面信息
 */
export function addPageMode(
  pageName: string,
  info: { title: string; description: string; keywords: string },
): void {
  if (!PAGE_MODES.includes(pageName)) {
    PAGE_MODES.push(pageName);
  }

  PAGE_INFO[pageName] = info;
}

/**
 * 获取页面信息
 * @param pageName 页面名称
 * @returns 页面信息，如果不存在则返回默认值
 */
export function getPageInfo(pageName: string) {
  return (
    PAGE_INFO[pageName] || {
      title: `${pageName.charAt(0).toUpperCase() + pageName.slice(1)}页面`,
      description: `${pageName}页面描述`,
      keywords: `${pageName},页面,关键词`,
    }
  );
}
